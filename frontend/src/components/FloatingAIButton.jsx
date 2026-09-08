import { useState } from "react";
import { Bot } from "lucide-react";
import AIChatModal from "./AIChatModal";

function FloatingAIButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <AIChatModal
          onClose={() => setOpen(false)}
        />
      )}

      {!open && (
        <button
          type="button"
          aria-label="Open AI Assistant"
          title="Ask FinanceOS AI"
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/30 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400/40"
        >
          <Bot
            size={30}
            className="text-white"
          />
        </button>
      )}
    </>
  );
}

export default FloatingAIButton;