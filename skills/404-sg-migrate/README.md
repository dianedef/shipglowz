# 404-sg-migrate

> Upgrade a framework or major dependency with a researched plan, codebase scan, and safer execution path.

## What It Does

`404-sg-migrate` helps you move from one major version to another without treating the upgrade like guesswork. It looks up official migration guidance, checks your codebase for affected patterns, builds a migration plan, and then applies the change with verification.

The practical benefit for a solo founder is risk reduction: fewer broken builds, fewer hidden breaking changes, and less time spent diffing release notes manually.

## Who It's For

- Founders maintaining their own product stack
- Teams upgrading frameworks with limited time for manual research
- Developers handling overdue dependency or platform migrations

## When To Use It

- when a framework upgrade is blocking new work
- when a package has a major version available
- when you want a migration plan before changing production code

## What You Give It

- a package name or `package@version`
- a repo with the relevant code and config
- optionally, permission to apply the migration after review

## What You Get Back

- a migration matrix of impacted files and patterns
- a practical upgrade plan
- applied code and config changes when approved
- verification results from typecheck, lint, and build steps
- a backup branch strategy before risky edits

## Typical Examples

```bash
/404-sg-migrate
/404-sg-migrate astro
/404-sg-migrate next@16
```

## Limits

- Large migrations can still require manual product decisions or refactors.
- If upstream docs are incomplete or the project is already inconsistent, confidence drops.
- It should not replace human review for high-risk upgrades touching auth, billing, or data flows.

## Related Skills

- `105-sg-check` after the upgrade
- `304-sg-changelog` to document the migration
- `405-sg-prod` after deployment
