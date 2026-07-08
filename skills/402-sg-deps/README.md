# 402-sg-deps

> Audit your dependency stack for security, drift, waste, and supply-chain risk, then tell you what actually matters.

## What It Does

`402-sg-deps` is ShipGlowz’s deep dependency audit. It goes beyond “run `npm audit`” and looks at the full health of your package graph: vulnerabilities, outdated packages, unused dependencies, duplicate tooling, license risk, missing type coverage, and configuration gaps.

The important difference is framing. This skill treats dependencies as product risk, not housekeeping. A vulnerable auth library, abandoned payment SDK, or sloppy package-manager setup can break trust, slow delivery, or create commercial risk for a solo founder.

## Who It's For

- Solo founders shipping apps with third-party packages
- Technical operators responsible for several repos
- Teams that want a dependency audit before cleanup, upgrades, or release work

## When To Use It

- when you want a real dependency audit, not just a quick scan
- when a project has grown messy over time
- when you suspect package sprawl, stale libraries, or supply-chain risk
- when planning safe patch and minor upgrades

## What You Give It

- the current project directory
- optionally `global` to audit multiple projects in a workspace

## What You Get Back

- a dependency report with severity-based findings
- concrete recommendations for safe fixes and cleanup
- explicit proof gaps where tooling could not fully verify risk
- optional follow-up guidance on what to fix first

## Typical Examples

```bash
/402-sg-deps
/402-sg-deps global
```

## Limits

`402-sg-deps` does not auto-upgrade major versions as a shortcut. It also cannot guarantee exploitability from tooling alone; some findings still require human judgment about runtime exposure, business impact, and migration risk.

## Related Skills

- `105-sg-check` for a quick dependency snapshot during routine validation
- `404-sg-migrate` for major-version upgrades
- `103-sg-verify` when dependency changes affect critical product flows
