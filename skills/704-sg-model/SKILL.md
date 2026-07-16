---
name: 704-sg-model
description: "Route models for ShipGlowz tasks and reasoning levels."
argument-hint: <task description, spec path, ou scope>
---

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Chantier Tracking

Trace category: `non-applicable`.
Process role: `helper`.

This skill does not write to chantier specs. If invoked inside a spec-first flow, do not modify `Skill Run History`; use a `(local)` chantier header with a short work name.

## Report Modes

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md` and use the shared chantier-then-verdict opening.

## Context

- Current directory: !`pwd`
- Current date: !`date '+%Y-%m-%d'`
- Project name: !`basename $(pwd)`
- Git branch: !`git branch --show-current 2>/dev/null || echo "unknown"`
- Available specs: !`find docs specs -maxdepth 2 -type f -name "*.md" 2>/dev/null | sort | head -40`
- Local TASKS.md (if exists): !`cat TASKS.md 2>/dev/null || echo "No local TASKS.md"`

## Your task

Choisir un modèle avant une exécution ShipGlowz, que la session tourne dans Codex/OpenAI ou dans Claude Code, sans transformer cette étape en débat interminable.

This skill answers one operator question: which model policy is the best fit for this scope right now, and is that recommendation for the current conversation, a subagent override, or the next run?

It owns model-routing advice only: runtime/provider identification, primary model choice, reasoning level or Claude alias choice, and quality-equivalent fallback guidance.

Keep the boundary explicit:
- stay here when the user wants model choice, runtime-fit advice, or a decision on reasoning strength before execution
- hand off to `102-sg-start` once the model choice is clear and the user wants the work executed
- hand off to `302-sg-help` when the user needs broader workflow doctrine rather than a concrete model choice
- hand off to `700-sg-explore` or `100-sg-spec` when the task itself is still too fuzzy to route a model credibly

`704-sg-model` does not become the execution owner, does not mutate the work item itself, and does not pretend that recommending a model means the main thread already switched runtime.

Avant toute recommandation, charger `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md`. La sélection de modèle optimise d'abord la fiabilité, la sécurité, la performance attendue, la maintenabilité, l'excellence et la qualité de preuve. Les alternatives rapides ou moins chères ne sont valides que si elles restent équivalentes sur ces axes pour le risque réel.

Le but de `704-sg-model` est de répondre à six questions :
- quel runtime/provider est concerné maintenant ?
- quel modèle prendre maintenant ?
- quel niveau de reasoning ou alias Claude choisir ?
- quelle alternative plus rapide existe sans baisser la qualité attendue ?
- quelle alternative moins chère existe sans baisser la qualité attendue ?
- à partir de quand il faut arrêter d'optimiser et juste lancer `/102-sg-start` ?

Lire `references/model-routing.md` avant de décider.

## Runtime application boundary

`704-sg-model` chooses a model policy; it does not guarantee that the already-running main conversation can mutate its own runtime model mid-thread.

Use this distinction in every recommendation:

- `current conversation`: recommend the best model and continue only when the current runtime is acceptable for the risk.
- `subagent override`: when the runtime supports delegated model overrides, tell the caller to pass the selected `model` and `reasoning_effort` or Claude alias into the subagent mission.
- `next run`: when the main runtime should change, recommend the exact model/alias for the operator's next session or command.

Never report a model override as applied unless the runtime actually exposed and used that override. If model override support is unavailable or unknown, mark it as `recommended, not applied`.

### Step 1 — Identifier le runtime et le scope

Déterminer d'abord le runtime réel ou demandé :
- `Codex/OpenAI` si la session utilise Codex, les modèles `gpt-*`, l'OpenAI API, ou une demande explicite OpenAI.
- `Claude Code` si la session utilise Claude Code, les aliases `opus`, `sonnet`, `haiku`, `opusplan`, ou une demande explicite Claude.
- Si aucun runtime n'est explicite, choisir celui de la session courante.

Si `$ARGUMENTS` est fourni, l'utiliser comme scope.

Sinon, déduire le meilleur scope possible depuis :
- la spec la plus probable dans `docs/` ou `specs/`
- la tâche en cours dans `TASKS.md`
- le contexte immédiat de la session

Si une spec existe pour ce scope, l'utiliser comme source principale.

### Step 2 — Classifier la tâche

Classer le travail selon la dimension dominante :
- `architecture` : cadrage, arbitrages, ambiguïtés, contrats
- `agentic-code` : implémentation longue, multi-fichiers, refacto, debugging
- `fast-iteration` : petits deltas, triage, exploration, boucles rapides quand la qualité reste équivalente
- `ui-focus` : ajustements front ciblés, itérations visuelles locales
- `economy` : tâche claire où budget/latence peuvent arbitrer seulement après satisfaction du contrat qualité

Puis estimer :
- complexité : `low` / `medium` / `high`
- longueur de session attendue : `short` / `medium` / `long`
- coût d'erreur : `low` / `medium` / `high`
- besoin de vitesse : `low` / `medium` / `high`

### Step 3 — Vérifier la fraîcheur quand nécessaire

Pour les décisions OpenAI qui dépendent de "latest", "current", "default", "best model", disponibilité, migration, pricing ou comparaison actuelle :
- utiliser d'abord `mcp__openaiDeveloperDocs__fetch_openai_doc` sur `https://developers.openai.com/api/docs/guides/latest-model.md`
- si besoin, chercher/fetcher d'autres pages avec les outils `mcp__openaiDeveloperDocs__*`
- si le MCP ne répond pas, fallback seulement vers les domaines officiels OpenAI et signaler le fallback

