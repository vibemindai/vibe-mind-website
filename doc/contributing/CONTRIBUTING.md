# Contributing Guide

**Last Updated:** 2026-01-25

---

## Welcome

Thank you for your interest in contributing to Vibe Mind Website! This guide will help you get started.

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/vibe-mind-website.git
   cd vibe-mind-website
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. Start development:
   ```bash
   npm run dev
   ```

---

## Development Workflow

### 1. Find or Create an Issue

- Check existing issues for something to work on
- For new features, create an issue first to discuss

### 2. Make Your Changes

- Follow the [code standards](../workflow/code-standards.md)
- Write clean, readable code
- Add tests if applicable
- Update documentation if needed

### 3. Commit Your Changes

Use conventional commits:

```bash
git add .
git commit -m "feat(component): add new feature"
```

Commit types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (formatting)
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance

### 4. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

---

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Commits use conventional commit format
- [ ] All tests pass (if applicable)
- [ ] Documentation is updated
- [ ] PR has a clear description

### PR Template

Use this template when creating a PR:

```markdown
## Summary

Brief description of changes.

## Changes

- Change 1
- Change 2
- Change 3

## Testing

How was this tested?

## Screenshots (if applicable)

## Related Issues

Closes #123
```

---

## Code Style

### TypeScript

- Use strict type checking
- Avoid `any` type
- Define interfaces for props

### React

- Use functional components
- Use hooks for state and effects
- Follow component organization pattern

### Styling

- Use Tailwind CSS classes
- Use `cn()` for conditional classes
- Follow mobile-first approach

### Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `MyComponent.tsx` |
| Hooks | camelCase with `use` | `useTheme.tsx` |
| Files | kebab-case or PascalCase | `my-component.tsx` |
| Variables | camelCase | `myVariable` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_COUNT` |

---

## Documentation

### When to Update Docs

- Adding new features
- Changing existing behavior
- Adding new components
- Modifying configuration

### Documentation Structure

```
doc/
├── architecture/     # System design
├── components/       # Component docs
├── api/             # API & hooks
├── styling/         # Design system
├── workflow/        # Development
├── deployment/      # Hosting
├── integration/     # Third-party
└── contributing/    # This guide
```

---

## Reporting Issues

### Bug Reports

Include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details

### Feature Requests

Include:
- Problem statement
- Proposed solution
- Alternative solutions considered
- Additional context

---

## Review Process

1. **Automated Checks** - CI runs linting and builds
2. **Code Review** - Maintainers review changes
3. **Feedback** - Address review comments
4. **Approval** - Maintainer approves
5. **Merge** - Changes are merged

---

## Questions?

- Check the [documentation](../README.md)
- Create a discussion on GitHub
- Reach out to maintainers

---

## Code of Conduct

Be respectful and constructive. We're all here to build something great together.

---

Thank you for contributing!
