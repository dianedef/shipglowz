---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.6.0"
project: ShipGlowz
created: "2026-05-03"
updated: "2026-07-15"
status: active
source_skill: 001-sg-build
scope: skill-reporting-contract
owner: Diane
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
linked_systems:
  - skills/*/SKILL.md
  - skills/references/chantier-tracking.md
  - skills/references/final-report-timestamp.md
  - specs/
depends_on:
  - artifact: "specs/skill-reporting-modes-and-compact-reports.md"
    artifact_version: "1.1.0"
    required_status: ready
  - artifact: "skills/references/final-report-timestamp.md"
    artifact_version: "1.0.0"
    required_status: active
supersedes: []
evidence:
  - "User decision 2026-05-03: concise user reports by default, detailed agent reports by explicit mode."
  - "User decision 2026-05-04: user reports should organize ship status as outcome, evidence, then limits, match the user's active language, and allow a few sober status emojis."
  - "User decision 2026-05-05: final reports need a visible Paris-time verdict timestamp as a shared reporting brick, not duplicated per skill."
  - "User decision 2026-06-09: human-launched skills may keep technical evidence internally or in report=agent, but their default report must stay short, readable, and useful to a non-developer operator."
  - "User decision 2026-06-10: routine subagent orchestration should not be narrated to the user; results matter more than process."
  - "User decision 2026-07-15: the timestamped verdict is the opening line; the response and any decision options follow, with no trailing verdict footer."
  - "User decision 2026-07-15: use a small semantic emoji vocabulary for verdicts, routes, and decisions so reports scan quickly without visual noise."
next_review: "2026-06-04"
next_step: "/103-sg-verify shipflow-skill-reporting-and-proof-hardening"
---

# Reporting Contract

## Purpose

This reference defines the default final-report shape for ShipGlowz skills.

The goal is to reduce user-facing noise without weakening traceability. Successful runs should be short. Failed, blocked, partial, or security-sensitive runs should include enough detail to act safely.

Before applying this contract, load `$SHIPFLOW_ROOT/skills/references/final-report-timestamp.md`. Its verdict-header rule is part of this reporting contract and applies to both `report=user` and `report=agent`.

## Report Modes

Default mode is `report=user`.

Use `report=user` when:

- the skill is launched directly by the operator
- no explicit report mode is provided
- the run succeeds, partially succeeds, or blocks and the user only needs outcome, proof summary, material limits, and a real next step

Use `report=agent` when:

- an orchestrator needs a handoff report for another agent
- the user asks for `handoff`, `verbose`, `full-report`, or `agent report`
- the next step depends on detailed file lists, validation matrices, evidence, or unresolved gate state

Do not infer caller identity from runtime state. If a master skill wants a detailed downstream report, it must pass `report=agent` or an equivalent explicit handoff flag.

Human-launched user mode is not a simplified agent report. It is a decision surface for a human operator. It must translate internal gates into the user's active language and expose only the information needed to trust the outcome or choose the next action.

User-facing reports should default to result-first phrasing. Avoid narrating intermediate actions, tool sequences, or step-by-step execution unless the user explicitly asked for process detail or the report is blocked/partial and the action path matters.

## User Mode

Keep the final report compact and outcome-first.

Match the user's active language for user-facing labels and explanatory
sentences. Stable commands, file paths, status values, and machine-readable
contract labels may stay in English when translation would weaken traceability.

Default user-mode reports must fit this shape unless the skill has a stricter local format:

1. `🎯 VERDICT (YYYY-MM-DD HH:mm) : <status>` as the first visible line
2. outcome and proof summary or check summary
3. limits only when they affect trust, risk, or next action
4. one real next step or one numbered decision question only when the user must act

## Active Work Continuation Rule

Do not end a user-facing report with a pending internal stage, a command, or a
technical “next step” when the operator asked ShipGlowz to carry out the work
and the next action is still agent-runnable. Continue the active owner workflow
through its safe gates instead.

For a lifecycle request such as “create my app”, `spec created`, `governance
initialized`, `readiness pending`, or `implementation not started` is progress,
not a user-facing stopping point. The final answer must either:

- report the completed user outcome; or
- ask one plain-language, numbered decision that only the operator can make;
- explain a real external/safety block and exactly what the operator must
  provide or approve.

Never make the operator infer that they must re-invoke the next lifecycle
skill, read an internal spec, or decide whether the agent should continue. A
“Next step” line is permitted only when it names a concrete operator action
that is genuinely required now; otherwise omit it and continue autonomously.

Pressure scenario `SSRP-006 active lifecycle`: given an operator asks to build
or change a product, when a spec, governance, readiness, implementation,
verification, closure, or ship stage remains agent-runnable, then the owner
skill proceeds through that stage rather than reporting it as a task for the
operator.

## Objective Continuity Rule

Treat the operator's latest unresolved goal as the active conversation
objective. Every response, owner handoff, progress update, and final report
must either advance that objective, remove a real blocker, or ask the one
operator-owned decision that unlocks it. Do not turn intermediate milestones
into new implicit objectives for the operator.

Keep the objective active until one of these conditions is true:

- the promised outcome is genuinely complete and the matching proof has run;
- a material decision, approval, credential, or manual-only fact is required
  from the operator;
- the operator explicitly replaces, narrows, pauses, or abandons the goal.

When the operator changes subject to critique the execution itself, treat that
as a bounded system-improvement objective. Repair it, prove the repair, then
resume the prior product objective unless the operator explicitly abandons it.

Pressure scenario `SSRP-007 directed conversation`: given an operator says
“create my application”, when a lifecycle milestone completes, then the agent
uses that milestone only to choose and execute the next owner action; it does
not make the operator restart, interpret, or steer the workflow.

When routing is relevant to the operator, add one concise line directly below the verdict:

```text
🧭 Route: <skill or owner> — <short reason>
```

Do not include full checklists, validation matrices, phase ledgers, file inventories, raw command output, or lifecycle internals in successful user-mode reports. Keep that detail in the durable artifact or use `report=agent`.

Do not report routine subagent orchestration in user mode. Mention it only when availability, degraded execution, model override status, cost/risk, or topology changes trust or the user's next decision.

When a task is complete, prefer the end state over the story of how it was completed. One short sentence about what changed is usually enough.

Use a small semantic emoji vocabulary when it improves scanning, not as
decoration. Use at most one emoji per labelled line and do not add emoji to
ordinary prose. Good defaults are `🎯` for the verdict, `🧭` for route/owner,
`✅` for passed or recommended, `⚠️` for limits/risk, `🚀` for pushed/shipped,
and `📝` for docs/bookkeeping. For decision options, place one meaningful emoji
after the option number (for example `1. ✅ ...`, `2. 🛍️ ...`, `3. 🚚 ...`).
Keep agent/handoff reports mostly plain except for material status markers.

For ship reports, organize user-mode text as:

1. outcome: commit, branch, push, and repo state
2. evidence: checks, build proof, browser/prod/manual proof, or docs evidence
3. limits: partial validation, missing bug gate, unknown development mode, or
   remaining action

For successful ship/close flows, combine push, repo state, checks, and bookkeeping into one line when possible:

```text
🚀 Pushed to origin/main. Repo clean. ✅ Checks passed. 📝 Tasks/Changelog updated.
```

Use these check summaries:

- `All checks passed ✅` when all attempted or required checks passed.
- `✅ Checks passed: <short list>` when naming the checks is clearer than a generic success line.
- `All checks passed except: <check>, <check>` only when the run legitimately continues despite accepted or non-blocking gaps.
- `Checks skipped: <reason>` when checks were intentionally skipped.
- `Checks failed: <check>` when the run is blocked or not shipped.

Only include sections that change the user's next decision:

- result
- checks summary
- bug/security/risk gate when non-empty or relevant
- documentation/public-content gap when relevant
- next step only when it is real
- chantier block only when a chantier is in scope or explicitly non-traced

Translate internal gate names into their user consequence when possible. Prefer
`⚠️ Limites: pas de shipglowz_data/workflow/BUGS.md, donc risque bug non evalue` over a bare
`Bug risk gate: not assessed` when the active user language is French.

Omit empty or redundant lines such as `Reste a faire: none`, `Prochaine etape: none`, `Trace spec: ecrite`, and `Verdict <skill>` when the heading or status already says the same thing.

If a skill is blocked, partial, risky, or security-sensitive, user mode may be longer, but it still must not dump internal machinery. Say what blocked, what evidence proves it, what action is safest, and whether the work can continue or ship.

## Agent Mode

Agent mode may include:

- files changed
- commands run
- validation matrices
- evidence references
- detailed phase gates
- documentation/editorial plans
- unresolved risks with owner and next command
- full chantier trace metadata

Agent mode must still avoid dumping raw secrets, cookies, tokens, private logs, or unnecessary bulk output.

Agent mode is the correct place for detailed readiness checklists, validation matrices, file lists, evidence tables, route rationale, and handoff notes. Master skills that need such detail from downstream skills must request `report=agent`; downstream skills must not guess that detail is wanted.

## Compact Chantier Block

Use this block in user mode:

```text
## Chantier

specs/example.md

Flux: 100-sg-spec ✅ -> 101-sg-ready ✅ -> 102-sg-start ✅ -> 103-sg-verify ✅ -> 104-sg-end ✅ -> 005-sg-ship ✅🎯
Reste a faire: <only if non-empty>
Prochaine etape: <only if non-empty>
```

Use `non applicable: <reason>` or `non trace: <reason>` in place of the spec path when no spec is written.

Use fuller chantier metadata only in `report=agent`, when blocked, or when another agent needs the trace state.

## Audit Reports

Audit skills still report findings first.

In `report=user`, use:

```text
## Audit: <scope>

Result: <clear / issues found / blocked>
Top findings:
- <severity> <file:line or area> - <issue>

Proof gaps: <short list or none>
Chantier potentiel: <oui/non/incertain> - <reason>
Next step: <command or action, only if real>
```

For large global audits, keep the project/domain matrix only when it helps compare projects. Prefer top findings and systemic patterns over exhaustive per-file detail in the user-facing closeout.

In `report=agent`, include the detailed domain checklist output, scoring matrix, command evidence, assumptions, confidence limits, and handoff notes.

## Failure Rule

Concise does not mean vague. If a run is blocked, partial, or risky, include:

- the blocking gate
- the concrete evidence
- the safest next action
- whether the current work can or cannot ship

## Pressure Scenarios

Use these scenarios when changing reporting behavior or reviewing a skill report:

- `SSRP-001 human success`: a directly launched skill succeeds. The user report is concise, in the user's active language, and includes outcome, proof summary, and no checklist dump.
- `SSRP-002 human not-ready`: `101-sg-ready` finds blockers. The user report lists only blockers that require action, explains them plainly, and gives one next command.
- `SSRP-003 human blocked safety`: a safety or security gate blocks work. The user report names the gate, summarizes redacted evidence, gives the safest next action, and does not expose secrets or bulk logs.
- `SSRP-004 agent handoff`: another skill needs detailed evidence. The caller passes `report=agent`, and the report may include checklists, matrices, files, commands, and lifecycle internals.
- `SSRP-005 proof limit`: a completion claim lacks full proof. The user report stays short but names the missing proof or explicit exception before claiming completion.

## Verdict Header

Start every final report with:

```text
🎯 VERDICT (YYYY-MM-DD HH:mm) : <verdict or status>
```

Follow the exact placement and exception rules in `$SHIPFLOW_ROOT/skills/references/final-report-timestamp.md`. Do not add a closing verdict or timestamp. If the report asks a numbered question, its final visible text is the options and the reply instruction.
