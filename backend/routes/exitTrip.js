import { Router } from "express";
import { getDb, newId } from "../db.js";

const router = Router();

// POST /api/exit-trip { choice: "refund" | "donate" }
router.post("/", async (req, res) => {
  const { choice } = req.body;
  if (!["refund", "donate"].includes(choice)) {
    return res.status(400).json({ error: "choice must be 'refund' or 'donate'" });
  }

  const db = await getDb();
  const remaining = db.data.wallet.balanceInr;

  const tx = {
    id: newId("t"),
    merchantId: null,
    merchant: choice === "donate" ? "Charity Donation" : "Refund to Card",
    amountInr: remaining,
    amountUsd: Math.round((remaining / db.data.exchangeRate) * 100) / 100,
    category: choice === "donate" ? "Donation" : "Refund",
    icon: choice === "donate" ? "❤️" : "💳",
    type: "exit",
    status: choice === "donate" ? "success" : "processing",
    createdAt: Date.now(),
  };
  db.data.transactions.unshift(tx);
  db.data.wallet.balanceInr = 0;
  db.data.user.tripActive = false;
  await db.write();

  res.json({
    remainingInr: remaining,
    remainingUsd: tx.amountUsd,
    choice,
    transaction: tx,
  });
});

export default router;
