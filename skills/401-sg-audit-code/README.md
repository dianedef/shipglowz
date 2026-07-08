# 401-sg-audit-code

> Review a codebase like a senior engineer looking for bugs, drift, weak assumptions, and risky behavior.

## What It Does

`401-sg-audit-code` performs a professional code review on either a single file or a full project. It focuses on product behavior, workflow integrity, architecture quality, reliability, and security, not just style issues.

It is built to surface the problems that actually matter before users or operators hit them.

## Who It's For

- Solo founders shipping product changes without a dedicated reviewer
- Technical operators inheriting an unfamiliar codebase
- Teams that want a practical audit before refactors or release

## When To Use It

- when a feature behaves strangely and you want a rigorous review path
- when you need a pre-release audit of architecture and runtime risks
- when you want a single-file deep review with concrete findings

## What You Give It

- a project root, a specific file path, or `global`
- any helpful product context already present in the repo

## What You Get Back

- severity-ranked findings with file and line references
- explicit notes on user-story fit, trust boundaries, and failure modes
- concrete fix directions instead of vague commentary

## Typical Examples

```bash
/401-sg-audit-code
/401-sg-audit-code src/lib/auth.ts
/401-sg-audit-code global
```

## Limits

This skill audits and reports. It does not automatically refactor the whole codebase, and it depends on the repo exposing enough evidence to judge architecture and behavior accurately.

## Related Skills

- `106-sg-fix` to move from bug triage to implementation
- `400-sg-audit` for a cross-domain master review
- `105-sg-check` to verify typecheck, lint, and build after changes
