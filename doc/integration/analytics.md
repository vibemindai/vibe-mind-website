# Analytics Integration

**Last Updated:** 2026-01-25

---

## Overview

Guide for integrating analytics and tracking into the Vibe Mind website.

---

## Google Analytics 4

### Setup

1. Create a GA4 property in Google Analytics
2. Get the Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Installation

```bash
npm install gtag.js
# or
npm install react-ga4
```

### Implementation

#### Option 1: Script Tag

```html
<!-- index.html -->
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

#### Option 2: React Integration

```tsx
// src/lib/analytics.ts
import ReactGA from 'react-ga4';

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (measurementId) {
    ReactGA.initialize(measurementId);
  }
};

export const logPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
```

```tsx
// src/App.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, logPageView } from '@/lib/analytics';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);

  return (/* ... */);
};
```

---

## Event Tracking

### Common Events

```tsx
import { logEvent } from '@/lib/analytics';

// Button clicks
<Button onClick={() => {
  logEvent('CTA', 'click', 'Get Started Button');
  // ... action
}}>
  Get Started
</Button>

// Form submissions
const handleSubmit = (data) => {
  logEvent('Form', 'submit', 'Contact Form');
  // ... submit
};

// Navigation
<NavLink
  to="/services"
  onClick={() => logEvent('Navigation', 'click', 'Services Link')}
>
  Services
</NavLink>
```

### Event Categories

| Category | Actions | Description |
|----------|---------|-------------|
| CTA | click, hover | Call-to-action interactions |
| Navigation | click | Menu/link clicks |
| Form | submit, error, focus | Form interactions |
| Content | scroll, view | Content engagement |
| Feature | use | Feature usage |

---

## Custom Dimensions

Track custom data with GA4:

```tsx
ReactGA.gtag('config', 'G-XXXXXXXXXX', {
  custom_map: {
    dimension1: 'theme',
    dimension2: 'page_type',
  },
});

// Set custom dimension
ReactGA.gtag('set', {
  theme: 'dark',
  page_type: 'landing',
});
```

---

## Performance Tracking

### Web Vitals

```bash
npm install web-vitals
```

```tsx
// src/lib/vitals.ts
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';
import { logEvent } from './analytics';

export const reportWebVitals = () => {
  getCLS((metric) => logEvent('Web Vitals', 'CLS', String(metric.value)));
  getFID((metric) => logEvent('Web Vitals', 'FID', String(metric.value)));
  getLCP((metric) => logEvent('Web Vitals', 'LCP', String(metric.value)));
  getFCP((metric) => logEvent('Web Vitals', 'FCP', String(metric.value)));
  getTTFB((metric) => logEvent('Web Vitals', 'TTFB', String(metric.value)));
};
```

```tsx
// src/main.tsx
import { reportWebVitals } from './lib/vitals';

reportWebVitals();
```

---

## Privacy & Consent

### Cookie Consent Banner

```tsx
// src/components/CookieConsent.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('analytics-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('analytics-consent', 'true');
    setShowBanner(false);
    // Initialize analytics
  };

  const handleDecline = () => {
    localStorage.setItem('analytics-consent', 'false');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card p-4 shadow-lg border-t">
      <p className="text-sm text-muted-foreground mb-2">
        We use cookies to analyze site usage and improve your experience.
      </p>
      <div className="flex gap-2">
        <Button size="sm" onClick={handleAccept}>Accept</Button>
        <Button size="sm" variant="outline" onClick={handleDecline}>Decline</Button>
      </div>
    </div>
  );
};
```

### Conditional Loading

```tsx
const initGA = () => {
  const consent = localStorage.getItem('analytics-consent');
  if (consent === 'true') {
    ReactGA.initialize(measurementId);
  }
};
```

---

## Alternative Analytics

### Plausible Analytics

Privacy-focused, cookie-free analytics:

```html
<script defer data-domain="vibemind.com" src="https://plausible.io/js/script.js"></script>
```

### Fathom Analytics

Simple, privacy-focused:

```html
<script src="https://cdn.usefathom.com/script.js" data-site="XXXXXX" defer></script>
```

### PostHog

Product analytics and feature flags:

```bash
npm install posthog-js
```

```tsx
import posthog from 'posthog-js';

posthog.init('PROJECT_KEY', {
  api_host: 'https://app.posthog.com',
});

// Track events
posthog.capture('button_clicked', { button: 'signup' });
```

---

## Debug Mode

Enable debug mode in development:

```tsx
if (import.meta.env.DEV) {
  ReactGA.initialize(measurementId, {
    debug: true,
  });
}
```

---

## Related Documentation

- [SEO](./seo.md)
- [Environments](../deployment/environments.md)
