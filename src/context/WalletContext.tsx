import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { api, WalletState, Transaction, Merchant } from "@/lib/api";

interface WalletContextValue {
  wallet: WalletState | null;
  transactions: Transaction[];
  merchants: Merchant[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addMoney: (usdAmount: number) => Promise<Awaited<ReturnType<typeof api.addMoney>>>;
  pay: (merchantId: string, amountInr: number) => Promise<Awaited<ReturnType<typeof api.pay>>>;
  exitTrip: (choice: "refund" | "donate") => Promise<Awaited<ReturnType<typeof api.exitTrip>>>;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const [w, tx, m] = await Promise.all([api.getWallet(), api.getTransactions(), api.getMerchants()]);
      setWallet(w);
      setTransactions(tx);
      setMerchants(m);
    } catch (err) {
      setError(
        err instanceof Error
          ? `${err.message} — is the backend running on http://localhost:4000? (cd backend && npm install && npm start)`
          : "Failed to reach backend"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addMoney = useCallback(
    async (usdAmount: number) => {
      const result = await api.addMoney(usdAmount);
      await refresh();
      return result;
    },
    [refresh]
  );

  const pay = useCallback(
    async (merchantId: string, amountInr: number) => {
      const result = await api.pay(merchantId, amountInr);
      await refresh();
      return result;
    },
    [refresh]
  );

  const exitTrip = useCallback(
    async (choice: "refund" | "donate") => {
      const result = await api.exitTrip(choice);
      await refresh();
      return result;
    },
    [refresh]
  );

  return (
    <WalletContext.Provider value={{ wallet, transactions, merchants, loading, error, refresh, addMoney, pay, exitTrip }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider");
  return ctx;
}
