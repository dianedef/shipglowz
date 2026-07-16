#!/usr/bin/env python3
"""Regression checks for the shared ShipGlowz reporting contract."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
REPORTING_CONTRACT = ROOT / "skills" / "references" / "reporting-contract.md"
CHANTIER_TRACKING = ROOT / "skills" / "references" / "chantier-tracking.md"
FINAL_TIMESTAMP = ROOT / "skills" / "references" / "final-report-timestamp.md"
START_README = ROOT / "skills" / "102-sg-start" / "README.md"
START_WORKFLOW = ROOT / "skills" / "102-sg-start" / "references" / "execution-workflow.md"
MIGRATE_SKILL = ROOT / "skills" / "404-sg-migrate" / "SKILL.md"


class ReportingContractTests(unittest.TestCase):
    def test_user_mode_forbids_modified_file_details(self) -> None:
        text = REPORTING_CONTRACT.read_text(encoding="utf-8")
        for rule in (
            "Do not include a modified-files section in `report=user`",
            "file names, paths, or counts",
            "SSRP-008 no modified-file inventory",
        ):
            self.assertIn(rule, text)

    def test_start_public_contract_does_not_promise_file_inventory(self) -> None:
        text = START_README.read_text(encoding="utf-8")
        self.assertNotIn("a concise execution report with files changed", text)

    def test_start_detailed_file_template_is_agent_only(self) -> None:
        text = START_WORKFLOW.read_text(encoding="utf-8")
        self.assertIn("For `report=agent` only", text)

    def test_migration_user_template_omits_modified_file_count(self) -> None:
        text = MIGRATE_SKILL.read_text(encoding="utf-8")
        self.assertNotIn("Files modified:   [count]", text)

    def test_user_report_opens_with_chantier_then_verdict(self) -> None:
        text = REPORTING_CONTRACT.read_text(encoding="utf-8")
        expected = (
            "🧱 CHANTIER (<local|spec>) : <name>\n"
            "🎯 VERDICT (HH:mm) : <verdict or status>"
        )
        self.assertIn(expected, text)
        self.assertNotIn("## Compact Chantier Block", text)

    def test_chantier_tracking_uses_opening_header_not_final_block(self) -> None:
        text = CHANTIER_TRACKING.read_text(encoding="utf-8")
        self.assertIn("🧱 CHANTIER (local) : <short work name>", text)
        self.assertIn("🧱 CHANTIER (spec) : <spec title>", text)
        self.assertNotIn("Compact user-mode block:", text)

    def test_timestamp_contract_allows_chantier_before_verdict(self) -> None:
        text = FINAL_TIMESTAMP.read_text(encoding="utf-8")
        self.assertIn("immediately after the chantier header", text)
        self.assertNotIn("Every ShipGlowz final report must begin", text)

    def test_activation_contracts_do_not_request_trailing_chantier_blocks(self) -> None:
        legacy_phrases = (
            "compact chantier block",
            "compact `Chantier` block",
            "final `Chantier` block",
        )
        for skill in (ROOT / "skills").glob("*/SKILL.md"):
            if skill.parent.is_symlink():
                continue
            text = skill.read_text(encoding="utf-8")
            for phrase in legacy_phrases:
                self.assertNotIn(phrase, text, f"{skill}: {phrase}")

    def test_verdict_headers_use_time_only(self) -> None:
        for path in (ROOT / "skills").rglob("*.md"):
            if any(parent.is_symlink() for parent in path.parents):
                continue
            text = path.read_text(encoding="utf-8")
            self.assertNotIn("🎯 VERDICT (YYYY-MM-DD HH:mm)", text, str(path))

    def test_user_mode_has_compact_validation_summary(self) -> None:
        text = REPORTING_CONTRACT.read_text(encoding="utf-8")
        self.assertIn(
            "✅ Tests 18/18 · 🧾 Métadonnées OK · 🔄 Sync 236/236",
            text,
        )
        self.assertIn("SSRP-010 compact validation line", text)

    def test_chantier_and_context_emoji_vocabulary(self) -> None:
        text = REPORTING_CONTRACT.read_text(encoding="utf-8")
        for rule in (
            "`🧱` for the normal chantier header",
            "`🚧` only when the run is blocked",
            "`📂` for a dossier or scope",
            "`🔨` for active implementation or repair",
            "`📌` for a priority, decision, or next action",
        ):
            self.assertIn(rule, text)
        self.assertNotIn("🏗️ CHANTIER", text)


if __name__ == "__main__":
    unittest.main()
