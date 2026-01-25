# Pull Request Template

Copy this template when creating a pull request.

---

```markdown
## Summary

<!-- Brief description of what this PR does -->

## Type of Change

<!-- Mark the relevant option with an "x" -->

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Style/formatting changes
- [ ] Performance improvement
- [ ] Other (please describe):

## Changes Made

<!-- List the specific changes made in this PR -->

- Change 1
- Change 2
- Change 3

## Testing

<!-- Describe how you tested your changes -->

### Test Environment

- Browser:
- OS:
- Node version:

### Test Steps

1. Step 1
2. Step 2
3. Expected result

## Screenshots

<!-- If applicable, add screenshots to help explain your changes -->

| Before | After |
|--------|-------|
| screenshot | screenshot |

## Related Issues

<!-- Link any related issues -->

Closes #
Relates to #

## Checklist

<!-- Mark completed items with an "x" -->

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings
- [ ] I have tested my changes thoroughly
- [ ] Commit messages follow conventional commit format

## Additional Notes

<!-- Any additional information that reviewers should know -->
```

---

## Example Filled PR

```markdown
## Summary

Add typing indicator animation to AI chat window

## Type of Change

- [ ] Bug fix
- [x] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made

- Added `TypingIndicator` component with bouncing dots animation
- Implemented 1.5s delay before showing greeting
- Added staggered animation for suggested questions
- Updated `AIChatWindow` state management

## Testing

### Test Environment

- Browser: Chrome 120
- OS: macOS 14
- Node version: 20.10.0

### Test Steps

1. Navigate to home page
2. Observe typing indicator appears
3. After 1.5s, greeting message appears
4. Questions fade in one by one

## Screenshots

| Before | After |
|--------|-------|
| Static chat | Animated chat |

## Related Issues

Closes #42

## Checklist

- [x] My code follows the project's style guidelines
- [x] I have performed a self-review of my code
- [x] I have commented my code where necessary
- [x] I have updated the documentation accordingly
- [x] My changes generate no new warnings
- [x] I have tested my changes thoroughly
- [x] Commit messages follow conventional commit format

## Additional Notes

Animation delays are configurable via props if needed in the future.
```
