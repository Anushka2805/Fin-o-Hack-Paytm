import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Heart, Check, Plane } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { exchangeRate } from "@/lib/mockData";

const ExitTrip = () => {
  const navigate = useNavigate();
  const [choice, setChoice] = useState<"refund" | "donate" | null>(null);
  const [done, setDone] = useState(false);
  const remaining = 2041;

  const handleConfirm = () => setDone(true);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col p-6 max-w-sm mx-auto">
        {!done && (
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
            <ArrowLeft size={16} /> Back
          </button>
        )}

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key="choose" className="flex-1 flex flex-col gap-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Plane size={24} className="text-accent-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground">End Your Trip</h2>
                <p className="text-sm text-muted-foreground">What would you like to do with your remaining balance?</p>
              </div>

              <div className="bg-card rounded-2xl shadow-card p-5 text-center">
                <p className="text-sm text-muted-foreground">Remaining Balance</p>
                <p className="text-3xl font-bold text-foreground">₹{remaining.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">≈ ${(remaining / exchangeRate).toFixed(2)} USD</p>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setChoice("refund")}
                  className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                    choice === "refund" ? "border-primary bg-accent" : "border-border bg-card"
                  }`}
                >
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                    <CreditCard size={18} className="text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Refund to Card</p>
                    <p className="text-xs text-muted-foreground">Get it back in 2-3 business days</p>
                  </div>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setChoice("donate")}
                  className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                    choice === "donate" ? "border-primary bg-accent" : "border-border bg-card"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(340,80%,55%), hsl(10,80%,55%))" }}>
                    <Heart size={18} className="text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Donate to Charity ❤️</p>
                    <p className="text-xs text-muted-foreground">Support education in rural India</p>
                  </div>
                </motion.button>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                disabled={!choice}
                className={`w-full py-3.5 rounded-xl font-semibold mt-auto transition-all ${
                  choice ? "gradient-primary text-primary-foreground shadow-glow" : "bg-muted text-muted-foreground"
                }`}
              >
                Confirm
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center gap-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 rounded-full gradient-success flex items-center justify-center shadow-elevated"
              >
                <Check size={36} className="text-success-foreground" />
              </motion.div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground mb-1">
                  {choice === "donate" ? "Thank you for your generosity! ❤️" : "Refund Initiated!"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {choice === "donate"
                    ? "₹" + remaining + " will support children's education"
                    : "$" + (remaining / exchangeRate).toFixed(2) + " will be refunded in 2-3 days"}
                </p>
              </div>
              <p className="text-lg font-bold text-foreground">Safe travels! ✈️🇮🇳</p>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/")}
                className="gradient-primary text-primary-foreground py-3 px-8 rounded-xl font-semibold shadow-glow"
              >
                Back to Paytm
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default ExitTrip;
