import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, CreditCard, Shield } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

const Wallet = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col p-6 max-w-sm mx-auto items-center justify-center gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-1">Forex Wallet Created! 🎉</h2>
          <p className="text-sm text-muted-foreground">Your India travel wallet is ready</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-full aspect-[1.6/1] gradient-primary rounded-2xl p-6 flex flex-col justify-between shadow-elevated relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary-foreground/10 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-primary-foreground/5 translate-y-1/2 -translate-x-1/4" />
          
          <div className="relative flex justify-between items-start">
            <div>
              <p className="text-primary-foreground/70 text-xs">Tourist Wallet</p>
              <p className="text-primary-foreground font-bold text-lg mt-1">John Anderson 🇺🇸</p>
            </div>
            <CreditCard className="text-primary-foreground/50" size={24} />
          </div>
          <div className="relative">
            <p className="text-primary-foreground/70 text-xs">Balance</p>
            <p className="text-primary-foreground font-bold text-3xl">₹0.00</p>
            <p className="text-primary-foreground/60 text-sm">≈ $0.00 USD</p>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield size={14} /> RBI regulated · Insured up to ₹5,00,000
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/add-money")}
          className="w-full gradient-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-glow"
        >
          <Plus size={18} /> Add Money
        </motion.button>

        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-muted-foreground underline"
        >
          Skip for now
        </button>
      </div>
    </PageTransition>
  );
};

export default Wallet;
