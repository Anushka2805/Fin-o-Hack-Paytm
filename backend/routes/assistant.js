import { Router } from "express";
import { getDb } from "../db.js";
import { generateReply, resetSession } from "../ai/engine.js";

const router = Router();

// POST /api/assistant/chat { message, sessionId }
router.post("/chat", async (req, res) => {
  const { message, sessionId } = req.body;
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message is required" });
  }

  const db = await getDb();
  const result = generateReply(message.trim(), sessionId, db.data.exchangeRate);

  res.json(result);
});

// POST /api/assistant/reset { sessionId }
router.post("/reset", (req, res) => {
  resetSession(req.body?.sessionId);
  res.json({ ok: true });
});

export default router;
