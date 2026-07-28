import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, AlertTriangle, Shield } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { BottomNav } from "@/components/BottomNav";
import { useWallet } from "@/context/WalletContext";

const ScanPay = () => {
  const navigate = useNavigate();
  const { wallet, merchants, pay } = useWallet();
  const [scanned, setScanned] = useState(false);
  const [paying, setPaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const merchant = merchants[0];
  const payAmount = 500;
  const exchangeRate = wallet?.exchangeRate ?? 83.42;
  const isAnomaly = merchant ? payAmount > merchant.avgPrice * 2 : false;

  useEffect(() => {
    const t = setTimeout(() => setScanned(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const handlePay = async () => {
    if (!merchant || paying) return;
    setPaying(true);
    setErrorMsg(null);
    try {
      await pay(merchant.id, payAmount);
      navigate("/success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Payment failed, please try again.");
      setPaying(false);
    }
  };

  if (scanned && !merchant) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center p-6 text-center text-sm text-muted-foreground">
          Loading merchant details…
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col max-w-sm mx-auto pb-20">
        <div className="p-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!scanned ? (
            <motion.div key="scanner" exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
              <h2 className="text-xl font-bold text-foreground">Scan QR Code</h2>
              <p className="text-sm text-muted-foreground">Point camera at merchant's QR</p>

              <div className="w-56 h-56 rounded-2xl border-2 border-primary/30 relative overflow-hidden bg-secondary/5">
                <motion.div
                  className="absolute left-2 right-2 h-0.5 bg-primary rounded-full"
                  animate={{ top: ["8%", "88%", "8%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                {["top-0 left-0 rounded-tl-2xl border-t-2 border-l-2", "top-0 right-0 rounded-tr-2xl border-t-2 border-r-2", "bottom-0 left-0 rounded-bl-2xl border-b-2 border-l-2", "bottom-0 right-0 rounded-br-2xl border-b-2 border-r-2"].map((cls) => (
                  <div key={cls} className={`absolute ${cls} w-8 h-8 border-primary`} />
                ))}
              </div>

              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" /> Scanning...
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col gap-4 p-6">
              {/* Merchant info */}
              <div className="bg-card rounded-2xl shadow-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-2xl">🍛</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{merchant.name}</h3>
                    <p className="text-xs text-muted-foreground">{merchant.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Shield size={14} className="text-success" />
                    <span className="text-xs font-medium text-success">Verified</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-warning" fill="currentColor" />
                    <span className="text-xs font-medium text-foreground">{merchant.trustScore}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Avg: ₹{merchant.avgPrice}</span>
                </div>
              </div>

              {/* Amount */}
              <div className="bg-card rounded-2xl shadow-card p-5 text-center">
                <p className="text-sm text-muted-foreground mb-1">Payment Amount</p>
                <p className="text-3xl font-bold text-foreground">₹{payAmount}</p>
                <p className="text-sm text-muted-foreground">≈ ${(payAmount / exchangeRate).toFixed(2)} USD</p>
              </div>

              {/* Anomaly warning */}
              {isAnomaly && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-warning/10 border border-warning/30 rounded-2xl p-4 flex items-start gap-3"
                >
                  <AlertTriangle size={20} className="text-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Higher than usual</p>
                    <p className="text-xs text-muted-foreground">Average for {merchant.category} is ₹{merchant.avgPrice}. This seems higher.</p>
                  </div>
                </motion.div>
              )}

              {errorMsg && <p className="text-xs text-destructive text-center">{errorMsg}</p>}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePay}
                disabled={paying}
                className="gradient-primary text-primary-foreground py-3.5 rounded-xl font-semibold shadow-glow mt-auto disabled:opacity-60"
              >
                {paying ? "Processing…" : `Pay ₹${payAmount} Now`}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default ScanPay;
