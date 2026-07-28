import { api } from "@/lib/api";

const SESSION_KEY = "paytm-tourist-session-id";

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `sess_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

// Talks to our own local, offline AI engine (backend/ai) — no external API,
// no API key, and therefore no rate limit or daily quota to hit.
export async function sendMessageToAssistant(message: string): Promise<string> {
  try {
    const sessionId = getSessionId();
    const { reply } = await api.chat(message, sessionId);
    return reply;
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    throw new Error(
      `Couldn't reach the assistant backend. Make sure it's running (cd backend && npm start). (${detail})`
    );
  }
}
