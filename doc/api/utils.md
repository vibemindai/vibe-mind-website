# Utility Functions

**Last Updated:** 2026-01-25

---

## Overview

Utility functions provide reusable helpers across the application.

**Location:** `src/lib/`

---

## cn()

**File:** `src/lib/utils.ts`

Combines class names with Tailwind CSS class merging.

### Implementation

```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Dependencies

- `clsx` - Conditional class construction
- `tailwind-merge` - Intelligent Tailwind class merging

### Usage

```tsx
import { cn } from "@/lib/utils";

// Basic usage
<div className={cn("p-4", "text-lg")} />
// Output: "p-4 text-lg"

// Conditional classes
<div className={cn(
  "base-class",
  isActive && "active-class",
  isDisabled && "disabled-class"
)} />

// With props
<div className={cn("default-styles", className)} />

// Merging conflicting Tailwind classes
<div className={cn("p-4", "p-8")} />
// Output: "p-8" (twMerge resolves conflict)

// Complex conditionals
<div className={cn(
  "rounded-lg border",
  {
    "bg-primary": variant === "primary",
    "bg-secondary": variant === "secondary",
  },
  className
)} />
```

### Why Use cn()?

1. **Conditional classes** - Clean syntax for optional classes
2. **Class merging** - Later classes override earlier ones
3. **Tailwind-aware** - Properly handles Tailwind utility conflicts
4. **Type-safe** - Full TypeScript support

### Common Patterns

#### Component Variants

```tsx
const Button = ({ variant, className, children }) => (
  <button
    className={cn(
      // Base styles
      "px-4 py-2 rounded-lg font-medium",
      // Variant styles
      variant === "primary" && "bg-primary text-white",
      variant === "outline" && "border border-primary text-primary",
      // Allow override
      className
    )}
  >
    {children}
  </button>
);
```

#### State-based Styling

```tsx
<div className={cn(
  "transition-colors",
  isHovered && "bg-muted",
  isActive && "ring-2 ring-primary",
  isDisabled && "opacity-50 cursor-not-allowed"
)} />
```

---

## Class Value Types

`ClassValue` accepts:

```tsx
type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | { [key: string]: boolean | undefined | null };
```

### Examples

```tsx
// String
cn("text-lg")

// Array
cn(["p-4", "m-2"])

// Object (truthy values included)
cn({ "active": isActive, "disabled": isDisabled })

// Mixed
cn("base", ["array"], { "conditional": true })
```

---

## Adding New Utilities

### Pattern

```tsx
// src/lib/utils.ts

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
```

---

## Related Documentation

- [UI Components](../components/ui.md)
- [Design System](../styling/design-system.md)
