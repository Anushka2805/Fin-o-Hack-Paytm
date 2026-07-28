import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, MessageCircle, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { useWallet } from "@/context/WalletContext";

const Success = () => {
  const navigate = useNavigate();
  const { wallet, transactions } = useWallet();
  const exchangeRate = wallet?.exchangeRate ?? 83.42;
  const lastTx = transactions.find((t) => t.type === "payment") ?? transactions[0];
  const amount = lastTx?.amountInr ?? 500;
  const merchantName = lastTx?.merchant ?? "Merchant";
  const withinRange = !lastTx?.flaggedAnomaly;

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-sm mx-auto gap-6">
        {/* Confetti-like particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: ["hsl(195,100%,47%)", "hsl(152,69%,45%)", "hsl(38,92%,50%)", "hsl(220,100%,22%)"][i % 4],
                left: `${10 + Math.random() * 80}%`,
                top: `${20 + Math.random() * 30}%`,
              }}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [0, -60 - Math.random() * 80] }}
              transition={{ duration: 1.5, delay: 0.2 + i * 0.08 }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="w-24 h-24 rounded-full gradient-success flex items-center justify-center shadow-elevated"
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: "spring" }}>
            <Check size={44} className="text-success-foreground" strokeWidth={3} />
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-1">Payment Successful!</h2>
          <p className="text-sm text-muted-foreground">Transaction completed securely</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full bg-card rounded-2xl shadow-card p-5 space-y-3"
        >
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Paid</span>
            <div className="text-right">
              <p className="text-lg font-bold text-foreground">₹{amount}</p>
              <p className="text-xs text-muted-foreground">≈ ${(amount / exchangeRate).toFixed(2)} USD</p>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Merchant</span>
            <span className="text-sm font-semibold text-foreground">{merchantName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Fair Price</span>
            <span className={`text-sm font-semibold ${withinRange ? "text-success" : "text-warning"}`}>
              {withinRange ? "✓ Within range" : "⚠ Above average"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Savings</span>
            <span className="text-sm font-semibold text-success">You saved ₹0 in fees vs cash exchange</span>
          </div>
        </motion.div>

        <div className="w-full flex gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/assistant")}
            className="flex-1 bg-card shadow-soft py-3 rounded-xl font-medium text-sm text-foreground flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} /> Ask AI
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/dashboard")}
            className="flex-1 gradient-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-glow"
          >
            Done <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </PageTransition>
  );
};

export default Success;
