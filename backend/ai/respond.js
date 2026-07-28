import {
  cityFares,
  generalFareGuidance,
  tippingNorms,
  scamPatterns,
  disputeSteps,
  trustSignals,
  etiquette,
} from "./knowledgeBase.js";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function toUsd(inr, rate) {
  return (inr / rate).toFixed(2);
}

const GREETINGS = [
  "Hey! 👋 How can I help with your trip today?",
  "Hi there! Ask me about fares, tipping, scams, or a failed payment.",
  "Hello! 🙏 What's on your mind — prices, safety, or a transaction issue?",
];

const THANKS = [
  "You're welcome! Safe travels 🇮🇳",
  "Anytime! Let me know if anything else comes up.",
  "Happy to help! 🙌",
];

export function buildReply({ intent, city, category, amount, text }, ctx, rate) {
  // remember city across turns
  const effectiveCity = city || ctx.lastCity || null;
  if (city) ctx.lastCity = city;
  if (category) ctx.lastCategory = category;

  switch (intent) {
    case "greeting":
      return pick(GREETINGS);

    case "thanks":
      return pick(THANKS);

    case "fare_query": {
      const cat = category || ctx.lastCategory;
      if (effectiveCity && cityFares[effectiveCity]) {
        const f = cityFares[effectiveCity];
        let line;
        if (cat === "auto") line = f.auto;
        else if (cat === "taxi") line = f.taxi;
        else line = `${f.auto}\nTaxi/Uber/Ola: ${f.taxi}`;
        let reply = `In ${f.label}: ${line}`;
        if (amount) {
          const fair = f.landmark;
          reply += `\n\n${fair}. If your quote of ₹${amount} is a lot higher than that, it's worth negotiating or asking for the meter.`;
        }
        return reply;
      }
      if (cat === "streetFood") return generalFareGuidance.streetFood;
      if (cat === "restaurant") return generalFareGuidance.restaurant;
      if (cat === "hotel") return generalFareGuidance.hotel;
      if (cat === "shopping") return generalFareGuidance.shopping;
      return "Which city are you in right now? Fares vary a fair bit between Delhi, Mumbai, Bangalore, Jaipur, Goa, Chennai and Kolkata — tell me the city (and auto/taxi/food/hotel) and I'll give you the going rate.";
    }

    case "tipping": {
      const cat = category || ctx.lastCategory;
      if (cat === "restaurant") return tippingNorms.restaurant;
      if (cat === "streetFood") return tippingNorms.streetFood;
      if (cat === "hotel") return tippingNorms.hotel;
      if (cat === "driver" || cat === "taxi" || cat === "auto") return tippingNorms.driver;
      if (cat === "guide") return tippingNorms.guide;
      return `Quick tipping guide:\n• Restaurants: ${tippingNorms.restaurant}\n• Street food: ${tippingNorms.streetFood}\n• Drivers: ${tippingNorms.driver}\n• Hotel staff: ${tippingNorms.hotel}`;
    }

    case "scam_warning": {
      const matched = scamPatterns.find((p) => p.keywords.some((k) => text.includes(k)));
      if (matched) return `⚠️ ${matched.warning}`;
      return `⚠️ A few common tourist-targeting scams in India:\n${scamPatterns.map((p) => "• " + p.warning).join("\n")}\n\nTrust signals to look for: ${trustSignals.good.slice(0, 2).join(", ")}.`;
    }

    case "merchant_trust":
      return `Good signs: ${trustSignals.good.join(", ")}.\n\nRed flags: ${trustSignals.bad.join(", ")}.`;

    case "transaction_dispute":
      return `I'm sorry that happened — here's what to do:\n${disputeSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}`;

    case "etiquette":
      return `A few tips on local etiquette:\n${etiquette.map((e) => "• " + e).join("\n")}`;

    case "shopping":
      return generalFareGuidance.shopping;

    case "general_help":
      return "I'm your local AI travel buddy — ask me things like:\n• \"Is ₹500 fair for an auto in Delhi?\"\n• \"How much should I tip at a restaurant?\"\n• \"A merchant wants me to pay on a different app — is that safe?\"\n• \"My transaction failed, what do I do?\"";

    default:
      return "I can help with fair prices, tipping, spotting scams, merchant trust signals, local etiquette, or a failed transaction. Could you tell me a bit more — e.g. which city, and what's the situation?";
  }
}
