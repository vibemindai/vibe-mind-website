# Build Process

**Last Updated:** 2026-01-25

---

## Overview

The project uses Vite for fast development builds and optimized production builds.

---

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Production build (minified) |
| `npm run build:dev` | Development build (unminified) |
| `npm run preview` | Preview production build locally |

---

## Production Build

```bash
npm run build
```

This creates an optimized production bundle in the `dist/` folder:

```
dist/
├── assets/
│   ├── index-[hash].js      # Main JavaScript bundle
│   ├── index-[hash].css     # Compiled CSS
│   └── [other assets]       # Images, fonts, etc.
├── index.html                # Entry HTML
└── [other static files]
```

### Build Optimizations

- **Code splitting** - Routes are lazy-loaded
- **Tree shaking** - Unused code is removed
- **Minification** - JavaScript and CSS are minified
- **Asset hashing** - For cache busting
- **Gzip/Brotli** - Server-side compression support

---

## Development Build

```bash
npm run build:dev
```

Creates an unminified build for debugging:

- Source maps included
- Readable code
- No minification

---

## Build Configuration

**File:** `vite.config.ts`

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
    },
  },
});
```

---

## Chunk Splitting

For optimal loading, consider manual chunk splitting:

```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        // Core React
        vendor: ['react', 'react-dom'],

        // Routing
        router: ['react-router-dom'],

        // UI Components
        radix: [
          '@radix-ui/react-dialog',
          '@radix-ui/react-dropdown-menu',
          '@radix-ui/react-tooltip',
          // ...
        ],

        // 3D Graphics (larger bundle)
        three: ['three', '@react-three/fiber', '@react-three/drei'],

        // Animation
        motion: ['framer-motion'],
      },
    },
  },
},
```

---

## Environment Variables

Environment variables in `.env` files are embedded at build time:

```env
# .env.production
VITE_API_URL=https://api.vibemind.com
VITE_ANALYTICS_ID=UA-XXXXXXXX-X
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Note:** Only variables prefixed with `VITE_` are exposed to the client.

---

## Build Analysis

### Bundle Size Analysis

```bash
# Install analyzer
npm install -D rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'dist/stats.html',
    }),
  ],
});
```

### Check Bundle Size

```bash
npm run build
npx vite-bundle-analyzer dist/stats.html
```

---

## Build Troubleshooting

### Out of Memory

```bash
# Increase Node memory limit
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Type Errors

```bash
# Run type check before build
npx tsc --noEmit
```

### Missing Dependencies

```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

---

## Preview Build

```bash
npm run preview
```

Serves the production build locally at `http://localhost:4173/` for testing before deployment.

---

## CI/CD Build

Example GitHub Actions workflow:

```yaml
name: Build

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
```

---

## Related Documentation

- [Environments](./environments.md)
- [Hosting](./hosting.md)
- [Development](../workflow/development.md)
