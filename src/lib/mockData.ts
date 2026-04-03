export const exchangeRate = 83.42;
export const fee = 0.015; // 1.5%

export const merchants = [
  { id: "1", name: "Sharma's Street Food", category: "Street Food", trustScore: 4.8, avgPrice: 150 },
  { id: "2", name: "Delhi Metro Taxi", category: "Taxi", trustScore: 4.5, avgPrice: 350 },
  { id: "3", name: "Taj Palace Hotel", category: "Hotel", trustScore: 4.9, avgPrice: 8500 },
  { id: "4", name: "Rajesh Handicrafts", category: "Shopping", trustScore: 4.2, avgPrice: 1200 },
];

export const transactions = [
  { id: "t1", merchant: "Sharma's Street Food", amount: 250, usd: 3.0, category: "Street Food", time: "2 min ago", icon: "🍛" },
  { id: "t2", merchant: "Delhi Metro Taxi", amount: 380, usd: 4.55, category: "Taxi", time: "1 hr ago", icon: "🚕" },
  { id: "t3", merchant: "Rajesh Handicrafts", amount: 1500, usd: 17.98, category: "Shopping", time: "3 hrs ago", icon: "🛍️" },
];

export const aiSuggestions = [
  "Is ₹500 fair for an auto from Connaught Place to India Gate?",
  "How much should I tip at a restaurant?",
  "A merchant wants me to pay on a different app — is that safe?",
  "My transaction failed but money was deducted — what do I do?",
];

export const countryFlags: Record<string, string> = {
  "United States": "🇺🇸",
  "United Kingdom": "🇬🇧",
  "Germany": "🇩🇪",
  "France": "🇫🇷",
  "Japan": "🇯🇵",
  "Australia": "🇦🇺",
  "Canada": "🇨🇦",
};

export const currencies: Record<string, { code: string; symbol: string }> = {
  "United States": { code: "USD", symbol: "$" },
  "United Kingdom": { code: "GBP", symbol: "£" },
  "Germany": { code: "EUR", symbol: "€" },
  "France": { code: "EUR", symbol: "€" },
  "Japan": { code: "JPY", symbol: "¥" },
  "Australia": { code: "AUD", symbol: "A$" },
  "Canada": { code: "CAD", symbol: "C$" },
};
