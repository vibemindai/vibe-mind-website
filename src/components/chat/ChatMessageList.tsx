import { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatMessage as ChatMessageType } from "@/hooks/useSSEChat";
import ChatMessage from "./ChatMessage";
import StreamingText from "./StreamingText";
import ProcessingIndicator from "./ProcessingIndicator";

interface ChatMessageListProps {
  messages: ChatMessageType[];
  currentStreamingText: string;
  isProcessing: boolean;
  isStreaming: boolean;
}

const ChatMessageList = ({
  messages,
  currentStreamingText,
  isProcessing,
  isStreaming,
}: ChatMessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentStreamingText, isProcessing]);

  return (
    <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
      <AnimatePresence mode="popLayout">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </AnimatePresence>

      {isProcessing && !isStreaming && (
        <AnimatePresence>
          <ProcessingIndicator />
        </AnimatePresence>
      )}

      {isStreaming && currentStreamingText && (
        <StreamingText text={currentStreamingText} isStreaming={true} />
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;
