# Tailwind Configuration

**Last Updated:** 2026-01-25

---

## Overview

Custom Tailwind CSS configuration for the Vibe Mind website.

**File:** `tailwind.config.ts`

---

## Full Configuration

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "hsl(var(--primary-dark))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "glow": "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## Dark Mode

```typescript
darkMode: ["class"],
```

Enables class-based dark mode. The `.dark` class on `<html>` triggers dark mode styles.

---

## Content Paths

```typescript
content: [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}"
],
```

Tailwind scans these paths for class names to include in the build.

---

## Container

```typescript
container: {
  center: true,
  padding: "2rem",
  screens: {
    "2xl": "1400px",
  },
},
```

| Property | Value | Description |
|----------|-------|-------------|
| `center` | `true` | Horizontally centers container |
| `padding` | `2rem` | Default horizontal padding |
| `screens.2xl` | `1400px` | Max width at 2xl breakpoint |

---

## Custom Colors

All colors use CSS variables with HSL values for theme switching:

### Color Usage

| Token | Tailwind Class | CSS Variable |
|-------|---------------|--------------|
| Primary | `bg-primary` | `--primary` |
| Background | `bg-background` | `--background` |
| Foreground | `text-foreground` | `--foreground` |
| Muted | `bg-muted` | `--muted` |
| Accent | `bg-accent` | `--accent` |

### Extended Primary

```typescript
primary: {
  DEFAULT: "hsl(var(--primary))",
  foreground: "hsl(var(--primary-foreground))",
  dark: "hsl(var(--primary-dark))",
  glow: "hsl(var(--primary-glow))",
},
```

Allows `bg-primary`, `bg-primary-dark`, `bg-primary-glow` etc.

---

## Border Radius

```typescript
borderRadius: {
  lg: "var(--radius)",           // 0.75rem
  md: "calc(var(--radius) - 2px)", // 0.625rem
  sm: "calc(var(--radius) - 4px)", // 0.5rem
},
```

Extends default `rounded-*` classes with CSS variable-based values.

---

## Custom Animations

### Keyframes

```typescript
keyframes: {
  "fade-in": { ... },
  "fade-in-up": { ... },
  "scale-in": { ... },
  "glow": { ... },
  "accordion-down": { ... },
  "accordion-up": { ... },
},
```

### Animation Classes

| Class | Duration | Easing | Loop |
|-------|----------|--------|------|
| `animate-fade-in` | 0.6s | ease-out | once |
| `animate-fade-in-up` | 0.8s | ease-out | once |
| `animate-scale-in` | 0.4s | ease-out | once |
| `animate-glow` | 2s | ease-in-out | infinite |
| `animate-accordion-down` | 0.2s | ease-out | once |
| `animate-accordion-up` | 0.2s | ease-out | once |

---

## Plugins

```typescript
plugins: [require("tailwindcss-animate")],
```

**tailwindcss-animate** adds animation utility classes:

- `animate-in` / `animate-out`
- `fade-in` / `fade-out`
- `zoom-in` / `zoom-out`
- `spin-in` / `spin-out`
- `slide-in-from-*` / `slide-out-to-*`

---

## Adding Custom Configuration

### New Color

```typescript
// In theme.extend.colors
mycolor: {
  DEFAULT: "hsl(var(--mycolor))",
  foreground: "hsl(var(--mycolor-foreground))",
},
```

Then add CSS variables:

```css
:root {
  --mycolor: 200 80% 50%;
  --mycolor-foreground: 0 0% 100%;
}
```

### New Animation

```typescript
// In keyframes
"slide-up": {
  "0%": { transform: "translateY(100%)", opacity: "0" },
  "100%": { transform: "translateY(0)", opacity: "1" },
},

// In animation
"slide-up": "slide-up 0.5s ease-out",
```

### New Utility

For utilities not covered by Tailwind, add to `index.css`:

```css
@layer utilities {
  .my-utility {
    /* styles */
  }
}
```

---

## Related Documentation

- [Design System](./design-system.md)
- [Theme](./theme.md)
- [Animations](./animations.md)
