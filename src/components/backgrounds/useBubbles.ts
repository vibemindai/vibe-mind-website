import { useRef, useEffect, useCallback } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  opacity: number;
  speedY: number;
  swayAmplitude: number;
  swayFrequency: number;
  swayOffset: number;
  pulseOffset: number;
  layer: "background" | "foreground";
}

interface UseBubblesOptions {
  bubbleCount?: number;
  minSize?: number;
  maxSize?: number;
  color?: string;
  speed?: number;
  enabled?: boolean;
}

export function useBubbles(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: UseBubblesOptions = {},
) {
  const {
    bubbleCount = 20,
    minSize = 20,
    maxSize = 80,
    color = "hsla(205, 90%, 58%",
    speed = 0.2,
    enabled = true,
  } = options;

  const bubblesRef = useRef<Bubble[]>([]);
  const animationFrameRef = useRef<number>();

  const createBubble = useCallback(
    (width: number, height: number, startAtBottom: boolean = false): Bubble => {
      const isBackground = Math.random() > 0.5;
      const sizeRange = isBackground
        ? { min: maxSize * 0.6, max: maxSize }
        : { min: minSize, max: maxSize * 0.5 };

      const baseRadius = sizeRange.min + Math.random() * (sizeRange.max - sizeRange.min);

      return {
        x: Math.random() * width,
        y: startAtBottom ? height + baseRadius : Math.random() * height,
        radius: baseRadius,
        baseRadius,
        opacity: isBackground ? 0.05 + Math.random() * 0.08 : 0.1 + Math.random() * 0.1,
        speedY: (0.1 + Math.random() * 0.2) * speed,
        swayAmplitude: 10 + Math.random() * 20,
        swayFrequency: 0.0005 + Math.random() * 0.001,
        swayOffset: Math.random() * Math.PI * 2,
        pulseOffset: Math.random() * Math.PI * 2,
        layer: isBackground ? "background" : "foreground",
      };
    },
    [minSize, maxSize, speed],
  );

  const initializeBubbles = useCallback(
    (width: number, height: number) => {
      const bubbles: Bubble[] = [];
      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push(createBubble(width, height, false));
      }
      bubblesRef.current = bubbles;
    },
    [bubbleCount, createBubble],
  );

  const updateBubbles = useCallback(
    (width: number, height: number, time: number) => {
      const bubbles = bubblesRef.current;

      for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];

        // Move upward
        bubble.y -= bubble.speedY;

        // Horizontal sway using sine wave
        const swayX =
          Math.sin(time * bubble.swayFrequency + bubble.swayOffset) * bubble.swayAmplitude;
        bubble.x += swayX * 0.01;

        // Breathing/pulse effect (±5% size)
        bubble.radius =
          bubble.baseRadius * (1 + Math.sin(time * 0.001 + bubble.pulseOffset) * 0.05);

        // Respawn at bottom when exiting top
        if (bubble.y + bubble.radius < 0) {
          bubbles[i] = createBubble(width, height, true);
        }

        // Wrap horizontally
        if (bubble.x < -bubble.radius) {
          bubble.x = width + bubble.radius;
        } else if (bubble.x > width + bubble.radius) {
          bubble.x = -bubble.radius;
        }
      }
    },
    [createBubble],
  );

  const drawBubbles = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const bubbles = bubblesRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Sort bubbles by layer (background first, then foreground)
      const sortedBubbles = [...bubbles].sort((a, b) => {
        if (a.layer === "background" && b.layer === "foreground") return -1;
        if (a.layer === "foreground" && b.layer === "background") return 1;
        return 0;
      });

      for (const bubble of sortedBubbles) {
        // Create radial gradient for glow effect
        const gradient = ctx.createRadialGradient(
          bubble.x,
          bubble.y,
          0,
          bubble.x,
          bubble.y,
          bubble.radius,
        );

        gradient.addColorStop(0, `${color}, ${bubble.opacity * 1.5})`);
        gradient.addColorStop(0.4, `${color}, ${bubble.opacity})`);
        gradient.addColorStop(0.7, `${color}, ${bubble.opacity * 0.5})`);
        gradient.addColorStop(1, `${color}, 0)`);

        // Draw the bubble with glow
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Optional subtle ring border
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius * 0.9, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}, ${bubble.opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    },
    [color],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);

      // Reinitialize bubbles on resize
      initializeBubbles(rect.width, rect.height);
    };

    resizeCanvas();

    const animate = (time: number) => {
      const rect = canvas.getBoundingClientRect();

      if (!prefersReducedMotion) {
        updateBubbles(rect.width, rect.height, time);
      }

      drawBubbles(ctx, rect.width, rect.height);

      if (!prefersReducedMotion) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation or draw static frame
    if (prefersReducedMotion) {
      drawBubbles(ctx, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
    } else {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [canvasRef, enabled, initializeBubbles, updateBubbles, drawBubbles]);

  return {
    bubbles: bubblesRef.current,
  };
}
