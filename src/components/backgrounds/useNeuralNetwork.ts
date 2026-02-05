import { useRef, useEffect, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulseOffset: number;
}

interface UseNeuralNetworkOptions {
  nodeCount?: number;
  connectionDistance?: number;
  nodeColor?: string;
  lineColor?: string;
  speed?: number;
  enabled?: boolean;
}

export function useNeuralNetwork(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: UseNeuralNetworkOptions = {},
) {
  const {
    nodeCount = 60,
    connectionDistance = 150,
    nodeColor = "hsla(205, 90%, 58%, 0.4)",
    lineColor = "hsla(205, 90%, 58%, 0.1)",
    speed = 0.3,
    enabled = true,
  } = options;

  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>();
  const frameCountRef = useRef(0);

  const initializeNodes = useCallback(
    (width: number, height: number) => {
      const nodes: Node[] = [];
      for (let i = 0; i < nodeCount; i++) {
        const baseRadius = 2 + Math.random() * 2;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: baseRadius,
          baseRadius,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
      nodesRef.current = nodes;
    },
    [nodeCount, speed],
  );

  const updateNodes = useCallback((width: number, height: number, time: number) => {
    const nodes = nodesRef.current;

    for (const node of nodes) {
      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off edges with padding
      const padding = 50;
      if (node.x < -padding) {
        node.x = -padding;
        node.vx *= -1;
      } else if (node.x > width + padding) {
        node.x = width + padding;
        node.vx *= -1;
      }

      if (node.y < -padding) {
        node.y = -padding;
        node.vy *= -1;
      } else if (node.y > height + padding) {
        node.y = height + padding;
        node.vy *= -1;
      }

      // Pulse effect
      node.radius = node.baseRadius + Math.sin(time * 0.002 + node.pulseOffset) * 0.5;
    }
  }, []);

  const drawNetwork = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      const nodes = nodesRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw connections (throttled calculation - every 2 frames)
      if (frameCountRef.current % 2 === 0) {
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              // Fade line based on distance
              const opacity = 1 - distance / connectionDistance;
              ctx.globalAlpha = opacity * 0.15;

              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw nodes
      ctx.globalAlpha = 1;
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      }

      frameCountRef.current++;
    },
    [connectionDistance, lineColor, nodeColor],
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

      // Reinitialize nodes on resize
      initializeNodes(rect.width, rect.height);
    };

    resizeCanvas();

    const animate = (time: number) => {
      const rect = canvas.getBoundingClientRect();

      if (!prefersReducedMotion) {
        updateNodes(rect.width, rect.height, time);
      }

      drawNetwork(ctx, rect.width, rect.height, time);

      if (!prefersReducedMotion) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation or draw static frame
    if (prefersReducedMotion) {
      // Draw single static frame
      drawNetwork(
        ctx,
        canvas.getBoundingClientRect().width,
        canvas.getBoundingClientRect().height,
        0,
      );
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
  }, [canvasRef, enabled, initializeNodes, updateNodes, drawNetwork]);

  return {
    nodes: nodesRef.current,
  };
}
