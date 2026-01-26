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
  // Slow, immersive animations with gentle movement
  const randomX = ((index * 7) % 15) - 7;
  const randomY = ((index * 11) % 12) - 6;
  const duration = 8 + (index % 5) * 0.8; // 8-12 seconds (much slower floating)
  const delay = (index % 10) * 0.3;

  // Gentle rotation values (±2-4 degrees for dreamy feel)
  const rotateMax = 2 + (index % 3);
  const fadePulseDuration = 10 + (index % 5); // 10-14 seconds (subtle breathing)

  return (
    <motion.button
      layout
      layoutId={capability.title}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [1, 0.85, 1], // Subtle breathing effect
        scale: 1,
        x: [0, randomX * 0.6, -randomX * 0.4, randomX * 0.3, 0], // Reduced drift
        y: [0, randomY * 0.6, -randomY * 0.3, randomY * 0.4, 0], // Reduced drift
        rotate: [0, rotateMax, -rotateMax, rotateMax * 0.5, 0], // Gentle sway
      }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }} // Slower exit
      transition={{
        layout: { type: "spring", stiffness: 150, damping: 25 }, // Smoother layout transitions
        opacity: {
          duration: fadePulseDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        },
        scale: { duration: 0.6, delay: delay * 0.1 },
        x: {
          duration: duration, // 8-12 seconds
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
        y: {
          duration: duration * 1.15, // 9-14 seconds
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
        rotate: {
          duration: duration * 1.3, // 10-16 seconds
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
