---
artifact: spec
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: "ShipGlowz"
created: "2026-06-22"
updated: "2026-06-22"
status: ready
source_skill: 100-sg-spec
scope: devserver-ui-centralization
owner: unknown
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
linked_systems:
  - lib.sh
  - tui/src/views/dashboardView.ts
  - tui/src/sources/readers.ts
  - tui/src/viewModels/dashboard.ts
  - shipglowz_data/workflow/TASKS.md
depends_on:
  - artifact: "skills/references/decision-quality-contract.md"
    artifact_version: "1.2.0"
    required_status: active
  - artifact: "skills/references/design-system-token-contract.md"
    artifact_version: "1.0.0"
    required_status: active
  - artifact: "CLAUDE.md"
    artifact_version: "unknown"
    required_status: active
supersedes: []
evidence:
  - "Audit 2026-06-22: ui_choose god component (4 branches), duplicated lettered menu rendering, duplicated status color mapping, grep -qiF O(n*m), gum style loop overhead, center_* duplication, unused ui_box_header/ui_action_header, readers.ts 1103 lines mixing discovery/parsing/dedup/summarization."
next_review: "2026-07-07"
next_step: "/102-sg-start Centraliser le design system du shell DevServer et réduire la latence des sélecteurs"
---

# Spec: Centraliser le design system du shell DevServer et réduire la latence des sélecteurs

## Title

Centraliser le design system du shell DevServer et réduire la latence des sélecteurs

## User Story

En tant qu’opérateur du menu ShipGlowz DevServer, je veux des sélecteurs d’environnement plus rapides et un shell UI dont la logique d’affichage est centralisée, pour réduire la latence perçue et éviter la dérive entre `gum` et fallback bash.

## Minimal Behavior Contract

Quand l’opérateur invoque un sélecteur lettré (menu court ou recherche filtrée), le système accepte une liste d’items, affiche une interface lettrée cohérente (gum ou fallback), retourne l’item choisi ou un signal d’annulation, et échoue proprement quand la liste est vide ou quand l’utilisateur annule. L’edge case principal est une liste de plus de 26 items : les indices doivent rester exploitables sans duplication de rendu.

## Problem

`lib.sh` mélange 4 chemins d’affichage (gum court, gum filtré, fallback court, fallback filtré) avec du rendu lettré dupliqué trois fois. `grep -qiF` sur grandes listes, les appels `gum style` en boucle fermée, et l’absence de cache sur les listes d’environnement rendent le widget de sélection lent à apparaître. `readers.ts` (1103 lignes) mélange discovery, parsing, dédup et résumé, ce qui rend la TUI difficile à maintenir et à tester.

## Solution

Extraire des primitives partagées (`ui_letter_list`, `ui_back_label`, `ui_status_color`, `ui_text_center`) pour éliminer la duplication, remplacer les sous-processus coûteux par des helpers bash ou des primitives TUI dédiées, et découper `readers.ts` en modules à responsabilité unique avec un mapping de statut partagé.

## Scope In

- `lib.sh` : fonctions `ui_choose`, `ui_filter_choose`, `ui_screen_header`, `ui_header`, `center_fixed_width`, `center_session_banner_text`, `ui_box_header`, `ui_action_header`, `ui_pause`, `ui_input`, `ui_confirm`.
- `tui/src/sources/readers.ts` : découpage en modules.
- `tui/src/viewModels/dashboard.ts` : partage du mapping statut -> couleur.
- `tui/src/views/dashboardView.ts` : consommation du mapping partagé.
- `.claude/statusline-starship.sh` si il consomme les helpers UI.

## Scope Out

- `shipglowz.sh`, `shipglowz_devserver_gum.sh`, `shipglowz_devserver_bash.sh` (sauf consommation directe des helpers `ui_*`).
- Tunnels SSH (`local/*.sh`), PM2, Caddy, Flox, DuckDNS.
- `injectors/web-inspector.js`, `tui/src/main.ts`.
- Changements de design tokens CSS/tokens du site public.

## Constraints

- Maintenir la compatibilité gum + fallback bash pour tous les sélecteurs.
- Préserver le contrat de retour existant : stdout = item sélectionné, return code = 0 (select) ou 1 (cancel/back).
- Ne pas introduire de dépendance externe dans `lib.sh`.
- Les couleurs ANSI et les缩进 doivent rester cohérents avec le reste du shell DevServer.
- `readers.ts` doit rester exécutable dans un contexte Bun sans passthrough de shell.

