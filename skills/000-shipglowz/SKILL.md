---
name: 000-shipglowz
description: "Route requests to skills or answers."
argument-hint: <instruction>
---

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Chantier Tracking

Trace category: `non-applicable`.
Process role: `helper`.

`000-shipglowz` does not write to chantier specs, bug files, release scopes, content surfaces, commits, or deployment state. The selected owner skill owns durable state and chantier tracing after handoff. If invoked inside a spec-first flow, do not modify `Skill Run History`; include `Chantier: non applicable` or `Chantier: non trace` only when useful, with the selected route and reason.

## Report Modes

Before producing a final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

Default to `report=user`: concise, route-first, and in the user's active language. Use detailed report modes only when the user explicitly asks for handoff evidence or when routing is blocked.

## Delegation And Topology

Before deciding execution topology, load `$SHIPFLOW_ROOT/skills/references/master-delegation-semantics.md`.

`000-shipglowz` is a primary router, not a master lifecycle executor. Its default topology is `main-thread routing`:

- answer directly in the main conversation when no file work, validation, closure, ship, deployment, or durable artifact is needed
- hand off directly in the main conversation to the selected skill contract when work belongs to an existing skill
- ask one numbered routing question when multiple routes are plausible and the answer changes behavior, risk, data, permissions, public claims, staging, closure, or ship posture

Do not launch a selected master skill inside a subagent. In particular, do not run `001-sg-build`, `002-sg-maintain`, `003-sg-bug`, `004-sg-deploy`, `007-sg-content`, `600-sg-local-cloud-sync`, or `900-shipglowz-core build` as a nested subagent from `000-shipglowz`. After direct handoff, the selected master or domain skill owns its own delegated sequential execution through the shared delegation reference.

Use a read-only routing scout only when all of these are true:

- cheap local inspection is needed to choose between owner skills
- the scout is forbidden to edit, stage, commit, push, deploy, or mutate trackers
- the scout does not invoke a master skill or launch further subagents
- the result is only a route recommendation for the main-thread handoff

## Shared Routing Reference

Before classifying a non-trivial instruction, load `$SHIPFLOW_ROOT/skills/references/entrypoint-routing.md`.
Before classifying ShipGlowz package-scope terminology, load `$SHIPFLOW_ROOT/skills/references/shipglowz-terms.md`.
Before classifying a user-provided source, pasted email, URL, transcript, article, note, or competitor/content example, load `$SHIPFLOW_ROOT/skills/references/source-intake-classification.md`.
Before applying any named operator profile semantics, load `$SHIPFLOW_ROOT/skills/references/profile-activation.md`.
Before shaping a named-profile answer from role posture alone, load `$SHIPFLOW_ROOT/skills/references/profile-project-context.md` and the smallest relevant project context bundle for the resolved role.
When the instruction is a high-level critique, business goal, or collaboration complaint, load `$SHIPFLOW_ROOT/skills/references/operator-partnership-contract.md` before deciding whether the route is clear or a user question is needed.
When `$ARGUMENTS` activates a named operator profile such as `%Victoire`, `%SEO-specialist`, `%Tariq`, `profile=victoire`, `profile=tariq`, or `profile=traffic-manager`, load the matching profile under `$SHIPFLOW_ROOT/shipglowz_data/business/agent-profiles/` and its referenced operator role under `$SHIPFLOW_ROOT/skills/references/operator-roles/` before choosing the route or shaping the answer.

Use that reference as the canonical routing matrix. Do not duplicate specialist internals here.

If focus tags are present in `$ARGUMENTS`, treat them as binding route-bias cues for the current turn. Do not merely mention that the tags were seen; apply their execution implications from `entrypoint-routing.md` before choosing a route, fallback, or question.

When `$ARGUMENTS` begins with a three-digit skill code or a three-digit runtime skill name, load `$SHIPFLOW_ROOT/skills/references/skill-code-index.md` before natural-language classification. Resolve `NNN`, `NNN-skill`, `NNNskill`, or `NNN skill` to the runtime skill name from that index, then hand off to that skill.

Before choosing a route, answer, or fallback, load `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md`. Routing must prefer the owner path that preserves correctness, security, performance, maintainability, durability, excellence, and proof quality; do not route to the fastest or easiest owner when that would weaken the work. Apply the `Structure Replacement Doctrine`: prefer the route that removes current operator friction, ambiguity, or maintenance burden when it remains quality-equivalent.

## Mission

`000-shipglowz` is the primary natural-language entrypoint for non-technical operators.
Primary artifact type: `entrypoint-router`.

When the instruction is about improving ShipGlowz itself, its skills, its routing, or its governance, the default destination is the ShipGlowz system under `$SHIPFLOW_ROOT`, not the current project repository, unless the user explicitly names a local project target.

Invoking a ShipGlowz skill that exists to maintain ShipGlowz itself, including `900-shipglowz-core`, is enough to imply ShipGlowz as the target unless the operator explicitly names another repo.

