// Lightweight, fully-local intent classifier.
// Uses weighted keyword/phrase matching instead of an external LLM call —
// this is what makes the assistant free forever with zero rate limits.

const INTENTS = {
  greeting: {
    weight: 1,
    keywords: ["hi", "hello", "hey", "good morning", "good evening", "namaste", "yo", "sup"],
  },
  thanks: {
    weight: 1,
    keywords: ["thanks", "thank you", "thx", "appreciate it", "cheers"],
  },
  fare_query: {
    weight: 1.4,
    keywords: [
      "fair price", "fair", "how much should", "how much does", "cost", "price", "rate",
      "fare", "auto", "rickshaw", "taxi", "uber", "ola", "cab", "km", "kilometer",
      "overcharg", "too expensive", "too much",
    ],
  },
  tipping: {
    weight: 1.4,
    keywords: ["tip", "tipping", "gratuity", "how much to tip", "should i tip"],
  },
  scam_warning: {
    weight: 1.6,
    keywords: [
      "scam", "safe", "is it safe", "suspicious", "different app", "another app",
      "trust", "cheat", "fraud", "fake", "rip off", "ripoff", "meter broken", "won a prize",
    ],
  },
  transaction_dispute: {
    weight: 1.6,
    keywords: [
      "failed", "transaction failed", "money deducted", "didn't receive", "not received",
      "refund", "dispute", "charged twice", "wrong amount", "stuck", "pending forever",
    ],
  },
  merchant_trust: {
    weight: 1.3,
    keywords: [
      "trust score", "verified", "is this merchant", "trust signal", "red flag", "legit",
    ],
  },
  etiquette: {
    weight: 1.2,
    keywords: ["etiquette", "custom", "customs", "polite", "manners", "culture", "cultural"],
  },
  shopping: {
    weight: 1.2,
    keywords: ["bargain", "haggle", "negotiate", "market price", "shopping", "souvenir"],
  },
  general_help: {
    weight: 0.8,
    keywords: ["help", "what can you do", "who are you", "what are you"],
  },
};

const CITY_ALIASES = {
  delhi: "delhi",
  "new delhi": "delhi",
  ncr: "delhi",
  mumbai: "mumbai",
  bombay: "mumbai",
  bangalore: "bangalore",
  bengaluru: "bangalore",
  jaipur: "jaipur",
  goa: "goa",
  chennai: "chennai",
  madras: "chennai",
  kolkata: "kolkata",
  calcutta: "kolkata",
};

const CATEGORY_ALIASES = {
  auto: "auto",
  rickshaw: "auto",
  "auto-rickshaw": "auto",
  "auto rickshaw": "auto",
  taxi: "taxi",
  cab: "taxi",
  uber: "taxi",
  ola: "taxi",
  restaurant: "restaurant",
  food: "streetFood",
  "street food": "streetFood",
  hotel: "hotel",
  shopping: "shopping",
  guide: "guide",
  driver: "driver",
};

function normalize(text) {
  return text.toLowerCase().replace(/[^\w\s₹$%.]/g, " ").replace(/\s+/g, " ").trim();
}

export function classify(rawText) {
  const text = normalize(rawText);
  const scores = {};

  for (const [intent, def] of Object.entries(INTENTS)) {
    let score = 0;
    for (const kw of def.keywords) {
      if (text.includes(kw)) score += def.weight;
    }
    if (score > 0) scores[intent] = score;
  }

  let bestIntent = "unknown";
  let bestScore = 0;
  for (const [intent, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  // Entity extraction
  let city = null;
  for (const [alias, canonical] of Object.entries(CITY_ALIASES)) {
    if (text.includes(alias)) {
      city = canonical;
      break;
    }
  }

  let category = null;
  for (const [alias, canonical] of Object.entries(CATEGORY_ALIASES)) {
    if (text.includes(alias)) {
      category = canonical;
      break;
    }
  }

  const amountMatch = text.match(/₹?\s?(\d{2,6})/);
  const amount = amountMatch ? parseInt(amountMatch[1], 10) : null;

  return { intent: bestIntent, confidence: bestScore, city, category, amount, text };
}
