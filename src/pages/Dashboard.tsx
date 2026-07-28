import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, QrCode, Plane, Sparkles } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { BottomNav } from "@/components/BottomNav";
import { useWallet } from "@/context/WalletContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { wallet, transactions, loading, error } = useWallet();
  const balance = wallet?.balanceInr ?? 0;
  const exchangeRate = wallet?.exchangeRate ?? 83.42;
  const name = wallet?.user.name.split(" ")[0] ?? "Traveler";
  const flag = wallet?.user.countryFlag ?? "";

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading your wallet…</div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center p-6 text-center text-sm text-destructive">{error}</div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col max-w-sm mx-auto pb-24">
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Welcome back</p>
              <h1 className="text-xl font-bold text-foreground">{name} {flag}</h1>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/exit")}
              className="text-xs px-3 py-1.5 bg-destructive/10 text-destructive rounded-full font-medium flex items-center gap-1"
            >
              <Plane size={12} /> End Trip
            </motion.button>
          </div>
        </div>

        {/* Balance card */}
        <div className="px-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="gradient-primary rounded-2xl p-5 shadow-elevated relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary-foreground/10 -translate-y-1/2 translate-x-1/4" />
            <p className="text-primary-foreground/70 text-xs relative">Tourist Wallet</p>
            <p className="text-3xl font-bold text-primary-foreground relative mt-1">₹{balance.toLocaleString()}</p>
            <p className="text-sm text-primary-foreground/60 relative">≈ ${(balance / exchangeRate).toFixed(2)} USD</p>
            <div className="flex gap-2 mt-4 relative">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate("/add-money")} className="flex items-center gap-1 bg-primary-foreground/20 text-primary-foreground text-xs px-3 py-2 rounded-xl font-medium">
                <Plus size={14} /> Add Money
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate("/scan")} className="flex items-center gap-1 bg-primary-foreground/20 text-primary-foreground text-xs px-3 py-2 rounded-xl font-medium">
                <QrCode size={14} /> Scan & Pay
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* AI suggestion */}
        <div className="px-6 mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-accent rounded-2xl p-4 flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/assistant")}
          >
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shrink-0">
              <Sparkles size={18} className="text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">AI Tip</p>
              <p className="text-xs text-muted-foreground">Bargain for auto-rickshaws – fair price from here to Connaught Place is ₹80-120</p>
            </div>
          </motion.div>
        </div>

        {/* Transactions */}
        <div className="px-6">
          <h3 className="text-sm font-bold text-foreground mb-3">Recent Transactions</h3>
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-card rounded-xl shadow-soft p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-lg">{tx.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{tx.merchant}</p>
                  <p className="text-[10px] text-muted-foreground">{tx.category} · {tx.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">
                    {tx.type === "topup" ? "+" : "-"}₹{tx.amountInr.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-muted-foreground">${tx.amountUsd}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </PageTransition>
  );
};

export default Dashboard;