## Dependencies

- Bash 4+ (associatif arrays déjà utilisés).
- `gum` optionnel (fallback bash obligatoire).
- `fzf` optionnel (fallback bash obligatoire).
- Bun runtime pour TUI (déjà requis par `tui/src/main.ts`).
- Aucune lib externe supplémentaire requis pour `lib.sh`.

## Invariants

- Toute sélection lettrée expose les mêmes lettres dans le même ordre (a, b, c, ..., z, aa, ab, ...) quel que soit le backend.
- `x` reste le raccourci universel pour annuler/retour.
- Le header `ShipGlowz DevServer` reste centré dans la largeur 50.
- Une liste vide retourne toujours 1 et n’affiche pas de widget de sélection.
- Le mapping statut -> trafic/couleur doit être identique entre shell et TUI.

## Success Behavior

- `ui_choose` et `ui_filter_choose` partagent la primitive de rendu lettrée ; modifier le style d’affichage se fait en un seul endroit.
- L’utilisateur appuie sur `s m n` ou `s m r` : le widget de sélection apparaît sans délai perceptible (>100ms d’amélioration mesurable).
- L’appel `ui_choose` sur 50 items en fallback bash est au moins 2x plus rapide qu’avant (mesuré avec `time`).
- Dans la TUI, les statuts stopped/launching/online/error sont colorés de façon cohérente avec le shell.
- Un agent frais peut ajouter un nouveau sélecteur lettré en 2-3 lignes sans recopier la logique de rendu.

## Error Behavior

- Liste vide : retour 1, message `No environments found` ou `No match`, pas de crash.
- Annulation utilisateur (`x`, `Esc`, `Backspace` sur prompt vide) : retour 1, pas de side effect, pas de log d’erreur.
- `gum` absent : fallback bash automatique, même ergonomie lettrée.
- `fzf` absent : fallback bash automatique, même ergologie lettrée.
- Entrée TTY invalide : normalisée par `_ui_normalize_choice`, pas de boucle infinie.
- Erreur de parsing `readers.ts` : diagnostic江东, pas de crash du dashboard.

## Links & Consequences

- `lib.sh` est sourcé par `shipglowz.sh`, `shipglowz_devserver_gum.sh`, `shipglowz_devserver_bash.sh`, et tous les `local/*.sh` qui utilisent `ui_*`. Tous les fichiers qui importent `ui_choose`/`ui_filter_choose` doivent continuer de fonctionner sans changement d’appel.
- `tui/src/sources/readers.ts` est consommé par `tui/src/main.ts` via `readDashboardData`. Tout découpage doit préserver le contrat de sortie `DashboardData`.
- `tui/src/viewModels/dashboard.ts` construit `DashboardViewModel` utilisé par `dashboardView.ts`. Le mapping de statut déplacé doit rester importable sans breaking change.
- `shipglowz_data/workflow/TASKS.md` doit être mis à jour avec les tâches de refactor.
- `shipglowz_data/technical/context-function-tree.md` doit être mis à jour si les signatures `ui_*` changent.

## Documentation Coherence

- Mettre à jour `shipglowz_data/technical/context.md` si la couche UI est réorganisée.
- Mettre à jour `shipglowz_data/technical/context-function-tree.md` si les signatures `ui_*` changent.
- Aucun changement de documentation publique (site, README) n’est requis car la refactor est interne.

## Edge Cases

- Liste de 27+ items : les indices lettrés dépassent `z` ; le helper doit générer `aa`, `ab`, etc., et le rendu doit rester lisible.
- Items contenant des espaces ou caractères spéciaux : le stripping d’icône (`sed 's/^[^ ]* //'`) doit rester fiable.
- Concurrent access au cache TTY : `ui_flush_pending_input` doit rester appelé avant chaque widget interactif.
- `gum` présent mais lent (`gum style` bloque) : le fallback lettré doit rester utilisable.
- `readers.ts` appelé sur un répertoire `shipglowz_data` partiellement corrompu : diagnostics江东, pas de throw non capturé.
- Chantier actif sans `Skill Run History` : la spec reste valide, le run est optionnel.

## Test Contract

