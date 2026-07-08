---
name: 310-sg-github-hygiene
description: "Audit git sync, stale branches, PR drift, and Dependabot hygiene."
argument-hint: '[audit|fix|branches|dependabot] [current repo|workspace]'
---

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Chantier Tracking

Trace category: `non-applicable`.
Process role: `helper`.

This skill does not write to chantier specs. If it reveals non-trivial follow-up work, report it as a recommended next command instead of mutating workflow trackers.

## Report Modes

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

Default to `report=user`: concise hygiene verdict, concrete git/GitHub findings, and one next action only when needed. Use `report=agent` when another skill needs the full branch matrix, PR list, and command evidence.

## Mission

Keep a repository or workspace git/GitHub surface healthy by detecting sync drift, stale branches, risky local state, outdated pull requests, and Dependabot backlog, then applying only bounded safe maintenance.

## Scope Gate

Use this skill when the operator wants one of these outcomes:

- verify whether local branches and remotes are up to date
- identify stale local or remote branches
- check whether feature branches or PRs are behind their base branch
- review Dependabot coverage and open Dependabot pull requests
- apply low-risk git/GitHub cleanup after the hygiene state is clear

Do not use this skill for:

- ordinary commit/push flow already owned by `005-sg-ship`
- full dependency risk audits already owned by `402-sg-deps`
- major-version dependency migrations already owned by `404-sg-migrate`
- CI log debugging already owned by `github:gh-fix-ci`
- review-thread resolution already owned by `github:gh-address-comments`

Default mode is `audit`.

- `audit`: read-only diagnosis for the current repo or selected workspace repos
- `branches`: focus on branch sync, stale refs, merged branches, and PR drift
- `dependabot`: focus on `.github/dependabot.yml`, open Dependabot PRs, and blocked update lanes
- `fix`: apply bounded hygiene repairs only after the audit has classified the risk

## Required References

