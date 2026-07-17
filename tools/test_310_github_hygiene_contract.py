#!/usr/bin/env python3
"""Regression checks for the 310 Dependabot queue contract."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "skills" / "310-sg-github-hygiene" / "SKILL.md"
TERMINAL_DISPOSITIONS = ("merged", "closed", "deferred", "routed", "blocked")


class GitHubHygieneContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.text = SKILL.read_text(encoding="utf-8")
        cls.lower = cls.text.lower()

    def test_terminal_ledger_has_one_final_disposition_per_pr(self) -> None:
        self.assertIn("exactly one final disposition", self.lower)
        self.assertIn("terminal disposition ledger", self.lower)
        for disposition in TERMINAL_DISPOSITIONS:
            self.assertIn(f"`{disposition}`", self.text)

    def test_routed_is_an_explicit_handoff_not_downstream_success(self) -> None:
        self.assertIn("`routed` names the owner and reason", self.text)
        self.assertIn("does not imply downstream success", self.lower)

    def test_item_blockers_do_not_stop_independent_pull_requests(self) -> None:
        self.assertIn("item-scoped blocker", self.lower)
        self.assertIn("continue independent eligible pull requests", self.lower)
        self.assertIn("only queue-wide blockers stop the full queue", self.lower)

    def test_queue_wide_blockers_are_named(self) -> None:
        for blocker in (
            "GitHub authentication",
            "repository access",
            "operator authorization",
            "reliable refreshed queue truth",
        ):
            self.assertIn(blocker, self.text)

    def test_every_queue_mutation_requires_fresh_github_truth(self) -> None:
        for mutation in ("merge", "close", "branch update", "queue mutation"):
            self.assertIn(mutation, self.lower)
        for refreshed_state in ("open PR", "check", "base state"):
            self.assertIn(refreshed_state, self.text)
        self.assertIn("before selecting the next action", self.lower)

    def test_queue_continues_until_no_actionable_pr_remains(self) -> None:
        self.assertIn("until no actionable pull request remains", self.lower)
        self.assertIn("DEPENDABOT-MIXED-QUEUE-CONTINUES", self.text)

    def test_specialist_routes_remain_explicit(self) -> None:
        for owner in ("010-sg-technical deps", "010-sg-technical migrate", "github:gh-fix-ci"):
            self.assertIn(owner, self.text)

    def test_existing_merge_safety_gates_remain_intact(self) -> None:
        for rule in (
            "Never auto-merge major dependency bumps.",
            "Never auto-merge auth, billing, deploy, infra, workflow, permissions, or security-sensitive Dependabot PRs.",
            "explicitly approved",
            "Never resolve merge conflicts silently.",
        ):
            self.assertIn(rule, self.text)


if __name__ == "__main__":
    unittest.main()
