import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { BottomNav } from "@/components/BottomNav";
import { aiSuggestions } from "@/lib/mockData";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const aiResponses: Record<string, string> = {
  "Is ₹500 fair for this ride?": "For a 5km auto-rickshaw ride in Delhi, ₹500 is quite high. Fair price would be ₹100-150. I'd suggest negotiating or using the meter. 🚕",
  "How much should I tip?": "In India, tipping is appreciated but not mandatory. For restaurants, 10% is generous. For street food vendors, rounding up is common. For hotel staff, ₹50-100 per service is nice. 😊",
  "Is this merchant safe?": "Sharma's Street Food has a 4.8/5 trust score with 2,300+ transactions. They've been verified by Paytm and have no disputes. You're safe! ✅",
  "Best street food nearby?": "Near your location, I'd recommend: 1) Paranthe Wali Gali (₹80-120), 2) Karim's Kebabs (₹150-300), 3) Natraj Dahi Bhalle (₹60). All are Paytm verified! 🍛",
};

const Assistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! 👋 I'm your AI travel buddy for India. Ask me anything about prices, safety, or local tips!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const response = aiResponses[text] || "That's a great question! Based on local data, I'd recommend checking with verified merchants on Paytm for the best rates. Stay safe and enjoy India! 🇮🇳";
      setMessages((m) => [...m, { role: "assistant", text: response }]);
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col max-w-sm mx-auto pb-20">
        {/* Header */}
        <div className="p-4 glass border-b border-border sticky top-0 z-10 flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={20} className="text-muted-foreground" />
          </button>
          <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
            <Bot size={16} className="text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">AI Travel Buddy</p>
            <p className="text-[10px] text-success font-medium">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 gradient-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                  <Bot size={14} className="text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "gradient-primary text-primary-foreground rounded-br-md"
                    : "bg-card shadow-soft text-foreground rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 bg-muted rounded-full flex items-center justify-center shrink-0 mt-1">
                  <User size={14} className="text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}

          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
              <div className="w-7 h-7 gradient-primary rounded-full flex items-center justify-center shrink-0">
                <Bot size={14} className="text-primary-foreground" />
              </div>
              <div className="bg-card shadow-soft px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-muted-foreground/40"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
            {aiSuggestions.map((s) => (
              <motion.button
                key={s}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage(s)}
                className="whitespace-nowrap text-xs px-3 py-2 bg-card shadow-soft rounded-xl text-foreground font-medium shrink-0"
              >
                {s}
              </motion.button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 glass border-t border-border">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input.trim() && sendMessage(input.trim())}
              placeholder="Ask anything..."
              className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => input.trim() && sendMessage(input.trim())}
              className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-glow"
            >
              <Send size={16} className="text-primary-foreground" />
            </motion.button>
          </div>
        </div>

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Assistant;
