import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";


function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  const [copied, setCopied] = useState(false);

  const time = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`flex w-full mb-5 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-3 max-w-[78%] ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
            isUser
              ? "bg-gradient-to-br from-blue-600 to-cyan-500"
              : "bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500"
          }`}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>

        {/* Message Bubble */}
        <div
          className={`rounded-3xl px-5 py-4 relative transition-all duration-300 hover:scale-[1.01] ${
            isUser
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
              : "card-theme"
          }`}
        >
          {!isUser && (
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  FinanceOS AI
                </span>

                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              </div>

              <button
                onClick={copyMessage}
                className="icon-btn p-2"
                title="Copy response"
              >
                {copied ? (
                  <Check
                    size={16}
                    className="text-green-400"
                  />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          )}

          {isUser && (
            <div className="font-semibold mb-2">
              You
            </div>
          )}

          <div
            className={`prose max-w-none break-words
            prose-p:my-2
            prose-ul:my-2
            prose-li:my-1
            ${
              isUser
                ? "prose-invert prose-strong:text-white"
                : ""
            }`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.text}
            </ReactMarkdown>
          </div>

          <div
            className={`text-[11px] mt-4 ${
              isUser ? "text-blue-100" : "text-muted"
            }`}
          >
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;