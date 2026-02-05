# Vibe Mind AI — Website

Marketing and AI chat website for Vibe Mind AI Solutions.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS + Framer Motion
- **3D:** React Three Fiber / Three.js
- **Routing:** React Router v6
- **State:** TanStack Query, React hooks

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
npm install
npm run dev
```

## Scripts

| Command              | Description                       |
| -------------------- | --------------------------------- |
| `npm run dev`        | Start dev server                  |
| `npm run build`      | Production build                  |
| `npm run preview`    | Preview production build          |
| `npm run lint`       | Run ESLint                        |
| `npm run format`     | Format code with Prettier         |
| `npm run format:check` | Check formatting              |

## Project Structure

```
src/
  components/    # Reusable UI components
  pages/         # Route-level page components
  hooks/         # Custom React hooks
  lib/           # Utility functions
  assets/        # Images and static assets
public/          # Static files served as-is
doc/             # Full documentation
```

## Documentation

See [`doc/`](./doc/) for detailed architecture, deployment, and contribution guides.

## Deployment

Deployed to GitHub Pages via CI. The production build is output to `dist/`.
