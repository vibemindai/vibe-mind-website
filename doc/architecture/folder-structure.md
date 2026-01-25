# Folder Structure

**Last Updated:** 2026-01-25

---

## Project Root

```
vibe-mind-website/
├── doc/                    # Documentation (this folder)
├── public/                 # Static assets served directly
├── src/                    # Source code
├── node_modules/           # Dependencies
├── .husky/                 # Git hooks
├── components.json         # shadcn/ui configuration
├── package.json            # Project manifest
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite configuration
├── postcss.config.js       # PostCSS configuration
├── eslint.config.js        # ESLint configuration
└── index.html              # HTML entry point
```

---

## Source Directory (`/src`)

```
src/
├── assets/                 # Images, fonts, static files
│   └── hero-bg.jpg         # Hero section background
│
├── components/             # React components
│   ├── ui/                 # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ... (50+ components)
│   │
│   ├── About.tsx           # About section component
│   ├── AIChatWindow.tsx    # AI chat interface
│   ├── AnimatedSection.tsx # Scroll animation wrapper
│   ├── Contact.tsx         # Contact section
│   ├── Footer.tsx          # Site footer
│   ├── Hero.tsx            # Hero section
│   ├── HomePage.tsx        # Home page layout
│   ├── HomeNavigation.tsx  # Home-specific navigation
│   ├── Navigation.tsx      # Main navigation
│   ├── NavLink.tsx         # Navigation link component
│   ├── PageTransition.tsx  # Route transition wrapper
│   ├── Products.tsx        # Products section
│   ├── ServiceCarousel.tsx # Services carousel
│   ├── Services.tsx        # Services section
│   ├── TechGlobe.tsx       # 3D tech visualization
│   ├── TechStack.tsx       # Tech stack display
│   ├── Testimonials.tsx    # Testimonials section
│   └── ThemeToggle.tsx     # Theme switch button
│
├── hooks/                  # Custom React hooks
│   ├── useTheme.tsx        # Theme context & hook
│   ├── use-mobile.tsx      # Mobile detection hook
│   └── use-toast.ts        # Toast notification hook
│
├── lib/                    # Utility libraries
│   └── utils.ts            # cn() utility function
│
├── pages/                  # Page components
│   ├── Index.tsx           # Home page
│   ├── AboutPage.tsx       # About page
│   ├── ServicesPage.tsx    # Services page
│   ├── ContactPage.tsx     # Contact page
│   └── NotFound.tsx        # 404 page
│
├── App.tsx                 # Main app component
├── App.css                 # App-level styles
├── main.tsx                # Application entry point
├── index.css               # Global styles & CSS variables
└── vite-env.d.ts           # Vite type declarations
```

---

## Documentation Directory (`/doc`)

```
doc/
├── README.md               # Documentation index
├── VERSION.md              # Version information
├── CHANGELOG.md            # Change history
│
├── architecture/           # System architecture
│   ├── overview.md         # High-level overview
│   ├── folder-structure.md # This file
│   ├── component-tree.md   # Component hierarchy
│   ├── data-flow.md        # State & data flow
│   └── routing.md          # Route structure
│
├── components/             # Component documentation
│   ├── README.md           # Component overview
│   ├── pages.md            # Page components
│   ├── layout.md           # Layout components
│   ├── ui.md               # UI components
│   ├── interactive.md      # Interactive components
│   └── animations.md       # Animation components
│
├── api/                    # API & utilities
│   ├── hooks.md            # Custom hooks
│   ├── utils.md            # Utility functions
│   ├── types.md            # TypeScript types
│   └── constants.md        # Constants
│
├── styling/                # Styling documentation
│   ├── design-system.md    # Design system
│   ├── theme.md            # Theme system
│   ├── animations.md       # Animation patterns
│   └── tailwind-config.md  # Tailwind config
│
├── workflow/               # Development workflow
│   ├── development.md      # Dev setup
│   ├── git-workflow.md     # Git conventions
│   ├── code-standards.md   # Code standards
│   └── testing.md          # Testing guide
│
├── deployment/             # Deployment docs
│   ├── build.md            # Build process
│   ├── environments.md     # Environment config
│   └── hosting.md          # Hosting setup
│
├── integration/            # Integrations
│   ├── third-party.md      # External libraries
│   ├── seo.md              # SEO setup
│   └── analytics.md        # Analytics
│
└── contributing/           # Contribution guides
    ├── CONTRIBUTING.md     # How to contribute
    ├── pull-request-template.md
    └── issue-template.md
```

---

## Component Categories

### UI Components (`src/components/ui/`)

Auto-generated by shadcn/ui CLI. Contains 50+ accessible, customizable components:

| Category | Components |
|----------|------------|
| **Forms** | button, input, textarea, checkbox, radio-group, select, switch, slider, form, label |
| **Feedback** | alert, alert-dialog, dialog, drawer, sheet, toast, toaster, sonner, skeleton, progress |
| **Navigation** | navigation-menu, menubar, dropdown-menu, context-menu, tabs, breadcrumb, pagination |
| **Data Display** | card, table, accordion, collapsible, hover-card, avatar, badge, separator |
| **Overlay** | popover, tooltip, command, calendar |
| **Layout** | scroll-area, resizable, sidebar, aspect-ratio |

### Custom Components (`src/components/`)

Project-specific components built for the Vibe Mind website:

| Component | Type | Description |
|-----------|------|-------------|
| `AIChatWindow` | Interactive | AI chat simulation |
| `TechGlobe` | Interactive | 3D tech visualization |
| `AnimatedSection` | Animation | Scroll-triggered animation |
| `PageTransition` | Animation | Route transitions |
| `Navigation` | Layout | Main site navigation |
| `HomeNavigation` | Layout | Home page navigation |
| `Footer` | Layout | Site footer |
| `Hero` | Section | Hero section |
| `About` | Section | About section |
| `Services` | Section | Services section |
| `Products` | Section | Products section |
| `Contact` | Section | Contact section |

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `PageTransition.tsx` |
| Hooks | camelCase with `use` prefix | `useTheme.tsx` |
| Utilities | camelCase | `utils.ts` |
| Pages | PascalCase with `Page` suffix | `AboutPage.tsx` |
| Styles | kebab-case | `index.css` |
| Config files | kebab-case | `tailwind.config.ts` |

---

## Related Documentation

- [Component Tree](./component-tree.md)
- [Components Overview](../components/README.md)
