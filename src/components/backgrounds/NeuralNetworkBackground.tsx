import { useRef } from 'react';
import { useNeuralNetwork } from './useNeuralNetwork';
import { cn } from '@/lib/utils';

interface NeuralNetworkBackgroundProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
  speed?: number;
  opacity?: number;
}

export function NeuralNetworkBackground({
  className,
  nodeCount = 60,
  connectionDistance = 150,
  speed = 0.3,
  opacity = 1,
}: NeuralNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useNeuralNetwork(canvasRef, {
    nodeCount,
    connectionDistance,
    speed,
    nodeColor: 'hsla(205, 90%, 58%, 0.4)',
    lineColor: 'hsla(205, 90%, 58%, 0.15)',
  });

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'pointer-events-none will-change-transform',
        className
      )}
      style={{
        opacity,
      }}
      aria-hidden="true"
    />
  );
}

export default NeuralNetworkBackground;
