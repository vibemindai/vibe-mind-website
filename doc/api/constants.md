# Configuration Constants

**Last Updated:** 2026-01-25

---

## Overview

Configuration constants and static data used throughout the application.

---

## Navigation Constants

**File:** `src/components/Navigation.tsx`

```tsx
const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Contact", href: "#contact" }
];
```

---

## Tech Stack Data

**File:** `src/components/TechGlobe.tsx`

### Main Tech Stack

```tsx
const techStack = [
  { name: 'OpenAI', color: '#10a37f' },
  { name: 'Google', color: '#4285f4' },
  { name: 'LangChain', color: '#1c3c3c' },
  { name: 'TensorFlow', color: '#ff6f00' },
  { name: 'PyTorch', color: '#ee4c2c' },
  { name: 'Hugging Face', color: '#ffcc00' },
  { name: 'Python', color: '#3776ab' },
  { name: 'Node.js', color: '#339933' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'Django', color: '#092e20' },
  { name: 'Express', color: '#ffffff' },
  { name: 'GraphQL', color: '#e10098' },
  { name: 'React', color: '#61dafb' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Tailwind', color: '#06b6d4' },
  { name: 'Vue.js', color: '#4fc08d' },
  { name: 'Svelte', color: '#ff3e00' },
  { name: 'AWS', color: '#ff9900' },
  { name: 'Azure', color: '#0078d4' },
  { name: 'Google Cloud', color: '#4285f4' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'Kubernetes', color: '#326ce5' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'Redis', color: '#dc382d' },
  { name: 'Supabase', color: '#3ecf8e' },
  { name: 'Pinecone', color: '#00d4ff' },
  { name: 'Chroma', color: '#ff6b6b' },
  // ... more items
];
```

### AI Satellites

```tsx
const aiSatellites = [
  { name: 'Anthropic', color: '#d4a574' },
  { name: 'LlamaIndex', color: '#8b5cf6' },
  { name: 'Vibe Coding', color: '#8b5cf6' },
  { name: 'Replicate', color: '#00ff88' },
  { name: 'Cursor', color: '#00ff88' },
  { name: 'Claude AI', color: '#10a37f' },
  { name: 'Windsurf AI', color: '#10a37f' },
  { name: 'Vercel', color: '#ffffff' },
];
```

---

## Chat Constants

**File:** `src/components/AIChatWindow.tsx`

```tsx
const suggestedQuestions = [
  { icon: MessageCircle, text: "Who are VibeMind Solutions?", color: "text-emerald-500" },
  { icon: Briefcase, text: "What services do you offer?", color: "text-amber-500" },
  { icon: MapPin, text: "Where is your company located?", color: "text-red-500" },
  { icon: Sparkles, text: "Why choose VibeMind Solutions?", color: "text-yellow-500" },
];
```

---

## Animation Constants

**File:** `src/components/PageTransition.tsx`

```tsx
const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};
```

**File:** `src/components/AnimatedSection.tsx`

```tsx
const directionOffset = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { y: 0, x: 40 },
  right: { y: 0, x: -40 },
};
```

---

## Theme Constants

**File:** `src/hooks/useTheme.tsx`

```tsx
// Time-based theme switching hours
const DARK_MODE_START = 18; // 6 PM
const DARK_MODE_END = 6;    // 6 AM

// Auto-check interval
const THEME_CHECK_INTERVAL = 60000; // 1 minute
```

---

## CSS Variable Constants

**File:** `src/index.css`

### Light Theme

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 205 90% 58%;
  --primary-foreground: 0 0% 100%;
  --primary-dark: 240 70% 20%;
  --primary-glow: 200 95% 65%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --accent: 185 95% 58%;
  --accent-foreground: 0 0% 100%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 205 90% 58%;
  --radius: 0.75rem;
}
```

### Dark Theme

```css
.dark {
  --background: 240 50% 6%;
  --foreground: 0 0% 98%;
  --primary: 205 85% 60%;
  --primary-dark: 240 50% 12%;
  --primary-glow: 200 90% 70%;
  /* ... */
}
```

---

## Build Configuration

**File:** `vite.config.ts`

```tsx
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

---

## TypeScript Configuration

**File:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Tailwind Configuration

**File:** `tailwind.config.ts`

Key constants:

```tsx
{
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
}
```

---

## Related Documentation

- [Design System](../styling/design-system.md)
- [Tailwind Config](../styling/tailwind-config.md)
