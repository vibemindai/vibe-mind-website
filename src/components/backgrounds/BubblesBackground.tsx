import { useRef } from 'react';
import { useBubbles } from './useBubbles';
import { cn } from '@/lib/utils';

interface BubblesBackgroundProps {
  className?: string;
  bubbleCount?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  opacity?: number;
}

export function BubblesBackground({
  className,
  bubbleCount = 20,
  minSize = 20,
  maxSize = 80,
  speed = 0.2,
  opacity = 1,
}: BubblesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useBubbles(canvasRef, {
    bubbleCount,
    minSize,
    maxSize,
    speed,
    color: 'hsla(205, 90%, 58%',
  });

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'pointer-events-none will-change-transform w-full h-full',
        className
      )}
      style={{
        opacity,
      }}
      aria-hidden="true"
    />
  );
}

export default BubblesBackground;
