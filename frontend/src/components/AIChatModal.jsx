import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Bot,
  Send,
  Sparkles,
  Loader2,
  X,
  Minus,
  BarChart3,
  Wallet,
  TrendingUp,
  PiggyBank,
} from "lucide-react";

import { API_URL } from "../config";
import ChatMessage from "./ChatMessage";

function AIChatModal({ onClose }) {
  const token = localStorage.getItem("token");

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `👋 Welcome to **FinanceOS AI**

I'm your personal finance copilot.

I can help you with:

• Spending analysis
• Savings recommendations
• Budget planning
• Income vs Expense reports
• Monthly financial summaries

Ask me anything about your finances!`,
    },
  ]);

  const quickActions = [
    {
      icon: <BarChart3 size={15} />,
      text: "Analyze Spending",
    },
    {
      icon: <Wallet size={15} />,
      text: "Budget Advice",
    },
    {
      icon: <TrendingUp size={15} />,
      text: "Monthly Report",
    },
    {
      icon: <PiggyBank size={15} />,
      text: "Saving Tips",
    },
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const typeMessage = async (fullText) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "",
      },
    ]);

    for (let i = 0; i < fullText.length; i += 3) {
      await new Promise((r) => setTimeout(r, 12));

      setMessages((prev) => {
        const copy = [...prev];

        copy[copy.length - 1] = {
          sender: "ai",
          text: fullText.slice(0, i + 3),
        };

        return copy;
      });
    }
  };

  const askAI = async (text) => {
    if (!text.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const history = [
        ...messages,
        {
          sender: "user",
          text,
        },
      ]
        .slice(-6)
        .map((m) => ({
          sender: m.sender,
          text: m.text,
        }));

      const { data } = await axios.post(
        `${API_URL}/ai/chat`,
        {
          question: text,
          history,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await typeMessage(data.answer);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "❌ Something went wrong while analyzing your finances.",
        },
      ]);
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-8 right-8 z-50 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 p-4 shadow-2xl hover:scale-105 transition"
      >
        <Bot size={24} />
      </button>
    );
  }

  return (
   <div className="fixed top-6 bottom-6 right-6 z-50 w-[470px] max-w-[95vw] rounded-3xl overflow-hidden border border-slate-700/70 bg-slate-900/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] flex flex-col">
      {/* Header */}

      <div className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-6 py-5 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-lg">
            <Bot size={24} />
          </div>

          <div>

            <h2 className="font-bold text-lg">
              FinanceOS AI
            </h2>

            <div className="flex items-center gap-2 text-sm opacity-90">

              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

              Online • Personal Finance Copilot

            </div>

          </div>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => setMinimized(true)}
            className="hover:bg-white/15 rounded-lg p-2 transition"
          >
            <Minus size={18} />
          </button>

          <button
            onClick={onClose}
            className="hover:bg-red-500 rounded-lg p-2 transition"
          >
            <X size={18} />
          </button>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="px-5 py-4 border-b border-slate-800">

        <h3 className="text-sm font-semibold text-slate-300 mb-3">
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 gap-2">

          {quickActions.map((item) => (
            <button
              key={item.text}
              disabled={loading}
              onClick={() => askAI(item.text)}
              className="rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 transition p-3 flex items-center gap-2 text-sm"
            >
              {item.icon}
              {item.text}
            </button>
          ))}

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-2">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg}
          />
        ))}

        {loading && (
          <div className="flex items-center gap-3 bg-slate-800 rounded-2xl px-5 py-4 w-fit">

            <Loader2
              size={18}
              className="animate-spin"
            />

            <div>

              <p className="font-semibold">
                FinanceOS AI
              </p>

              <div className="flex gap-1 mt-2">

                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce delay-200"></span>

              </div>

            </div>

          </div>
        )}

        <div ref={bottomRef} />
      </div>
            {/* Input Section */}

      <div className="border-t border-slate-800 bg-slate-900/70 backdrop-blur-xl p-5">

        <div className="flex gap-3">

          <div className="flex-1">

            <input
              ref={inputRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !loading &&
                  question.trim()
                ) {
                  askAI(question);
                }
              }}
              placeholder="Ask FinanceOS AI anything..."
              className="w-full rounded-2xl bg-slate-800 border border-slate-700 px-5 py-4 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 placeholder:text-slate-500"
            />

          </div>

          <button
            disabled={!question.trim() || loading}
            onClick={() => askAI(question)}
            className={`rounded-2xl px-5 flex items-center justify-center transition-all duration-300 shadow-lg
            ${
              loading || !question.trim()
                ? "bg-slate-700 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 hover:shadow-blue-500/40"
            }`}
          >
            {loading ? (
              <Loader2
                size={20}
                className="animate-spin"
              />
            ) : (
              <Send size={20} />
            )}
          </button>

        </div>

        {/* Footer */}

        <div className="flex items-center justify-between mt-4 text-xs text-slate-500">

          <div className="flex items-center gap-2">

            <Sparkles
              size={14}
              className="text-cyan-400"
            />

            <span>
              Powered by Gemini 2.5 Flash
            </span>

          </div>

          <span>
            FinanceOS AI v2
          </span>

        </div>

      </div>

    </div>
  );
}

export default AIChatModal;