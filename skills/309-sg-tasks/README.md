# 309-sg-tasks

> Keep project task tracking honest by updating what is done, what remains, and what should happen next.

## What It Does

`309-sg-tasks` maintains ShipGlowz task trackers based on actual project evidence. It reviews current repo state, checks which tasks are truly complete, adds missing follow-up work, updates the master workspace tracker, and suggests the next priority item.

It is designed for operational clarity, not note-taking. The goal is to keep `TASKS.md` aligned with reality across both the local repo and the shared workspace dashboard.

## Who It's For

- Solo founders coordinating several projects from one workspace
- Developers who want backlog hygiene without manual bookkeeping
- Teams using `TASKS.md` as an active operations tracker

## When To Use It

- when work was completed and the tracker is stale
- when a repo has drifted from the master workspace backlog
- when you want a suggested next action based on blockers and dependencies

## What You Give It

- the current repo or workspace root
- existing `TASKS.md` files if they exist
- optionally a focus area or task type

## What You Get Back

- updated master `TASKS.md` entries
- updated local `TASKS.md` when relevant
- newly added tasks for unfinished work, docs, tests, or follow-ups
- changelog updates for tasks completed in the session
- a recommended next priority

## Typical Examples

```bash
/309-sg-tasks
/309-sg-tasks onboarding
/309-sg-tasks tests
```

## Limits

`309-sg-tasks` is only as good as the evidence available in the repo. It should not mark work done based on intention alone, and it is not the right place to store long-lived product decisions or technical contracts. Those should move into dedicated artifacts.

## Related Skills

- `703-sg-review` for broader session review and planning
- `102-sg-start` when the next task should move into execution
- `005-sg-ship` when the work is ready to be committed and pushed
