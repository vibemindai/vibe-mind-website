# Animation Components

**Last Updated:** 2026-01-25

---

## Overview

Animation components provide smooth transitions and scroll-triggered animations throughout the application.

---

## PageTransition

**File:** `src/components/PageTransition.tsx`

Animates route transitions using Framer Motion.

### Props

```tsx
interface PageTransitionProps {
  children: ReactNode;
}
```

### Animation Configuration

```tsx
const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 20,
  },
};

const pageTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};
```

### How It Works

1. **AnimatePresence** in `App.tsx` tracks route changes
2. `location.pathname` as key triggers re-animation
3. Exit animation plays, then enter animation

### Implementation

```tsx
const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};
```

### Usage

```tsx
// In App.tsx
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    <Route path="/about" element={
      <PageTransition>
        <AboutPage />
      </PageTransition>
    } />
  </Routes>
</AnimatePresence>
```

---

## AnimatedSection

**File:** `src/components/AnimatedSection.tsx`

Scroll-triggered animation wrapper using Framer Motion's viewport detection.

### Props

```tsx
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;           // Animation delay in seconds
  direction?: "up" | "down" | "left" | "right";  // Entry direction
}
```

### Direction Offsets

```tsx
const directionOffset = {
  up: { y: 40, x: 0 },    // Slides up from below
  down: { y: -40, x: 0 }, // Slides down from above
  left: { y: 0, x: 40 },  // Slides in from right
  right: { y: 0, x: -40 }, // Slides in from left
};
```

### Animation Configuration

```tsx
<motion.div
  initial={{
    opacity: 0,
    ...directionOffset[direction]
  }}
  whileInView={{
    opacity: 1,
    x: 0,
    y: 0
  }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{
    duration: 0.6,
    delay,
    ease: [0.25, 0.4, 0.25, 1]
  }}
>
  {children}
</motion.div>
```

### Viewport Options

| Option | Value | Effect |
|--------|-------|--------|
| `once` | `true` | Only animate once (doesn't reset on scroll out) |
| `margin` | `"-100px"` | Trigger 100px before element enters viewport |

### Usage Examples

```tsx
import AnimatedSection from "@/components/AnimatedSection";

// Default (fade up)
<AnimatedSection>
  <h2>Content</h2>
</AnimatedSection>

// With delay
<AnimatedSection delay={0.2}>
  <Card />
</AnimatedSection>

// Different direction
<AnimatedSection direction="left">
  <Sidebar />
</AnimatedSection>

// Staggered children
{items.map((item, index) => (
  <AnimatedSection key={index} delay={index * 0.1}>
    <ItemCard item={item} />
  </AnimatedSection>
))}
```

---

## CSS Keyframe Animations

**File:** `tailwind.config.ts`

Custom keyframe animations defined in Tailwind config.

### Available Animations

| Animation | Class | Description |
|-----------|-------|-------------|
| fade-in | `animate-fade-in` | Fade in with upward slide |
| fade-in-up | `animate-fade-in-up` | Stronger upward slide |
| scale-in | `animate-scale-in` | Scale up with fade |
| glow | `animate-glow` | Pulsing glow effect |
| accordion-down | `animate-accordion-down` | Expand content |
| accordion-up | `animate-accordion-up` | Collapse content |

### Keyframe Definitions

```tsx
keyframes: {
  "fade-in": {
    "0%": {
      opacity: "0",
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: "1",
      transform: "translateY(0)",
    },
  },
  "fade-in-up": {
    "0%": {
      opacity: "0",
      transform: "translateY(40px)",
    },
    "100%": {
      opacity: "1",
      transform: "translateY(0)",
    },
  },
  "scale-in": {
    "0%": {
      opacity: "0",
      transform: "scale(0.9)",
    },
    "100%": {
      opacity: "1",
      transform: "scale(1)",
    },
  },
  "glow": {
    "0%, 100%": {
      opacity: "1",
    },
    "50%": {
      opacity: "0.5",
    },
  },
},
```

### Animation Timing

```tsx
animation: {
  "fade-in": "fade-in 0.6s ease-out",
  "fade-in-up": "fade-in-up 0.8s ease-out",
  "scale-in": "scale-in 0.4s ease-out",
  "glow": "glow 2s ease-in-out infinite",
},
```

### Usage in JSX

```tsx
<div className="animate-fade-in">Fades in</div>
<div className="animate-scale-in">Scales in</div>
<div className="animate-glow">Pulses</div>
```

---

## Transition Utilities

### CSS Custom Property

```css
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Tailwind Utility

```tsx
<button className="transition-smooth hover:scale-105">
  Smooth hover
</button>
```

---

## Three.js Animations

In `TechGlobe.tsx`, animations use `useFrame`:

```tsx
import { useFrame } from '@react-three/fiber';

useFrame((state) => {
  // Called every frame (~60fps)
  mesh.current.rotation.y += 0.001;
  mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
});
```

---

## Animation Best Practices

### 1. Use `once: true` for scroll animations

Prevents re-animation on scroll:

```tsx
viewport={{ once: true, margin: "-100px" }}
```

### 2. Stagger animations

Create visual hierarchy:

```tsx
{items.map((item, i) => (
  <AnimatedSection delay={i * 0.1}>
    {item}
  </AnimatedSection>
))}
```

### 3. Keep durations consistent

| Animation Type | Duration |
|---------------|----------|
| Micro-interactions | 0.2-0.3s |
| Page transitions | 0.4s |
| Scroll reveals | 0.6-0.8s |
| Emphasis/glow | 2s (infinite) |

### 4. Use appropriate easing

| Use Case | Easing |
|----------|--------|
| Enter animations | `ease-out` or `[0.25, 0.4, 0.25, 1]` |
| Exit animations | `ease-in` |
| Transitions | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Special effect | `anticipate` |

---

## Related Documentation

- [Interactive Components](./interactive.md)
- [Styling Animations](../styling/animations.md)
- [Tailwind Config](../styling/tailwind-config.md)
