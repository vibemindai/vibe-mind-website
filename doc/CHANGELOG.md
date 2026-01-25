# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive documentation system in `/doc` folder
- Automated changelog generation with standard-version
- Conventional commit enforcement with commitlint
- Git hooks via Husky for commit validation

### Changed
- None

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- None

---

## [1.0.0] - 2026-01-25

### Added

#### Core Features
- Initial React 18 + TypeScript + Vite project setup
- Multi-page routing with React Router v6 (Home, About, Services, Contact)
- 404 Not Found page with navigation

#### UI Components
- Full shadcn/ui component library integration
- Custom Navigation component with mobile menu
- HomeNavigation with in-page anchor links
- Footer component with site links
- ServiceCarousel for service showcasing

#### Interactive Components
- AIChatWindow with simulated AI assistant
- TechGlobe 3D visualization using React Three Fiber
- Typing indicator animation
- Suggested questions interface

#### Animation System
- PageTransition component with Framer Motion
- AnimatedSection for scroll-triggered animations
- Custom keyframe animations (fade-in, fade-in-up, scale-in, glow)

#### Theme System
- Dark/Light theme with ThemeProvider
- Time-based automatic theme switching (6PM-6AM dark mode)
- Theme persistence in localStorage
- ThemeToggle component

#### Styling
- Complete Tailwind CSS configuration
- Custom color palette with HSL CSS variables
- Gradient utilities (gradient-primary, gradient-hero, gradient-accent)
- Shadow utilities (shadow-glow, shadow-elegant)
- Responsive design with mobile-first approach

#### Pages
- Index (HomePage) - Hero section with AI chat
- AboutPage - Company information
- ServicesPage - Service offerings
- ContactPage - Contact form and information

### Technical
- Vite build configuration
- Path aliases (@/ for src/)
- ESLint configuration
- TypeScript strict mode
- PostCSS with Autoprefixer

---

## Commit Types

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, etc.) |
| `refactor` | Code refactoring |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |

### Examples

```
feat(chat): add typing indicator animation
fix(nav): resolve mobile menu z-index issue
docs(readme): update installation instructions
style(button): adjust hover state colors
refactor(theme): simplify context provider
perf(globe): optimize 3D rendering performance
test(utils): add unit tests for cn function
chore(deps): update react to 18.3.1
```

---

[Unreleased]: https://github.com/your-org/vibe-mind-website/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/your-org/vibe-mind-website/releases/tag/v1.0.0