Pour Claude Code, privilégier les aliases documentés (`opusplan`, `opus`, `sonnet`, `sonnet[1m]`, `haiku`) plutôt que des slugs datés, sauf demande explicite de nom complet.

Ne pas inventer de benchmark, prix, disponibilité, contexte ou capacité.

### Step 4 — Router vers un modèle

Utiliser la matrice provider-aware de `references/model-routing.md` et choisir :
- un `Primary model`
- un `Reasoning effort` pour Codex/OpenAI, ou le comportement d'alias pour Claude Code
- un `Fast fallback`
- un `Cheap fallback`

Règles de décision Codex/OpenAI :
- préférer `gpt-5.5` pour les tâches ambiguës, transverses, tool-heavy, ou à fort coût d'erreur
- préférer `gpt-5.5` pour audits transverses, priorisation automatique de tâches, migrations prompts/docs, synthèse de risques business, et mises à jour cohérentes de trackers/fiches projets
- préférer `gpt-5.4` quand il faut rester premium mais avec un meilleur contrôle du coût
- préférer le profil `codex` défini dans `references/model-routing.md` pour les implémentations longues, multi-fichiers, les refactors, le debugging difficile et les longues boucles agentiques terminal/code; ne pas figer ce profil sur un slug déprécié
- préférer `gpt-5.4-mini` pour les boucles rapides, le triage, les petites modifs, l'exploration et les tâches répétitives uniquement quand le coût d'erreur est bas et que la qualité attendue reste suffisante
- utiliser `gpt-5.4-mini` comme défaut des petites missions bornées en sous-agent seulement si la mission est low-risk et quality-equivalent; sinon escalader vers `gpt-5.3-codex-spark`, le profil `codex`, ou `gpt-5.5`
- préférer `gpt-5.3-codex-spark` pour les itérations UI ciblées ou les modifications locales quand il reste quality-equivalent; ne pas l'utiliser pour éviter une analyse nécessaire
- interpréter les arguments `spark`, `codex`, `sous-agent`/`subagent`/`agents`, et `mini` comme des demandes de sous-agent avec le modèle/profil correspondant selon `references/model-routing.md`, pas comme de simples paramètres textuels
- éviter `gpt-5.2` par défaut sauf besoin explicite de continuité ou préférence empirique utilisateur

Règles de décision Claude Code :
- préférer `opusplan` quand il faut une vraie phase de plan/architecture puis exécuter efficacement
- préférer `opus` pour raisonnement complexe, arbitrages risqués, revue adverse ou cadrage difficile
- préférer `sonnet` pour le coding quotidien, l'implémentation multi-fichiers maîtrisée et les longues boucles équilibrées
- préférer `sonnet[1m]` quand la contrainte principale est une très longue session/contexte dans Claude Code
- préférer `haiku` pour triage, tâches simples, classifications, petites recherches ou boucles à coût/latence minimaux

### Step 5 — Calibrer le reasoning

Pour Codex/OpenAI :
- `low` : tâche claire, locale, réversible, low-risk et quality-equivalent
- `medium` : valeur par défaut pour la plupart des tâches de dev
- `high` : problème ambigu, cross-system, ou besoin de prudence
- `xhigh` : seulement si le coût d'erreur est élevé et que la vitesse importe peu

Pour Claude Code :
- utiliser l'alias comme principal levier de raisonnement
- recommander `/model <alias>` si un changement de modèle est utile
- ne pas simuler des niveaux OpenAI `low/medium/high` pour Claude

Ne pas sur-utiliser les options lourdes sur les tâches faciles.

### Step 6 — Décider s'il faut vraiment router

Si la tâche est petite, claire et locale, éviter d'ajouter du process :
- recommander directement le modèle le plus léger qui respecte le contrat qualité
- dire explicitement de lancer `/102-sg-start`

Si la tâche est non triviale :
- recommander le modèle
- donner la commande suivante exacte

### Rapport attendu

```text
## Model Choice: [scope]

Runtime: [Codex/OpenAI | Claude Code]
Primary model: [model or alias]
Reasoning: [low / medium / high / xhigh, or Claude alias behavior]

Why:
- [reason 1]
- [reason 2]

Fast fallback: [model or alias, quality-equivalent only]
Cheap fallback: [model or alias, quality-equivalent only]

Freshness check:
- [OpenAI Docs MCP used / not needed / unavailable fallback]

When to upgrade:
- [condition]

When to downgrade:
- [condition]

Next step:
- /102-sg-start [scope]

Runtime application:
- [current conversation acceptable / switch recommended for next run / subagent override applied / subagent override recommended, not applied]
```

### Rules

- Être court et décisionnel
- Lire `references/model-routing.md` à chaque usage
- Ne pas inventer de benchmark précis
- Considérer `gpt-5.5` comme disponible dans Codex si la doc OpenAI officielle courante le confirme
- Si l'utilisateur demande le "latest" ou une comparaison actuelle OpenAI, vérifier la doc OpenAI officielle via MCP avant d'affirmer
- Pour Claude Code, recommander les aliases stables plutôt que des slugs datés sauf demande explicite
- Préférer une décision professionnelle suffisamment étayée à une optimisation obsessionnelle; ne pas abaisser le contrat qualité pour éviter le débat
- Si deux modèles sont proches et qualité-équivalents, arbitrer sur latence, coût, nature agentique et risque d'erreur
