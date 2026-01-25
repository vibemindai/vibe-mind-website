# Design System

**Last Updated:** 2026-01-25

---

## Overview

The Vibe Mind design system uses Tailwind CSS with custom CSS variables for consistent styling.

---

## Colors

Colors are defined as HSL values in CSS variables, allowing for easy theme switching.

### Primary Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--primary` | `205 90% 58%` | `205 85% 60%` | Primary actions, links |
| `--primary-foreground` | `0 0% 100%` | `0 0% 100%` | Text on primary |
| `--primary-dark` | `240 70% 20%` | `240 50% 12%` | Dark accents, footer |
| `--primary-glow` | `200 95% 65%` | `200 90% 70%` | Glow effects |

### Secondary & Accent

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--secondary` | `240 4.8% 95.9%` | `240 50% 12%` | Secondary actions |
| `--accent` | `185 95% 58%` | `185 90% 60%` | Accent elements |

### Semantic Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | `0 0% 100%` | `240 50% 6%` | Page background |
| `--foreground` | `240 10% 3.9%` | `0 0% 98%` | Primary text |
| `--muted` | `240 4.8% 95.9%` | `240 50% 12%` | Muted backgrounds |
| `--muted-foreground` | `240 3.8% 46.1%` | `240 5% 64.9%` | Muted text |
| `--destructive` | `0 84.2% 60.2%` | `0 62.8% 50%` | Error, danger |

### Surface Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--card` | `0 0% 100%` | `240 50% 10%` | Card backgrounds |
| `--popover` | `0 0% 100%` | `240 50% 8%` | Popover backgrounds |
| `--border` | `240 5.9% 90%` | `240 40% 18%` | Borders |
| `--input` | `240 5.9% 90%` | `240 40% 18%` | Input borders |
| `--ring` | `205 90% 58%` | `205 85% 60%` | Focus rings |

### Using Colors

```tsx
// In Tailwind classes
<div className="bg-primary text-primary-foreground" />
<div className="bg-background text-foreground" />
<div className="border-border" />

// With opacity
<div className="bg-primary/50" />  // 50% opacity

// Hover states
<div className="hover:bg-muted" />
```

---

## Typography

### Font Family

```css
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
```

### Font Sizes (Tailwind)

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 0.75rem | 1rem | Captions, labels |
| `text-sm` | 0.875rem | 1.25rem | Secondary text |
| `text-base` | 1rem | 1.5rem | Body text |
| `text-lg` | 1.125rem | 1.75rem | Large body |
| `text-xl` | 1.25rem | 1.75rem | Subheadings |
| `text-2xl` | 1.5rem | 2rem | Small headings |
| `text-3xl` | 1.875rem | 2.25rem | Medium headings |
| `text-4xl` | 2.25rem | 2.5rem | Large headings |
| `text-5xl` | 3rem | 1 | Hero headings |
| `text-6xl` | 3.75rem | 1 | Display text |
| `text-7xl` | 4.5rem | 1 | Large display |

### Heading Hierarchy

```tsx
// Hero title
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">

// Section title
<h2 className="text-3xl md:text-4xl font-bold">

// Card title
<h3 className="text-xl font-semibold">
```

### Font Weights

| Class | Weight |
|-------|--------|
| `font-normal` | 400 |
| `font-medium` | 500 |
| `font-semibold` | 600 |
| `font-bold` | 700 |

---

## Spacing

### Tailwind Spacing Scale

| Class | Value | Common Use |
|-------|-------|------------|
| `p-2` | 0.5rem | Compact padding |
| `p-4` | 1rem | Standard padding |
| `p-6` | 1.5rem | Generous padding |
| `p-8` | 2rem | Section padding |
| `gap-4` | 1rem | Standard gap |
| `gap-8` | 2rem | Large gap |

### Section Spacing

```tsx
// Section padding
<section className="py-20">

// Container padding
<div className="container mx-auto px-4">

// Content spacing
<div className="space-y-4">
```

### Container

```tsx
// Tailwind config
container: {
  center: true,
  padding: "2rem",
  screens: {
    "2xl": "1400px",
  },
},
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | `0.75rem` | Base radius |
| `rounded-sm` | `calc(--radius - 4px)` | Small elements |
| `rounded-md` | `calc(--radius - 2px)` | Medium elements |
| `rounded-lg` | `--radius` | Large elements |
| `rounded-xl` | `1rem` | Cards, dialogs |
| `rounded-2xl` | `1.5rem` | Larger cards |
| `rounded-full` | `9999px` | Circles, pills |

---

## Shadows

### Custom Shadows

```css
--shadow-glow: 0 0 50px hsl(200 95% 65% / 0.4), 0 0 100px hsl(200 95% 65% / 0.2);
--shadow-elegant: 0 20px 40px -15px hsl(240 70% 20% / 0.3);
```

### Usage

```tsx
<div className="shadow-glow">  // Glowing effect
<div className="shadow-elegant">  // Elegant drop shadow
<div className="shadow-lg">  // Standard shadow
```

---

## Gradients

### Custom Gradients

```css
--gradient-primary: linear-gradient(135deg, hsl(240 70% 20%), hsl(255 75% 55%), hsl(205 90% 58%));
--gradient-hero: linear-gradient(180deg, hsl(240 70% 20%) 0%, hsl(255 70% 50%) 50%, hsl(205 90% 58%) 100%);
--gradient-accent: linear-gradient(135deg, hsl(205 90% 58%), hsl(185 95% 58%));
```

### Utility Classes

```tsx
<div className="gradient-primary">
<div className="gradient-hero">
<div className="gradient-accent">
```

### Text Gradients

```tsx
<span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
  Gradient Text
</span>
```

---

## Transitions

### Custom Transition

```css
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Usage

```tsx
<button className="transition-smooth hover:scale-105">
```

### Standard Transitions

```tsx
// Color transitions
<div className="transition-colors hover:bg-muted">

// Transform transitions
<div className="transition-transform hover:scale-105">

// All properties
<div className="transition-all duration-300">
```

---

## Responsive Breakpoints

| Breakpoint | Prefix | Min Width |
|------------|--------|-----------|
| Mobile | (none) | 0px |
| sm | `sm:` | 640px |
| md | `md:` | 768px |
| lg | `lg:` | 1024px |
| xl | `xl:` | 1280px |
| 2xl | `2xl:` | 1536px |

### Usage

```tsx
<div className="text-sm md:text-base lg:text-lg">
<div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
<div className="hidden lg:block">
```

---

## Related Documentation

- [Theme](./theme.md)
- [Tailwind Config](./tailwind-config.md)
- [Animations](./animations.md)
