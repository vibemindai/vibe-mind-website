# Layout Components

**Last Updated:** 2026-01-25

---

## Overview

Layout components provide structural elements that are consistent across pages.

---

## Navigation

**File:** `src/components/Navigation.tsx`

Main navigation bar used on About, Services, and Contact pages.

### Features

- Fixed position at top of viewport
- Background transparency changes on scroll
- Mobile hamburger menu
- Smooth scroll to sections
- Keyboard accessibility (Escape to close menu)

### Props

```tsx
// No props - uses internal state
const Navigation = () => { ... }
```

### State

```tsx
const [isScrolled, setIsScrolled] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
```

### Navigation Items

```tsx
const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Contact", href: "#contact" }
];
```

### Styling States

| State | Classes Applied |
|-------|-----------------|
| Not scrolled | `bg-transparent` |
| Scrolled | `bg-background/95 backdrop-blur-md shadow-elegant border-b` |
| Mobile menu open | Body overflow hidden |

### Usage

```tsx
import Navigation from "@/components/Navigation";

const Page = () => (
  <div>
    <Navigation />
    {/* Page content */}
  </div>
);
```

---

## HomeNavigation

**File:** `src/components/HomeNavigation.tsx`

Simplified navigation for the home page with page links instead of anchor links.

### Differences from Navigation

| Feature | Navigation | HomeNavigation |
|---------|------------|----------------|
| Links | Anchor links (`#section`) | Page links (`/about`) |
| Theme toggle | No | Yes |
| Context | Inner pages | Home page only |

### Usage

```tsx
import HomeNavigation from "@/components/HomeNavigation";

const HomePage = () => (
  <div>
    <HomeNavigation />
    {/* Home page content */}
  </div>
);
```

---

## Footer

**File:** `src/components/Footer.tsx`

Site footer with navigation links and company information.

### Structure

```tsx
<footer className="bg-primary-dark py-12 border-t border-border">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* Brand */}
      {/* Services Links */}
      {/* Products Links */}
      {/* Company Links */}
    </div>

    <div className="pt-8 border-t border-border/50">
      <p>© {currentYear} Vibe Mind AI Solutions.</p>
    </div>
  </div>
</footer>
```

### Footer Columns

1. **Brand** - Logo and tagline
2. **Services** - Service page links
3. **Products** - Product links (including external JyotAI.in)
4. **Company** - About and Contact links

### Dynamic Year

```tsx
const currentYear = new Date().getFullYear();
```

### Usage

```tsx
import Footer from "@/components/Footer";

const Page = () => (
  <div>
    {/* Page content */}
    <Footer />
  </div>
);
```

---

## PageTransition

**File:** `src/components/PageTransition.tsx`

Wrapper component that animates route transitions.

### Props

```tsx
interface PageTransitionProps {
  children: ReactNode;
}
```

### Animation Variants

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

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};
```

### Usage

```tsx
// In App.tsx
<Route
  path="/about"
  element={
    <PageTransition>
      <AboutPage />
    </PageTransition>
  }
/>
```

### How It Works

1. Wraps page content in `motion.div`
2. Works with `AnimatePresence` in parent
3. `location.pathname` as key triggers re-animation
4. Exit animation plays before new page enters

---

## NavLink

**File:** `src/components/NavLink.tsx`

Reusable navigation link component with hover effects.

### Features

- Underline animation on hover
- Active state styling
- Smooth transitions

---

## Layout Patterns

### Full-Page Layout

```tsx
<div className="min-h-screen bg-background">
  <Navigation />
  <main>
    {/* Sections */}
  </main>
  <Footer />
</div>
```

### Container Pattern

```tsx
<section className="py-20">
  <div className="container mx-auto px-4">
    {/* Content */}
  </div>
</section>
```

### Grid Layouts

```tsx
{/* 4-column responsive grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
  {/* Items */}
</div>

{/* 2-column with divider */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <div className="border-r border-border/30">
    {/* Left */}
  </div>
  <div>
    {/* Right */}
  </div>
</div>
```

---

## Related Documentation

- [Page Components](./pages.md)
- [Animation Components](./animations.md)
- [Routing](../architecture/routing.md)
