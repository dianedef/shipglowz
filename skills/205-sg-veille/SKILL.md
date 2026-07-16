---
name: 205-sg-veille
description: "Triage business veille sources into actions."
disable-model-invocation: true
argument-hint: <URLs or paste content>
---

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Chantier Tracking

Trace category: `conditionnel`.
Process role: `source-de-chantier`.

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md` when this run is attached to a spec-first chantier. If exactly one active `specs/*.md` chantier is identified, append the current run to `Skill Run History`, update `Current Chantier Flow` when the run changes the chantier state, and open the report with the opening chantier header. If no unique chantier is identified, do not write to any spec; use a `(local)` chantier header with a short work name.

## Chantier Potential Intake

Because this skill has process role `source-de-chantier`, evaluate the standard threshold from `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md` before the final report. If the findings reveal non-trivial future work and no unique chantier owns it, do not write to an existing spec; add a `Chantier potentiel` block with `oui`, `non`, or `incertain`, a proposed title, reason, severity, scope, evidence, recommended `/100-sg-spec ...` command, and next step. If the work is only a direct local fix or already belongs to the current chantier, state `Chantier potentiel: non` with the concrete reason.

## Report Modes

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

Default to `report=user`: concise, action-first, French user-facing summaries, compact checks, and chantier block only when relevant. Use `report=agent`, `handoff`, `verbose`, or `full-report` when another skill needs detailed source scoring, decision history, validation evidence, or unresolved content-surface gates.

## Required References

Load only the references required by the active run:

- `$SHIPFLOW_ROOT/skills/references/question-contract.md` before asking for missing input or per-link triage decisions.
- `$SHIPFLOW_ROOT/skills/references/source-intake-classification.md` when the input contains external URLs, marketplace links, competitor examples, or source material whose owner route is not yet obvious.
- `$SHIPFLOW_ROOT/skills/references/editorial-content-corpus.md` before recommending blog, article, newsletter, social, public-docs, public-skill-page, claim, or public-content actions.
- `$SHIPFLOW_ROOT/skills/references/task-registry-routing.md` before writing project-local follow-up tasks so editorial actions do not land in the execution tracker.
- `$SHIPFLOW_ROOT/skills/references/master-delegation-semantics.md` before coordinating delegated URL fetch/research contexts.
- `$SHIPFLOW_ROOT/skills/references/reporting-contract.md` before the final report.


## Context

- Current directory: !`pwd`
- Local project discovery sample: !`find "$HOME" -maxdepth 2 -type d -name shipglowz_data 2>/dev/null | head -40 || echo "no local shipglowz_data corpora found"`
- Current project governance sample: !`find shipglowz_data -maxdepth 3 -type f 2>/dev/null | sort | head -80 || echo "no local shipglowz_data governance corpus"`
- Memory index: !`cat ~/.claude/projects/-home-claude/memory/MEMORY.md 2>/dev/null || echo "no memory"`

## Chargement du contexte business

Separate control-plane files from project decision context:

- Candidate projects are discovered from local project `shipglowz_data/` corpora and root project markers.
- Central legacy trackers are migration evidence only and must not be used as current project truth.
- Project-local `shipglowz_data/` is the decision context for scoring a project: `business/`, `editorial/`, `technical/`, and `workflow/`.
- Root legacy files such as `BUSINESS.md`, `PRODUCT.md`, `BRANDING.md`, `GTM.md`, `CONTEXT.md`, `CONTENT_MAP.md`, `TASKS.md`, and `AUDIT_LOG.md` are migration sources only unless a project explicitly has not adopted the governance corpus yet.

For each relevant discovered project, read only the project-local governance files needed for the score:

```
cat [project_path]/shipglowz_data/business/business.md
cat [project_path]/shipglowz_data/business/product.md
cat [project_path]/shipglowz_data/branding/branding.md
cat [project_path]/shipglowz_data/business/gtm.md
cat [project_path]/shipglowz_data/business/portfolio-project-pitch-links.md
cat [project_path]/shipglowz_data/editorial/content-map.md
cat [project_path]/shipglowz_data/technical/context.md
```

Use `[project_path]/CLAUDE.md` or `[project_path]/AGENT.md` only as contributor guidance. If a listed project lacks local governance context, keep the score conservative and report the context gap instead of treating the legacy control-plane registry as business truth. Load relevant memories from `~/.claude/projects/-home-claude/memory/` only as supplementary context, not as the canonical project contract.

---

## Mode detection

- **`$ARGUMENTS` contains URLs** (http/https) → Fetch and analyze each URL.
- **`$ARGUMENTS` contains text without URLs** → Analyze the pasted content directly.
- **`$ARGUMENTS` is empty** → Load `$SHIPFLOW_ROOT/skills/references/question-contract.md`, then ask one numbered input question:
  - Question: "Colle les liens ou le contenu à analyser"
  - Freeform text input

---

## Flow

### Step 1: Extract inputs

Parse `$ARGUMENTS` to separate:
- **URLs** — each http/https link found
- **Raw text** — everything else (pasted content, notes, descriptions)

If there are more than 3 URLs, load `$SHIPFLOW_ROOT/skills/references/master-delegation-semantics.md` before using delegated URL-fetch/research contexts. Parallel URL analysis is read-only only: no edits, no tracker writes, no content creation, and no chantier mutation from delegated contexts.

### Step 2: Fetch & analyze

For each URL:
1. Use **WebFetch** to get the page content
2. If WebFetch fails or returns minimal content, use **mcp__firecrawl__firecrawl_scrape** as fallback
3. Extract: what the page/tool/product offers, target audience, pricing model, tech stack if visible

Marketplace reflex:

- If the URL is an AppSumo listing, load `$SHIPFLOW_ROOT/skills/references/source-intake-classification.md` and do not stop at the deal page.
- Also inspect the official product site linked from the listing when available.
- Also inspect at least one AppSumo feedback surface when available: founder Q&A first, recent reviews second.
- Use the marketplace page for offer packaging, the official site for canonical product framing, and the feedback/Q&A page for user demand, objections, and scope limits.
- If those sources disagree, report the disagreement explicitly.

Customer-feedback reflex:

- When the source is a competitor, product page, or inspiration for end-user, roadmap, demand, or positioning decisions, inspect at least one real customer-feedback surface when available.
- Prefer AppSumo reviews/Q&A, Play Store, Trustpilot, G2, or Capterra when those surfaces exist and materially improve the analysis.
- Treat those pages as customer-voice inputs for objections, desired outcomes, trust signals, and scope limits, not as objective proof.

For pasted text:
1. Identify what it describes (tool, article, trend, technique, product)
2. Search the web for additional context if the text is ambiguous

### Step 3: Prepare summaries

Pour chaque élément, préparer un **résumé court** (3-4 lignes max) en français :
- Ce que c'est (1 ligne)
- Pourquoi ça pourrait nous intéresser — quel(s) projet(s) et sur quel axe (1-2 lignes)
- Score rapide : projet le plus pertinent + score /10

Les 4 axes d'évaluation (utiliser en interne pour le scoring, ne pas tous détailler dans le résumé — mentionner seulement les axes pertinents) :

| Axe | Ce qu'on cherche |
|-----|-----------------|
| **Contenu** | Peut-on s'en inspirer pour améliorer le contenu de nos sites web ou réseaux sociaux ? Contenu éducationnel, divertissant, engageant. |
| **Architecture** | Peut-on améliorer nos architectures techniques ? Performance, UX, stack, AI, infra, patterns. |
| **Concurrence & inspiration** | Est-ce un concurrent ou un produit similaire dont on peut s'inspirer ? |
| **Opportunité collab** | Opportunité de collaboration, partenariat, intégration, ou cross-promotion ? |

Score chaque projet 0-10. Être honnête — un 2/10 c'est bien. Ne pas gonfler les scores.

**Détection de concurrents** : vérifier systématiquement si le lien est un concurrent direct ou indirect d'un de nos projets (même marché, même audience, même problème résolu). Si oui, le signaler clairement dans le résumé avec le tag **⚔️ CONCURRENT** et le projet concerné.

**Détection contenu public** : si le lien suggère un article, blog post, newsletter, social post, public docs, public skill page, FAQ, claim ou page marketing, charger `$SHIPFLOW_ROOT/skills/references/editorial-content-corpus.md`, puis vérifier le `shipglowz_data/editorial/content-map.md` du projet cible. Ne jamais inventer un blog, une newsletter ou une surface sociale absente. Pour un blog/article absent, signaler `surface missing: blog` et proposer un handoff `007-sg-content` (qui peut router vers `202-sg-repurpose`) ou `300-sg-docs editorial`.
**Détection produit** : si le lien concerne un produit déclaré, une page de vente, une page produit, une offre, un plan tarifaire, une livraison, ou un claim commercial, vérifier aussi que l'action recommandée respecte la gouvernance produit du projet cible : inventaire produit, URLs canoniques, mode de livraison, et claims prouvables.

### Step 4: Triage interactif — lien par lien

Traiter **un seul lien à la fois**. Avant toute question utilisateur, charger `$SHIPFLOW_ROOT/skills/references/question-contract.md`. Chaque question doit être numérotée, expliquer pourquoi la décision change la route, et proposer un choix recommandé quand il existe un défaut responsable.

**Format d'affichage avant chaque question :**

```
## Triage — #[N]/[total]

**[Nom]** ([URL])
[résumé 3-4 lignes — ce que c'est, pourquoi ça nous concerne]

| Projet | Score | Pourquoi |
|--------|:-----:|----------|
| [projet1] | X/10 | [1 ligne — axe pertinent] |
| [projet2] | X/10 | [1 ligne — axe pertinent] |
(lister uniquement les projets scorés >= 3)
```

**Puis poser une question de triage pour ce lien**. Les options doivent être **spécifiques au lien analysé** — pas des options génériques. Chaque option doit :
1. Commencer par un **numéro** (pour que l'utilisateur puisse combiner via "Other" — ex: "1+3")
2. Inclure le **nom du projet** concerné
3. Préciser le **type d'action** concret (pas juste "backlog contenu")

**Construire les options ainsi** (max 4, choisir les plus pertinentes pour CE lien) :

`1. Ignorer` — toujours en première option.

Pour les 3 options restantes, piocher dans cette palette et adapter au contexte du lien :

**🔍 Concurrent / benchmark** (PRIORITAIRE — la veille porte souvent sur des concurrents) :
- `🔍 [Projet] — benchmark concurrent (features, pricing, UX vs nous)` — comparer point par point
- `🔍 [Projet] — analyser leur copywriting/positionnement` — étudier comment ils vendent
- `🔍 [Projet] — analyser leur stack technique` — tech, hébergement, API, intégrations
- `🔍 [Projet] — surveiller concurrent (ajouter à la watchlist)` — pas d'action immédiate mais noter

**📝 Contenu** :
- `📝 [Projet] — handoff 007-sg-content pour article/blog [type]` — seulement si une surface blog/article est déclarée; sinon signaler `surface missing: blog`
- `📝 [Projet] — handoff 007-sg-content pour post social [plateforme]` — seulement si une surface sociale est déclarée; sinon signaler une surface éditoriale manquante
- `📝 [Projet] — handoff 007-sg-content pour script vidéo YouTube` — seulement si la surface vidéo est déclarée
- `📝 [Projet] — handoff 007-sg-content pour newsletter / étude de cas` — seulement si la surface newsletter/case study est déclarée

**🏗️ Architecture / produit** :
- `🏗️ [Projet] — intégrer [outil/API/service précis]`
- `🏗️ [Projet] — s'inspirer UX/design [feature précise]`
- `🏗️ [Projet] — tester le produit et documenter`
- `🏗️ [Projet] — reproduire le pattern [pattern précis]`

**🤝 Collaboration** :
- `🤝 [Projet] — contacter pour partenariat/affiliation`
- `🤝 [Projet] — cross-promotion / guest post`

**Règles de sélection des 3 options (hors Ignorer) :**
1. Si le lien est un **concurrent direct** d'un de nos projets → toujours proposer un benchmark en option 2
2. Si le lien a un **score >= 5 sur plusieurs projets** → proposer des actions sur des projets différents
3. **Prioriser** les actions les plus impactantes, pas les plus évidentes
4. Les options surplus (qui ne tiennent pas dans les 4) → les lister dans la description de "Other" : `"Combine par numéros (ex: '2+3') ou : 📝 Quit Coke post social, 🏗️ ContentFlowz pipeline scraping, 🤝 contacter pour affiliation..."`

**Répéter** pour chaque lien jusqu'à ce que tous soient triés.

### Step 5: Exécuter les décisions

Pour chaque lien selon la décision de l'utilisateur :

Avant d'écrire dans un tracker ou dans le dossier de veille canonique :
- traiter les snapshots lus au début comme informatifs seulement
- relire le fichier cible depuis le disque juste avant l'écriture et utiliser cette version comme source de vérité
- appliquer un ajout ou une mise à jour minimale sur l'entrée visée, jamais une réécriture complète depuis un contexte périmé
- si l'ancre ou la fiche attendue a bougé, relire une fois et recalculer
- si c'est encore ambigu après cette seconde lecture, s'arrêter et demander à l'utilisateur

Canonical write targets:

- Veille reports and tools: project-local `shipglowz_data/workflow/research/` when running in a target project; for ShipGlowz/global portfolio veille, `$SHIPFLOW_ROOT/shipglowz_data/workflow/research/`.
- Cross-project tasks: do not write central master-tracker backlog actions; route project-specific work to project-local trackers.
- Project-local execution tasks: `[project_path]/shipglowz_data/workflow/TASKS.md` only when the target project owns its local tracker and the action is explicitly technical or implementation-focused.
- Project-local editorial follow-up: `[project_path]/shipglowz_data/editorial/ROADMAP.md` when the action is public/editorial/content work and the surface is declared.
- Content actions: do not write article/blog/newsletter/social tasks directly when the surface is undeclared; route to `007-sg-content` / `202-sg-repurpose` through the content lifecycle, or report `surface missing: blog`.

#### Si "Ignorer"
- Ne rien faire. Le lien apparaîtra dans le rapport final comme IGNORÉ.

#### Si "Backlog contenu"
- If the chosen action affects public content, first apply the editorial corpus and content-map gate. If the target blog/article surface is missing, report `surface missing: blog` and route to `/007-sg-content [project] [source URL] [content goal]` or `/300-sg-docs editorial [project]`. If the surface exists and the source should be repurposed, route through `007-sg-content` to `202-sg-repurpose` instead of writing article copy directly.
- If the surface exists or the action is non-public content planning, add the task to the editorial roadmap chosen above, format :
  ```
  🟠 [Projet] task: [Description de la tâche contenu] | status: todo | area: editorial-followup | source: [URL] | surface: [surface ou unknown] | note: veille [date]
  ```
- Ajouter une fiche dans `tools.md` (voir format Step 6).

#### Si "Backlog archi"
- Ajouter une tâche dans le tracker choisi ci-dessus, format :
  ```
  - [ ] 🏗️ [Description de la tâche archi/tech] — source: [URL] (veille [date])
  ```
- Ajouter une fiche dans `tools.md` (voir format Step 6).

#### Si "Creuser maintenant"
- Lancer immédiatement une recherche approfondie (WebSearch, WebFetch supplémentaires, benchmark concurrents, etc.)
- Produire un mini-rapport détaillé avec actions concrètes
- Demander ensuite à l'utilisateur s'il veut aussi ajouter un ticket backlog

#### Si "Other" (réponse libre)
- Interpréter intelligemment et exécuter. Exemples : "backlog contenu + archi", "creuser pour tubeflow", "juste noter dans tools.md".

### Step 6: Save files

Produire **2 fichiers** dans le dossier de veille canonique :

- project-local run: `shipglowz_data/workflow/research/`
- ShipGlowz/global portfolio run: `$SHIPFLOW_ROOT/shipglowz_data/workflow/research/`

#### Fichier 1 : Rapport de veille
**Chemin :** `[research-dir]/veille-[YYYY-MM-DD].md`
Si un rapport existe déjà pour ce jour, append `-2`, `-3`, etc.

Contient le rapport final avec les **décisions de l'utilisateur** (pas des verdicts auto-générés) :

```
VEILLE STRATEGIQUE — [date]
[count] liens analyses
═══════════════════════════════════════

## Tableau recapitulatif

| # | Lien/Sujet | Projet principal | Score | Decision |
|---|------------|:---:|:---:|---------|
| 1 | [name]     | [projet] | X/10 | [IGNORÉ / BACKLOG CONTENU / BACKLOG ARCHI / CREUSÉ] |
| ...

## Détails

### [#N] [Item name] — [DECISION]
- **Quoi** : [2 lignes]
- **Projet** : [projet] ([score]/10)
- **Axes pertinents** : [contenu / archi / concurrence / collab — seulement ceux qui s'appliquent]
- **Action** : [ce qui a été fait — tâche ajoutée, recherche lancée, ou rien]

═══════════════════════════════════════
CREUSÉ: X | BACKLOG: X | IGNORÉ: X
```

#### Fichier 2 : Fiches outils (append)
**Chemin :** `[research-dir]/tools.md`

Ce fichier est **persistant** — on y accumule les fiches des outils/liens intéressants au fil des sessions de veille. Ne pas écraser le contenu existant, **ajouter à la suite**.

Ajouter une fiche pour chaque lien classé **BACKLOG** ou **CREUSÉ** (pas les IGNORÉS) :

```markdown
---

## [Nom de l'outil/lien] — [description courte]

**Lien :** [URL]
**Date de veille :** [YYYY-MM-DD]
**Business :** [projet le plus pertinent] ([score]/10)

**Pourquoi c'est intéressant :**
- [bullet 1 — cas d'usage concret]
- [bullet 2]
- [bullet 3 si pertinent]

**Précautions :**
- [risques, limites, contraintes légales]

**Quand revisiter :** [condition précise ou date]
```

Si le lien est déjà dans `tools.md` (même URL), **mettre à jour la fiche existante** au lieu d'en créer une nouvelle.

### Step 7: Résumé final

Afficher un récap compact des actions effectuées :
- Nombre de tâches techniques ajoutées à TASKS.md (avec les projets concernés)
- Nombre de tâches éditoriales ajoutées à ROADMAP.md (avec les projets concernés)
- Nombre de fiches ajoutées/mises à jour dans tools.md
- Liens creusés (avec résumé des findings)
- Rapport sauvegardé : chemin du fichier
- Content gates: `007-sg-content` handoffs, `surface missing: blog`, `no editorial impact`, or `Editorial Update Plan` when relevant

---

## Important

- **Langue du rapport : toujours français.** Même si les liens sont en anglais.
- **Être spécifique.** "Pourrait être utile" n'est pas une analyse. Dire exactement COMMENT et POUR QUOI.
- **Ne pas sur-scorer.** Être honnête. Un 2/10 c'est bien.
- **Penser cross-projets.** Un même lien peut être CREUSER pour un projet et IGNORER pour un autre. Évaluer chaque projet du registry.
- **Source de vérité projet : `shipglowz_data/` local au projet.** Les anciens fichiers centraux servent uniquement d'archives de migration, jamais comme source de vérité business/editorial/technique.
- **4 axes, pas 5.** Contenu (web + réseaux, éducationnel + divertissant) | Architecture (apps rapides, intelligentes, un plaisir à utiliser) | Concurrence/inspiration (produit, contenu, copywriting) | Opportunité collab (partenariats, intégrations, cross-promo).
- **Paralléliser** les fetches et analyses seulement comme lecture déléguée après chargement de `master-delegation-semantics`; aucune écriture depuis les contextes délégués.
- **Accents français obligatoires** dans tout le rapport.
- **Le tableau récap doit lister TOUS les projets pertinents**, pas seulement 3. Se baser sur la découverte locale des projets pour connaître la liste complète.
