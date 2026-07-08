# 100-sg-spec

> Turn an idea or task into an implementation-ready technical spec anchored in a real user story.

## What It Does

`100-sg-spec` creates a structured spec that an agent or developer can implement without re-reading the full conversation. It combines user clarification, codebase investigation, and an explicit behavioral contract: what should happen on success, what should happen on failure, what is in scope, and what other systems or docs are affected.

The output is meant to be executable, not aspirational. It should reduce ambiguity before coding starts.

## Who It's For

- Solo founders working on non-trivial features
- Developers who want fewer “I thought we meant…” implementation mistakes
- Teams that need a clean contract before handing work to another agent

## When To Use It

- when a task is ambiguous, multi-file, or risky
- when auth, data, integrations, or public behavior are involved
- when you want a durable artifact before implementation

## What You Give It

- a feature, bug, migration, or workflow change to define
- the current repo and any relevant business or technical docs
- clarifications about actor, trigger, expected outcome, and scope boundaries

## What You Get Back

- a spec artifact with user story, behavioral contract, implementation tasks, acceptance criteria, risks, and documentation impact
- explicit links to files, dependencies, and validation steps
- a next step that usually routes to `101-sg-ready`

## Typical Examples

```bash
/100-sg-spec
/100-sg-spec add invite-only onboarding flow
/100-sg-spec fix webhook retry behavior
```

## Limits

`100-sg-spec` prepares implementation; it does not implement the change. It also depends on enough real context to define the contract honestly. If core product decisions are still unresolved, the output should surface those open questions instead of hiding them in vague tasks.

## Related Skills

- `101-sg-ready` to validate the spec before coding
- `102-sg-start` to implement from a ready contract
- `103-sg-verify` to check the finished work against the spec
