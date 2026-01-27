import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { capabilities } from "@/data/aiCapabilities";
import { getCategoryByKey } from "@/data/serviceCategories";
import CapabilityBubble from "./CapabilityBubble";

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const JugglingCapabilities = () => {
  const navigate = useNavigate();

  // State for shuffled capabilities that updates periodically
  const [shuffledCapabilities, setShuffledCapabilities] = useState(() =>
    shuffleArray(capabilities)
  );

  // Reshuffle capabilities periodically
  const reshuffle = useCallback(() => {
    setShuffledCapabilities(shuffleArray(capabilities));
  }, []);

  useEffect(() => {
    const interval = setInterval(reshuffle, 12000); // Reshuffle every 12 seconds (relaxed pace)
    return () => clearInterval(interval);
  }, [reshuffle]);

  const handleCapabilityClick = (slug: string, categoryKey: string) => {
    // Get the category slug from the category key
    const category = getCategoryByKey(categoryKey);
    if (category) {
      navigate(`/services/${category.slug}/${slug}`);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 p-4">
        <AnimatePresence mode="popLayout">
          {shuffledCapabilities.map((capability, index) => (
            <CapabilityBubble
              key={capability.title}
              capability={capability}
              index={index}
              onClick={() => handleCapabilityClick(capability.slug, capability.category)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JugglingCapabilities;
