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
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
        >
          <Bot size={30} className="text-white" />
        </button>
      )}
    </>
  );
}

export default FloatingAIButton;