- surface: `lib.sh` (shell UI) + `tui/src/` (TUI TypeScript)
- proof_profile: manual + automated
- proof_order:
  1. Automated: `bun run test` dans `tui/` après découpage de `readers.ts`.
  2. Automated: `bash -n lib.sh` + tests shells existants (`test_priority2.sh`, `test_priority3.sh`, `test_validation.sh`).
  3. Manual: ouvrir `s m n` et `s m r` dans le menu DevServer, vérifier l’apparition du widget et la latence perçue.
  4. Manual: TUI dashboard, vérifier la cohérence des couleurs de statut.
- checklist_path: `shipglowz_data/workflow/test-checklists/devserver-ui-centralization.md` (à créer si nécessaire)
- required_scenario_ids: [SC01, SC02, SC03]
- required_results:
  - SC01: sélection courte gum/fallback fonctionne, même rendu lettré.
  - SC02: recherche filtrée gum/fallback fonctionne, même rendu lettré.
  - SC03: TUI dashboard affiche les mêmes couleurs de statut que le shell.
- exception_with_proof: absence de `gum` testée sur machine sans `gum` installé.
- exception_without_proof: bench précis de latence sur machine ARM64 non représentative ; accepté car le critère est qualitatif (2x mesuré par `time` localement).

## Implementation Tasks

- [ ] Tâche 1 : Extraire `ui_letter_list` / `ui_back_label` comme primitives partagées
  - Fichier : `lib.sh`
  - Action : Extraire la logique de génération de clés lettrées (`_ui_letter_key`) et de label retour (`_ui_back_label_from_options`) en fonctions `ui_letter_list` et `ui_back_label` avec une signature claire.
  - User story link : centraliser le rendu lettré pour éviter duplication et dérive.
  - Depends on : aucune
  - Validate with : `bash -n lib.sh` + menu court gum/fallback fonctionnel.
  - Notes : conserver l’alphabet `abcdefghijklmnopqrstuvwyz` et la génération `aa/ab` pour >26 items.

- [ ] Tâche 2 : Factoriser `ui_choose` et `ui_filter_choose` sur les primitives lettrées
  - Fichier : `lib.sh`
  - Action : Remplacer les blocs de rendu lettré inline par des appels à `ui_letter_list` et `ui_back_label` ; réduire `ui_choose` à l’orchestration des chemins gum/fallback.
  - User story link : éliminer la duplication de rendu et réduire la latence perçue.
  - Depends on : Tâche 1
  - Validate with : `bash -n lib.sh` + tests `test_validation.sh` + manuel `s m n`/`s m r`.
  - Notes : `grep -qiF` dans `ui_filter_choose` doit être remplacé par un helper bash insensible à la casse (e.g., `shopt -s nocasematch` + boucle, ou mapping pré-calculé).

- [ ] Tâche 3 : Remplacer `grep -qiF` par un helper bash sans sous-processus
  - Fichier : `lib.sh`
  - Action : Ajouter `ui_list_filter(items, query)` qui implémente le filtrage insensible à la casse sans fork externe ; l’utiliser dans `ui_filter_choose`.
  - User story link : réduire la latence du widget sur grandes listes.
  - Depends on : Tâche 2
  - Validate with : bench `time` sur liste de 100 items, viser <50ms en fallback.
  - Notes : préférer une approche par tableau Bash ou par `IFS` pour éviter des sous-processus par item.

- [ ] Tâche 4 : Centraliser les helpers de centrage texte
  - Fichier : `lib.sh`
  - Action : Unifier `center_fixed_width`, `center_line` (imbriqué dans `ui_header`), et `center_session_banner_text` en un seul helper `ui_text_center(text, width)` avec largeur par défaut documentée.
  - User story link : design system shell cohérent.
  - Depends on : aucune
  - Validate with : `bash -n lib.sh` + visuel headers `ui_screen_header` et `display_session_banner`.
  - Notes : largeur par défaut = 50, intérieur = 46 pour les box shells.

- [ ] Tâche 5 : Supprimer ou marquer explicitement les fonctions UI inutilisées
  - Fichier : `lib.sh`
  - Action : Vérifier `ui_box_header` et `ui_action_header` ; si non appelées hors `lib.sh`, les marquer comme API publique dépréciée avec commentaire, ou les supprimer après confirmation.
  - User story link : réduire la surface d’API et éviter la maintenance de code mort.
  - Depends on : Tâche 4
  - Validate with : grep global des appelants, `bash -n lib.sh`.

