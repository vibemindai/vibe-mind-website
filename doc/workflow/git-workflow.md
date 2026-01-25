# Git Workflow

**Last Updated:** 2026-01-25

---

## Branch Strategy

### Main Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `develop` | Integration branch (optional) |

### Feature Branches

```
feature/<feature-name>
fix/<bug-description>
docs/<documentation-change>
refactor/<refactor-description>
```

### Examples

```bash
git checkout -b feature/add-contact-form
git checkout -b fix/navigation-mobile-menu
git checkout -b docs/update-readme
git checkout -b refactor/optimize-animations
```

---

## Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for consistent commit messages.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, semicolons) |
| `refactor` | Code refactoring (no feature change) |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks, dependencies |
| `build` | Build system changes |
| `ci` | CI/CD changes |

### Scope (Optional)

The part of the codebase affected:

- `nav` - Navigation
- `chat` - AI Chat
- `theme` - Theming
- `globe` - 3D Globe
- `docs` - Documentation
- `deps` - Dependencies

### Examples

```bash
# Feature
git commit -m "feat(chat): add typing indicator animation"

# Bug fix
git commit -m "fix(nav): resolve mobile menu z-index issue"

# Documentation
git commit -m "docs: update installation instructions"

# Style
git commit -m "style(button): adjust hover state colors"

# Refactor
git commit -m "refactor(theme): simplify context provider"

# Performance
git commit -m "perf(globe): optimize 3D rendering performance"

# Breaking change
git commit -m "feat(api)!: change response format

BREAKING CHANGE: API response now uses camelCase keys"
```

---

## Commit Message Validation

Commit messages are validated using commitlint + husky.

### Setup (Already Configured)

```bash
# commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

### If Commit Fails

```
✖ subject may not be empty [subject-empty]
✖ type may not be empty [type-empty]
```

Fix by using proper format:

```bash
# Bad
git commit -m "fixed bug"

# Good
git commit -m "fix(nav): correct mobile menu behavior"
```

---

## Workflow Steps

### 1. Start Work

```bash
# Ensure main is up to date
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/my-feature
```

### 2. Make Changes

```bash
# Stage changes
git add .

# Commit with conventional message
git commit -m "feat(component): add new feature"

# Push branch
git push -u origin feature/my-feature
```

### 3. Create Pull Request

- Go to repository on GitHub
- Click "New Pull Request"
- Select your branch
- Fill in PR template
- Request reviewers

### 4. After Merge

```bash
# Switch to main
git checkout main

# Pull latest
git pull origin main

# Delete local branch
git branch -d feature/my-feature
```

---

## Changelog Generation

After commits are merged, generate the changelog:

```bash
# Generate/update changelog
npm run changelog

# Or with release
npm run release
```

---

## Git Hooks (Husky)

| Hook | Purpose |
|------|---------|
| `commit-msg` | Validate commit message format |
| `pre-push` | Run linting before push (optional) |

### Skip Hooks (Emergency Only)

```bash
git commit --no-verify -m "emergency fix"
```

---

## Best Practices

### 1. Atomic Commits

Each commit should represent a single logical change:

```bash
# Good: Separate commits
git commit -m "feat(form): add email validation"
git commit -m "feat(form): add phone validation"

# Bad: Combined commits
git commit -m "add validation"
```

### 2. Write Clear Messages

- Use imperative mood: "add", "fix", "update" (not "added", "fixed")
- Keep subject under 50 characters
- Explain "why" in body if needed

### 3. Keep Branches Small

- Aim for branches that can be reviewed in ~30 minutes
- Split large features into smaller PRs

### 4. Rebase vs Merge

```bash
# Prefer rebase for feature branches
git fetch origin
git rebase origin/main

# Resolve conflicts if any
git rebase --continue
```

---

## Related Documentation

- [Development](./development.md)
- [Code Standards](./code-standards.md)
- [Contributing](../contributing/CONTRIBUTING.md)
