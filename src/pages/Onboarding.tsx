import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Check, User, ChevronRight } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { countryFlags } from "@/lib/mockData";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0=scan, 1=liveness, 2=success

  // Simulate scan completion
  useEffect(() => {
    if (step === 0) {
      const t = setTimeout(() => setStep(1), 3000);
      return () => clearTimeout(t);
    }
    if (step === 1) {
      const t = setTimeout(() => setStep(2), 2500);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col p-6 max-w-sm mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full gradient-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: step >= 2 ? "100%" : "50%" }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-medium">Step 1 of 2</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center gap-6">
              <h2 className="text-xl font-bold text-foreground">Scan your Passport</h2>
              <p className="text-sm text-muted-foreground text-center">Hold your passport inside the frame</p>
              
              {/* Camera frame */}
              <div className="w-64 h-40 rounded-2xl border-2 border-dashed border-primary/50 relative overflow-hidden bg-secondary/5">
                <motion.div
                  className="absolute left-0 w-full h-0.5 bg-primary/60"
                  animate={{ top: ["10%", "85%", "10%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera size={32} className="text-primary/40" />
                </div>
                {/* Corner markers */}
                {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos) => (
                  <div key={pos} className={`absolute ${pos} w-6 h-6 border-primary ${pos.includes("top") ? "border-t-2" : "border-b-2"} ${pos.includes("left") ? "border-l-2" : "border-r-2"} ${pos.includes("top") && pos.includes("left") ? "rounded-tl-lg" : ""} ${pos.includes("top") && pos.includes("right") ? "rounded-tr-lg" : ""} ${pos.includes("bottom") && pos.includes("left") ? "rounded-bl-lg" : ""} ${pos.includes("bottom") && pos.includes("right") ? "rounded-br-lg" : ""}`} />
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-primary" />
                Scanning...
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="liveness" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center gap-6">
              <h2 className="text-xl font-bold text-foreground">Liveness Check</h2>
              <p className="text-sm text-muted-foreground text-center">Look at the camera and hold still</p>
              
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-accent flex items-center justify-center">
                  <User size={48} className="text-accent-foreground" />
                </div>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 rounded-full bg-success" />
                Verifying...
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center gap-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 rounded-full gradient-success flex items-center justify-center shadow-lg"
              >
                <Check size={36} className="text-success-foreground" />
              </motion.div>

              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground mb-1">Verified! ✅</h2>
                <p className="text-sm text-muted-foreground">Welcome to India</p>
              </div>

              {/* Autofilled details */}
              <div className="w-full bg-card rounded-2xl shadow-card p-4 space-y-3">
                {[
                  { label: "Name", value: "John Anderson" },
                  { label: "Nationality", value: `United States ${countryFlags["United States"]}` },
                  { label: "DOB", value: "15 Mar 1990" },
                  { label: "Passport", value: "••••4821" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <span className="text-sm font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/wallet")}
                className="w-full gradient-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-glow"
              >
                Create Wallet <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Onboarding;
