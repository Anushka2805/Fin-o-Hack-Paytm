import { Home, QrCode, MessageCircle, Receipt } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: QrCode, label: "Scan", path: "/scan" },
  { icon: MessageCircle, label: "AI Help", path: "/assistant" },
  { icon: Receipt, label: "History", path: "/dashboard" },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 glass border-t border-border z-50">
      <div className="max-w-lg mx-auto flex justify-around py-2 px-4">
        {tabs.map((tab) => {
          const active = pathname === tab.path;
          return (
            <motion.button
              key={tab.label}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon size={22} />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {active && (
                <motion.div layoutId="tab-indicator" className="w-1 h-1 rounded-full bg-primary" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
