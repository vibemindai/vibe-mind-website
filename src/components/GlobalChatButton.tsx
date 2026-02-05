import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import ChatPopupModal from "@/components/chat/ChatPopupModal";

const GlobalChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>();
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on home page (chat already embedded) and dashboard routes
  const isHomePage = location.pathname === "/";
  const isDashboard = location.pathname.startsWith("/dashboard");

  // Check for chat URL param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const chatParam = params.get("chat");

    if (chatParam) {
      setInitialPrompt(`Tell me about ${chatParam}`);
      setIsOpen(true);
    }
  }, [location.search]);

  // Clear URL param after consuming
  const handlePromptConsumed = useCallback(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("chat")) {
      params.delete("chat");
      const newSearch = params.toString();
      navigate(`${location.pathname}${newSearch ? `?${newSearch}` : ""}`, { replace: true });
    }
    setInitialPrompt(undefined);
  }, [location.pathname, location.search, navigate]);

  const handleClose = () => {
    setIsOpen(false);
    handlePromptConsumed();
  };

  if (isHomePage || isDashboard) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-4 md:right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
        <MessageSquare className="w-6 h-6 relative z-10" />
      </motion.button>

      {/* Chat Modal */}
      <ChatPopupModal
        isOpen={isOpen}
        onClose={handleClose}
        initialPrompt={initialPrompt}
        onPromptConsumed={handlePromptConsumed}
      />
    </>
  );
};

export default GlobalChatButton;
