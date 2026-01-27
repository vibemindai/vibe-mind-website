import { useState, useCallback, useRef, useEffect } from "react";
import { CHAT_API_ENDPOINT, getSessionId, getClientId } from "@/lib/api";

export type ChatStatus = "idle" | "sending" | "processing" | "streaming" | "complete" | "error";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  status: "sending" | "complete" | "error";
}

interface UseSSEChatReturn {
  messages: ChatMessage[];
  chatStatus: ChatStatus;
  currentStreamingText: string;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  abort: () => void;
  clearMessages: () => void;
  clearSession: () => void;
  retry: () => void;
}

const STORAGE_KEY = "chat-messages";
const SESSION_ID_KEY = "chat-session-id";

function getErrorMessage(error: unknown): string {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return "Unable to connect. Please check your internet connection.";
  }

  if (error instanceof Error) {
    // Handle HTTP status errors
    const statusMatch = error.message.match(/status:\s*(\d+)/);
    if (statusMatch) {
      const status = parseInt(statusMatch[1], 10);
      if (status >= 400 && status < 500) {
        return "Request failed. Please try again or rephrase your question.";
      }
      if (status >= 500) {
        return "Server temporarily unavailable. Please try again later.";
      }
    }

    // Handle specific error messages
    if (error.message === "No response body") {
      return "No response received. Please try again.";
    }

    // Return the error message if it's already user-friendly
    if (error.message.length < 100 && !error.message.includes("Error")) {
      return error.message;
    }
  }

  return "Something went wrong. Please try again.";
}

export function useSSEChat(): UseSSEChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Initialize from sessionStorage
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return [];
        }
      }
    }
    return [];
  });
  const [chatStatus, setChatStatus] = useState<ChatStatus>("idle");
  const [currentStreamingText, setCurrentStreamingText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string>("");

  const abortControllerRef = useRef<AbortController | null>(null);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setChatStatus("idle");
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentStreamingText("");
    setError(null);
    setChatStatus("idle");
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const clearSession = useCallback(() => {
    setMessages([]);
    setCurrentStreamingText("");
    setError(null);
    setChatStatus("idle");
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_ID_KEY);
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || chatStatus === "streaming" || chatStatus === "processing") {
      return;
    }

    // Abort any existing request
    abort();

    setError(null);
    setLastUserMessage(message);
    setChatStatus("sending");

    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: message,
      status: "complete",
    };

    setMessages((prev) => [...prev, userMessage]);
    setChatStatus("processing");

    // Create abort controller
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(CHAT_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": getSessionId(),
          "x-client-id": getClientId(),
        },
        body: JSON.stringify({ message }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      setChatStatus("streaming");
      setCurrentStreamingText("");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            // Handle the double "data: data: " format
            let content = line.slice(6); // Remove first "data: "

            if (content.startsWith("data: ")) {
              content = content.slice(6); // Remove second "data: "
            }

            if (content === "[DONE]") {
              // Stream complete
              const assistantMessage: ChatMessage = {
                id: generateId(),
                role: "assistant",
                content: accumulatedText,
                status: "complete",
              };
              setMessages((prev) => [...prev, assistantMessage]);
              setCurrentStreamingText("");
              setChatStatus("complete");

              // Reset to idle after a brief moment
              setTimeout(() => setChatStatus("idle"), 100);
              return;
            }

            // Clean up carriage returns that may accumulate from streaming
            const cleanedContent = content.replace(/\r+/g, "");
            accumulatedText += cleanedContent;
            setCurrentStreamingText(accumulatedText);
          }
        }
      }

      // If we reach here without [DONE], still save the message
      if (accumulatedText) {
        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: accumulatedText,
          status: "complete",
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setCurrentStreamingText("");
      }

      setChatStatus("idle");
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        // Request was aborted, don't treat as error
        return;
      }

      setError(getErrorMessage(err));
      setChatStatus("error");
    }
  }, [chatStatus, abort]);

  const retry = useCallback(() => {
    if (lastUserMessage) {
      // Remove the last user message before retrying
      setMessages((prev) => prev.slice(0, -1));
      sendMessage(lastUserMessage);
    }
  }, [lastUserMessage, sendMessage]);

  return {
    messages,
    chatStatus,
    currentStreamingText,
    error,
    sendMessage,
    abort,
    clearMessages,
    clearSession,
    retry,
  };
}
