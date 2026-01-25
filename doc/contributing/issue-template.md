# Issue Templates

Copy the appropriate template when creating an issue.

---

## Bug Report Template

```markdown
## Bug Report

### Description

<!-- Clear description of the bug -->

### Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

### Expected Behavior

<!-- What you expected to happen -->

### Actual Behavior

<!-- What actually happened -->

### Screenshots

<!-- If applicable, add screenshots -->

### Environment

- **Browser:** [e.g., Chrome 120, Safari 17]
- **OS:** [e.g., macOS 14, Windows 11]
- **Device:** [e.g., Desktop, iPhone 15]
- **Screen size:** [e.g., 1920x1080]

### Console Errors

<!-- Any errors shown in browser console -->

```
Paste error messages here
```

### Additional Context

<!-- Any other relevant information -->
```

---

## Feature Request Template

```markdown
## Feature Request

### Problem Statement

<!-- What problem does this feature solve? -->

As a [type of user], I want [goal] so that [benefit].

### Proposed Solution

<!-- Describe your proposed solution -->

### Alternative Solutions

<!-- Other solutions you've considered -->

### Additional Context

<!-- Mockups, examples, or additional information -->

### Acceptance Criteria

<!-- How will we know this feature is complete? -->

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

---

## Documentation Request Template

```markdown
## Documentation Request

### What's Missing

<!-- What documentation is needed? -->

### Where It Should Go

<!-- Which doc file or section? -->

### Why It's Needed

<!-- How will this help users/developers? -->

### Suggested Content

<!-- Outline or draft of the content -->
```

---

## Question Template

```markdown
## Question

### Topic

<!-- What area does this relate to? -->

- [ ] Setup/Installation
- [ ] Components
- [ ] Styling
- [ ] Routing
- [ ] Deployment
- [ ] Other

### Question

<!-- Your question -->

### What I've Tried

<!-- Steps you've already taken -->

### Related Documentation

<!-- Links to docs you've already checked -->
```

---

## Example Bug Report

```markdown
## Bug Report

### Description

Mobile navigation menu doesn't close when clicking a link.

### Steps to Reproduce

1. Open site on mobile device (< 768px)
2. Click hamburger menu icon
3. Click on "About" link
4. Menu remains open over content

### Expected Behavior

Menu should close after clicking a navigation link.

### Actual Behavior

Menu stays open and overlays the About page content.

### Screenshots

[screenshot of issue]

### Environment

- **Browser:** Safari 17
- **OS:** iOS 17
- **Device:** iPhone 15
- **Screen size:** 393x852

### Console Errors

No errors in console.

### Additional Context

Works correctly on Chrome Android. Issue appears to be Safari-specific.
```

---

## Example Feature Request

```markdown
## Feature Request

### Problem Statement

As a user, I want to share specific sections of the page so that I can link directly to content I'm referencing.

### Proposed Solution

Add anchor links to all H2 headings on content pages that:
- Display a link icon on hover
- Copy the URL with anchor hash to clipboard when clicked
- Show a "Link copied" toast notification

### Alternative Solutions

1. Add a "Share" button that generates a shareable URL
2. Implement URL hash scrolling without visible links

### Additional Context

Similar to how GitHub READMEs handle section linking.

### Acceptance Criteria

- [ ] H2 headings have anchor IDs
- [ ] Link icon appears on hover
- [ ] Clicking copies URL to clipboard
- [ ] Toast confirms copy action
- [ ] Direct URL navigation scrolls to section
```
