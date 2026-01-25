# Component Tree

**Last Updated:** 2026-01-25

---

## Application Component Hierarchy

```mermaid
graph TD
    App[App.tsx] --> QCP[QueryClientProvider]
    QCP --> ThemeP[ThemeProvider]
    ThemeP --> TTP[TooltipProvider]
    TTP --> Toaster1[Toaster]
    TTP --> Toaster2[Sonner]
    TTP --> BR[BrowserRouter]
    BR --> RH[RedirectHandler]
    BR --> AR[AnimatedRoutes]

    AR --> |"/"| PT1[PageTransition]
    AR --> |"/about"| PT2[PageTransition]
    AR --> |"/services"| PT3[PageTransition]
    AR --> |"/contact"| PT4[PageTransition]
    AR --> |"*"| PT5[PageTransition]

    PT1 --> Index[Index]
    PT2 --> AboutPage[AboutPage]
    PT3 --> ServicesPage[ServicesPage]
    PT4 --> ContactPage[ContactPage]
    PT5 --> NotFound[NotFound]

    Index --> HomePage[HomePage]
```

---

## Page Component Trees

### HomePage (`/`)

```mermaid
graph TD
    HomePage --> HomeNav[HomeNavigation]
    HomePage --> MainContent[Main Content Grid]

    HomeNav --> Logo[Logo/Brand]
    HomeNav --> NavLinks[Navigation Links]
    HomeNav --> ThemeToggle[ThemeToggle]
    HomeNav --> MobileMenu[Mobile Menu]

    MainContent --> LeftSide[Left Side]
    MainContent --> RightSide[Right Side]

    LeftSide --> HeroContent[Hero Content]
    LeftSide --> ServiceCarousel[ServiceCarousel]

    HeroContent --> H1[Title]
    HeroContent --> Description[Description]
    HeroContent --> CTAButtons[CTA Buttons]

    RightSide --> AIChatWindow[AIChatWindow]

    AIChatWindow --> TypingIndicator[TypingIndicator]
    AIChatWindow --> Greeting[Greeting Bubble]
    AIChatWindow --> RobotIllustration[Robot Illustration]
    AIChatWindow --> SuggestedQ[Suggested Questions]
    AIChatWindow --> ChatInput[Chat Input]
```

### AboutPage (`/about`)

```mermaid
graph TD
    AboutPage --> Navigation[Navigation]
    AboutPage --> Hero[Hero Section]
    AboutPage --> About[About Section]
    AboutPage --> TechStack[TechStack]
    AboutPage --> Testimonials[Testimonials]
    AboutPage --> Footer[Footer]

    About --> AnimatedSection1[AnimatedSection]
    TechStack --> AnimatedSection2[AnimatedSection]
    Testimonials --> AnimatedSection3[AnimatedSection]
```

### ServicesPage (`/services`)

```mermaid
graph TD
    ServicesPage --> Navigation[Navigation]
    ServicesPage --> Hero[Hero Section]
    ServicesPage --> Services[Services Section]
    ServicesPage --> TechGlobe[TechGlobe]
    ServicesPage --> Products[Products Section]
    ServicesPage --> Footer[Footer]

    Services --> AnimatedSection1[AnimatedSection]
    TechGlobe --> Canvas[Three.js Canvas]
    Products --> AnimatedSection2[AnimatedSection]

    Canvas --> Scene[Scene]
    Scene --> Starfield[Starfield]
    Scene --> WireframeGlobe[WireframeGlobe]
    Scene --> OrbitingItems[OrbitingItem x N]
    Scene --> OrbitControls[OrbitControls]
```

### ContactPage (`/contact`)

```mermaid
graph TD
    ContactPage --> Navigation[Navigation]
    ContactPage --> Hero[Hero Section]
    ContactPage --> Contact[Contact Section]
    ContactPage --> Footer[Footer]

    Contact --> AnimatedSection[AnimatedSection]
    Contact --> ContactForm[Contact Form]
    Contact --> ContactInfo[Contact Info]
```

---

## Component Relationship Matrix

| Component | Uses | Used By |
|-----------|------|---------|
| `App` | Providers, Router | `main.tsx` |
| `ThemeProvider` | React Context | `App` |
| `PageTransition` | Framer Motion | `AnimatedRoutes` |
| `AnimatedSection` | Framer Motion | Page components |
| `Navigation` | NavLink, ThemeToggle | Page components |
| `HomeNavigation` | NavLink, ThemeToggle | `HomePage` |
| `Button` | Radix Slot, CVA | Many components |
| `AIChatWindow` | Button, Input | `HomePage` |
| `TechGlobe` | React Three Fiber | `ServicesPage` |
| `ServiceCarousel` | Card, Carousel | `HomePage` |

---

## Component Categories

### Provider Components

```
QueryClientProvider
└── ThemeProvider
    └── TooltipProvider
```

### Layout Components

```
Navigation
HomeNavigation
Footer
PageTransition
```

### Section Components

```
Hero
About
Services
Products
Contact
TechStack
Testimonials
```

### Interactive Components

```
AIChatWindow
├── TypingIndicator
├── Suggested Questions
└── Chat Input

TechGlobe
├── WireframeGlobe
├── OrbitingItem
├── Starfield
└── OrbitControls
```

### Animation Components

```
PageTransition (route transitions)
AnimatedSection (scroll animations)
```

### UI Components (shadcn/ui)

```
button, input, card, dialog, dropdown-menu,
toast, tooltip, tabs, accordion, sheet,
form, label, select, checkbox, radio-group...
```

---

## Component Depth Analysis

| Level | Components |
|-------|------------|
| 0 | `App` |
| 1 | Providers (`QueryClientProvider`, `ThemeProvider`, etc.) |
| 2 | `BrowserRouter`, `AnimatedRoutes` |
| 3 | `PageTransition` |
| 4 | Page components (`Index`, `AboutPage`, etc.) |
| 5 | Section components (`Hero`, `About`, `Services`, etc.) |
| 6 | Interactive components (`AIChatWindow`, `TechGlobe`) |
| 7 | UI primitives (`Button`, `Input`, etc.) |

---

## Related Documentation

- [Data Flow](./data-flow.md)
- [Routing](./routing.md)
- [Components Overview](../components/README.md)
