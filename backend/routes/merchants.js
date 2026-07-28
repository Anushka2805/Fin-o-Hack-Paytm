import { Router } from "express";
import { getDb, newId } from "../db.js";

const router = Router();

// GET /api/merchants
router.get("/merchants", async (req, res) => {
  const db = await getDb();
  res.json(db.data.merchants);
});

// POST /api/pay { merchantId, amountInr }
router.post("/pay", async (req, res) => {
  const { merchantId, amountInr } = req.body;
  const amount = Number(amountInr);
  if (!merchantId || !amount || amount <= 0) {
    return res.status(400).json({ error: "merchantId and a positive amountInr are required" });
  }

  const db = await getDb();
  const merchant = db.data.merchants.find((m) => m.id === merchantId);
  if (!merchant) return res.status(404).json({ error: "Merchant not found" });

  if (db.data.wallet.balanceInr < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  const isAnomaly = amount > merchant.avgPrice * 2;

  db.data.wallet.balanceInr -= amount;

  const tx = {
    id: newId("t"),
    merchantId: merchant.id,
    merchant: merchant.name,
    amountInr: amount,
    amountUsd: Math.round((amount / db.data.exchangeRate) * 100) / 100,
    category: merchant.category,
    icon: merchant.icon,
    type: "payment",
    status: "success",
    flaggedAnomaly: isAnomaly,
    createdAt: Date.now(),
  };
  db.data.transactions.unshift(tx);
  await db.write();

  res.json({
    transaction: tx,
    balanceInr: db.data.wallet.balanceInr,
    isAnomaly,
    merchant,
  });
});

export default router;
