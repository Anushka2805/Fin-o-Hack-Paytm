const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:4000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export interface WalletUser {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  currency: string;
  passportLast4: string;
  tripActive: boolean;
}

export interface WalletState {
  balanceInr: number;
  exchangeRate: number;
  feeRate: number;
  user: WalletUser;
}

export interface Transaction {
  id: string;
  merchantId: string | null;
  merchant: string;
  amountInr: number;
  amountUsd: number;
  category: string;
  icon: string;
  type: "topup" | "payment" | "exit";
  status: string;
  flaggedAnomaly?: boolean;
  createdAt: number;
  time?: string;
}

export interface Merchant {
  id: string;
  name: string;
  category: string;
  trustScore: number;
  avgPrice: number;
  icon: string;
  verified: boolean;
}

export const api = {
  getWallet: () => request<WalletState>("/api/wallet"),

  addMoney: (usdAmount: number) =>
    request<{ balanceInr: number; transaction: Transaction; breakdown: { inr: number; feeAmount: number; total: number } }>(
      "/api/wallet/add",
      { method: "POST", body: JSON.stringify({ usdAmount }) }
    ),

  getTransactions: () => request<Transaction[]>("/api/transactions"),

  getMerchants: () => request<Merchant[]>("/api/merchants"),

  pay: (merchantId: string, amountInr: number) =>
    request<{ transaction: Transaction; balanceInr: number; isAnomaly: boolean; merchant: Merchant }>("/api/pay", {
      method: "POST",
      body: JSON.stringify({ merchantId, amountInr }),
    }),

  exitTrip: (choice: "refund" | "donate") =>
    request<{ remainingInr: number; remainingUsd: number; choice: string; transaction: Transaction }>(
      "/api/exit-trip",
      { method: "POST", body: JSON.stringify({ choice }) }
    ),

  chat: (message: string, sessionId: string) =>
    request<{ reply: string; intent: string; confidence: number; entities: Record<string, unknown> }>(
      "/api/assistant/chat",
      { method: "POST", body: JSON.stringify({ message, sessionId }) }
    ),
};

export { API_URL };
