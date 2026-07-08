# 101-sg-ready

> Decide whether a spec is truly ready for implementation before you spend time coding the wrong thing.

## What It Does

`101-sg-ready` is a readiness gate for spec-driven work. It checks whether a spec is complete, unambiguous, aligned with the user story, testable, aware of linked systems, and proportionate on security. The output is a verdict: ready or not ready, with concrete reasons.

For solo founders, this prevents a common waste pattern: starting implementation with a document that still hides major decisions.

## Who It's For

- Founders using specs before execution
- Teams that want a cleaner handoff from planning to implementation
- Anyone working on changes where ambiguity is expensive

## When To Use It

- after writing a new spec
- before `102-sg-start` on non-trivial work
- when a spec feels “mostly there” but still risky

## What You Give It

- a spec path or a task name that maps to a spec
- optionally, project context files that the spec depends on

## What You Get Back

- a readiness verdict
- a checklist of passes and failures
- concrete gaps to close before implementation
- an updated spec status when the document is ready enough to proceed

## Typical Examples

```bash
/101-sg-ready
/101-sg-ready specs/billing-rework.md
/101-sg-ready docs/specs/new-onboarding.md
```

## Limits

- It validates readiness; it does not replace the spec-writing step itself.
- A spec can be “ready” and still need judgment during implementation.
- Tiny local changes often do not need this level of gating.

## Related Skills

- `100-sg-spec` to create or improve the spec
- `102-sg-start` after a ready verdict
- `103-sg-verify` after implementation
