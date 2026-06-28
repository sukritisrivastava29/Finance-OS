import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-2 items-start max-w-[85%] ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        <div className="mt-1">
          {isUser ? (
            <User size={18} />
          ) : (
            <Bot size={18} />
          )}
        </div>

        <div
          className={`px-4 py-3 rounded-2xl whitespace-pre-wrap ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-white"
          }`}
        >
         <ReactMarkdown>
    {message.text}
</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;