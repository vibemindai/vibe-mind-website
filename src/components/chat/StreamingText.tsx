import { motion } from "framer-motion";
import { parseMarkdown } from "@/lib/markdown";

interface StreamingTextProps {
  text: string;
  isStreaming?: boolean;
}

const StreamingText = ({ text, isStreaming = true }: StreamingTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex justify-start"
    >
      <div className="max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-card border border-border mr-4">
        <div className="text-xs sm:text-sm break-words">
          {parseMarkdown(text)}
          {isStreaming && (
            <span className="inline-block w-0.5 h-4 bg-foreground ml-0.5 animate-typewriter-cursor align-middle" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StreamingText;
