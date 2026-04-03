import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Bot, User, AlertCircle } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { BottomNav } from "@/components/BottomNav";
import { aiSuggestions } from "@/lib/mockData";
import { sendMessageToGemini } from "@/lib/gemini";

interface Message {
  role: "user" | "assistant";
  text: string;
  error?: boolean;
}

const Assistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! 👋 I'm your AI travel buddy for India. Ask me anything about prices, tipping, merchant safety, or what to do if a transaction fails!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (text: string) => {
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    try {
      const response = await sendMessageToGemini(text);
      setMessages((m) => [...m, { role: "assistant", text: response }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setMessages((m) => [...m, { role: "assistant", text: message, error: true }]);
    } finally {
      setTyping(false);
    }
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
            <p className="text-sm font-bold text-foreground">AI Travel Assistant</p>
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
                    : msg.error
                    ? "bg-destructive/10 border border-destructive/30 text-destructive rounded-bl-md flex items-start gap-2"
                    : "bg-card shadow-soft text-foreground rounded-bl-md"
                }`}
              >
                {msg.error && <AlertCircle size={14} className="shrink-0 mt-0.5" />}
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
