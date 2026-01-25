# Custom Hooks

**Last Updated:** 2026-01-25

---

## Overview

Custom React hooks encapsulate reusable stateful logic.

**Location:** `src/hooks/`

---

## useTheme

**File:** `src/hooks/useTheme.tsx`

Provides theme state and controls for the application.

### Interface

```tsx
interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isAutoMode: boolean;
  setIsAutoMode: (auto: boolean) => void;
}
```

### Usage

```tsx
import { useTheme } from "@/hooks/useTheme";

const Component = () => {
  const { theme, toggleTheme, isAutoMode, setIsAutoMode } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <label>
        <input
          type="checkbox"
          checked={isAutoMode}
          onChange={(e) => setIsAutoMode(e.target.checked)}
        />
        Auto mode
      </label>
    </div>
  );
};
```

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `"light" \| "dark"` | Current active theme |
| `setTheme` | `(theme) => void` | Set theme explicitly |
| `toggleTheme` | `() => void` | Toggle between light/dark |
| `isAutoMode` | `boolean` | Whether auto-switching is enabled |
| `setIsAutoMode` | `(auto) => void` | Enable/disable auto-switching |

### Auto Mode Logic

When `isAutoMode` is `true`, the theme automatically switches based on time:

- **Dark mode:** 6 PM (18:00) to 6 AM (06:00)
- **Light mode:** 6 AM (06:00) to 6 PM (18:00)

```tsx
const getSystemTheme = (): Theme => {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6 ? "dark" : "light";
};
```

### Persistence

Theme preferences are stored in `localStorage`:

| Key | Value | Description |
|-----|-------|-------------|
| `theme` | `"light"` or `"dark"` | User's theme preference |
| `theme-auto` | `"true"` or `"false"` | Auto mode status |

### Provider

The hook requires `ThemeProvider` wrapper:

```tsx
// In App.tsx
import { ThemeProvider } from "@/hooks/useTheme";

<ThemeProvider>
  <App />
</ThemeProvider>
```

---

## useMobile

**File:** `src/hooks/use-mobile.tsx`

Detects if the current viewport is mobile-sized.

### Usage

```tsx
import { useMobile } from "@/hooks/use-mobile";

const Component = () => {
  const isMobile = useMobile();

  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
};
```

### Returns

| Value | Type | Description |
|-------|------|-------------|
| `isMobile` | `boolean` | `true` if viewport width < breakpoint |

### Breakpoint

Default breakpoint is typically 768px (tablet/mobile boundary).

---

## useToast

**File:** `src/hooks/use-toast.ts`

Hook for triggering toast notifications. This is a re-export from shadcn/ui.

### Usage

```tsx
import { useToast } from "@/hooks/use-toast";

const Component = () => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Success!",
      description: "Your action was completed.",
    });
  };

  return <button onClick={handleClick}>Show Toast</button>;
};
```

### Toast Options

```tsx
toast({
  title: "Title",                    // Required
  description: "Description",        // Optional
  variant: "default" | "destructive", // Optional
  duration: 5000,                    // Optional (ms)
  action: <ToastAction />,           // Optional
});
```

### Variants

| Variant | Use Case |
|---------|----------|
| `default` | Success, info messages |
| `destructive` | Error, warning messages |

---

## Creating Custom Hooks

### Pattern

```tsx
import { useState, useEffect } from "react";

export function useCustomHook(param: ParamType): ReturnType {
  const [state, setState] = useState<StateType>(initialValue);

  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  }, [dependencies]);

  const action = () => {
    // Handler logic
  };

  return { state, action };
}
```

### Example: useLocalStorage

```tsx
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
```

---

## Related Documentation

- [Data Flow](../architecture/data-flow.md)
- [Theme System](../styling/theme.md)