The operator does not need to spell out "ShipGlowz" in the request; the skill invocation itself is enough to bind the target to ShipGlowz when the selected skill exists to maintain ShipGlowz.

It answers one question:

```text
What should ShipGlowz do with this instruction, and which existing skill should own it?
```

The goal is not to create a new mega-master or the shortest route. The goal is to keep the operator from memorizing the skill taxonomy while preserving the quality and excellence bar, gates, delegation rules, evidence rules, and ship rules owned by existing skills.

Keep the boundary explicit: `000-shipglowz` routes or answers directly. It does not prime broad context for a known task, generate a portfolio status dashboard, or continue a resolved chantier after owner selection is already clear.

## Mode Detection

Parse `$ARGUMENTS` as the operator instruction.

- Empty argument: give a compact orientation answer and ask for the instruction to route.
- `help`, `aide`, `commands`, `skills`, or route-selection questions: answer directly or route to `302-sg-help` only if the user wants the full help surface.
- Named profile activation: apply `skills/references/profile-activation.md`. When the instruction starts with `%<Profile>`, `profile=<id>`, or `profil=<id>`, or clearly asks to respond as a known profile, load the matching profile and keep its role bias active for this turn. The canonical syntax is `%<Profile>`. The profile shapes arbitration and output style; it does not replace owner-skill routing. `#<Tag>` remains reserved for focus tags and route-bias cues.
- Numeric skill code: resolve the leading three digits through `skill-code-index.md`, then hand off to the runtime skill. Accepted forms include `001`, `001-sg-build`, `001sfbuild`, and `001 sg-build`.
- Explicit skill name: hand off to that skill unless the request reveals a safer owner.
- Natural-language instruction: classify using the routing matrix below.
- Natural-language instruction with focus tags: classify using the routing matrix plus the focus-tag execution priorities; tags can change owner preference, artifact preference, and whether a direct suggestion is too passive.

Route away instead of staying in `000-shipglowz` when the operator already knows the helper surface needed:

- context priming before real work -> `301-sg-context`
- cross-project git/sync dashboard or portfolio state report -> `308-sg-status`
- paused work item continuation -> `706-continue`

## Routing Matrix

Choose exactly one route unless the user explicitly asks for a dashboard or comparison.

When the ambiguity is between adjacent lifecycle owners, prefer the earliest unresolved owner instead of a later closure/ship skill:

- work not yet implemented -> `102-sg-start`
- implementation complete but proof still needs judgment or owner routing -> `103-sg-verify`
- proof judged and only closure bookkeeping remains -> `104-sg-end`
- closure/bookkeeping complete and the next owned action is git shipping -> `005-sg-ship`

When the ambiguity is between proof lanes, prefer the narrowest evidence owner:

- guided manual QA, retest logging, `shipglowz_data/workflow/TEST_LOG.md`, or bug-state update -> `107-sg-test`
- one-off non-auth browser-visible proof -> `108-sg-browser`
- auth/session/callback/protected-route proof -> `109-sg-auth-debug`

For requests involving declared products, sales surfaces, or public claims, prefer owner skills that preserve product governance and proof coherence instead of treating the request as generic copy or generic docs work.

| Intent | Route |
| --- | --- |
| Pure question, explanation, or advice with no file work | Answer directly |
| Build or change a user-facing feature and also think about end-user clarity, UX/UI friction, activation, beginner adoption, or first-success guidance | `001-sg-build <instruction>` first; `001-sg-build` evaluates the post-implementation `008-sg-customer` gate |
| Non-trivial feature, code, site, docs, product, or workflow work | `001-sg-build <instruction>` |
| Create a new app from scratch (carnet, gestion, CRUD, etc.) | `001-sg-build <instruction>` — le Blueprint Gate cherchera un blueprint correspondant dans `skills/app-blueprints/` pour guider la creation |
| Recurring maintenance, security upkeep, dependencies, docs drift, checks, audit freshness, migrations, or project hygiene | `002-sg-maintain <mode or instruction>` |
| Bug report, `BUG-ID`, retest, closure, fix state, or bug ship-risk question | `003-sg-bug <instruction>` |
| Release confidence, preview/prod deploy, deployed truth, runtime logs, production health, post-deploy proof | `004-sg-deploy <instruction>` |
| Deploy-target recommendation for an app project | `004-sg-deploy <instruction>` — `004-sg-deploy` loads the canonical advisory matrix in `skills/references/deploy-target-matrix.md`; ShipGlowz advises, but final choice remains project-contextual |
| Content strategy, repurposing, drafting, enrichment, SEO/copy audit, editorial governance, apply/publish content | `007-sg-content <instruction>` |
| Source intake, pasted email/article/transcript/URL classification, project fit, angle selection, or owner-skill choice | Load `source-intake-classification.md`, then route to the owner skill |
| Design request, UI/UX work, redesign, design tokens, playground, accessibility design, component design, visual proof, or token migration | `006-sg-design <instruction>` |
| End-user experience, UX/UI clarity, trust, friction, feature activation, onboarding, setup guidance, first-success path, permission/setup sequencing, or recoverable states | `008-sg-customer <instruction>` |
| Local-first data promotion, cloud hydration, account sync, merge/conflict policy, reinstall recovery, or sync/save UX state | `600-sg-local-cloud-sync <instruction>` |
| Product access, paid plans, premium gates, entitlement ledgers, provider events, activation codes, refunds/revokes, support access flows, or backend access gates | `601-sg-product-entitlements <instruction>` |
| Create, modify, rename, document, or validate ShipGlowz skills | `900-shipglowz-core build <instruction>` |
| Refresh an existing ShipGlowz skill conservatively | `900-shipglowz-core refresh <target>` |
| Extract a blueprint from an existing app, create a new blueprint | `900-shipglowz-core build <instruction>` — route à `900-shipglowz-core build` (ShipGlowz interne), pas à `001-sg-build` (end-user) |
| ShipGlowz Core execution-fidelity audit or public-plugin packaging readiness for ShipGlowz itself | `900-shipglowz-core audit <scope>` or `900-shipglowz-core packaging <scope>` |
| One obvious audit domain only | relevant `400-sg-audit-* <instruction>` or `400-sg-audit <instruction>` |
| One obvious owner lane only, such as checks, docs, browser proof, auth diagnosis, manual QA, dependency posture, migration, or final ship | focused owner skill |
| Ambiguous between two or more material routes | Ask one concise numbered routing question |

