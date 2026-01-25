# Animation Patterns

**Last Updated:** 2026-01-25

---

## Overview

The application uses a combination of CSS keyframe animations and Framer Motion for smooth, performant animations.

---

## CSS Keyframe Animations

**File:** `tailwind.config.ts`

### Fade In

Fades in with upward movement:

```tsx
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

// Animation class
"fade-in": "fade-in 0.6s ease-out",
```

Usage:
```tsx
<div className="animate-fade-in">Content</div>
```

### Fade In Up

Stronger upward slide animation:

```tsx
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

// Animation class
"fade-in-up": "fade-in-up 0.8s ease-out",
```

### Scale In

Scale up with fade:

```tsx
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

// Animation class
"scale-in": "scale-in 0.4s ease-out",
```

### Glow

Pulsing glow effect (infinite):

```tsx
"glow": {
  "0%, 100%": {
    opacity: "1",
  },
  "50%": {
    opacity: "0.5",
  },
},

// Animation class
"glow": "glow 2s ease-in-out infinite",
```

### Accordion

For expandable content:

```tsx
"accordion-down": {
  from: { height: "0" },
  to: { height: "var(--radix-accordion-content-height)" },
},
"accordion-up": {
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: "0" },
},
```

---

## Animation Delays

For staggered animations, use inline styles:

```tsx
{items.map((item, index) => (
  <div
    className="animate-fade-in"
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

## Framer Motion Animations

### Page Transitions

**File:** `src/components/PageTransition.tsx`

```tsx
import { motion, Transition } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const pageTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

<motion.div
  initial="initial"
  animate="animate"
  exit="exit"
  variants={pageVariants}
  transition={pageTransition}
>
  {children}
</motion.div>
```

### Scroll Animations

**File:** `src/components/AnimatedSection.tsx`

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{
    duration: 0.6,
    delay: 0.2,
    ease: [0.25, 0.4, 0.25, 1]
  }}
>
  {children}
</motion.div>
```

### Direction Variants

```tsx
const directionOffset = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { y: 0, x: 40 },
  right: { y: 0, x: -40 },
};

// Usage
<AnimatedSection direction="left">
```

---

## Transition Utilities

### CSS Custom Property

```css
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Tailwind Utility Class

```tsx
<button className="transition-smooth hover:scale-105">
  Smooth hover
</button>
```

### Built-in Transitions

```tsx
// Color transitions only
<div className="transition-colors duration-200 hover:bg-muted">

// Transform transitions only
<div className="transition-transform duration-200 hover:scale-105">

// All properties
<div className="transition-all duration-300">
```

---

## Hover Effects

### Scale on Hover

```tsx
<button className="hover:scale-105 active:scale-95 transition-transform">
```

### Button Animation

```tsx
<Button className="hover:scale-105 active:scale-95 transition-all duration-200">
  Click me
</Button>
```

### Link Underline

```tsx
<a className="relative group">
  Link
  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
</a>
```

---

## Typing Indicator

**File:** `src/components/AIChatWindow.tsx`

```tsx
const TypingIndicator = () => (
  <div className="flex items-center gap-1 p-3">
    <div
      className="w-2 h-2 bg-primary rounded-full animate-bounce"
      style={{ animationDelay: "0ms" }}
    />
    <div
      className="w-2 h-2 bg-primary rounded-full animate-bounce"
      style={{ animationDelay: "150ms" }}
    />
    <div
      className="w-2 h-2 bg-primary rounded-full animate-bounce"
      style={{ animationDelay: "300ms" }}
    />
  </div>
);
```

---

## Three.js Animations

**File:** `src/components/TechGlobe.tsx`

Using React Three Fiber's `useFrame`:

```tsx
import { useFrame } from '@react-three/fiber';

function RotatingMesh() {
  const meshRef = useRef();

  useFrame((state) => {
    // Called every frame (~60fps)
    meshRef.current.rotation.y += 0.01;

    // Time-based animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
  });

  return <mesh ref={meshRef}>...</mesh>;
}
```

---

## Animation Best Practices

### 1. Duration Guidelines

| Animation Type | Duration |
|---------------|----------|
| Micro-interactions | 150-300ms |
| UI transitions | 200-400ms |
| Page transitions | 300-500ms |
| Scroll reveals | 500-800ms |
| Looping effects | 2-3s |

### 2. Easing Functions

| Use Case | Easing |
|----------|--------|
| Enter/appear | `ease-out` |
| Exit/disappear | `ease-in` |
| State change | `ease-in-out` |
| Bouncy | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` |
| Smooth | `cubic-bezier(0.4, 0, 0.2, 1)` |

### 3. Performance Tips

- Use `transform` and `opacity` for GPU acceleration
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly
- Prefer CSS animations for simple effects
- Use Framer Motion for complex sequences

### 4. Accessibility

- Respect `prefers-reduced-motion`
- Keep durations reasonable
- Avoid excessive movement
- Provide visual alternatives

```tsx
// Respecting reduced motion
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Related Documentation

- [Animation Components](../components/animations.md)
- [Interactive Components](../components/interactive.md)
- [Tailwind Config](./tailwind-config.md)
