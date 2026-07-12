#!/usr/bin/env python3
"""Regression checks for the 900-shipglowz-core activation contract."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "skills" / "900-shipglowz-core" / "SKILL.md"
BASELINE_LINES = 162


class ShipGlowzCoreContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.text = SKILL.read_text(encoding="utf-8")

    def test_system_improvement_fields_have_one_owner_definition(self) -> None:
        for field in (
            "`Observed problem`",
            "`System cause`",
            "`Prevention rule`",
            "`Contract/tooling improvement proposal`",
        ):
            self.assertEqual(self.text.count(field), 1, field)

    def test_scope_has_no_stale_read_only_contradiction(self) -> None:
        self.assertNotIn("Default to read-only analysis", self.text)
        self.assertIn("operator critique of ShipGlowz execution authorizes a bounded repair", self.text)

    def test_observed_failure_requires_focused_proof(self) -> None:
        self.assertIn("apply the shared `Followability Gate`", self.text)
        self.assertIn("A passing generic audit is not completion proof", self.text)
        self.assertIn("Require focused mechanical or pressure-scenario proof", self.text)

    def test_validation_uses_current_tool_and_focused_test(self) -> None:
        self.assertNotIn("audit_shipflow_skills", self.text)
        self.assertIn("audit_shipglowz_skills.py", self.text)
        self.assertIn("python3 -m unittest tools.test_900_shipglowz_core_contract", self.text)

    def test_activation_contract_is_compacted(self) -> None:
        self.assertLess(len(self.text.splitlines()), BASELINE_LINES)


if __name__ == "__main__":
    unittest.main()
