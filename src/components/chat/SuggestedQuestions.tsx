import { motion, AnimatePresence } from "framer-motion";
import { useCyclingQuestions, Question } from "@/hooks/useCyclingQuestions";

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
  disabled?: boolean;
}

const questionVariants = {
  initial: {
    scale: 0.8,
    opacity: 0,
    y: 20
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  exit: {
    scale: 0.3,
    opacity: 0,
    filter: "blur(10px)",
    transition: {
      duration: 0.3
    }
  },
};

const SuggestedQuestions = ({ onQuestionClick, disabled = false }: SuggestedQuestionsProps) => {
  const { questions, pause, resume } = useCyclingQuestions();

  const handleClick = (question: Question) => {
    if (!disabled) {
      pause();
      onQuestionClick(question.text);
    }
  };

  return (
    <div
      className="space-y-1.5 sm:space-y-2"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <AnimatePresence mode="popLayout">
        {questions.map((question) => (
          <motion.button
            key={question.id}
            variants={questionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
            onClick={() => handleClick(question)}
            disabled={disabled}
            className={`flex items-center gap-2 sm:gap-3 w-full p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-card hover:bg-muted/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-left border border-border/50 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <question.icon
              className={`w-4 h-4 sm:w-5 sm:h-5 ${question.color} flex-shrink-0 transition-transform`}
            />
            <span className="text-xs sm:text-sm text-foreground truncate">
              {question.text}
            </span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SuggestedQuestions;
