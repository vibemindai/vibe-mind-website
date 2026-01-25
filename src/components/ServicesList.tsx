import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { capabilities, getIcon, type Capability } from "@/data/aiCapabilities";

const ITEMS_PER_VIEW = 10;
const TICKER_INTERVAL = 2500; // 2.5 seconds per tick

interface ServicesListProps {
  onChatTrigger?: (prompt: string) => void;
}

// Vertical ticker animation variants
const itemVariants = {
  // Enter from top: fade in + slide down
  initial: {
    opacity: 0,
    y: -30,
    scale: 0.95,
    filter: "blur(4px)",
  },
  // Visible state
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  // Exit at bottom: fade out + slide down further
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
    },
  },
};

// Color palette for variety
const colors = [
  { text: "text-primary", bg: "bg-primary/10" },
  { text: "text-amber-500", bg: "bg-amber-500/10" },
  { text: "text-emerald-500", bg: "bg-emerald-500/10" },
  { text: "text-purple-500", bg: "bg-purple-500/10" },
  { text: "text-red-500", bg: "bg-red-500/10" },
  { text: "text-blue-500", bg: "bg-blue-500/10" },
  { text: "text-cyan-500", bg: "bg-cyan-500/10" },
  { text: "text-pink-500", bg: "bg-pink-500/10" },
];

// Create a unique key for each item instance
interface VisibleItem extends Capability {
  instanceId: number;
}

const ServicesList = ({ onChatTrigger }: ServicesListProps) => {
  const [visibleItems, setVisibleItems] = useState<VisibleItem[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const instanceCounter = useRef(0);
  const shuffledQueue = useRef<Capability[]>([]);
  const queueIndex = useRef(0);

  // Get next item from shuffled queue (reshuffles when exhausted)
  const getNextItem = (): VisibleItem => {
    if (queueIndex.current >= shuffledQueue.current.length) {
      // Reshuffle when we've used all items
      shuffledQueue.current = [...capabilities].sort(() => Math.random() - 0.5);
      queueIndex.current = 0;
    }
    const item = shuffledQueue.current[queueIndex.current];
    queueIndex.current++;
    instanceCounter.current++;
    return { ...item, instanceId: instanceCounter.current };
  };

  // Initialize with first 6 items (shuffled)
  useEffect(() => {
    shuffledQueue.current = [...capabilities].sort(() => Math.random() - 0.5);
    const initialItems: VisibleItem[] = [];
    for (let i = 0; i < ITEMS_PER_VIEW; i++) {
      initialItems.push(getNextItem());
    }
    setVisibleItems(initialItems);
  }, []);

  // Ticker effect: add one at top, remove one from bottom
  useEffect(() => {
    if (isPaused || visibleItems.length === 0) return;

    const timer = setInterval(() => {
      setVisibleItems((prev) => {
        const newItem = getNextItem();
        // Add to front, remove from end
        return [newItem, ...prev.slice(0, ITEMS_PER_VIEW - 1)];
      });
    }, TICKER_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, visibleItems.length]);

  // Handle chat trigger
  const handleChatClick = (capability: Capability, e: React.MouseEvent) => {
    e.stopPropagation();
    onChatTrigger?.(`Tell me about ${capability.title}`);
  };

  return (
    <div
      className="bg-card backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-elegant border border-border"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleItems.map((capability, index) => {
            const Icon = getIcon(capability.icon);
            const color = colors[index % colors.length];

            return (
              <motion.div
                key={capability.instanceId}
                variants={itemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
                className="group relative flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className={`p-1.5 sm:p-2 rounded-lg ${color.bg} flex-shrink-0`}>
                  <Icon
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${color.text} transition-transform group-hover:scale-110`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors truncate">
                    {capability.title}
                  </h3>
                </div>

                {/* Chat trigger button - visible on hover */}
                {onChatTrigger && (
                  <button
                    onClick={(e) => handleChatClick(capability, e)}
                    className="absolute right-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-primary/10 transition-all duration-200"
                    title={`Ask about ${capability.title}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Subtle animation indicator */}
      <div className="flex justify-center gap-1.5 mt-3 pt-2 border-t border-border/50">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary/60"
              animate={{
                y: isPaused ? 0 : [0, -3, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: isPaused ? 0 : Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
