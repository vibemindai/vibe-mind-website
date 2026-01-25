# Vibe Mind Website Documentation

> **Single source of truth** for the Vibe Mind AI Solutions website project.

**Last Updated:** 2026-01-25
**Version:** [1.0.0](./VERSION.md)

---

## Quick Navigation

### Core Documentation

| Document | Description |
|----------|-------------|
| [VERSION.md](./VERSION.md) | Current version & release notes |
| [CHANGELOG.md](./CHANGELOG.md) | Auto-generated change history |

### Architecture

| Document | Description |
|----------|-------------|
| [Overview](./architecture/overview.md) | High-level system architecture |
| [Folder Structure](./architecture/folder-structure.md) | Project organization explained |
| [Component Tree](./architecture/component-tree.md) | Component hierarchy with Mermaid |
| [Data Flow](./architecture/data-flow.md) | State management & data flow |
| [Routing](./architecture/routing.md) | Route structure & navigation |

### Components

| Document | Description |
|----------|-------------|
| [Overview](./components/README.md) | Component library overview |
| [Pages](./components/pages.md) | Page components (Index, About, Services, Contact) |
| [Layout](./components/layout.md) | Layout components (Navigation, Footer) |
| [UI](./components/ui.md) | UI components (shadcn/ui usage) |
| [Interactive](./components/interactive.md) | Interactive components (AIChatWindow, TechGlobe) |
| [Animations](./components/animations.md) | Animation components & patterns |

### API & Utilities

| Document | Description |
|----------|-------------|
| [Hooks](./api/hooks.md) | Custom hooks documentation |
| [Utils](./api/utils.md) | Utility functions |
| [Types](./api/types.md) | TypeScript types & interfaces |
| [Constants](./api/constants.md) | Configuration constants |

### Styling

| Document | Description |
|----------|-------------|
| [Design System](./styling/design-system.md) | Colors, typography, spacing |
| [Theme](./styling/theme.md) | Dark/Light theme system |
| [Animations](./styling/animations.md) | Animation patterns & keyframes |
| [Tailwind Config](./styling/tailwind-config.md) | Custom Tailwind configuration |

### Workflow

| Document | Description |
|----------|-------------|
| [Development](./workflow/development.md) | Development setup & commands |
| [Git Workflow](./workflow/git-workflow.md) | Branch strategy, commit conventions |
| [Code Standards](./workflow/code-standards.md) | Coding standards & patterns |
| [Testing](./workflow/testing.md) | Testing approach |

### Deployment

| Document | Description |
|----------|-------------|
| [Build](./deployment/build.md) | Build process & optimization |
| [Environments](./deployment/environments.md) | Environment configuration |
| [Hosting](./deployment/hosting.md) | Deployment instructions |

### Integration

| Document | Description |
|----------|-------------|
| [Third-Party](./integration/third-party.md) | External libraries & services |
| [SEO](./integration/seo.md) | SEO setup & structured data |
| [Analytics](./integration/analytics.md) | Analytics integration |

### Contributing

| Document | Description |
|----------|-------------|
| [CONTRIBUTING.md](./contributing/CONTRIBUTING.md) | How to contribute |
| [Pull Request Template](./contributing/pull-request-template.md) | PR template |
| [Issue Template](./contributing/issue-template.md) | Issue template |

---

## Project Summary

**Vibe Mind AI Solutions** is a modern React-based website showcasing AI development services. Built with:

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Animation:** Framer Motion
- **3D Graphics:** React Three Fiber
- **State:** React Query + Context API
- **Routing:** React Router v6

### Key Features

1. **Animated Page Transitions** - Smooth transitions between routes using Framer Motion
2. **Interactive 3D Tech Globe** - Three.js powered visualization of tech stack
3. **AI Chat Interface** - Simulated AI assistant chat window
4. **Dark/Light Theme** - Time-based automatic theme switching
5. **Responsive Design** - Mobile-first approach with tailored layouts
6. **SEO Optimized** - Semantic HTML with proper meta tags

---

## For AI Tools

This documentation is structured for easy AI parsing:

- **Consistent headers** - H1/H2/H3 hierarchy throughout
- **Code blocks with language tags** - Syntax highlighting context
- **File path references** - Full paths like `src/components/Hero.tsx`
- **Cross-references** - Links between related docs
- **Mermaid diagrams** - Visual architecture representations

### Quick Context Commands

```bash
# Get project overview
cat doc/README.md

# Understand architecture
cat doc/architecture/overview.md

# Find component details
cat doc/components/README.md

# Check recent changes
cat doc/CHANGELOG.md
```

---

## Maintaining This Documentation

1. **Update VERSION.md** when releasing new versions
2. **Run changelog generation** after making commits: `npm run changelog`
3. **Update relevant docs** when modifying code
4. **Add timestamps** to modified documents

See [Contributing Guide](./contributing/CONTRIBUTING.md) for detailed guidelines.
