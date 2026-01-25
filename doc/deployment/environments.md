# Environment Configuration

**Last Updated:** 2026-01-25

---

## Overview

The application supports different environments through Vite's environment variables system.

---

## Environment Files

| File | Purpose | Git |
|------|---------|-----|
| `.env` | Default values | Commit |
| `.env.local` | Local overrides | Ignore |
| `.env.development` | Development values | Commit |
| `.env.production` | Production values | Commit |
| `.env.*.local` | Local overrides | Ignore |

### Load Order (Development)

1. `.env`
2. `.env.local`
3. `.env.development`
4. `.env.development.local`

### Load Order (Production)

1. `.env`
2. `.env.local`
3. `.env.production`
4. `.env.production.local`

---

## Variable Naming

**Only variables prefixed with `VITE_` are exposed to the client:**

```env
# Exposed to client
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=UA-XXXXXXXX-X

# NOT exposed (server-only)
DATABASE_URL=postgres://...
SECRET_KEY=...
```

---

## Accessing Variables

```typescript
// In code
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
const mode = import.meta.env.MODE;
```

### Type Safety

Create type definitions:

```typescript
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ANALYTICS_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## Example Configurations

### Development (`.env.development`)

```env
VITE_API_URL=http://localhost:3001
VITE_ANALYTICS_ID=
VITE_DEBUG=true
```

### Production (`.env.production`)

```env
VITE_API_URL=https://api.vibemind.com
VITE_ANALYTICS_ID=UA-XXXXXXXX-X
VITE_DEBUG=false
```

### Local Overrides (`.env.local`)

```env
# Personal development settings
VITE_API_URL=http://192.168.1.100:3001
```

---

## Build Modes

Vite uses `MODE` to determine which environment file to load:

```bash
# Development mode (default for dev)
npm run dev  # MODE=development

# Production mode (default for build)
npm run build  # MODE=production

# Custom mode
vite build --mode staging
```

### Custom Modes

```env
# .env.staging
VITE_API_URL=https://staging-api.vibemind.com
```

```bash
vite build --mode staging
```

---

## Runtime Configuration

For values that change without rebuilding, use runtime configuration:

```typescript
// src/config.ts
interface Config {
  apiUrl: string;
  features: {
    darkMode: boolean;
    analytics: boolean;
  };
}

const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  features: {
    darkMode: true,
    analytics: import.meta.env.PROD,
  },
};

export default config;
```

---

## Security Considerations

### Never Expose Secrets

```env
# BAD - Exposed to client
VITE_DATABASE_URL=postgres://user:password@host/db
VITE_SECRET_KEY=abc123

# GOOD - Server-side only
DATABASE_URL=postgres://user:password@host/db
SECRET_KEY=abc123
```

### Validate Required Variables

```typescript
// src/config.ts
const requiredVars = ['VITE_API_URL'] as const;

for (const varName of requiredVars) {
  if (!import.meta.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
}
```

---

## CI/CD Variables

### GitHub Actions

```yaml
env:
  VITE_API_URL: ${{ secrets.API_URL }}
  VITE_ANALYTICS_ID: ${{ vars.ANALYTICS_ID }}

steps:
  - name: Build
    run: npm run build
```

### Netlify

Set in Netlify dashboard under Site Settings > Build & Deploy > Environment Variables.

### Vercel

Set in Vercel dashboard under Project Settings > Environment Variables.

---

## Debugging

### Check Loaded Variables

```typescript
// Temporary debug code
console.log('Environment:', {
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD,
  apiUrl: import.meta.env.VITE_API_URL,
});
```

### Build-time Check

```bash
# Print environment during build
npx vite build --debug
```

---

## Related Documentation

- [Build](./build.md)
- [Hosting](./hosting.md)
- [Development](../workflow/development.md)
