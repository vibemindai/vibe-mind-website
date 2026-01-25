# Code Standards

**Last Updated:** 2026-01-25

---

## TypeScript

### Strict Mode

TypeScript is configured with strict mode enabled:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Type Annotations

```tsx
// Function parameters and return types
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Props interfaces
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

// State types
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
```

### Prefer Interfaces

```tsx
// Good: Interface for objects
interface User {
  id: string;
  name: string;
  email: string;
}

// Good: Type for unions/primitives
type Status = "pending" | "active" | "done";
type ID = string | number;
```

### Avoid `any`

```tsx
// Bad
const data: any = response.data;

// Good
const data: unknown = response.data;
if (isUser(data)) {
  // data is now typed as User
}
```

---

## React Patterns

### Functional Components

```tsx
// Always use functional components with hooks
const MyComponent = ({ title, children }: Props) => {
  const [state, setState] = useState(initialValue);

  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};
```

### Component Organization

```tsx
// src/components/MyComponent.tsx

// 1. Imports
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// 2. Types
interface MyComponentProps {
  title: string;
  className?: string;
}

// 3. Component
const MyComponent = ({ title, className }: MyComponentProps) => {
  // 3a. Hooks
  const [state, setState] = useState(false);

  // 3b. Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // 3c. Handlers
  const handleClick = () => {
    setState(true);
  };

  // 3d. Render
  return (
    <div className={cn("base-styles", className)}>
      {title}
    </div>
  );
};

// 4. Export
export default MyComponent;
```

### Props Pattern

```tsx
interface ComponentProps {
  // Required props first
  title: string;

  // Optional props
  subtitle?: string;
  className?: string;

  // Callbacks
  onClick?: () => void;

  // Children last
  children?: React.ReactNode;
}
```

---

## Styling

### Tailwind CSS

```tsx
// Use Tailwind classes
<div className="flex items-center justify-between p-4">

// Use cn() for conditional classes
<div className={cn(
  "base-styles",
  isActive && "active-styles",
  className
)}>
```

### Class Organization

Order classes by:

1. Layout (display, position, flex/grid)
2. Sizing (width, height, padding, margin)
3. Typography (font, text, color)
4. Visual (background, border, shadow)
5. Interactive (hover, focus, transition)

```tsx
<button className="
  flex items-center justify-center
  px-4 py-2
  text-sm font-medium text-white
  bg-primary rounded-lg
  hover:bg-primary/90 transition-colors
">
```

### Avoid Inline Styles

```tsx
// Bad
<div style={{ marginTop: 20, padding: 10 }}>

// Good
<div className="mt-5 p-2.5">
```

---

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `MyComponent.tsx` |
| Hooks | camelCase with `use` | `useTheme.tsx` |
| Utilities | camelCase | `utils.ts` |
| Pages | PascalCase with `Page` | `AboutPage.tsx` |
| Types | PascalCase | `types.ts` |

---

## Import Order

```tsx
// 1. React
import { useState, useEffect } from "react";

// 2. Third-party libraries
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// 3. Internal modules (absolute paths)
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

// 4. Relative imports
import "./styles.css";
```

---

## Comments

### When to Comment

```tsx
// Comment complex logic
const calculateDiscount = (price: number, quantity: number) => {
  // Apply bulk discount: 10% off for 10+ items
  const bulkDiscount = quantity >= 10 ? 0.1 : 0;

  // Apply seasonal discount: 5% off during sale period
  const seasonalDiscount = isOnSale ? 0.05 : 0;

  return price * (1 - bulkDiscount - seasonalDiscount);
};
```

### JSDoc for Public APIs

```tsx
/**
 * Formats a date for display
 * @param date - The date to format
 * @param format - The desired format (default: 'long')
 * @returns Formatted date string
 */
export function formatDate(date: Date, format: 'short' | 'long' = 'long'): string {
  // Implementation
}
```

### Avoid Obvious Comments

```tsx
// Bad
// Increment counter
setCount(count + 1);

// Good (self-documenting)
setCount(count + 1);
```

---

## Error Handling

### Try-Catch

```tsx
const fetchData = async () => {
  try {
    const response = await api.get('/data');
    setData(response.data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    toast({
      title: "Error",
      description: "Failed to load data",
      variant: "destructive",
    });
  }
};
```

### Optional Chaining

```tsx
// Safe property access
const name = user?.profile?.name ?? 'Anonymous';
```

---

## Performance

### Memoization

```tsx
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### Lazy Loading

```tsx
// Lazy load routes
const AboutPage = lazy(() => import('./pages/AboutPage'));

// Use with Suspense
<Suspense fallback={<Loading />}>
  <AboutPage />
</Suspense>
```

---

## Accessibility

### Semantic HTML

```tsx
// Use appropriate elements
<nav>
<main>
<section>
<article>
<aside>
<footer>

// Use heading hierarchy
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
```

### ARIA Attributes

```tsx
<button
  aria-label="Close menu"
  aria-expanded={isOpen}
  onClick={toggleMenu}
>
  <MenuIcon />
</button>
```

### Keyboard Navigation

```tsx
// Handle keyboard events
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleAction();
  }
  if (e.key === 'Escape') {
    handleClose();
  }
}}
```

---

## Related Documentation

- [Development](./development.md)
- [Git Workflow](./git-workflow.md)
- [Components](../components/README.md)
