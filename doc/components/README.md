# Components Overview

**Last Updated:** 2026-01-25

---

## Component Library

The Vibe Mind website uses a combination of custom components and the shadcn/ui component library.

---

## Component Categories

### 1. Page Components

Entry points for each route, compose sections and layout components.

| Component | File | Route |
|-----------|------|-------|
| `Index` | `src/pages/Index.tsx` | `/` |
| `AboutPage` | `src/pages/AboutPage.tsx` | `/about` |
| `ServicesPage` | `src/pages/ServicesPage.tsx` | `/services` |
| `ContactPage` | `src/pages/ContactPage.tsx` | `/contact` |
| `NotFound` | `src/pages/NotFound.tsx` | `*` |

[View Page Components Documentation](./pages.md)

---

### 2. Layout Components

Structural components that provide consistent layout across pages.

| Component | File | Purpose |
|-----------|------|---------|
| `Navigation` | `src/components/Navigation.tsx` | Main site navigation |
| `HomeNavigation` | `src/components/HomeNavigation.tsx` | Homepage navigation |
| `Footer` | `src/components/Footer.tsx` | Site footer |
| `PageTransition` | `src/components/PageTransition.tsx` | Route transitions |

[View Layout Components Documentation](./layout.md)

---

### 3. Section Components

Content sections used within pages.

| Component | File | Purpose |
|-----------|------|---------|
| `Hero` | `src/components/Hero.tsx` | Hero section |
| `About` | `src/components/About.tsx` | About section |
| `Services` | `src/components/Services.tsx` | Services section |
| `Products` | `src/components/Products.tsx` | Products showcase |
| `Contact` | `src/components/Contact.tsx` | Contact form |
| `TechStack` | `src/components/TechStack.tsx` | Technology list |
| `Testimonials` | `src/components/Testimonials.tsx` | Testimonials |
| `ServiceCarousel` | `src/components/ServiceCarousel.tsx` | Service cards |

---

### 4. Interactive Components

Components with complex interactivity or animations.

| Component | File | Purpose |
|-----------|------|---------|
| `AIChatWindow` | `src/components/AIChatWindow.tsx` | AI chat interface |
| `TechGlobe` | `src/components/TechGlobe.tsx` | 3D tech visualization |
| `ThemeToggle` | `src/components/ThemeToggle.tsx` | Theme switch |

[View Interactive Components Documentation](./interactive.md)

---

### 5. Animation Components

Components that handle animations and transitions.

| Component | File | Purpose |
|-----------|------|---------|
| `PageTransition` | `src/components/PageTransition.tsx` | Route transitions |
| `AnimatedSection` | `src/components/AnimatedSection.tsx` | Scroll animations |

[View Animation Components Documentation](./animations.md)

---

### 6. UI Components (shadcn/ui)

Pre-built accessible components from shadcn/ui library.

**Location:** `src/components/ui/`

| Category | Components |
|----------|------------|
| **Buttons** | `button.tsx` |
| **Forms** | `input.tsx`, `textarea.tsx`, `label.tsx`, `checkbox.tsx`, `radio-group.tsx`, `select.tsx`, `switch.tsx`, `slider.tsx`, `form.tsx` |
| **Cards** | `card.tsx` |
| **Dialogs** | `dialog.tsx`, `alert-dialog.tsx`, `drawer.tsx`, `sheet.tsx` |
| **Navigation** | `navigation-menu.tsx`, `menubar.tsx`, `dropdown-menu.tsx`, `context-menu.tsx`, `tabs.tsx`, `breadcrumb.tsx`, `pagination.tsx` |
| **Feedback** | `toast.tsx`, `toaster.tsx`, `sonner.tsx`, `alert.tsx`, `skeleton.tsx`, `progress.tsx` |
| **Overlay** | `popover.tsx`, `tooltip.tsx`, `hover-card.tsx`, `command.tsx` |
| **Data** | `table.tsx`, `accordion.tsx`, `collapsible.tsx`, `avatar.tsx`, `badge.tsx`, `separator.tsx` |
| **Layout** | `scroll-area.tsx`, `resizable.tsx`, `sidebar.tsx`, `aspect-ratio.tsx` |
| **Other** | `calendar.tsx`, `carousel.tsx`, `chart.tsx`, `input-otp.tsx`, `toggle.tsx`, `toggle-group.tsx` |

[View UI Components Documentation](./ui.md)

---

## Component Patterns

### Composition Pattern

Components are designed for composition:

```tsx
<AnimatedSection delay={0.2} direction="up">
  <Card>
    <CardHeader>
      <CardTitle>Title</CardTitle>
    </CardHeader>
    <CardContent>Content</CardContent>
  </Card>
</AnimatedSection>
```

### Props Pattern

Consistent prop interfaces:

```tsx
interface ComponentProps {
  children?: ReactNode;
  className?: string;
  // Component-specific props
}
```

### Styling Pattern

Using `cn()` utility for conditional classes:

```tsx
<div className={cn(
  "base-classes",
  variant === "primary" && "primary-classes",
  className
)}>
```

---

## Import Conventions

```tsx
// UI components from shadcn
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

// Custom components
import Navigation from "@/components/Navigation";
import AnimatedSection from "@/components/AnimatedSection";

// Hooks
import { useTheme } from "@/hooks/useTheme";

// Utilities
import { cn } from "@/lib/utils";
```

---

## Related Documentation

- [Page Components](./pages.md)
- [Layout Components](./layout.md)
- [UI Components](./ui.md)
- [Interactive Components](./interactive.md)
- [Animation Components](./animations.md)
