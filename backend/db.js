import { JSONFilePreset } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "data");
const dbFile = path.join(dataDir, "db.json");

// Ensure the data directory exists before lowdb tries to write into it
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const defaultData = {
  user: {
    id: "user_1",
    name: "John Anderson",
    country: "United States",
    countryFlag: "🇺🇸",
    currency: "USD",
    passportLast4: "4821",
    tripActive: true,
  },
  wallet: {
    balanceInr: 4171,
  },
  exchangeRate: 83.42,
  feeRate: 0.015,
  merchants: [
    { id: "m1", name: "Sharma's Street Food", category: "Street Food", trustScore: 4.8, avgPrice: 150, icon: "🍛", verified: true },
    { id: "m2", name: "Delhi Metro Taxi", category: "Taxi", trustScore: 4.5, avgPrice: 350, icon: "🚕", verified: true },
    { id: "m3", name: "Taj Palace Hotel", category: "Hotel", trustScore: 4.9, avgPrice: 8500, icon: "🏨", verified: true },
    { id: "m4", name: "Rajesh Handicrafts", category: "Shopping", trustScore: 4.2, avgPrice: 1200, icon: "🛍️", verified: true },
    { id: "m5", name: "Unknown QR Merchant", category: "Other", trustScore: 2.1, avgPrice: 200, icon: "❓", verified: false },
  ],
  transactions: [
    { id: "t1", merchantId: "m1", merchant: "Sharma's Street Food", amountInr: 250, amountUsd: 3.0, category: "Street Food", icon: "🍛", type: "payment", status: "success", createdAt: Date.now() - 1000 * 60 * 2 },
    { id: "t2", merchantId: "m2", merchant: "Delhi Metro Taxi", amountInr: 380, amountUsd: 4.55, category: "Taxi", icon: "🚕", type: "payment", status: "success", createdAt: Date.now() - 1000 * 60 * 60 },
    { id: "t3", merchantId: "m4", merchant: "Rajesh Handicrafts", amountInr: 1500, amountUsd: 17.98, category: "Shopping", icon: "🛍️", type: "payment", status: "success", createdAt: Date.now() - 1000 * 60 * 60 * 3 },
  ],
};

export async function getDb() {
  const db = await JSONFilePreset(dbFile, defaultData);
  return db;
}

export function newId(prefix = "id") {
  return `${prefix}_${nanoid(10)}`;
}