- Load `$SHIPFLOW_ROOT/skills/references/question-contract.md` before asking the operator to choose repo scope or approve destructive git actions.
- Load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md` before the final report.

## Execution Flow

### Step 1 - Detect scope

If the current directory is a git repo, treat it as the default target.

If the current directory is not a git repo but looks like a workspace, scan likely project roots and ask the operator to choose one repo or the full workspace before any mutating action.

For workspace mode:

- include only directories that are git repos
- include ShipGlowz itself when relevant
- keep the run read-only unless the operator explicitly approves fixes per repo

### Step 2 - Refresh repo truth

For each selected repo, gather a fresh baseline:

```bash
git -C [path] status --short
git -C [path] branch --show-current
git -C [path] remote -v
git -C [path] fetch --all --prune --tags
git -C [path] branch -vv
git -C [path] for-each-ref --format='%(refname:short)|%(upstream:short)|%(upstream:track)|%(committerdate:short)|%(authorname)|%(subject)' refs/heads
git -C [path] symbolic-ref refs/remotes/origin/HEAD
```

If GitHub-specific maintenance is needed and the repo has a GitHub remote, also gather:

```bash
gh auth status
gh -R [owner/repo] pr list --state open --limit 100
gh -R [owner/repo] pr list --state open --author 'app/dependabot'
```

### Step 3 - Classify hygiene findings

Classify findings per repo into these buckets:

- `clean`: current branch and remote tracking are aligned, no risky stale state
- `ahead`: local commits need push
- `behind`: current branch or open PR branch needs upstream/base sync
- `diverged`: local and upstream both moved
- `merged-stale`: local branch already merged into the default branch
- `orphaned`: local branch has no upstream or remote branch was deleted
- `dirty`: uncommitted or untracked files make branch-changing actions unsafe
- `dependabot-backlog`: Dependabot PRs open, failing, blocked, or missing coverage

Treat these as attention items:

- branches behind their upstream
- feature branches or PR heads behind the base branch
- local branches merged long ago but still present
- remote-tracking refs not pruned
- repos missing `.github/dependabot.yml` where dependency automation is expected
- Dependabot PRs with failed checks, merge conflicts, or stale base branches

### Step 4 - Choose the safe maintenance lane

Read-only `audit` mode stops after classification and report generation.

`branches` mode may propose or perform only these bounded actions:

- `git fetch --all --prune --tags`
- `git remote prune origin`
- delete a fully merged local branch that is not the current branch and not protected
- fast-forward the current branch with `git pull --ff-only` when the tree is clean

`dependabot` mode may propose or perform only these bounded actions:

- verify `.github/dependabot.yml` presence and ecosystem coverage
- refresh PR status with `gh pr checks`
- rebase or update a Dependabot PR branch only when the platform and branch policy allow it safely
- merge a green Dependabot PR only when it is patch/minor risk, non-sensitive, non-major, and explicitly approved

`fix` mode may combine the safe actions above, but only after reporting the exact repos and branches it will mutate.

## Action Rules

Apply these rules before mutating anything:

- Never merge, rebase, reset, or delete a branch while the repo is dirty.
- Never auto-merge major dependency bumps.
- Never auto-merge auth, billing, deploy, infra, workflow, permissions, or security-sensitive Dependabot PRs.
- Never delete the current branch, default branch, protected release branch, or a branch with unique local commits.
- Never bulk-delete remote branches.
- Never resolve merge conflicts silently.
- Prefer `git pull --ff-only` over merge pulls.
- Prefer one repo at a time for mutating actions, even in workspace mode.

When a branch is behind its base branch:

- if it is the current local branch with a clean tree and a plain fast-forward is possible, use `git pull --ff-only`
- if it is a PR branch and GitHub can update it safely, use the GitHub route
- if it requires a merge commit, rebase, or conflict resolution, stop and ask for branch-specific approval

When Dependabot PRs exist:

- separate patch/minor from major upgrades
- separate normal app dependencies from GitHub Actions, deploy, auth, billing, and infra packages
- route major upgrades to `404-sg-migrate`
- route failing CI investigation to `github:gh-fix-ci`

## Stop Conditions

Stop and report `blocked` when:

- no target git repo can be identified
- the repo is dirty and the requested action would mutate branch state
- `gh` auth or repo access is missing for a GitHub action the run depends on
- the requested cleanup would delete a branch with unique local commits or uncertain ownership
- a branch or PR is diverged, conflicted, protected, or requires non-fast-forward history edits
- a Dependabot PR changes a major version or a sensitive package lane
- the next step would need secrets, org-only permissions, or branch-protection bypass the agent does not have

## Validation

Use `scenario-first` proof for this skill contract and operational proof for each run.

Pressure scenarios:

- Given a clean repo with branches behind origin, when `fix` is requested, then the skill fast-forwards only safe branches and reports the rest as blocked or approval-needed.
- Given merged local branches, when `branches` is requested, then the skill deletes only branches that are fully merged and non-protected.
- Given open Dependabot PRs, when `dependabot` is requested, then the skill separates safe patch/minor lanes from major or sensitive updates before any merge suggestion.

After edits to this skill, validate with:

```bash
rg -n "Mission|Scope Gate|Required References|Stop Conditions|Validation|Report Modes" skills/310-sg-github-hygiene/SKILL.md
python3 tools/audit_shipglowz_skills.py
python3 tools/skill_budget_audit.py --skills-root skills --format markdown
tools/shipglowz_sync_skills.sh --check --skill 310-sg-github-hygiene
```

For live repo maintenance runs, re-check the repo after every mutation:

```bash
git -C [path] status --short
git -C [path] branch -vv
gh -R [owner/repo] pr list --state open --author 'app/dependabot'
```

## Report Shape

In `report=user`, keep the final report compact:

- repo or workspace verdict
- top hygiene findings
- actions applied, if any
- limits or approval-needed items
- one real next step only when needed

Use `report=agent` for the full branch matrix, stale-branch inventory, Dependabot PR list, and command evidence.
