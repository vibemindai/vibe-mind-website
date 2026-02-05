import { useState, useEffect, useCallback, useRef } from "react";
import {
  MessageCircle,
  Briefcase,
  MapPin,
  Sparkles,
  Users,
  Clock,
  Zap,
  Shield,
  DollarSign,
  Code,
  Target,
  Award,
  LucideIcon,
} from "lucide-react";

export interface Question {
  id: number;
  icon: LucideIcon;
  text: string;
  color: string;
}

const allQuestions: Question[] = [
  { id: 1, icon: MessageCircle, text: "Who are VibeMind Solutions?", color: "text-emerald-500" },
  { id: 2, icon: Briefcase, text: "What services do you offer?", color: "text-amber-500" },
  { id: 3, icon: MapPin, text: "Where is your company located?", color: "text-red-500" },
  { id: 4, icon: Sparkles, text: "Why choose VibeMind Solutions?", color: "text-yellow-500" },
  { id: 5, icon: Users, text: "How large is your team?", color: "text-blue-500" },
  { id: 6, icon: Clock, text: "What are your working hours?", color: "text-purple-500" },
  { id: 7, icon: Zap, text: "How quickly can you deliver?", color: "text-orange-500" },
  { id: 8, icon: Shield, text: "Is my data secure with you?", color: "text-green-500" },
  { id: 9, icon: DollarSign, text: "What are your pricing options?", color: "text-cyan-500" },
  { id: 10, icon: Code, text: "What technologies do you use?", color: "text-pink-500" },
  { id: 11, icon: Target, text: "Who are your ideal clients?", color: "text-indigo-500" },
  { id: 12, icon: Award, text: "What makes you stand out?", color: "text-rose-500" },
];

interface UseCyclingQuestionsOptions {
  cycleInterval?: number;
  visibleCount?: number;
}

export function useCyclingQuestions(options: UseCyclingQuestionsOptions = {}) {
  const { cycleInterval = 5000, visibleCount = 4 } = options;

  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const visibleQuestions = allQuestions.slice(startIndex, startIndex + visibleCount);

  // Handle wrap-around when we reach the end
  const wrappedQuestions =
    visibleQuestions.length < visibleCount
      ? [...visibleQuestions, ...allQuestions.slice(0, visibleCount - visibleQuestions.length)]
      : visibleQuestions;

  const cycle = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % allQuestions.length);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(cycle, cycleInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, cycle, cycleInterval]);

  return {
    questions: wrappedQuestions,
    isPaused,
    pause,
    resume,
    cycle,
  };
}