- [ ] Tâche 6 : Extraire un helper unique de statut/couleur pour le shell
  - Fichier : `lib.sh`
  - Action : Créer `ui_traffic_color(status)` qui retourne l’emoji et la couleur ANSI correspondante (🟢 online, 🟠 launching, 🔴 error, etc.) ; remplacer les appels inline existants.
  - User story link : design system shell cohérent, éviter la dérive de mapping.
  - Depends on : Tâche 4
  - Validate with : `bash -n lib.sh` + visuel menus `s m n`/`s m r`.

- [ ] Tâche 7 : Porter le helper de statut dans la TUI
  - Fichier : `tui/src/viewModels/dashboard.ts` ou module partagé TUI
  - Action : Importer/compartimenter le mapping statut -> style pour que `dashboardView.ts` ne duplique plus `trafficFromSpecStatus`, `trafficFromAudit`, `lineColor`.
  - User story link : cohérence shell/TUI, réduire duplication TS.
  - Depends on : Tâche 6
  - Validate with : `bun run dev` dans `tui/`, vérifier onglets Specs/Audits/Tasks.

- [ ] Tâche 8 : Découper `readers.ts` en modules séparés
  - Fichier : `tui/src/sources/readers.ts`
  - Action : Extraire `sourcePolicy.ts` (existant), `canonicalRecords.ts`, `summarizers.ts` ; `readDashboardData` reste le point d’entrée public.
  - User story link : améliorer la maintenabilité et la testabilité de la TUI.
  - Depends on : Tâche 7
  - Validate with : `bun run test` dans `tui/`, couverture cible >80% sur les parsers.

- [ ] Tâche 9 : Ajouter des gardes de cache pour les listes d’environnement (déjà partiellement implémenté)
  - Fichier : `lib.sh`
  - Action : Vérifier que `ENV_LIST_CACHE` et `HOME_FOLDERS_CACHE` sont bien invalidés dans `env_start`, `env_remove`, `env_rename`, et que le TTL est configurable via `SHIPGLOWZ_LIST_CACHE_TTL`.
  - User story link : réduire la latence des listes d’environnement.
  - Depends on : Tâche 2
  - Validate with : `source lib.sh && env_start test && list_all_environments` mesuré avec `time`.

- [ ] Tâche 10 : Ajouter des tests ciblant la latence du sélecteur
  - Fichier : `test_priority2.sh` ou nouveau `test_ui_choose.sh`
  - Action : Ajouter un test mesurant le temps d’exécution de `ui_choose` sur 50 items en fallback bash ; warning si >100ms.
  - User story link : preuve de la latence améliorée.
  - Depends on : Tâches 1-3
  - Validate with : `bash test_ui_choose.sh` en CI locale.

## Acceptance Criteria

- [ ] CA01: Given gum est installé, when l’opérateur lance `s m n`, then le widget lettré apparaît et l’opérateur peut sélectionner un environnnement en <=2 interactions.
- [ ] CA02: Given gum est absent, when l’opérateur lance `s m r`, then le fallback bash produit la même interface lettrée (mêmes clés, même ordre) que gum.
- [ ] CA03: Given une liste de 50 items, when `ui_choose` est appelé en fallback, then le rendu complet prend au plus 100ms (mesuré avec `time`).
- [ ] CA04: Given `ui_filter_choose` avec `grep -qiF` remplacé, when la query est "foo", then le filtrage insensible à la casse retourne les bons items sans fork par item.
- [ ] CA05: Given `center_fixed_width`, `center_line`, `center_session_banner_text` sont unifiés, when `ui_screen_header` est appelé, then le titre et le brand sont centrés correctement dans la largeur 50.
- [ ] CA06: Given `ui_traffic_color` existe, when un status `online`/`launching`/`error`/`stopped` est passé, then la couleur et l’emoji sont identiques dans `lib.sh` et la TUI.
- [ ] CA07: Given `readers.ts` découpé, when `bun run test` est lancé, then tous les parsers et summarizers ont une couverture >80%.
- [ ] CA08: Given les caches `ENV_LIST_CACHE` et `HOME_FOLDERS_CACHE`, when `list_all_environments` est appelé deux fois en moins de 5s, then le deuxième appel ne relance pas de `find`.
- [ ] CA09: Given une liste vide, when `ui_choose` est appelé, then la fonction retourne 1 sans afficher de widget et sans erreur dans les logs.
- [ ] CA10: Given l’opérateur annule avec `x`, when `ui_choose` est en cours, then la fonction retourne 1 sans side effect et sans message d’erreur.

