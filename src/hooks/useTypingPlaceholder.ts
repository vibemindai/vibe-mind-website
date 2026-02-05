import { useState, useEffect, useCallback } from "react";

const placeholderPhrases = [
  "What services do you offer?",
  "Where is your company located?",
  "How can AI help my business?",
  "Tell me about your team...",
];

interface UseTypingPlaceholderOptions {
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export function useTypingPlaceholder(options: UseTypingPlaceholderOptions = {}) {
  const { typeSpeed = 80, deleteSpeed = 40, pauseDuration = 2000 } = options;

  const [placeholder, setPlaceholder] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentPhrase = placeholderPhrases[phraseIndex];

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (placeholder.length === 0) {
        setIsDeleting(false);
        setIsTyping(true);
        setPhraseIndex((prev) => (prev + 1) % placeholderPhrases.length);
        return;
      }

      const deleteTimer = setTimeout(() => {
        setPlaceholder((prev) => prev.slice(0, -1));
      }, deleteSpeed);
      return () => clearTimeout(deleteTimer);
    }

    if (isTyping) {
      if (placeholder.length === currentPhrase.length) {
        setIsTyping(false);
        setIsPaused(true);
        return;
      }

      const typeTimer = setTimeout(() => {
        setPlaceholder((prev) => currentPhrase.slice(0, prev.length + 1));
      }, typeSpeed);
      return () => clearTimeout(typeTimer);
    }
  }, [
    placeholder,
    phraseIndex,
    isTyping,
    isDeleting,
    isPaused,
    currentPhrase,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
  ]);

  const reset = useCallback(() => {
    setPlaceholder("");
    setPhraseIndex(0);
    setIsTyping(true);
    setIsDeleting(false);
    setIsPaused(false);
  }, []);

  return { placeholder, isTyping: isTyping || isDeleting, reset };
}
