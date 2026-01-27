import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROCESSING_PHASES = [
  "Vibing with your question",
  "Tapping into the cosmos",
  "Brewing some brilliance",
  "Crafting your answer",
];

const ProcessingIndicator = () => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhaseIndex((prev) => (prev + 1) % PROCESSING_PHASES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex justify-start"
    >
      <div className="bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-border mr-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
            />
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentPhaseIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-xs sm:text-sm text-muted-foreground"
            >
              {PROCESSING_PHASES[currentPhaseIndex]}...
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessingIndicator;
