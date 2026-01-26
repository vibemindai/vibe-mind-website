import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticElementProps {
  children: ReactNode;
  strength?: number; // 0.1 to 0.5, default 0.3
  radius?: number;   // detection radius, default 50px
  className?: string;
  disabled?: boolean;
}

// Check if device is touch-only
const isTouchDevice = () => {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
};

export const MagneticElement = ({
  children,
  strength = 0.3,
  radius = 50,
  className = "",
  disabled = false,
}: MagneticElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isTouch || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Only apply effect within radius
    if (distance < radius + Math.max(rect.width, rect.height) / 2) {
      const maxMove = 15; // Maximum shift in pixels
      const moveX = distanceX * strength;
      const moveY = distanceY * strength;

      // Clamp movement
      x.set(Math.max(-maxMove, Math.min(maxMove, moveX)));
      y.set(Math.max(-maxMove, Math.min(maxMove, moveY)));
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // If touch device or disabled, just render children without effect
  if (isTouch || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MagneticElement;
