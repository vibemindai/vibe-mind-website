# Development Setup

**Last Updated:** 2026-01-25

---

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x (or yarn/pnpm)
- **Git**

---

## Quick Start

```bash
# Clone repository
git clone <repository-url>
cd vibe-mind-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:5173/`

---

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development (unminified) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
vibe-mind-website/
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── assets/          # Images, fonts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── doc/                 # Documentation
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

---

## IDE Setup

### VS Code

Recommended extensions:

- **ESLint** - Code linting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **TypeScript Vue Plugin (Volar)** - TypeScript support
- **Prettier** - Code formatting

### Settings

`.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## Environment Variables

Create a `.env` file in the project root if needed:

```env
VITE_API_URL=http://localhost:3001
VITE_ANALYTICS_ID=UA-XXXXXXXX-X
```

Access in code:

```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Adding shadcn/ui Components

```bash
# Add a single component
npx shadcn-ui@latest add button

# Add multiple components
npx shadcn-ui@latest add card dialog toast

# Add all components
npx shadcn-ui@latest add --all
```

Components are added to `src/components/ui/`.

---

## Development Workflow

### 1. Creating Components

```tsx
// src/components/MyComponent.tsx
import { cn } from "@/lib/utils";

interface MyComponentProps {
  children: React.ReactNode;
  className?: string;
}

const MyComponent = ({ children, className }: MyComponentProps) => {
  return (
    <div className={cn("default-styles", className)}>
      {children}
    </div>
  );
};

export default MyComponent;
```

### 2. Creating Pages

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
            <h1 className="text-4xl font-bold">New Page</h1>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewPage;
```

### 3. Adding Routes

```tsx
// src/App.tsx
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

## Hot Module Replacement

Vite provides fast HMR out of the box. Changes to:

- **React components** - Instant update, preserving state
- **CSS/Tailwind** - Instant style updates
- **TypeScript** - Fast recompilation

---

## Path Aliases

The `@/` alias points to `src/`:

```tsx
// Instead of
import { Button } from "../../../components/ui/button";

// Use
import { Button } from "@/components/ui/button";
```

Configured in `vite.config.ts` and `tsconfig.json`.

---

## Debugging

### React DevTools

Install the React DevTools browser extension to inspect components, props, and state.

### Console Logging

```tsx
console.log("Debug value:", value);

// For objects
console.log({ component: "MyComponent", props, state });
```

### Vite Debug

Enable verbose logging:

```bash
DEBUG=vite:* npm run dev
```

---

## Common Issues

### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### TypeScript Errors

```bash
# Check TypeScript
npx tsc --noEmit
```

---

## Related Documentation

- [Git Workflow](./git-workflow.md)
- [Code Standards](./code-standards.md)
- [Build](../deployment/build.md)
