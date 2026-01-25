# TypeScript Types

**Last Updated:** 2026-01-25

---

## Overview

TypeScript types and interfaces used throughout the application.

---

## Theme Types

**File:** `src/hooks/useTheme.tsx`

```tsx
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isAutoMode: boolean;
  setIsAutoMode: (auto: boolean) => void;
}
```

---

## Component Props Types

### Common Patterns

```tsx
// Children pattern
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

// Variant pattern
interface ButtonProps {
  variant?: "default" | "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
```

### Animation Props

**File:** `src/components/AnimatedSection.tsx`

```tsx
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}
```

**File:** `src/components/PageTransition.tsx`

```tsx
interface PageTransitionProps {
  children: ReactNode;
}
```

### Three.js Props

**File:** `src/components/TechGlobe.tsx`

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

---

## Data Types

### Tech Stack Items

```tsx
interface TechItem {
  name: string;
  color: string;
}

const techStack: TechItem[] = [
  { name: 'React', color: '#61dafb' },
  // ...
];
```

### Navigation Items

```tsx
interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  // ...
];
```

### Suggested Questions

```tsx
interface SuggestedQuestion {
  icon: LucideIcon;
  text: string;
  color: string;
}
```

---

## Utility Types

### ClassValue (from clsx)

```tsx
import { type ClassValue } from "clsx";

// Used in cn() function
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### React Types

```tsx
import { ReactNode, MouseEvent, ChangeEvent } from "react";

// Component children
type Children = ReactNode;

// Event handlers
type ClickHandler = (event: MouseEvent<HTMLButtonElement>) => void;
type ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;
```

---

## Declaration Files

### Vite Environment

**File:** `src/vite-env.d.ts`

```tsx
/// <reference types="vite/client" />
```

### Asset Imports

```tsx
// For importing images
declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
```

---

## Type Patterns

### Generic Component Props

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string;
}
```

### Event Handler Types

```tsx
// Button click
onClick?: () => void;

// Form submission
onSubmit?: (data: FormData) => void;

// Input change
onChange?: (value: string) => void;
```

### Optional with Defaults

```tsx
interface ComponentProps {
  title: string;           // Required
  subtitle?: string;       // Optional
  variant?: "a" | "b";     // Optional with union
}

// In component
const Component = ({
  title,
  subtitle = "Default subtitle",
  variant = "a"
}: ComponentProps) => { ... };
```

---

## Best Practices

### 1. Prefer Interfaces for Objects

```tsx
// Good
interface User {
  id: string;
  name: string;
}

// Also acceptable for unions
type Status = "pending" | "active" | "done";
```

### 2. Export Types

```tsx
// types.ts
export interface User { ... }
export type Theme = "light" | "dark";

// component.tsx
import type { User, Theme } from "./types";
```

### 3. Use `type` imports

```tsx
import type { ReactNode } from "react";
import type { Theme } from "@/hooks/useTheme";
```

### 4. Avoid `any`

```tsx
// Bad
const data: any = fetchData();

// Good
const data: unknown = fetchData();
if (isValidData(data)) {
  // data is typed
}
```

---

## Related Documentation

- [Hooks](./hooks.md)
- [Utils](./utils.md)
