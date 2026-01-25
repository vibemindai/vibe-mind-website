import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypingPlaceholder } from "@/hooks/useTypingPlaceholder";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isStreaming?: boolean;
}

const ChatInput = ({ onSend, disabled = false, isStreaming = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { placeholder, isTyping } = useTypingPlaceholder();

  const handleSend = () => {
    if (message.trim() && !disabled) {
      setIsSending(true);
      onSend(message.trim());
      setMessage("");
      setTimeout(() => setIsSending(false), 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (!isStreaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isStreaming]);

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 bg-card rounded-full p-1.5 sm:p-2 shadow-lg border border-border">
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isStreaming}
          className="w-full bg-transparent border-0 outline-none focus:ring-0 text-xs sm:text-sm text-foreground px-3 sm:px-4 py-2 disabled:opacity-50"
          placeholder=""
        />
        {/* Animated placeholder */}
        {!message && (
          <div className="absolute inset-0 flex items-center px-3 sm:px-4 pointer-events-none">
            <span className="text-xs sm:text-sm text-muted-foreground">
              {placeholder}
            </span>
            <span
              className={`w-0.5 h-4 bg-muted-foreground ml-0.5 ${
                isTyping ? "animate-typewriter-cursor" : "opacity-0"
              }`}
            />
          </div>
        )}
      </div>
      <Button
        size="icon"
        onClick={handleSend}
        disabled={disabled || isStreaming || !message.trim()}
        className={`rounded-full bg-primary hover:bg-primary/90 w-8 h-8 sm:w-10 sm:h-10 transition-all duration-200 disabled:opacity-50 ${
          isSending ? "scale-90" : "hover:scale-105 active:scale-95"
        }`}
      >
        <Send
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${
            isSending ? "translate-x-1 -translate-y-1" : ""
          }`}
        />
      </Button>
    </div>
  );
};

export default ChatInput;
