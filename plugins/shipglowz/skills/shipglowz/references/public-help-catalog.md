# ShipFlow Public Help Catalog

This reference supports the bundled public `shipflow` entrypoint. It is not a separate public skill.

## Current Public Plugin

Bundled now:

- `shipflow`: public entrypoint, help, pack router, packaging audit route, and complete-corpus setup guidance
- local plugin references for pack catalog, reference strategy, public help, and `shipflow-main` portability
- packaging audit and complete-corpus setup scripts for local development and approved setup flows

Not bundled now:

- a separate public help skill
- the full internal ShipFlow numbered skill tree
- internal ShipFlow Core operator audits
- optional pack plugins
- private governance, local project memory, transcripts, or machine-specific paths

## Public Pack Status Words

- `bundled now`: usable from the installed plugin in the current Codex session.
- `partial`: the pack has at least one bundled public capability, but the full workflow is not available yet.
- `planned`: named in the roadmap, not yet executable as a bundled plugin capability.
- `internal-first`: useful for ShipFlow maintainers, not a default public user surface.
- `requires complete corpus`: the workflow needs the optional ShipFlow source corpus before it can run beyond public help/routing.

## Recommended User Route

The default public route is:

```text
$shipflow <what I want to accomplish>
```

Examples:

```text
$shipflow help me choose the right workflow
$shipflow show available packs
$shipflow explain shipflow-main
$shipflow explain how to install ShipFlow
$shipflow install complete ShipFlow corpus
```

Do not ask users to manually install many separate plugins as the default experience.

## Workflow Availability

### Available Immediately

- Explain the one-plugin model.
- Explain how to add the ShipFlow marketplace source and install the plugin.
- Show the pack catalog and roadmap.
- Explain why a workflow is bundled, partial, planned, or requires the complete corpus.
- Audit packaging readiness when a local ShipFlow source corpus exists.
- Offer the complete-corpus setup script when the user explicitly wants broader local ShipFlow capabilities.

### Partial: `shipflow-main`

`shipflow-main` is the first public pack target.

Bundled now:

- public help and routing through `shipflow`
- public intent routing for `spec`, `ready`, `start`, `verify`, `check`, and `fix` in partial mode

Still planned:

- complete spec creation workflow with ShipFlow tracking files
- complete readiness gate with internal references
- complete execution/start workflow with ShipFlow workflow state
- complete verification workflow with internal proof contracts
- complete checks and bug-fix loops with ShipFlow tools and bug memory

When a user asks for one of these workflows, use the bundled public intent contract first. Continue in public partial mode when possible, and require the complete ShipFlow corpus only when the workflow needs internal tracking, references, tools, or bug memory.

### Planned Packs

- `shipflow-build`: implementation lifecycle
- `shipflow-proof`: deploy, browser, auth, production, and QA proof
- `shipflow-content`: content, research, SEO, copy, GTM, and editorial workflows
- `shipflow-design`: UI, UX, design systems, accessibility, and component audits
- `shipflow-quality`: audits, dependencies, performance, migrations, and translation
- `shipflow-product`: onboarding, sync, entitlements, platform parity, exploration, backlog, priorities, and review

### Internal-First

`shipflow-governance` and ShipFlow Core style workflows are for ShipFlow maintainers first. They should not be presented as the default public user plugin surface.

## Complete Corpus Route

The complete ShipFlow corpus is optional.

Use it when:

- the user asks for all ShipFlow skills
- a requested workflow needs unbundled skills
- packaging work needs local source inspection
- the user accepts a local source checkout

Before running any setup, require explicit approval for network access and the target directory. The public plugin must remain useful for help and routing without this setup.

## Answer Patterns

For "what can I do now?":

```text
Tu peux utiliser ShipFlow maintenant pour l'aide, le catalogue des packs, la stratégie de packaging, et l'installation optionnelle du corpus complet. Les workflows spec/build/verify sont encore en portage public.
```

For a planned workflow:

```text
Ce workflow est prévu dans <pack>, mais il n'est pas encore bundlé dans le plugin public. Route disponible: $shipflow <instruction>. Exécution complète: nécessite le corpus complet ShipFlow ou un futur pack bundlé.
```

For "how do I install ShipFlow in Codex?":

```text
Ajoute d'abord la source marketplace ShipFlow: `codex plugin marketplace add dianedef/ShipFlow --ref main --sparse .agents/plugins --sparse plugins/shipflow`. Redémarre Codex, ouvre le répertoire des plugins, installe `shipflow`, puis commence avec `$shipflow help me choose the right workflow`.
```

For internal tools:

```text
Cet outil est interne à la maintenance de ShipFlow. Il reste hors plugin public utilisateur pour éviter de mélanger l'aide produit avec les workflows de gouvernance interne.
```
