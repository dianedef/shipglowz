---
artifact: exploration_report
metadata_schema_version: "1.0"
artifact_version: "1.0.1"
project: ShipFlow
created: "2026-06-29"
updated: "2026-07-11"
status: draft
source_skill: 700-sg-explore
scope: mail-source-intake-automation
owner: unknown
confidence: medium
risk_level: high
security_impact: yes
docs_impact: yes
linked_systems:
  - /home/claude/Mail
  - /home/claude/.mbsyncrc
  - /home/claude/.notmuch-config
  - skills/references/source-intake-classification.md
  - skills/references/private-memory-store.md
  - skills/emailing/SKILL.md
  - shipglowz_data/business/portfolio-project-pitch-links.md
evidence:
  - "Operator request 2026-06-29: use local email corpus as daily source material for project routing and idea validation."
  - "Local mail store observed at /home/claude/Mail with Maildir folders and notmuch index."
  - "mbsync and notmuch are installed; no user systemd timer currently handles mail classification."
depends_on:
  - artifact: "skills/references/source-intake-classification.md"
    artifact_version: "1.0.0"
    required_status: active
  - artifact: "skills/references/private-memory-store.md"
    artifact_version: "1.0.0"
    required_status: active
supersedes: []
next_step: "/100-sg-spec daily mail source intake automation"
---

# Exploration Report: Mail Source Intake Automation

## Starting Question

How should ShipFlow process the operator's local email corpus every day, classify emails by probable project and useful angle, and leave the operator with a small validation queue instead of a manual sorting job?

## Context Read

- `CLAUDE.md` - confirmed hidden-cache preference and existing ShipFlow runtime conventions.
- `/home/claude/Mail` - found local Maildir corpus with `competitors/business-a/INBOX`, `_to_transcribe`, and `.notmuch`.
- `/home/claude/.mbsyncrc` - found `mbsync` pull setup for the local mail corpus; secrets were redacted from inspection.
- `/home/claude/.notmuch-config` - found notmuch indexing config and current tag model.
- `skills/references/source-intake-classification.md` - source classification contract already owns project/angle/owner-skill routing.
- `skills/references/private-memory-store.md` - private storage contract already owns reusable source and pitch cache placement.

## Internet Research

- None. Local system inspection was enough for this exploration pass.

## Problem Framing

The operator has an existing email corpus that is useful as source material for projects, content, email sequences, product ideas, competitor insights, and market signals.

The missing layer is not just a new writing skill. It is an operational intake pipeline:

```text
IMAP
  -> mbsync
  -> Maildir under ~/Mail
  -> notmuch index
  -> daily classifier
  -> private review queue
  -> operator validates/modifies
  -> owner skill acts later
```

The output should be proposals, not automatic publication or automatic content generation.

## Option Space

### Option A: Manual Skill Invocation

- Summary: The operator invokes `#source` or `emailing` with copied email content.
- Pros: Low implementation cost, maximum control, minimal privacy risk.
- Cons: Too manual for daily use; does not reduce triage drag enough.

### Option B: Daily Local Classifier

- Summary: A local script syncs mail, indexes notmuch, classifies candidate emails, and writes a private queue for validation.
- Pros: Matches the daily workflow; keeps raw mail local; creates a repeatable validation surface.
- Cons: Needs careful privacy, idempotency, dedupe, and review-state handling.

### Option C: Full Autonomous Agent

- Summary: A scheduled agent reads mail, classifies, drafts outputs, and routes actions automatically.
- Pros: Highest automation.
- Cons: Too risky now: private mail, possible copyright issues, wrong project routing, and no validation gate.

## Comparison

Option B is the right middle layer. It automates discovery and classification without removing the operator's approval step.

The classifier should produce records like:

```text
Source id: <notmuch message id or thread id>
Date:
From domain:
Subject summary:
Probable project:
Useful angle:
Owner skill:
Suggested action:
Confidence:
Risks:
Review state: pending | accepted | edited | rejected | ignored
```

Raw email bodies should stay in Maildir or the private memory store only when explicitly approved.