## Direct Handoff Contract

When a route is clear:

1. Name the selected skill and why in one short sentence when useful.
2. Continue in the same conversation under the selected skill's contract.
3. Load the selected skill's required references before executing it.
4. Pass the original user instruction as the target argument.
5. Preserve the selected skill's report mode defaults unless the user asked for a detailed handoff.
6. Treat the route as a transition into the owner skill, not as a terminal answer that leaves the operator to re-invoke the builder.

When routing a user-facing feature to `001-sg-build` and the instruction mentions
onboarding, activation, beginner users, setup guidance, discoverability, or
first-success, preserve that as a post-build activation requirement. `001-sg-build`
owns the implementation lifecycle first, then evaluates whether to route or
suggest `008-sg-customer`.

Do not stop at "run `/skill ...`" when the user asked ShipGlowz to handle the work and the route is safe. A command recommendation is acceptable only for pure orientation, unsupported runtime handoff, or a blocked state.

If the route is clear and safe, the router should hand off immediately instead of lingering on explanation or passive routing language.

## Question Gate

Before asking a user-facing routing question, load `$SHIPFLOW_ROOT/skills/references/question-contract.md`.

Ask only when the answer changes the route or safety posture. Ask one concise routing question with why the route matters and numbered options. Include a recommended route only when one option is clearly safe from the current instruction and project context.

Do not treat operator-owned business or framing truth as generic routing ambiguity. If one precise question would resolve the route safely, ask it instead of reporting blocked.

Good routing questions are short and practical:

```text
1. Route type
Why: the next step uses different evidence and files depending on whether this is an existing bug or a new product improvement.
Recommended: 1. Product improvement - use this when the request describes a new behavior rather than an observed regression.

Options:
1. Product improvement - hand off to `001-sg-build`.
2. Existing bug - hand off to `003-sg-bug`.

Reply with the number, or name another route.
```

Do not ask broad "anything else?" questions.

## Stop Conditions

Stop and report `blocked` when:

- no route can be chosen without a material product, data, security, permission, deployment, or ship decision
- the selected skill contract is missing or unreadable
- runtime subagents are required by the selected master skill but unavailable and the user has not accepted degradation
- the user requests nested master-skill-in-subagent execution
- the instruction asks for destructive, production, payment, auth, tenant, secret, or broad dirty-file action without explicit approval
- the route would bypass an owner skill's evidence, verification, closure, or ship gate

## Final Report

For direct answers:

```text
Result: [answer]
Route: direct answer
Chantier: non applicable
```

For handoff:

```text
Route: [selected skill]
Reason: [short reason]
Active profile: [name or none]
Role bias: [role id or none]
Execution: direct main-thread handoff; selected skill owns any delegated sequential execution
```

Then continue with the selected skill's final-report contract.

For blocked routing:

```text
Route: blocked
Reason: [short reason]
Decision needed:
1. [numbered routing question]
Chantier: non applicable
```

## Rules

- Keep this skill thin.
- Do not duplicate internals of owner skills.
- Do not mutate files before the selected owner skill takes over.
- Do not launch selected master skills inside subagents.
- Do not treat direct handoff as parallelism.
- Do not create specs, bug files, commits, deployments, or public-content changes directly from this router.
- Match user-facing language to the user's active language.
