import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Send,
  Bot,
  Loader2,
  Sparkles,
} from "lucide-react";
import { API_URL } from "../config";
import ChatMessage from "./ChatMessage";

function AIChatModal({onClose}) {
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `👋 Welcome to FinanceOS AI!

I'm your personal finance assistant.

I can help you:

• Analyze your expenses
• Explain spending trends
• Compare income vs expenses
• Suggest savings opportunities
• Summarize your finances
• Answer questions about your transactions

Try asking:

"Where did I spend the most this month?"`,
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const suggestionSets = [
    [
      "Analyze my expenses",
      "How much did I spend on food?",
      "Where can I save money?",
      "Give budgeting advice",
    ],
    [
      "Summarize my finances",
      "What is my biggest expense?",
      "Compare income and expenses",
      "How healthy are my finances?",
    ],
  ];

  const suggestions =
    suggestionSets[
      Math.floor(Math.random() * suggestionSets.length)
    ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
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

    for (let i = 0; i < fullText.length; i += 4) {
      await new Promise((resolve) =>
        setTimeout(resolve, 15)
      );

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          sender: "ai",
          text: fullText.slice(0, i + 4),
        };

        return updated;
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
      const history = messages
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
            "❌ Sorry, I couldn't analyze your finances. Please try again.",
        },
      ]);
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed bottom-28 right-8 w-[400px] h-[650px] bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl z-50 flex flex-col overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-5 flex items-center gap-3">

        <Bot size={28} />

        <div>
          <h2 className="font-bold text-lg">
            FinanceOS AI
          </h2>

          <p className="text-sm opacity-90">
            Your Personal Finance Copilot
          </p>
        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg}
          />
        ))}

        {loading && (
          <div className="bg-slate-800 rounded-2xl p-4 flex gap-3 w-fit">

            <Loader2
              className="animate-spin"
              size={18}
            />

            <div>

              <p className="font-semibold">
                FinanceOS AI
              </p>

              <p className="text-sm text-slate-400">
                Analyzing your finances...
              </p>

            </div>

          </div>
        )}

        <div ref={bottomRef} />

      </div>

      {/* Suggestions */}

      <div className="px-4 pb-3 flex flex-wrap gap-2">

        {suggestions.map((item) => (
          <button
            key={item}
            disabled={loading}
            onClick={() => {
              setQuestion("");
              askAI(item);
            }}
            className={`text-xs px-3 py-2 rounded-full transition flex items-center gap-1 ${
              loading
                ? "bg-slate-700 cursor-not-allowed"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            <Sparkles size={12} />

            {item}

          </button>
        ))}

      </div>

      {/* Input */}

      <div className="border-t border-slate-700 p-4 flex gap-3">

        <input
          ref={inputRef}
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !loading &&
              question.trim()
            ) {
              askAI(question);
            }
          }}
          placeholder="Ask FinanceOS AI..."
          className="flex-1 bg-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={loading || !question.trim()}
          onClick={() => askAI(question)}
          className={`px-4 rounded-xl transition ${
            loading || !question.trim()
              ? "bg-slate-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <Send size={20} />
        </button>

      </div>

      <div className="text-center text-xs text-slate-500 py-2 border-t border-slate-800">
        Powered by Gemini 2.5 Flash
      </div>

    </div>
  );
}

export default AIChatModal;