import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Track mouse position with motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring physics for smooth following
  const springConfig = { stiffness: 500, damping: 28 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is desktop (no touch and larger screen)
    const checkDesktop = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      const hasNoTouch = !("ontouchstart" in window) && !navigator.maxTouchPoints;
      const isDesktopDevice = isLargeScreen && hasNoTouch;
      setIsDesktop(isDesktopDevice);

      // Toggle class on body to hide default cursor
      if (isDesktopDevice) {
        document.body.classList.add("custom-cursor-active");
      } else {
        document.body.classList.remove("custom-cursor-active");
      }
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => {
      window.removeEventListener("resize", checkDesktop);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isDesktop, mouseX, mouseY, isVisible]);

  // Don't render on non-desktop devices
  if (!isDesktop) return null;

  const cursorSize = 24;
  const bracketLength = 8;
  const bracketThickness = 2;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className="relative"
        style={{
          width: cursorSize,
          height: cursorSize,
        }}
      >
        {/* Top-left bracket */}
        <div
          className="absolute left-0 top-0 border-l border-t border-primary"
          style={{
            width: bracketLength,
            height: bracketLength,
            borderWidth: bracketThickness,
          }}
        />

        {/* Top-right bracket */}
        <div
          className="absolute right-0 top-0 border-r border-t border-primary"
          style={{
            width: bracketLength,
            height: bracketLength,
            borderWidth: bracketThickness,
          }}
        />

        {/* Bottom-left bracket */}
        <div
          className="absolute bottom-0 left-0 border-b border-l border-primary"
          style={{
            width: bracketLength,
            height: bracketLength,
            borderWidth: bracketThickness,
          }}
        />

        {/* Bottom-right bracket */}
        <div
          className="absolute bottom-0 right-0 border-b border-r border-primary"
          style={{
            width: bracketLength,
            height: bracketLength,
            borderWidth: bracketThickness,
          }}
        />
      </div>
    </motion.div>
  );
};

export default CustomCursor;
