# Interactive Components

**Last Updated:** 2026-01-25

---

## Overview

Interactive components feature complex user interactions, animations, or 3D graphics.

---

## AIChatWindow

**File:** `src/components/AIChatWindow.tsx`

An AI chat interface simulation with typing indicators and suggested questions.

### Features

- Typing indicator animation
- Animated greeting message
- Staggered question appearance
- Send button with animation
- Responsive layout

### State

```tsx
const [message, setMessage] = useState("");
const [showGreeting, setShowGreeting] = useState(false);
const [showQuestions, setShowQuestions] = useState(false);
const [isTyping, setIsTyping] = useState(true);
const [isSending, setIsSending] = useState(false);
```

### Animation Timeline

```
0ms      → isTyping = true (dots animation)
1500ms   → isTyping = false, showGreeting = true
2000ms   → showQuestions = true (staggered)
```

### Suggested Questions

```tsx
const suggestedQuestions = [
  { icon: MessageCircle, text: "Who are VibeMind Solutions?", color: "text-emerald-500" },
  { icon: Briefcase, text: "What services do you offer?", color: "text-amber-500" },
  { icon: MapPin, text: "Where is your company located?", color: "text-red-500" },
  { icon: Sparkles, text: "Why choose VibeMind Solutions?", color: "text-yellow-500" },
];
```

### TypingIndicator Sub-component

```tsx
const TypingIndicator = () => (
  <div className="flex items-center gap-1 p-3">
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
  </div>
);
```

### Usage

```tsx
import AIChatWindow from "@/components/AIChatWindow";

<AIChatWindow />
```

---

## TechGlobe

**File:** `src/components/TechGlobe.tsx`

Interactive 3D visualization of the technology stack using React Three Fiber.

### Features

- Wireframe globe with inner glow
- Orbiting technology labels
- Starfield background
- Auto-rotation
- User interaction (drag to rotate, scroll to zoom)

### Dependencies

```tsx
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
```

### Tech Stack Data

```tsx
const techStack = [
  { name: 'OpenAI', color: '#10a37f' },
  { name: 'React', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  // ... 40+ technologies
];

const aiSatellites = [
  { name: 'Anthropic', color: '#d4a574' },
  { name: 'Claude AI', color: '#10a37f' },
  // ... 8 AI-related items
];
```

### Sub-components

#### WireframeGlobe

Central wireframe sphere with animation:

```tsx
function WireframeGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
      globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <>
      <mesh ref={globeRef}>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Inner globe and core glow */}
    </>
  );
}
```

#### OrbitingItem

Technology labels orbiting the globe:

```tsx
interface OrbitingItemProps {
  name: string;
  color: string;
  orbitRadius: number;
  speed: number;
  angleOffset: number;
  tiltX: number;
  tiltY: number;
  isSatellite?: boolean;
}
```

#### Starfield

Particle background:

```tsx
function Starfield() {
  const starPositions = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    // Random positions in 3D space
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.length / 3}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}
```

### Camera Setup

```tsx
<Canvas
  camera={{ position: [0, 0, 18], fov: 60 }}
>
  <Scene />
</Canvas>
```

### Orbit Controls

```tsx
<OrbitControls
  enableZoom={true}
  enablePan={false}
  minDistance={5}
  maxDistance={50}
  zoomSpeed={1.5}
  autoRotate
  autoRotateSpeed={0.5}
  enableDamping
  dampingFactor={0.05}
/>
```

### Usage

```tsx
import TechGlobe from "@/components/TechGlobe";

<TechGlobe />
```

### Performance Considerations

- Uses `useMemo` for starfield positions
- Minimal geometry (wireframe, no textures)
- Efficient `useFrame` updates
- `onWheel` event handling to prevent page scroll

---

## ThemeToggle

**File:** `src/components/ThemeToggle.tsx`

Theme switch button for dark/light mode.

### Features

- Toggle between light and dark themes
- Visual feedback on current theme
- Uses `useTheme` hook

### Usage

```tsx
import ThemeToggle from "@/components/ThemeToggle";

<ThemeToggle />
```

---

## ServiceCarousel

**File:** `src/components/ServiceCarousel.tsx`

Carousel of service cards on the home page.

### Features

- Horizontal scrolling
- Service icons and descriptions
- Hover effects
- Responsive sizing

### Usage

```tsx
import ServiceCarousel from "@/components/ServiceCarousel";

<ServiceCarousel />
```

---

## Interactive Patterns

### Animation with useFrame (Three.js)

```tsx
useFrame((state) => {
  // Called every frame
  mesh.current.rotation.y += 0.01;
});
```

### Timed Animations

```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    setState(true);
  }, 1500);
  return () => clearTimeout(timer);
}, []);
```

### Staggered Animations

```tsx
{items.map((item, index) => (
  <div
    style={{
      animationDelay: `${index * 100}ms`,
      animationFillMode: 'backwards'
    }}
  >
    {item}
  </div>
))}
```

---

## Related Documentation

- [Animation Components](./animations.md)
- [Component Tree](../architecture/component-tree.md)
