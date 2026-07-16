---
artifact: playbook
metadata_schema_version: "1.0"
artifact_version: "1.1.0"
project: ShipGlowz
created: "2026-07-15"
updated: "2026-07-16"
status: draft
source_skill: 309-sg-tasks
scope: conversation-tracker-sync
owner: Diane
confidence: high
risk_level: medium
security_impact: yes
docs_impact: yes
linked_systems:
  - skills/309-sg-tasks/SKILL.md
  - shipglowz_data/workflow/TASKS.md
  - ~/.codex/state_5.sqlite
depends_on: []
supersedes: []
evidence:
  - "Operator request on 2026-07-15: reuse the Codex conversation rename workflow as a task-tracker mode."
  - "Codex UI session titles are stored in the local threads table; project tasks are stored in the local TASKS.md tracker."
  - "Operator decision on 2026-07-16: tracker-less cwd scopes remain valid, older same-subject sessions close, and sessions inactive for more than 30 days close without changing linked task completion."
next_review: "2026-08-15"
next_step: "/309-sg-tasks sessions <project>"
---

# Codex Sessions Status Playbook

## Purpose

Keep Codex conversation names useful as a project navigation layer while
keeping project work in the local `TASKS.md` tracker. The two records are linked
when a conversation creates or advances durable work. This is a many-to-one
relationship: several sessions may support the same task, especially after a
fork or a context-reuse session.

## Applicability

Use for a repository-wide conversation review, a cleanup of stale session names,
or a single conversation rename. Invoke:

```text
/309-sg-tasks sessions <project-or-cwd>
/309-sg-tasks name-conversation
```

## Inputs

- exact project root / `cwd`;
- local `shipglowz_data/workflow/TASKS.md`;
- Codex `~/.codex/state_5.sqlite`, table `threads`;
- conversation preview or first user message, when available;
- implementation and proof evidence needed to judge closure.

## Status Contract

Use the exact tracker vocabulary in both the thread title and any linked task:

| Status | Meaning |
| --- | --- |
| `todo` | identified, not started |
| `doing` | actively being executed now |
| `in_progress` | started but not ready to close |
| `blocked` | cannot advance without a named dependency or decision |
| `done` | implementation and required proof are complete |

Use a short title shaped as `<STATUS> - <work title>`, with the tracker status
uppercased. Keep the original Codex thread `id` unchanged.

## Execution Order

1. Resolve the exact absolute `cwd`. Read the current local tracker when it
   exists. If the directory has no tracker, keep the `cwd` as the session scope
   and do not create `TASKS.md` or `shipglowz_data/` solely for this review.
2. Query `threads` using exact `cwd`; never match by project name in text.
3. Read enough session context to derive the work title, subject, last activity,
   and evidence state.
4. Group only high-confidence same-subject sessions. Prefer normalized exact
   matches or clear semantic equivalence; leave ambiguous neighboring topics
   separate. Keep the row with the latest activity timestamp as the canonical
   open session and mark older duplicates `done`.
5. Mark a non-current session `done` when its latest activity is more than 30
   days old, unless its context explicitly proves a named blocker or intentional
   continuing work. This is session cleanup, not proof that a linked task is
   complete.
6. Classify the remaining thread using the status contract. Treat missing proof as
   `in_progress`, `todo`, or `blocked`, not as `done`.
7. Update `threads.title` in SQLite so the Codex UI reflects the result.
8. If durable follow-up exists and a project tracker exists, update one canonical `task` record in
   `TASKS.md` and add `session_id: <thread id>` (or preserve an existing
   `conversation_id` field). Follow the operational-record format.
9. Re-read the SQLite source and any existing tracker, then report the mapping, unresolved ambiguity, and
   next action.

## Decision Gates

- `done` requires concrete implementation evidence and the relevant proof
  path when updating a project task. A session title may also become `done`
  through the duplicate or 30-day cleanup rules, but that must not mark a
  linked task `done`.
- The current thread is never auto-closed by duplicate or inactivity cleanup.
- Choose the newest same-subject session by the best available activity field
  (`recency_at_ms`, then `updated_at_ms`); preserve all thread ids and content.
- A conversation without durable project follow-up gets a renamed session but
  no synthetic tracker row.
- A task may link to several conversation ids, but one conversation id must
  not create duplicate task records.
- Sessions from another `cwd`, private data, or unrelated projects are out of
  scope and must remain unchanged.
- Never put transcripts, secrets, cookies, tokens, or private payloads in the
  tracker.

## Outputs

- renamed Codex thread titles;
- tracker rows created or updated only for durable follow-up;
- explicit list of ambiguous or blocked conversations;
- compact report with validation and next step.

## Linked Checklists

No separate execution checklist is required for the first mode. A future
checklist may capture a batch review, but the playbook remains the reusable
method and `TASKS.md` remains the operational record.

## Failure Modes

- `ok`/`cours` or other legacy labels remain in titles: normalize to the exact
  tracker vocabulary.
- the UI does not reflect a rename: verify SQLite `threads.title`; updating
  only `session_index.jsonl` is insufficient for the session list.
- a project-name text match catches unrelated sessions: rerun with exact
  `threads.cwd` filtering.
- a tracker-less workspace gets a synthetic governance tree: revert that
  tracker creation and keep the exact `cwd` as the session-only scope.
- several sessions cover the same subject: keep only the most recently active
  session open and mark older high-confidence duplicates `done`.
- an inactive session remains open without explicit override evidence: apply
  the strict `more than 30 days` cutoff; do not use `30 days or more`.
- closure is uncertain: keep the session open under `in_progress`, `todo`, or
  `blocked` and name the missing evidence.

## Validation

```bash
rg -n "CONVERSATION-TRACKER-ABSENT|CONVERSATION-SUBJECT-DUPLICATION|CONVERSATION-INACTIVE-30D|more than 30 days|current thread" \
  /home/claude/shipglowz/skills/309-sg-tasks/SKILL.md \
  /home/claude/shipglowz/shipglowz_data/workflow/playbooks/conversation-tracker-sync-playbook.md
python3 /home/claude/shipglowz/tools/shipglowz_metadata_lint.py \
  /home/claude/shipglowz/shipglowz_data/workflow/playbooks/conversation-tracker-sync-playbook.md
```