## Test Strategy

- Unit: tests Bash pour `ui_letter_list`, `ui_back_label`, `ui_list_filter`, `ui_text_center`, `ui_traffic_color` (nouveau fichier `test_ui_choose.sh` ou extension `test_priority2.sh`).
- Integration: tests existants `test_validation.sh`, `test_priority2.sh`, `test_priority3.sh` doivent passer sans modification.
- Integration TUI: `bun run test` dans `tui/` après découpage de `readers.ts`.
- Manual: `s m n`, `s m r`, `Navigation` dans le menu DevServer ; vérifier latence perçue et absence de régression ergonomique.
- Manual: TUI dashboard (`bun run dev` dans `tui/`), vérifier couleurs statut coherentes.

## Risks

- P1: Changement de comportement dans les sélecteurs lettrés si les indices dépassent l’alphabet 26 lettres ou si l’extraction n’est pas suffisamment générique.
- P2: Risque de régression dans l’expérience gum vs fallback si la primitive partagée ne couvre pas tous les chemins existants.
- P2: Découpage de `readers.ts` peut exposer des dépendances implicites entre parsing, dédup et résumé, causant des régressions dans le dashboard.
- P3: `ui_box_header` et `ui_action_header` pourraient être appelés par des scripts externes non scannés ; les supprimer pourrait casser des workflows locaux.

## Execution Notes

- Lire d’abord `lib.sh` sections UI (L103-840) et `tui/src/sources/readers.ts` pour comprendre les contrats d’entrée/sortie existants.
- Commencer par extraire les primitives bash (Tâches 1-4) avant de toucher la TUI (Tâche 7).
- Ne pas modifier `ui_choose` et `ui_filter_choose` en même temps : factoriser d’abord `ui_choose` (Tâche 2), puis `ui_filter_choose` (Tâche 3).
- `grep -qiF` est le goulot principal dans `ui_filter_choose:L448` ; le remplacer avant d’optimiser d’autres chemins.
- `gum style` en boucle fermée (`ui_choose:L534-540`) génère 5+ sous-processus par sélection courte ; pré-générer les chaînes colorées ou utiliser `gum style --list` si disponible.
- Pour `readers.ts`, suivre le principe de responsabilité unique: un module pour la policy de lecture, un pour les records canoniques, un pour les résumés.
- Stop condition: si un test existant (`test_priority2.sh`, `test_priority3.sh`, `test_validation.sh`) casse après refactor, arrêter et inspecter avant de continuer.

## Open Questions

- Les fonctions `ui_box_header` et `ui_action_header` sont-elles appelées par des scripts externes non présents dans `lib.sh` ? Si oui, elles doivent être marquées dépréciées plutôt que supprimées.
- Quel est le délai cible exact pour le widget de sélection sur une machine ARM64 typique (Hetzner CAX) ? Le critère "2x plus rapide" est relatif ; faut-il un absolu en ms ?
- `readers.ts` doit-il rester dans `tui/src/sources/` ou migrer vers `tui/src/readers/` avec des fichiers séparés ? Le découpage interne suffit-il, ou faut-il aussi réorganiser les imports ?

## Skill Run History

| Date UTC | Skill | Model | Action | Result | Next step |
|----------|-------|-------|--------|--------|-----------|
| 2026-06-22 | 100-sg-spec | unknown | create | draft | /101-sg-ready Centraliser le design system du shell DevServer et réduire la latence des sélecteurs |
| 2026-06-22 | 101-sg-ready | unknown | gate | ready | /102-sg-start Centraliser le design system du shell DevServer et réduire la latence des sélecteurs |

## Current Chantier Flow

| Phase | Status |
|-------|--------|
| 100-sg-spec | draft |
| 101-sg-ready | ready |
| 102-sg-start | todo |
| 103-sg-verify | todo |
| 104-sg-end | todo |
| 005-sg-ship | todo |
