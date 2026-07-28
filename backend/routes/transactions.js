import { Router } from "express";
import { getDb } from "../db.js";

const router = Router();

function timeAgo(ts) {
  const diffMs = Date.now() - ts;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

// GET /api/transactions
router.get("/", async (req, res) => {
  const db = await getDb();
  const list = [...db.data.transactions]
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((tx) => ({ ...tx, time: timeAgo(tx.createdAt) }));
  res.json(list);
});

export default router;
