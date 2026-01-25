import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollDownButtonProps {
  targetId: string;
  className?: string;
}

const ScrollDownButton = ({ targetId, className = "" }: ScrollDownButtonProps) => {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5 }}
    >
      <span className="text-xs text-muted-foreground">Scroll to explore</span>
      <motion.div
        className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center backdrop-blur-sm"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5 text-primary" />
      </motion.div>
    </motion.button>
  );
};

export default ScrollDownButton;
