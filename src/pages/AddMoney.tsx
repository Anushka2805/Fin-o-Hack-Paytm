import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRightLeft, Info } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { exchangeRate, fee } from "@/lib/mockData";

const AddMoney = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(50);
  const presets = [20, 50, 100, 200];

  const inr = amount * exchangeRate;
  const feeAmount = inr * fee;
  const total = inr + feeAmount;

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col p-6 max-w-sm mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <ArrowLeft size={16} /> Back
        </button>

        <h2 className="text-xl font-bold text-foreground mb-1">Add Money</h2>
        <p className="text-sm text-muted-foreground mb-6">Load your tourist wallet</p>

        {/* Amount input */}
        <div className="bg-card rounded-2xl shadow-card p-5 mb-4">
          <label className="text-xs text-muted-foreground mb-2 block">You pay (USD)</label>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-foreground">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="text-3xl font-bold text-foreground bg-transparent outline-none w-full"
            />
          </div>
          <div className="flex gap-2">
            {presets.map((p) => (
              <motion.button
                key={p}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAmount(p)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                  amount === p ? "gradient-primary text-primary-foreground shadow-glow" : "bg-muted text-muted-foreground"
                }`}
              >
                ${p}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Conversion */}
        <div className="bg-card rounded-2xl shadow-card p-5 mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1"><ArrowRightLeft size={14} /> Exchange Rate</span>
            <span className="text-sm font-semibold text-foreground">1 USD = ₹{exchangeRate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Converted Amount</span>
            <span className="text-sm font-semibold text-foreground">₹{inr.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Info size={12} /> Service Fee (1.5%)
            </span>
            <span className="text-sm text-warning font-semibold">₹{feeAmount.toFixed(2)}</span>
          </div>
          <div className="border-t border-border pt-3 flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">You'll receive</span>
            <motion.span
              key={total}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-bold text-primary"
            >
              ₹{total.toFixed(2)}
            </motion.span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 justify-center">
          <span className="w-2 h-2 rounded-full bg-success" />
          Live rate · Updates every 30 seconds
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/dashboard")}
          className="w-full gradient-primary text-primary-foreground py-3.5 rounded-xl font-semibold shadow-glow mt-auto"
        >
          Load ₹{total.toFixed(0)} to Wallet
        </motion.button>
      </div>
    </PageTransition>
  );
};

export default AddMoney;
