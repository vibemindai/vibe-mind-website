# Hosting & Deployment

**Last Updated:** 2026-01-25

---

## Overview

This guide covers deploying the Vibe Mind website to various hosting platforms.

---

## Recommended Platforms

| Platform | Best For | Features |
|----------|----------|----------|
| **Vercel** | React/Vite apps | Edge network, auto deploys, preview URLs |
| **Netlify** | Static sites | Form handling, functions, identity |
| **Cloudflare Pages** | Performance | Global CDN, edge functions |
| **GitHub Pages** | Simple hosting | Free for public repos |

---

## Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Run `npm run preview` and test locally
- [ ] Check all environment variables are set
- [ ] Verify all links work
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit

---

## Vercel

### Quick Deploy

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Environment Variables

Set in Vercel dashboard:
- Project Settings > Environment Variables
- Add `VITE_API_URL`, etc.

---

## Netlify

### Quick Deploy

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

### Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

### Environment Variables

Set in Netlify dashboard:
- Site Settings > Build & Deploy > Environment Variables

---

## Cloudflare Pages

### Quick Deploy

1. Connect GitHub repository in Cloudflare dashboard
2. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`

### SPA Routing

Create `public/_redirects`:

```
/*    /index.html   200
```

---

## GitHub Pages

### Setup

1. Update `vite.config.ts` with base path:
   ```typescript
   export default defineConfig({
     base: '/vibe-mind-website/',
     // ...
   });
   ```

2. Create GitHub Actions workflow:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

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

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. Enable GitHub Pages in repository settings

---

## SPA Routing

For client-side routing to work, configure the server to redirect all requests to `index.html`.

### Nginx

```nginx
server {
    listen 80;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache

Create `.htaccess` in `dist/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Performance Optimization

### Headers

Add security and cache headers:

```
# _headers (Netlify)
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

### Compression

Enable Gzip/Brotli compression on the server.

### CDN

Use a CDN for global distribution. Most platforms include this automatically.

---

## Monitoring

### Error Tracking

Consider adding error tracking:

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
});
```

### Analytics

Add analytics to track usage:

```typescript
// In App.tsx or layout
useEffect(() => {
  if (import.meta.env.VITE_ANALYTICS_ID) {
    // Initialize analytics
  }
}, []);
```

---

## Domain Setup

1. Add custom domain in hosting dashboard
2. Update DNS records:
   - A record pointing to hosting IP
   - Or CNAME pointing to hosting URL
3. Enable SSL (usually automatic)
4. Set up redirects (www to non-www, etc.)

---

## Rollback

### Vercel

Deployments can be rolled back in the dashboard or CLI:

```bash
vercel rollback [deployment-url]
```

### Netlify

Rollback via dashboard:
- Deploys > Select previous deploy > Publish deploy

---

## Related Documentation

- [Build](./build.md)
- [Environments](./environments.md)
