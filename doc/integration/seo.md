# SEO Setup

**Last Updated:** 2026-01-25

---

## Overview

SEO optimization for the Vibe Mind website including meta tags, structured data, and best practices.

---

## Meta Tags

### Basic Meta Tags

**File:** `index.html`

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Vibe Mind AI Solutions - Building intelligent, scalable software through AI-first development. AI development, legacy modernization, and custom AI solutions." />
  <meta name="keywords" content="AI development, artificial intelligence, machine learning, software development, Kerala, India" />
  <meta name="author" content="Vibe Mind AI Solutions" />
  <title>Vibe Mind AI Solutions | AI-Powered Software Development</title>
</head>
```

### Open Graph Tags

For social media sharing:

```html
<meta property="og:title" content="Vibe Mind AI Solutions" />
<meta property="og:description" content="Building intelligent software through Vibe Coding" />
<meta property="og:image" content="https://vibemind.com/og-image.png" />
<meta property="og:url" content="https://vibemind.com" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Vibe Mind AI Solutions" />
```

### Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Vibe Mind AI Solutions" />
<meta name="twitter:description" content="Building intelligent software through Vibe Coding" />
<meta name="twitter:image" content="https://vibemind.com/twitter-card.png" />
```

---

## Semantic HTML

The codebase uses semantic HTML elements for better SEO:

```tsx
// Hero section with aria-label
<section
  aria-label="Vibe Mind AI - Best AI Company in Kerala, India"
>
  {/* Content */}
</section>

// Footer with aria-label
<footer
  aria-label="Site Footer - Vibe Mind AI Solutions Kerala"
>
  {/* Content */}
</footer>
```

### Heading Hierarchy

```tsx
<h1>Vibe Mind AI Solutions</h1>  {/* One per page */}
<h2>Our Services</h2>
<h3>AI Development</h3>
```

---

## Structured Data

### Organization Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vibe Mind AI Solutions",
  "description": "AI-powered software development company",
  "url": "https://vibemind.com",
  "logo": "https://vibemind.com/logo.png",
  "sameAs": [
    "https://linkedin.com/company/vibemind",
    "https://twitter.com/vibemind"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kerala",
    "addressCountry": "India"
  }
}
</script>
```

### WebSite Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Vibe Mind AI Solutions",
  "url": "https://vibemind.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://vibemind.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### Service Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Development Services",
  "provider": {
    "@type": "Organization",
    "name": "Vibe Mind AI Solutions"
  },
  "description": "Custom AI solutions and development",
  "areaServed": "Worldwide"
}
</script>
```

---

## Dynamic Meta Tags

For SPA routing, use react-helmet-async:

```bash
npm install react-helmet-async
```

```tsx
import { Helmet, HelmetProvider } from 'react-helmet-async';

// In App.tsx
<HelmetProvider>
  <App />
</HelmetProvider>

// In pages
const AboutPage = () => (
  <>
    <Helmet>
      <title>About Us | Vibe Mind AI Solutions</title>
      <meta name="description" content="Learn about our AI-first approach..." />
    </Helmet>
    {/* Page content */}
  </>
);
```

---

## Image Optimization

### Alt Text

Always provide descriptive alt text:

```tsx
<img
  src={heroBg}
  alt="Vibe Mind AI - Neural Network Technology Background"
/>
```

### Image Formats

- Use WebP for better compression
- Provide fallbacks for older browsers
- Use lazy loading for below-fold images

```tsx
<img
  src="image.webp"
  alt="Description"
  loading="lazy"
/>
```

---

## Performance for SEO

### Core Web Vitals

| Metric | Target | Description |
|--------|--------|-------------|
| LCP | < 2.5s | Largest Contentful Paint |
| FID | < 100ms | First Input Delay |
| CLS | < 0.1 | Cumulative Layout Shift |

### Optimization Tips

1. **Optimize images** - Use appropriate sizes and formats
2. **Lazy load** - Defer non-critical resources
3. **Minimize JavaScript** - Code split and tree shake
4. **Use CDN** - Distribute content globally
5. **Enable compression** - Gzip/Brotli

---

## Sitemap

Create a sitemap for search engines:

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vibemind.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vibemind.com/about</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vibemind.com/services</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vibemind.com/contact</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

## Robots.txt

```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://vibemind.com/sitemap.xml
```

---

## Canonical URLs

Prevent duplicate content issues:

```html
<link rel="canonical" href="https://vibemind.com/about" />
```

---

## Related Documentation

- [Components](../components/README.md)
- [Hosting](../deployment/hosting.md)
