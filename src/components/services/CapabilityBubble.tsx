import { motion } from "framer-motion";
import { Capability, getIcon } from "@/data/aiCapabilities";

interface CapabilityBubbleProps {
  capability: Capability;
  index: number;
  onClick: (title: string) => void;
}

const colorVariants = [
  "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/40",
  "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40",
  "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40",
  "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40",
  "bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20 hover:border-orange-500/40",
  "bg-pink-500/10 text-pink-500 border-pink-500/20 hover:bg-pink-500/20 hover:border-pink-500/40",
  "bg-cyan-500/10 text-cyan-500 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40",
  "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/40",
];

const CapabilityBubble = ({ capability, index, onClick }: CapabilityBubbleProps) => {
  const Icon = getIcon(capability.icon);
  const colorClass = colorVariants[index % colorVariants.length];

  // Generate random but consistent animation parameters based on index
  const randomX = ((index * 7) % 15) - 7;
  const randomY = ((index * 11) % 12) - 6;
  const duration = 3 + (index % 5) * 0.5;
  const delay = (index % 10) * 0.3;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [0, randomX, -randomX * 0.7, randomX * 0.5, 0],
        y: [0, randomY, -randomY * 0.5, randomY * 0.7, 0],
        rotate: [0, 2, -2, 1, 0],
      }}
      transition={{
        opacity: { duration: 0.4, delay: delay * 0.1 },
        scale: { duration: 0.4, delay: delay * 0.1 },
        x: {
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
        y: {
          duration: duration * 1.1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
        rotate: {
          duration: duration * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.3)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(capability.title)}
      className={`
        inline-flex items-center gap-2 px-4 py-2.5 rounded-full
        border backdrop-blur-sm cursor-pointer
        transition-colors duration-200
        ${colorClass}
      `}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="text-sm font-medium whitespace-nowrap">{capability.title}</span>
    </motion.button>
  );
};

export default CapabilityBubble;
