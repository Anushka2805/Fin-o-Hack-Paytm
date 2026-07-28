// Structured domain knowledge for the Tourist Travel Assistant.
// This is the "knowledge" half of the local AI engine: no external API calls,
// runs 100% offline, so there is no rate limit and no cost.

export const cityFares = {
  delhi: {
    label: "Delhi",
    auto: "₹25–35/km (metered), a typical 5km ride runs ₹100–150",
    taxi: "₹80–120 for the first 5km with Uber/Ola, then ₹12–18/km",
    landmark: "Auto-rickshaw from Connaught Place to India Gate (~4km) should be ₹80–120",
  },
  mumbai: {
    label: "Mumbai",
    auto: "₹23–28/km (metered), a typical 5km ride runs ₹110–160",
    taxi: "₹90–130 for the first 5km with Uber/Ola, then ₹14–20/km",
    landmark: "Auto/taxi from Gateway of India to Marine Drive (~3km) should be ₹60–90",
  },
  bangalore: {
    label: "Bangalore",
    auto: "₹30–40/km (many drivers won't use the meter — insist or use an app), 5km ≈ ₹130–180",
    taxi: "₹100–140 for the first 5km with Uber/Ola, then ₹15–20/km",
    landmark: "MG Road to Cubbon Park (~2km) auto should be ₹50–70",
  },
  jaipur: {
    label: "Jaipur",
    auto: "₹20–28/km, agree on a price before you get in since meters are rare, 5km ≈ ₹90–130",
    taxi: "₹70–100 for the first 5km with Uber/Ola",
    landmark: "City Palace to Hawa Mahal (~1km) auto/e-rickshaw should be ₹40–60",
  },
  goa: {
    label: "Goa",
    auto: "Fixed-rate taxis are common; 5km ≈ ₹150–220 since Goa taxis are pricier than other cities",
    taxi: "Pre-paid taxi stands set fixed rates — always ask the fixed rate list",
    landmark: "Short hops within Panaji or Calangute typically run ₹100–150",
  },
  chennai: {
    label: "Chennai",
    auto: "₹20–25/km (metered), 5km ≈ ₹90–130",
    taxi: "₹80–110 for the first 5km with Uber/Ola",
    landmark: "Marina Beach to Central Station (~4km) auto should be ₹80–110",
  },
  kolkata: {
    label: "Kolkata",
    auto: "₹18–24/km, yellow taxis also common at similar rates, 5km ≈ ₹85–120",
    taxi: "₹75–100 for the first 5km with Uber/Ola",
    landmark: "Park Street to Victoria Memorial (~3km) auto should be ₹60–90",
  },
};

export const generalFareGuidance = {
  streetFood: "Street food meals typically cost ₹50–200 depending on the dish and city.",
  restaurant: "A mid-range restaurant meal runs ₹300–800 per person.",
  hotel: "Budget hotels: ₹800–2000/night. Mid-range: ₹2500–6000/night. Luxury: ₹8000+/night.",
  shopping: "Bargaining is normal in markets — start at 40–50% of the quoted price and negotiate up. Fixed-price shops (with price tags) usually aren't negotiable.",
};

export const tippingNorms = {
  restaurant: "5–10% is standard at restaurants, unless a service charge is already included in the bill (check first).",
  streetFood: "Tipping isn't expected at street food stalls — rounding up to the nearest ₹10–20 is a nice gesture.",
  hotel: "₹50–100 per bag for bellhops, ₹100–200/day for housekeeping on longer stays is generous.",
  driver: "Rounding up the fare by ₹10–20 is common and appreciated for autos/taxis; not mandatory.",
  guide: "For a half/full-day tour guide, ₹200–500 is a typical tip depending on service quality.",
};

export const scamPatterns = [
  {
    keywords: ["different app", "another app", "pay on my phone", "scan my code", "send to my number"],
    warning: "Be cautious if a merchant asks you to pay through a personal number or a different app than their displayed QR code — always verify the QR belongs to the actual business (check the name shown after scanning matches the shop).",
  },
  {
    keywords: ["closed shop", "shop closed", "temporarily unavailable", "meter broken", "meter not working"],
    warning: "\"Meter is broken\" or \"shop is closed, pay me directly\" are classic setups for overcharging. Politely insist on the meter or a fixed price agreed before the ride/purchase.",
  },
  {
    keywords: ["free gift", "lucky draw", "you've won", "special discount only today"],
    warning: "Unsolicited \"you've won a prize\" or \"today only\" offers are common tourist-targeting scams — walk away if it feels high-pressure.",
  },
  {
    keywords: ["double amount", "charged twice", "charged extra"],
    warning: "If you're charged more than the displayed/agreed amount, ask for an itemized receipt immediately and refuse to pay extra until it's explained.",
  },
];

export const disputeSteps = [
  "Take a screenshot of the failed transaction and note the exact time.",
  "Check your transaction history in the app — most UPI failures auto-reverse within 3–5 business days.",
  "If it hasn't reversed after 5 business days, raise a dispute from the transaction details screen (\"Report an issue\").",
  "Keep the merchant's name and QR code details handy in case support asks for them.",
  "For urgent cases, India's UPI has a formal grievance redressal via the NPCI portal, but in-app dispute resolution is usually faster.",
];

export const trustSignals = {
  good: [
    "A verified badge / green checkmark next to the merchant name after scanning",
    "The name shown after scanning matches the shop signage",
    "Consistent pricing with what's posted/displayed",
    "Willingness to give a printed or digital receipt",
  ],
  bad: [
    "Merchant name shown doesn't match the shop",
    "Being rushed to pay before seeing an itemized price",
    "No trust score / brand-new looking QR code taped over another one",
    "Refusal to show a price list or use a meter",
  ],
};

export const etiquette = [
  "A slight head nod/tilt often means agreement in India — don't mistake it for a 'no'.",
  "It's polite to use your right hand (or both hands) when handing over cash or receiving change.",
  "Removing shoes before entering temples and many homes is expected.",
  "Haggling is expected in markets, but not in malls, chain stores, or restaurants.",
];
