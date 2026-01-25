# Data Flow

**Last Updated:** 2026-01-25

---

## State Management Overview

The application uses a combination of React's built-in state management and external libraries:

```mermaid
flowchart TD
    subgraph GlobalState["Global State"]
        ThemeContext[Theme Context]
        QueryClient[React Query Client]
    end

    subgraph LocalState["Local Component State"]
        ComponentState[useState]
        Effects[useEffect]
    end

    subgraph Persistence["Persistence"]
        LocalStorage[localStorage]
        SessionStorage[sessionStorage]
    end

    ThemeContext --> |"theme, toggleTheme"| Components
    QueryClient --> |"cache, queries"| Components
    ComponentState --> Components

    ThemeContext <--> LocalStorage
    SessionStorage --> RedirectHandler
```

---

## Theme State Flow

```mermaid
sequenceDiagram
    participant User
    participant ThemeToggle
    participant ThemeContext
    participant LocalStorage
    participant Document

    Note over ThemeContext: Initial Load
    LocalStorage->>ThemeContext: Read stored theme
    ThemeContext->>Document: Apply theme class

    Note over User: Toggle Theme
    User->>ThemeToggle: Click toggle
    ThemeToggle->>ThemeContext: toggleTheme()
    ThemeContext->>LocalStorage: Store new theme
    ThemeContext->>Document: Update class
    Document->>User: Visual update
```

### Theme Context Implementation

```tsx
// src/hooks/useTheme.tsx
interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isAutoMode: boolean;
  setIsAutoMode: (auto: boolean) => void;
}
```

### Theme Persistence

| Storage Key | Value | Purpose |
|-------------|-------|---------|
| `theme` | `"light"` \| `"dark"` | User's preferred theme |
| `theme-auto` | `"true"` \| `"false"` | Auto-switch mode status |

### Auto Theme Logic

```tsx
// Time-based theme switching
const getSystemTheme = (): Theme => {
  const hour = new Date().getHours();
  // Dark mode from 6 PM (18:00) to 6 AM (06:00)
  return hour >= 18 || hour < 6 ? "dark" : "light";
};
```

---

## Component State Patterns

### Navigation State

```mermaid
stateDiagram-v2
    [*] --> NotScrolled
    NotScrolled --> Scrolled: scroll > 50px
    Scrolled --> NotScrolled: scroll <= 50px

    [*] --> MenuClosed
    MenuClosed --> MenuOpen: click menu
    MenuOpen --> MenuClosed: click menu/link/escape
```

```tsx
// src/components/Navigation.tsx
const [isScrolled, setIsScrolled] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
```

### AI Chat Window State

```mermaid
stateDiagram-v2
    [*] --> Typing
    Typing --> GreetingVisible: after 1.5s
    GreetingVisible --> QuestionsVisible: after 2s

    [*] --> InputEmpty
    InputEmpty --> InputFilled: user types
    InputFilled --> Sending: submit
    Sending --> InputEmpty: after 300ms
```

```tsx
// src/components/AIChatWindow.tsx
const [message, setMessage] = useState("");
const [showGreeting, setShowGreeting] = useState(false);
const [showQuestions, setShowQuestions] = useState(false);
const [isTyping, setIsTyping] = useState(true);
const [isSending, setIsSending] = useState(false);
```

---

## React Query (Potential)

The app includes React Query setup but currently uses it minimally:

```tsx
// src/App.tsx
const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  {/* App content */}
</QueryClientProvider>
```

### Future API Integration Pattern

```mermaid
sequenceDiagram
    participant Component
    participant useQuery
    participant QueryClient
    participant API

    Component->>useQuery: Call query hook
    useQuery->>QueryClient: Check cache
    alt Cache Hit
        QueryClient-->>Component: Return cached data
    else Cache Miss
        QueryClient->>API: Fetch data
        API-->>QueryClient: Return response
        QueryClient->>QueryClient: Store in cache
        QueryClient-->>Component: Return fresh data
    end
```

---

## Redirect Handler Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant SessionStorage
    participant RedirectHandler
    participant Router

    Note over Browser: 404 page stores path
    Browser->>SessionStorage: Store redirect path
    Browser->>Browser: Redirect to /

    Note over RedirectHandler: App loads
    RedirectHandler->>SessionStorage: Check for redirect
    alt Has Redirect
        SessionStorage-->>RedirectHandler: Return stored path
        RedirectHandler->>SessionStorage: Clear redirect
        RedirectHandler->>Router: Navigate to path
    else No Redirect
        RedirectHandler-->>RedirectHandler: Do nothing
    end
```

---

## Animation State Flow

### Page Transitions

```mermaid
stateDiagram-v2
    [*] --> initial: Route change
    initial --> animate: Enter animation
    animate --> exit: Route change
    exit --> [*]
```

```tsx
// Animation variants
const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};
```

### Scroll Animations

```mermaid
sequenceDiagram
    participant Viewport
    participant IntersectionObserver
    participant AnimatedSection
    participant FramerMotion

    Viewport->>IntersectionObserver: Element in view
    IntersectionObserver->>AnimatedSection: Trigger animation
    AnimatedSection->>FramerMotion: Start transition
    FramerMotion-->>Viewport: Animate opacity/transform
```

---

## Props Flow Patterns

### Top-Down Props

```mermaid
graph TD
    App[App] --> |theme context| Navigation
    App --> |theme context| Pages
    Pages --> |className, delay| AnimatedSection
    AnimatedSection --> |children| Content
```

### Composition Pattern

```tsx
// Parent provides wrapper, children provide content
<PageTransition>
  <Index />
</PageTransition>

<AnimatedSection delay={0.2} direction="up">
  <ServiceCard />
</AnimatedSection>
```

---

## Related Documentation

- [Component Tree](./component-tree.md)
- [Hooks](../api/hooks.md)
- [Theme System](../styling/theme.md)
