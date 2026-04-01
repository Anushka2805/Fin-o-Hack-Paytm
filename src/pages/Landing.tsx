import { motion } from "framer-motion";
import { Globe, Sparkles, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { useState } from "react";

const languages = ["English", "日本語", "Deutsch", "Français", "Español"];

const Landing = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState("English");

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">
          {/* Logo area */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Paytm</span>
          </motion.div>

          {/* Language selector */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-2 flex-wrap justify-center"
          >
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                  lang === l
                    ? "gradient-primary text-primary-foreground shadow-glow"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {l}
              </button>
            ))}
          </motion.div>

          {/* Main card */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="w-full bg-card rounded-2xl shadow-elevated p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ boxShadow: ["0 0 0 0 hsl(195 100% 47% / 0.4)", "0 0 0 12px hsl(195 100% 47% / 0)", "0 0 0 0 hsl(195 100% 47% / 0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center"
                >
                  <Globe className="text-primary-foreground" size={24} />
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Tourist Mode</h1>
                  <p className="text-sm text-muted-foreground">Pay anywhere in India</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { icon: Zap, text: "Instant UPI payments" },
                  { icon: Shield, text: "AI-powered fraud protection" },
                  { icon: Sparkles, text: "Real-time currency conversion" },
                ].map(({ icon: Icon, text }, i) => (
                  <motion.div
                    key={text}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                      <Icon size={16} className="text-accent-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/onboarding")}
                className="w-full gradient-primary text-primary-foreground py-3.5 rounded-xl font-semibold text-base shadow-glow transition-all"
              >
                Start in 2 minutes ✨
              </motion.button>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xs text-muted-foreground text-center"
          >
            Regulated by RBI · Your money is always safe
          </motion.p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Landing;
