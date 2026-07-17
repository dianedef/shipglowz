# 103-sg-verify

> Check whether work is actually ready to ship by testing it against the user story, the contract, and the obvious risks.

## What It Does

`103-sg-verify` performs a pre-ship verification pass that goes beyond lint and tests. It checks whether the promised user outcome is really delivered, whether success and error behavior are observable, whether the implementation matches the spec or task contract, and whether linked systems, docs, dependencies, or risks were overlooked.

It complements technical checks with product, documentation, and security-minded validation.

Standard mode answers whether the work is correct, proven, and ready against its métier contract. Explicit `mode=excellence`, or an unambiguous natural-language request for an excellence pass, keeps those gates then adds a fresh critical focus on material missed opportunities, incoherence, duplication, avoidable user or operator friction, durability, and choices that are correct but merely adequate.

It also respects the project development mode: when Vercel preview-push validation is required, `103-sg-verify` must not call work ready to ship until the needed `005-sg-ship` -> `405-sg-prod` preview evidence exists.

## Who It's For

- Solo founders who need an honest “ready or not?” pass
- Developers shipping features that touch users, data, or permissions
- Teams that want more than a green test run before pushing

## When To Use It

- when a task feels finished and you want a ship-readiness verdict
- when a feature changed user-facing behavior or error handling
- when a spec exists and you want to verify the build against the contract
- when auth, payments, data, docs, or dependencies may be involved
- when protected routes or browser auth flows need real evidence before you call the work done
- when non-auth page behavior needs browser evidence before you claim the user-visible outcome is proven
- when standard verification already passed but you want to challenge what remains materially average

## What You Give It

- a repo with recent changes
- optionally a specific task or scope to verify
- ideally a ready spec or clear task description

## What You Get Back

- a structured verification report
- findings across user story, completeness, correctness, coherence, dependencies, and risk
- focused technical checks where practical
- explicit warnings when behavior is only partially demonstrated
- guidance on what to fix before shipping
- a push toward `108-sg-browser` when non-auth browser-observable behavior was not proven
- a push toward `109-sg-auth-debug` when auth behavior was not proven in a real browser
- a clear warning when local evidence is not enough for a Vercel-preview validation surface
- `verified` for a passing standard run, without an excellence claim
- `verified_with_excellence_gaps` when readiness passes but a material excellence gap needs bounded follow-up
- `excellent` only after an evidenced excellence pass finds no material gap

## Typical Examples

```bash
/103-sg-verify
/103-sg-verify invite flow
/103-sg-verify billing webhook retry handling
/103-sg-verify mode=excellence current verified work
```

## Limits

`103-sg-verify` is not a full audit and it is not purely technical. Excellence mode does not replace specialist audits for design, copy, security, performance, or architecture. It can correct stable bounded issues in some cases, but missing proof or blocking risk keeps `partial`, `not verified`, or `blocked` precedence over any excellence verdict.

## Related Skills

- `105-sg-check` for broader technical validation
- `108-sg-browser` when ship-readiness depends on non-auth page, visual, console, or network evidence
- `109-sg-auth-debug` when ship-readiness depends on a real Clerk, OAuth, or session-flow confirmation
- `100-sg-spec` and `101-sg-ready` to strengthen the contract before implementation
- `005-sg-ship` once verification is good enough to push
- `405-sg-prod` after `005-sg-ship` when the project requires preview-push validation
