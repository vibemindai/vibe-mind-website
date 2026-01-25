# Page Components

**Last Updated:** 2026-01-25

---

## Overview

Page components are the entry points for each route. They compose section and layout components to create complete pages.

**Location:** `src/pages/`

---

## Index

**File:** `src/pages/Index.tsx`
**Route:** `/`

The home page wrapper that renders the `HomePage` component.

```tsx
import HomePage from "@/components/HomePage";

const Index = () => {
  return <HomePage />;
};

export default Index;
```

### HomePage Component

**File:** `src/components/HomePage.tsx`

The actual home page content with a two-column layout:

```tsx
<div className="min-h-screen bg-background">
  <HomeNavigation />

  <div className="pt-14 sm:pt-16 lg:pt-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Left: Hero + Services */}
      <div>
        <h1>AI Solutions to Empower Your Business</h1>
        <p>Welcome to VibeMind Solutions...</p>
        <Button>Discover Our Services</Button>
        <Button variant="outline">Learn More</Button>
        <ServiceCarousel />
      </div>

      {/* Right: AI Chat */}
      <div>
        <AIChatWindow />
      </div>
    </div>
  </div>
</div>
```

**Key Features:**
- Two-column responsive grid (stacks on mobile)
- Hero content with CTA buttons
- Service carousel on left
- AI chat interface on right

---

## AboutPage

**File:** `src/pages/AboutPage.tsx`
**Route:** `/about`

Company information page.

### Structure

```tsx
<div>
  <Navigation />
  <Hero />
  <About />
  <TechStack />
  <Testimonials />
  <Footer />
</div>
```

### Sections

1. **Hero** - Full-width hero with background image and gradient overlay
2. **About** - Company mission and values
3. **TechStack** - Technology showcase
4. **Testimonials** - Client testimonials

---

## ServicesPage

**File:** `src/pages/ServicesPage.tsx`
**Route:** `/services`

Service offerings and technology showcase.

### Structure

```tsx
<div>
  <Navigation />
  <Hero />
  <Services />
  <TechGlobe />
  <Products />
  <Footer />
</div>
```

### Sections

1. **Hero** - Service hero section
2. **Services** - Detailed service cards
3. **TechGlobe** - Interactive 3D tech visualization
4. **Products** - Product showcase

---

## ContactPage

**File:** `src/pages/ContactPage.tsx`
**Route:** `/contact`

Contact form and company contact information.

### Structure

```tsx
<div>
  <Navigation />
  <Hero />
  <Contact />
  <Footer />
</div>
```

### Sections

1. **Hero** - Contact hero section
2. **Contact** - Contact form and info grid

---

## NotFound

**File:** `src/pages/NotFound.tsx`
**Route:** `*` (catch-all)

404 error page displayed for unmatched routes.

### Features

- Error message
- Navigation back to home
- Consistent styling with rest of site

---

## Page Composition Pattern

All pages follow a consistent pattern:

```tsx
const SomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Content Sections */}
      <AnimatedSection>
        <SectionContent />
      </AnimatedSection>

      {/* Footer */}
      <Footer />
    </div>
  );
};
```

---

## Responsive Behavior

### Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | < 640px | Single column, simplified layouts |
| Tablet (sm) | >= 640px | Improved spacing, some grids |
| Desktop (lg) | >= 1024px | Full layouts, side-by-side content |
| Large (xl) | >= 1280px | Maximum content width |

### HomePage Responsive Grid

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
  {/* Stacks vertically on mobile, side-by-side on lg+ */}
</div>
```

---

## Adding New Pages

1. Create the page component:

```tsx
// src/pages/NewPage.tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const NewPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h1>New Page</h1>
            <p>Content here...</p>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewPage;
```

2. Add the route in `src/App.tsx`:

```tsx
import NewPage from "./pages/NewPage";

// In AnimatedRoutes:
<Route
  path="/new"
  element={
    <PageTransition>
      <NewPage />
    </PageTransition>
  }
/>
```

---

## Related Documentation

- [Layout Components](./layout.md)
- [Routing](../architecture/routing.md)
- [Animation Components](./animations.md)
