import { Router } from "express";
import { getDb, newId } from "../db.js";

const router = Router();

// GET /api/wallet - current balance + user info
router.get("/", async (req, res) => {
  const db = await getDb();
  res.json({
    balanceInr: db.data.wallet.balanceInr,
    exchangeRate: db.data.exchangeRate,
    feeRate: db.data.feeRate,
    user: db.data.user,
  });
});

// POST /api/wallet/add { usdAmount }
router.post("/add", async (req, res) => {
  const { usdAmount } = req.body;
  const amount = Number(usdAmount);
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "usdAmount must be a positive number" });
  }

  const db = await getDb();
  const { exchangeRate, feeRate } = db.data;
  const inr = amount * exchangeRate;
  const feeAmount = inr * feeRate;
  const total = inr + feeAmount;

  db.data.wallet.balanceInr += total;

  const tx = {
    id: newId("t"),
    merchantId: null,
    merchant: "Wallet Top-up",
    amountInr: Math.round(total * 100) / 100,
    amountUsd: amount,
    category: "Top-up",
    icon: "💰",
    type: "topup",
    status: "success",
    createdAt: Date.now(),
  };
  db.data.transactions.unshift(tx);

  await db.write();

  res.json({
    balanceInr: db.data.wallet.balanceInr,
    transaction: tx,
    breakdown: { inr, feeAmount, total },
  });
});

export default router;
