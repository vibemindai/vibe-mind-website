# Mobile Redesign - Simple Design Spec

## Current State
- Chat takes full screen height
- Robot illustration hidden on mobile
- Hero + Services revealed via scroll button
- CTA buttons visible in hero section

---

## New Mobile Design

### Screen Layout (Top to Bottom)

```
+----------------------------------+
|          HEADER (sticky)         |
|    VibeMind Solutions    [menu]  |
+----------------------------------+
|                                  |
|       ORBIT ROBOT (compact)      |
|           160x160px              |
|                                  |
|    [rotating icons around face]  |
|                                  |
+----------------------------------+
|                                  |
|       SUGGESTED QUESTIONS        |
|      (2 questions visible)       |
|                                  |
+----------------------------------+
|                                  |
|         CHAT MESSAGES            |
|        (scrollable area)         |
|                                  |
|                                  |
|                                  |
+----------------------------------+
|         CHAT INPUT (sticky)      |
|  [input field] [X] [send]        |
+----------------------------------+
```

---

## Component Specifications

### 1. Orbit Robot (Mobile)
- **Size:** 160x160px container
- **Face:** 64px gradient circle
- **Orbit:** 60px radius
- **Icons:** 24px each (MessageCircle, Lightbulb, FileText, Users)
- **Animation:** 20s rotation cycle
- **Position:** Centered above questions

### 2. Suggested Questions
- Show 2 questions at a time (cycling)
- Compact padding: `px-3 py-2`
- Font size: `text-sm`
- Gap between questions: `gap-2`

### 3. Chat Input (Sticky Bottom)
- Fixed to bottom of viewport
- Pill shape with shadow
- Clear (X) button when text exists
- Send button with animation

### 4. Chat Messages
- Flex grow area between questions and input
- Auto-scroll to latest message
- Compact message bubbles

---

## Removed Elements
- "Discover Our Services" button
- "Learn More" button
- Large hero text (shows on scroll only)

---

## Touch Interactions
- Tap suggested question → fills input
- Tap X → clears input
- Tap send → sends message
- Scroll down → reveals hero section
- Pull down → returns to chat

---

## Responsive Breakpoints

| Screen Width | Robot Size | Questions Shown |
|--------------|------------|-----------------|
| < 640px (mobile) | 160px | 2 |
| 640-1023px (tablet) | 200px | 3 |
| >= 1024px (desktop) | 256px | 4 |

---

## Visual Style
- Dark theme with gradient accents
- Cyan/blue primary color
- Subtle glow effects on robot
- Rounded corners throughout
- Glass-morphism on input bar
