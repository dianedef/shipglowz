# 103-sg-verify

> Check whether work is actually ready to ship by testing it against the user story, the contract, and the obvious risks.

## What It Does

`103-sg-verify` performs a pre-ship verification pass that goes beyond lint and tests. It checks whether the promised user outcome is really delivered, whether success and error behavior are observable, whether the implementation matches the spec or task contract, and whether linked systems, docs, dependencies, or risks were overlooked.

It complements technical checks with product, documentation, and security-minded validation.

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

## Typical Examples

```bash
/103-sg-verify
/103-sg-verify invite flow
/103-sg-verify billing webhook retry handling
```

## Limits

`103-sg-verify` is not a full audit and it is not purely technical. It can correct stable code in some cases, but its main job is to judge evidence honestly. If the contract is weak or validation is missing, the result should stay uncertain rather than pretending the work is safe.

## Related Skills

- `105-sg-check` for broader technical validation
- `108-sg-browser` when ship-readiness depends on non-auth page, visual, console, or network evidence
- `109-sg-auth-debug` when ship-readiness depends on a real Clerk, OAuth, or session-flow confirmation
- `100-sg-spec` and `101-sg-ready` to strengthen the contract before implementation
- `005-sg-ship` once verification is good enough to push
- `405-sg-prod` after `005-sg-ship` when the project requires preview-push validation
