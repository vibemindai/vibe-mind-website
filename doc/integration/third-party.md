# Third-Party Libraries

**Last Updated:** 2026-01-25

---

## Overview

This document catalogs all third-party libraries used in the project.

---

## Core Dependencies

### React Ecosystem

| Library | Version | Purpose |
|---------|---------|---------|
| `react` | 18.3.1 | UI library |
| `react-dom` | 18.3.1 | React DOM renderer |
| `react-router-dom` | 6.30.1 | Client-side routing |

### Build Tools

| Library | Version | Purpose |
|---------|---------|---------|
| `vite` | 5.4.19 | Build tool & dev server |
| `@vitejs/plugin-react-swc` | 3.11.0 | SWC-based React plugin |
| `typescript` | 5.8.3 | Type checking |

---

## UI & Styling

### Tailwind CSS

| Library | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | 3.4.17 | Utility-first CSS |
| `tailwindcss-animate` | 1.0.7 | Animation utilities |
| `autoprefixer` | 10.4.21 | CSS vendor prefixes |
| `postcss` | 8.5.6 | CSS processing |

### shadcn/ui Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| `class-variance-authority` | 0.7.1 | Component variants |
| `clsx` | 2.1.1 | Conditional classes |
| `tailwind-merge` | 2.6.0 | Tailwind class merging |
| `lucide-react` | 0.462.0 | Icon library |

### Radix UI Primitives

All `@radix-ui/react-*` packages provide accessible UI primitives:

- `accordion`, `alert-dialog`, `aspect-ratio`, `avatar`
- `checkbox`, `collapsible`, `context-menu`, `dialog`
- `dropdown-menu`, `hover-card`, `label`, `menubar`
- `navigation-menu`, `popover`, `progress`, `radio-group`
- `scroll-area`, `select`, `separator`, `slider`, `slot`
- `switch`, `tabs`, `toast`, `toggle`, `toggle-group`, `tooltip`

---

## Animation

| Library | Version | Purpose |
|---------|---------|---------|
| `framer-motion` | 12.29.0 | Page transitions, animations |

### Usage

```tsx
import { motion, AnimatePresence } from "framer-motion";

<AnimatePresence mode="wait">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    Content
  </motion.div>
</AnimatePresence>
```

---

## 3D Graphics

| Library | Version | Purpose |
|---------|---------|---------|
| `three` | 0.160.0 | 3D rendering engine |
| `@react-three/fiber` | 8.15.0 | React renderer for Three.js |
| `@react-three/drei` | 9.92.0 | Three.js helpers and abstractions |

### Usage

```tsx
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

<Canvas>
  <mesh>
    <sphereGeometry />
    <meshBasicMaterial wireframe />
  </mesh>
  <OrbitControls />
</Canvas>
```

---

## State Management

| Library | Version | Purpose |
|---------|---------|---------|
| `@tanstack/react-query` | 5.83.0 | Server state management |

### Usage

```tsx
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

---

## Forms

| Library | Version | Purpose |
|---------|---------|---------|
| `react-hook-form` | 7.61.1 | Form handling |
| `@hookform/resolvers` | 3.10.0 | Validation resolvers |
| `zod` | 3.25.76 | Schema validation |

### Usage

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

---

## UI Components

### Date Picker

| Library | Version | Purpose |
|---------|---------|---------|
| `react-day-picker` | 8.10.1 | Calendar component |
| `date-fns` | 3.6.0 | Date utilities |

### Carousel

| Library | Version | Purpose |
|---------|---------|---------|
| `embla-carousel-react` | 8.6.0 | Carousel component |

### Charts

| Library | Version | Purpose |
|---------|---------|---------|
| `recharts` | 2.15.4 | Chart library |

### Drawer

| Library | Version | Purpose |
|---------|---------|---------|
| `vaul` | 0.9.9 | Drawer component |

### OTP Input

| Library | Version | Purpose |
|---------|---------|---------|
| `input-otp` | 1.4.2 | OTP input component |

### Command Palette

| Library | Version | Purpose |
|---------|---------|---------|
| `cmdk` | 1.1.1 | Command palette |

### Resizable Panels

| Library | Version | Purpose |
|---------|---------|---------|
| `react-resizable-panels` | 2.1.9 | Resizable layout panels |

---

## Notifications

| Library | Version | Purpose |
|---------|---------|---------|
| `sonner` | 1.7.4 | Toast notifications |

### Usage

```tsx
import { toast } from 'sonner';

toast.success('Action completed!');
toast.error('Something went wrong');
```

---

## Theme

| Library | Version | Purpose |
|---------|---------|---------|
| `next-themes` | 0.3.0 | Theme handling (optional) |

---

## Icons

| Library | Version | Purpose |
|---------|---------|---------|
| `lucide-react` | 0.462.0 | Icon components |
| `simple-icons` | 15.21.0 | Brand icons |

### Usage

```tsx
import { Home, Settings, User } from 'lucide-react';

<Home className="w-5 h-5" />
```

---

## Development Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| `eslint` | 9.32.0 | Linting |
| `@types/react` | 18.3.23 | React types |
| `@types/react-dom` | 18.3.7 | React DOM types |
| `@types/node` | 22.16.5 | Node.js types |
| `@tailwindcss/typography` | 0.5.16 | Typography plugin |

---

## Updating Dependencies

```bash
# Check for updates
npm outdated

# Update specific package
npm update package-name

# Update all packages
npm update

# Check for breaking changes
npx npm-check-updates
```

---

## Related Documentation

- [Components Overview](../components/README.md)
- [Development Setup](../workflow/development.md)
