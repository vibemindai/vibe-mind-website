# UI Components (shadcn/ui)

**Last Updated:** 2026-01-25

---

## Overview

The project uses [shadcn/ui](https://ui.shadcn.com/) for pre-built, accessible UI components. These components are copied into the project (not installed as dependencies) and can be customized.

**Location:** `src/components/ui/`

---

## Installation & Configuration

### shadcn/ui Config

**File:** `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### Adding New Components

```bash
npx shadcn-ui@latest add [component-name]

# Examples:
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

---

## Available Components

### Buttons

**File:** `button.tsx`

```tsx
import { Button } from "@/components/ui/button";

// Variants
<Button>Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Cards

**File:** `card.tsx`

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Form Inputs

**Files:** `input.tsx`, `textarea.tsx`, `label.tsx`

```tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Email" />
</div>

<div>
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" placeholder="Your message" />
</div>
```

### Dialog / Modal

**File:** `dialog.tsx`

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <div>Content</div>
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Toast Notifications

**Files:** `toast.tsx`, `toaster.tsx`, `use-toast.ts`

```tsx
// In App.tsx
import { Toaster } from "@/components/ui/toaster";
<Toaster />

// In component
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

toast({
  title: "Success",
  description: "Action completed successfully",
});
```

### Tooltip

**File:** `tooltip.tsx`

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Dropdown Menu

**File:** `dropdown-menu.tsx`

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Tabs

**File:** `tabs.tsx`

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Accordion

**File:** `accordion.tsx`

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question 1</AccordionTrigger>
    <AccordionContent>Answer 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Question 2</AccordionTrigger>
    <AccordionContent>Answer 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## Full Component List

| Component | File | Description |
|-----------|------|-------------|
| accordion | `accordion.tsx` | Expandable content sections |
| alert | `alert.tsx` | Alert messages |
| alert-dialog | `alert-dialog.tsx` | Confirmation dialogs |
| aspect-ratio | `aspect-ratio.tsx` | Maintain aspect ratios |
| avatar | `avatar.tsx` | User avatars |
| badge | `badge.tsx` | Status badges |
| breadcrumb | `breadcrumb.tsx` | Navigation breadcrumbs |
| button | `button.tsx` | Buttons |
| calendar | `calendar.tsx` | Date picker calendar |
| card | `card.tsx` | Content cards |
| carousel | `carousel.tsx` | Image/content carousels |
| chart | `chart.tsx` | Charts (Recharts wrapper) |
| checkbox | `checkbox.tsx` | Checkboxes |
| collapsible | `collapsible.tsx` | Collapsible sections |
| command | `command.tsx` | Command palette |
| context-menu | `context-menu.tsx` | Right-click menus |
| dialog | `dialog.tsx` | Modal dialogs |
| drawer | `drawer.tsx` | Slide-out panels |
| dropdown-menu | `dropdown-menu.tsx` | Dropdown menus |
| form | `form.tsx` | Form wrapper (react-hook-form) |
| hover-card | `hover-card.tsx` | Hover previews |
| input | `input.tsx` | Text inputs |
| input-otp | `input-otp.tsx` | OTP inputs |
| label | `label.tsx` | Form labels |
| menubar | `menubar.tsx` | Menu bars |
| navigation-menu | `navigation-menu.tsx` | Navigation menus |
| pagination | `pagination.tsx` | Page navigation |
| popover | `popover.tsx` | Popovers |
| progress | `progress.tsx` | Progress bars |
| radio-group | `radio-group.tsx` | Radio buttons |
| resizable | `resizable.tsx` | Resizable panels |
| scroll-area | `scroll-area.tsx` | Scrollable areas |
| select | `select.tsx` | Select dropdowns |
| separator | `separator.tsx` | Visual separators |
| sheet | `sheet.tsx` | Side sheets |
| sidebar | `sidebar.tsx` | Sidebar navigation |
| skeleton | `skeleton.tsx` | Loading skeletons |
| slider | `slider.tsx` | Range sliders |
| sonner | `sonner.tsx` | Toast notifications (Sonner) |
| switch | `switch.tsx` | Toggle switches |
| table | `table.tsx` | Data tables |
| tabs | `tabs.tsx` | Tab navigation |
| textarea | `textarea.tsx` | Text areas |
| toast | `toast.tsx` | Toast notifications |
| toaster | `toaster.tsx` | Toast container |
| toggle | `toggle.tsx` | Toggle buttons |
| toggle-group | `toggle-group.tsx` | Toggle button groups |
| tooltip | `tooltip.tsx` | Tooltips |

---

## Customization

### Modifying Components

Components can be directly edited in `src/components/ui/`. Common customizations:

```tsx
// button.tsx - Add a new variant
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        default: "...",
        // Add custom variant
        gradient: "bg-gradient-to-r from-primary to-accent text-white",
      },
    },
  }
);
```

### Using cn() Utility

All components use the `cn()` utility for class merging:

```tsx
import { cn } from "@/lib/utils";

<Button className={cn("custom-class", isActive && "active-class")}>
```

---

## Related Documentation

- [Design System](../styling/design-system.md)
- [Tailwind Config](../styling/tailwind-config.md)
