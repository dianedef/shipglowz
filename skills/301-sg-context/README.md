# 301-sg-context

> Load the smallest useful set of files for a task before you start, so the session begins with focused context instead of broad repo spelunking.

## What It Does

`301-sg-context` primes an agent session for a specific task. It checks what is already known, reuses existing memory when possible, and pulls only the most relevant files into context.

The goal is simple: spend less time re-reading a codebase and more time doing the work. For solo founders, that means faster starts, fewer wasted tokens, and less risk of solving the wrong problem because the wrong files were loaded first.

## Who It's For

- Solo founders working in large or unfamiliar repos
- Developers jumping between several active projects
- Anyone who wants a tighter, cheaper setup phase before implementation

## When To Use It

- when the task is specific but the codebase is large
- when you are resuming work after context was lost
- when you want to avoid broad file searches before acting
- when the next step depends on choosing the right 3 to 5 files first

## What You Give It

- a short description of what you want to do
- optionally a specific file path if one is already known

## What You Get Back

- a concise readiness summary for the task
- the key files already in context
- important stored decisions or constraints
- a short plan for the next execution step

## Typical Examples

```bash
/301-sg-context fix the broken billing webhook
/301-sg-context add pagination to the admin users page
/301-sg-context explain src/lib/auth.ts
```

## Limits

`301-sg-context` is a prep step, not an implementation step. It does not search the whole repo indiscriminately, and it is intentionally conservative about how many files it reads up front.

## Related Skills

- `106-sg-fix` for bug-first execution after priming
- `102-sg-start` for full implementation
- `700-sg-explore` when the task is still too fuzzy to execute
