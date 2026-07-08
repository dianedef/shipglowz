---
artifact: contract
metadata_schema_version: "1.0"
artifact_version: "1.2.0"
project: ShipGlowz
created: "2026-06-28"
updated: "2026-06-29"
status: active
source_skill: 900-shipglowz-core
scope: profile-activation
owner: Diane
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
linked_systems:
  - skills/000-shipglowz/SKILL.md
  - skills/302-sg-help/SKILL.md
  - skills/references/profile-project-context.md
  - skills/references/shipglowz-terms.md
  - skills/references/operator-roles/
  - shipglowz_data/business/agent-profiles/
  - shipglowz-spec-driven-workflow.md
  - README.md
depends_on:
  - artifact: "skills/references/operator-partnership-contract.md"
    artifact_version: "1.0.0"
    required_status: active
  - artifact: "skills/references/entrypoint-routing.md"
    artifact_version: "1.4.0"
    required_status: active
supersedes: []
evidence:
  - "ShipGlowz hardening decision 2026-06-28: named profiles need one canonical activation contract instead of duplicated local wording."
  - "Operator feedback 2026-06-28: `%Victoire` must not be presented as a runtime primitive until the runtime layer exists."
  - "Operator request 2026-06-29: make the Traffic Manager role invokable through the same named-profile layer."
  - "Operator decision 2026-06-29: name the traffic-manager profile Tariq."
next_review: "2026-07-12"
next_step: "/103-sg-verify profile-activation-contract"
---

# Profile Activation Contract

## Purpose

This contract defines how ShipGlowz recognizes, resolves, reports, and falls back on named operator profiles.

Named profiles are a governance and routing layer above skills. They do not replace skill ownership, proof requirements, or operator-owned decisions.

## Core Model

- `skill` = execution capability and owner
- `operator role` = stable decision contract
- `agent profile` = human-readable invocation handle bound to one operator role

Profiles bias arbitration, prioritization, and answer shape. Skills still own execution.

## Runtime Boundary

ShipGlowz must treat named profiles as an explicit invocation and governance convention, not as a native host-runtime primitive.

Current rule:

- no claimed native `%Profile` runtime primitive in Codex or other host runtimes unless the runtime actually exposes and guarantees it
- no pseudo-runtime layer that pretends profiles persist invisibly across turns through hidden context injection or magic state
- no silent profile carry-over beyond what the current owner skill or router explicitly loads and reports

Practical consequence:

- `%<Profile>` is a visible activation cue
- `000-shipglowz` and compatible owner skills may resolve and honor it explicitly
- any profile effect must remain inspectable in the active turn through contract loading, handoff wording, or final reporting

If a future runtime provides first-class profile primitives with stable semantics, this contract may be upgraded. Until then, ShipGlowz keeps the behavior explicit and documented.

## Supported Activation Forms

Canonical profile syntax:

- `%<Profile>`

Compatibility syntax:

- `profile=<id>`
- `profil=<id>`
- explicit natural-language request to answer as a known profile

Focus tags remain separate:

- `#<Tag>` = focus tag or route-bias cue

`%<Profile>` is the canonical invocation surface for named operator profiles. Runtime implementations may expose this surface directly or through the main router.

## Resolution Rules

When a profile activation is present:

1. Resolve the profile in `shipglowz_data/business/agent-profiles/`.
2. Read its `role_id` and `role_contract`.
3. Load the referenced operator-role contract from `skills/references/operator-roles/`.
4. Load `skills/references/profile-project-context.md` and the smallest relevant project context bundle for the resolved role.
5. Keep the resolved role bias active for route choice, arbitration, and answer framing during the current turn.
6. Do not bypass owner-skill routing.

Known aliases:

- `%TrafficManager`, `%traffic-manager`, `profile=traffic-manager`, and `profil=traffic-manager` resolve to `shipglowz_data/business/agent-profiles/tariq.md`.

## Precedence Rules

Apply these layers in order:

1. explicit safety and scope constraints
2. selected owner-skill contract
3. active named profile
4. active focus tags
5. default neutral routing behavior

Interpretation:

- safety beats everything
- owner skill keeps execution ownership
- profile shapes business arbitration and answer posture
- focus tags narrow or reinforce context

When a profile and one or more tags align, combine them.
When they conflict materially, keep the owner skill and safety posture unchanged, then ask one concise question only if the conflict changes business meaning, public claims, destructive posture, or durable route.

## Fallback Rules

If the requested profile does not exist:

- report that the named profile is unknown
- continue with neutral routing or with the remaining focus tags if they still help
- suggest the nearest known profile only when one clear match exists

If several profile activations appear:

- prefer the first explicit activation unless a later activation clearly supersedes it in natural language
- if the intended active profile is still ambiguous and the difference changes the route or business framing, ask one concise question

If the request names a profile outside `000-shipglowz` or `302-sg-help`:

- treat the profile as a routing/arbitration cue only if the current owner skill can safely honor it without contradicting its own contract
- do not mutate owner-skill stop conditions, proof rules, or execution gates

## Reporting Rule

When a named profile materially shaped the answer or route, the report should make it visible.

Use one compact line such as:

- `Active profile: Victoire`
- `Role bias: growth-operations-lead`

Do not claim profile activation silently when the answer shape or route does not reflect it.

## Non-Goals

- profiles are not separate skills
- profiles are not a replacement for focus tags
- profiles are not personalities-first branding objects
- profiles do not create a second routing system outside `000-shipglowz`
- profiles do not imply a native Codex runtime feature that ShipGlowz does not control
- profiles do not justify an opaque persistence mechanism or hidden context reinjection layer

## Maintenance Rule

Update this contract when profile syntax, precedence, fallback behavior, or reporting visibility changes.