## Emerging Recommendation

Create a dedicated operational skill or tool layer for daily mail source intake.

Recommended shape:

- `mail-intake` as an internal operational workflow, not a content-writing skill.
- A local script under ShipFlow or a private runtime folder that runs:
  - `mbsync business-a-mail`
  - `notmuch new`
  - a bounded notmuch query for fresh or unreviewed messages
  - source-intake classification against portfolio index and private pitch cache
  - output to `${SHIPGLOWZ_PRIVATE_ROOT:-${SHIPFLOW_PRIVATE_ROOT:-$HOME/.shipglowz/private/data}}/mail-intake/queue/`
- A user-facing review command that shows pending proposals and lets the operator accept, edit, reject, or route one.
- A user systemd timer when the manual command is reliable.

## Non-Decisions

- Exact LLM provider/model for classification.
- Exact review UI: Markdown queue, terminal menu, TUI, or future ShipFlow App surface.
- Whether to persist full email bodies. Default should be no.
- Whether accepted ideas create specs, backlog items, sequence briefs, or direct owner-skill prompts.

## Rejected Paths

- Put email-derived caches in the public ShipFlow repo - rejected because email content is private and may include third-party text.
- Let `emailing` own the whole mail pipeline - rejected because many emails route to research, repurpose, docs, product, or market study instead of email sequences.
- Start with full autonomous writing - rejected because the operator asked for validation/modification of ideas.

## Risks And Unknowns

- Privacy risk: inbox material can contain personal data, order details, private headers, tracking links, or third-party copyrighted content.
- Classification drift: wrong project routing will create noisy proposals unless the portfolio pitch cache is reliable.
- Review fatigue: if the daily queue is too large, the automation becomes another inbox.
- Idempotency: the classifier must not reprocess the same message every run unless the operator asks.
- Storage boundary: raw email bodies should stay outside Git and preferably outside durable source-cache unless approved.
- Scheduling: a timer is useful only after the command is deterministic and has logs/failure handling.

## Redaction Review

- Reviewed: yes
- Sensitive inputs seen: local mail paths, mbsync/notmuch config shape, email corpus counts, high-level notmuch search metadata
- Redactions applied:
  - `[REDACTED_TOKEN]`
  - `[REDACTED_COOKIE]`
  - `[REDACTED_PRIVATE_KEY]`
  - `[REDACTED_CUSTOMER_DATA]`
  - `[REDACTED_SENSITIVE_LOG]`
- Notes: The report intentionally excludes email bodies, sender details, subject examples, hostnames, usernames, and password material.

## Decision Inputs For Spec

- User story seed: As the operator, I want ShipFlow to scan my local mail corpus daily, classify useful source emails by likely project and angle, and give me a small validation queue so I can accept, edit, or reject ideas before any downstream skill acts.
- Scope in seed: local Maildir/notmuch intake, daily classification, private queue, dedupe state, validation workflow, project/angle/owner-skill suggestions, safe storage policy, optional systemd user timer.
- Scope out seed: automatic publication, automatic email sending, storing credentials, syncing new mail accounts, full inbox UI, deleting or modifying remote mail.
- Invariants/constraints seed: no public repo email cache; raw email body persistence requires approval; classifier must be idempotent; output must be review-first; source-intake and private-memory contracts must govern routing/storage.
- Validation seed: dry-run classification on a small notmuch query; metadata/no-secret audit; idempotent rerun proof; queue record schema check; timer dry-run; failure log review.

## Handoff

- Recommended next command: `/100-sg-spec daily mail source intake automation`
- Why this next step: the direction is clear enough to formalize a scoped chantier before writing scripts, timers, or review UI.

## Exploration Run History

| Date UTC | Prompt/Focus | Action | Result | Next step |
|----------|--------------|--------|--------|-----------|
| 2026-06-29 10:20:00 UTC | Daily email source intake automation | Inspected local Maildir/notmuch/mbsync setup and compared manual, daily classifier, and full automation options | Recommend a local daily classifier with private review queue and explicit validation gate | `/100-sg-spec daily mail source intake automation` |
