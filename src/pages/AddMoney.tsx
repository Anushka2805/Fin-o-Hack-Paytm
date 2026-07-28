import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRightLeft, Info } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { useWallet } from "@/context/WalletContext";

const AddMoney = () => {
  const navigate = useNavigate();
  const { wallet, addMoney } = useWallet();
  const [amount, setAmount] = useState(50);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const presets = [20, 50, 100, 200];

  const exchangeRate = wallet?.exchangeRate ?? 83.42;
  const fee = wallet?.feeRate ?? 0.015;

  const inr = amount * exchangeRate;
  const feeAmount = inr * fee;
  const total = inr + feeAmount;

  const handleLoadMoney = async () => {
    if (amount <= 0 || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      await addMoney(amount);
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

        {errorMsg && <p className="text-xs text-destructive text-center mb-3">{errorMsg}</p>}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLoadMoney}
          disabled={submitting}
          className="w-full gradient-primary text-primary-foreground py-3.5 rounded-xl font-semibold shadow-glow mt-auto disabled:opacity-60"
        >
          {submitting ? "Loading…" : `Load ₹${total.toFixed(0)} to Wallet`}
        </motion.button>
      </div>
    </PageTransition>
  );
};

export default AddMoney;
