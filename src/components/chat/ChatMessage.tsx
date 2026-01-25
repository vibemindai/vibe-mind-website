import { motion } from "framer-motion";
import { ChatMessage as ChatMessageType } from "@/hooks/useSSEChat";
import { parseMarkdown } from "@/lib/markdown";

interface ChatMessageProps {
  message: ChatMessageType;
}

const messageVariants = {
  user: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  },
  assistant: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  },
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const variant = isUser ? "user" : "assistant";

  return (
    <motion.div
      variants={messageVariants[variant]}
      initial="initial"
      animate="animate"
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl p-3 sm:p-4 ${
          isUser
            ? "bg-primary text-primary-foreground ml-4"
            : "bg-card border border-border mr-4"
        }`}
      >
        <div className="text-xs sm:text-sm break-words">
          {isUser ? message.content : parseMarkdown(message.content)}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
