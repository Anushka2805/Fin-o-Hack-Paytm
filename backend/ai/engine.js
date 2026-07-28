import { classify } from "./intent.js";
import { buildReply } from "./respond.js";

// In-memory per-session context (city/category last mentioned).
// This is a tiny local "model state" — no external service involved.
const sessions = new Map();

function getSession(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, { lastCity: null, lastCategory: null, turns: 0 });
  }
  return sessions.get(sessionId);
}

export function generateReply(message, sessionId, exchangeRate) {
  const session = getSession(sessionId || "default");
  session.turns += 1;

  const parsed = classify(message);
  const reply = buildReply(parsed, session, exchangeRate);

  return {
    reply,
    intent: parsed.intent,
    confidence: parsed.confidence,
    entities: { city: parsed.city, category: parsed.category, amount: parsed.amount },
  };
}

export function resetSession(sessionId) {
  sessions.delete(sessionId || "default");
}
