# Testing

**Last Updated:** 2026-01-25

---

## Overview

This document outlines the testing approach for the Vibe Mind website.

---

## Current Testing Setup

The project currently has ESLint for static code analysis. Additional testing infrastructure can be added as needed.

---

## Recommended Testing Stack

For comprehensive testing, consider adding:

| Tool | Purpose |
|------|---------|
| **Vitest** | Unit/integration testing |
| **React Testing Library** | Component testing |
| **Playwright** | E2E testing |
| **MSW** | API mocking |

---

## Setting Up Testing

### Install Dependencies

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Configure Vitest

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
});
```

### Test Setup File

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
```

### Add Test Script

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

## Writing Tests

### Component Test Example

```tsx
// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './ui/button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### Hook Test Example

```tsx
// src/hooks/useTheme.test.tsx
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider, useTheme } from './useTheme';

const wrapper = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(['light', 'dark']).toContain(result.current.theme);
  });

  it('toggles theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    const initialTheme = result.current.theme;

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).not.toBe(initialTheme);
  });
});
```

### Utility Function Test Example

```tsx
// src/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar');
  });

  it('merges Tailwind classes correctly', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });
});
```

---

## Test Categories

### Unit Tests

Test individual functions and components in isolation:

```tsx
// Pure functions
describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('January 15, 2024');
  });
});
```

### Integration Tests

Test how components work together:

```tsx
describe('Navigation', () => {
  it('navigates between pages', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('About'));
    expect(await screen.findByText('About Us')).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

```typescript
// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('navigates to about page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About');
  await expect(page).toHaveURL('/about');
  await expect(page.locator('h1')).toContainText('About');
});
```

---

## Testing Best Practices

### 1. Test Behavior, Not Implementation

```tsx
// Bad: Testing implementation
expect(component.state.isOpen).toBe(true);

// Good: Testing behavior
expect(screen.getByRole('dialog')).toBeVisible();
```

### 2. Use Descriptive Test Names

```tsx
// Bad
it('works', () => {});

// Good
it('displays error message when form submission fails', () => {});
```

### 3. Arrange-Act-Assert

```tsx
it('increments counter when button is clicked', () => {
  // Arrange
  render(<Counter />);

  // Act
  fireEvent.click(screen.getByText('Increment'));

  // Assert
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### 4. Mock External Dependencies

```tsx
vi.mock('@/lib/api', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'test' }),
}));
```

---

## Running Tests

```bash
# Run all tests in watch mode
npm test

# Run once
npm run test:run

# With coverage
npm run test:coverage

# Specific file
npm test -- Button.test.tsx
```

---

## Related Documentation

- [Development](./development.md)
- [Code Standards](./code-standards.md)
