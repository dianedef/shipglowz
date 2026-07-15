from __future__ import annotations

import contextlib
import hashlib
import io
import tempfile
import unittest
from pathlib import Path
from unittest import mock

import yaml
from PIL import Image

from tools import capture_design_inspiration as capture


ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "tools" / "fixtures" / "design-inspiration" / "sample-sales-page.html"
RECORD_SCHEMA = ROOT / "skills" / "references" / "design-inspiration" / "record.schema.yaml"
INDEX_SCHEMA = ROOT / "skills" / "references" / "design-inspiration" / "index.schema.yaml"
SAMPLE_RECORD = ROOT / "skills" / "references" / "design-inspiration" / "sample-record.yaml"


def read_yaml(path: Path):
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def file_sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


class PathAndSchemaTests(unittest.TestCase):
    def test_path_refuses_shipglowz_public_repo(self) -> None:
        with self.assertRaises(capture.CaptureToolError) as caught:
            capture.validate_output_root(ROOT / "tmp-inspiration-output", fixture_mode=False)
        self.assertEqual(caught.exception.code, "public_repo_target")

    def test_path_fixture_requires_system_temp(self) -> None:
        with self.assertRaises(capture.CaptureToolError) as caught:
            capture.validate_output_root(ROOT / "fixture-output", fixture_mode=True)
        self.assertEqual(caught.exception.code, "public_repo_target")

    def test_path_accepts_synthetic_fixture_in_temp(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            resolved = capture.validate_output_root(Path(temporary) / "corpus", fixture_mode=True)
            self.assertTrue(capture.is_relative_to(resolved, Path(tempfile.gettempdir()).resolve()))

    def test_schema_required_fields_match_synthetic_sample(self) -> None:
        schema = read_yaml(RECORD_SCHEMA)
        sample = read_yaml(SAMPLE_RECORD)
        self.assertEqual(schema["schema_version"], "1.0")
        self.assertFalse(set(schema["required"]) - set(sample))
        capture.validate_record(sample)
        self.assertEqual(capture.urlsplit(sample["source"]["url"]).hostname, "example.invalid")

    def test_index_schema_covers_duplicate_and_checksum_contract(self) -> None:
        schema = read_yaml(INDEX_SCHEMA)
        required = schema["properties"]["entries"]["items"]["required"]
        self.assertIn("capture_status", required)
        self.assertIn("bundle_checksum", required)
        self.assertIn("full_page_checksum", required)
        self.assertIn("duplicate_events", schema["required"])

    def test_url_normalization_and_query_redaction(self) -> None:
        original = "HTTPS://Example.Invalid:443/path/?token=private#fragment"
        self.assertEqual(capture.normalize_url(original), "https://example.invalid/path")
        redacted = capture.redact_url(original)
        self.assertNotIn("private", redacted)
        self.assertIn("redacted", redacted)


class TextExtractionTests(unittest.TestCase):
    def test_text_extracts_structure_and_excludes_hidden_boilerplate(self) -> None:
        html = FIXTURE.read_text(encoding="utf-8")
        markdown, blocks = capture.extract_fixture_markdown(html, "https://example.invalid/synthetic")
        self.assertGreater(len(blocks), 15)
        self.assertIn("# Turn scattered launch notes", markdown)
        self.assertIn("- Clarify the audience", markdown)
        self.assertIn("**Button:** Create my synthetic plan", markdown)
        self.assertIn("**Label:** Fictional work email", markdown)
        self.assertIn("[Read synthetic details]", markdown)
        self.assertNotIn("must never be extracted", markdown)
        self.assertNotIn("Accept every fictional cookie", markdown)
        self.assertNotIn("Hidden private copy", markdown)

    def test_text_fixture_rejects_non_synthetic_source_url(self) -> None:
        with self.assertRaises(capture.CaptureToolError) as caught:
            capture.capture_fixture(FIXTURE, "https://example.com/not-allowed")
        self.assertEqual(caught.exception.code, "fixture_source_not_synthetic")


class ImageAndIntegrationTests(unittest.TestCase):
    def run_fixture(self, output: Path, reference_id: str = "sample-sales-page", url: str | None = None) -> tuple[int, str, str]:
        argv = [
            "--fixture",
            str(FIXTURE),
            "--output",
            str(output),
            "--id",
            reference_id,
            "--no-network",
        ]
        if url:
            argv.extend(["--url", url])
        stdout = io.StringIO()
        stderr = io.StringIO()
        with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(stderr):
            code = capture.run(argv)
        return code, stdout.getvalue(), stderr.getvalue()

    def test_image_fixture_generates_complete_webp_bundle_and_checksums(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            corpus = Path(temporary) / "corpus"
            code, stdout, stderr = self.run_fixture(corpus)
            self.assertEqual((code, stderr), (0, ""))
            self.assertIn("status=captured", stdout)
            bundle = corpus / "references" / "sample-sales-page"
            expected = ["record.yaml", "page.md", "full-page.webp", "thumbnail.webp", "segments/001.webp"]
            for name in expected:
                self.assertTrue((bundle / name).is_file(), name)
            segments = sorted((bundle / "segments").glob("*.webp"))
            self.assertGreaterEqual(len(segments), 2)
            self.assertEqual([path.name for path in segments], [f"{index:03d}.webp" for index in range(1, len(segments) + 1)])
            for image_path in [bundle / "full-page.webp", bundle / "thumbnail.webp", *segments]:
                with Image.open(image_path) as image:
                    self.assertEqual(image.format, "WEBP")
                    self.assertGreater(image.width, 0)
                    self.assertGreater(image.height, 0)

            record = read_yaml(bundle / "record.yaml")
            self.assertEqual(record["capture_status"], "captured")
            self.assertEqual(record["capture"]["engine"], "synthetic_fixture")
            self.assertEqual(record["capture"]["segment_height"], 1600)
            self.assertEqual(record["capture"]["segment_overlap"], 160)
            for relative, checksum in record["checksums"]["files"].items():
                self.assertEqual(file_sha256(bundle / relative), checksum)
            self.assertEqual(record["checksums"]["bundle"], capture.bundle_checksum(record["checksums"]["files"]))
            self.assertFalse((bundle / "source.html").exists())

    def test_image_thumbnail_is_bounded(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            corpus = Path(temporary) / "corpus"
            code, _, _ = self.run_fixture(corpus)
            self.assertEqual(code, 0)
            with Image.open(corpus / "references" / "sample-sales-page" / "thumbnail.webp") as thumbnail:
                self.assertLessEqual(thumbnail.width, capture.THUMBNAIL_WIDTH)

    def test_image_duplicate_checksum_does_not_create_second_reference(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            corpus = Path(temporary) / "corpus"
            first, _, _ = self.run_fixture(corpus, "first-reference", "https://example.invalid/shared-fixture")
            second, stdout, _ = self.run_fixture(corpus, "second-reference", "https://example.invalid/shared-fixture-copy")
            self.assertEqual(first, 0)
            self.assertEqual(second, 3)
            self.assertIn("duplicate_checksum", stdout)
            self.assertFalse((corpus / "references" / "second-reference").exists())
            index = read_yaml(corpus / "index.yaml")
            self.assertEqual(len(index["entries"]), 1)
            self.assertEqual(index["duplicate_events"][-1]["reason"], "duplicate_checksum")


class StatusAndFailureTests(unittest.TestCase):
    def test_status_duplicate_id_is_recorded_without_overwrite(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            corpus = Path(temporary) / "corpus"
            first = capture.run(["--fixture", str(FIXTURE), "--output", str(corpus), "--id", "same-id", "--no-network"])
            record_before = (corpus / "references" / "same-id" / "record.yaml").read_bytes()
            second = capture.run(["--fixture", str(FIXTURE), "--output", str(corpus), "--id", "same-id", "--no-network"])
            self.assertEqual(first, 0)
            self.assertEqual(second, 3)
            self.assertEqual(record_before, (corpus / "references" / "same-id" / "record.yaml").read_bytes())
            index = read_yaml(corpus / "index.yaml")
            self.assertEqual(index["duplicate_events"][-1]["reason"], "duplicate_id")

    def test_status_live_failure_writes_record_without_fake_artifacts(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            corpus = capture.validate_output_root(Path(temporary) / "private-corpus", fixture_mode=False)
            index = capture.bootstrap_corpus(corpus)
            failure = capture.CaptureToolError(
                "playwright_unavailable",
                "Install Playwright and Chromium, then retry.",
            )
            with mock.patch.object(capture, "capture_live", side_effect=failure):
                record, status = capture.capture_one(
                    root=corpus,
                    index=index,
                    url="https://example.invalid/live-failure?token=private",
                    reference_id="live-failure",
                    fixture=None,
                )
            self.assertEqual(status, "failed")
            self.assertIsNotNone(record)
            bundle = corpus / "references" / "live-failure"
            self.assertTrue((bundle / "record.yaml").is_file())
            self.assertFalse((bundle / "page.md").exists())
            self.assertFalse((bundle / "full-page.webp").exists())
            self.assertEqual(record["capture"]["reason_code"], "playwright_unavailable")
            self.assertEqual(record["checksums"]["files"], {})

    def test_status_auth_required_is_explicit_and_artifact_free(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            corpus = capture.validate_output_root(Path(temporary) / "private-corpus", fixture_mode=False)
            index = capture.bootstrap_corpus(corpus)
            result = capture.CaptureResult(
                final_url="https://example.invalid/login",
                access_status="authenticated",
                capture_status="auth_required",
                engine="playwright",
                reason_code="auth_required",
                reason="authentication wall detected",
            )
            with mock.patch.object(capture, "capture_live", return_value=result):
                record, status = capture.capture_one(
                    root=corpus,
                    index=index,
                    url="https://example.invalid/private",
                    reference_id="auth-wall",
                    fixture=None,
                )
            self.assertEqual(status, "auth_required")
            self.assertEqual(record["lifecycle_status"], "blocked")
            self.assertEqual(record["artifacts"]["segments"], [])

    def test_status_query_parameters_are_redacted_from_output_but_kept_private(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            corpus = Path(temporary) / "corpus"
            stdout = io.StringIO()
            with contextlib.redirect_stdout(stdout):
                code = capture.run(
                    [
                        "--fixture",
                        str(FIXTURE),
                        "--output",
                        str(corpus),
                        "--id",
                        "redaction-check",
                        "--url",
                        "https://example.invalid/redaction?secret=must-not-log",
                        "--no-network",
                    ]
                )
            self.assertEqual(code, 0)
            self.assertNotIn("must-not-log", stdout.getvalue())
            record = read_yaml(corpus / "references" / "redaction-check" / "record.yaml")
            self.assertIn("must-not-log", record["source"]["url"])

    def test_status_only_is_read_only_and_summarizes_index(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            corpus = Path(temporary) / "corpus"
            capture.run(["--fixture", str(FIXTURE), "--output", str(corpus), "--id", "status-check", "--no-network"])
            before = (corpus / "index.yaml").read_bytes()
            stdout = io.StringIO()
            with contextlib.redirect_stdout(stdout):
                code = capture.run(["--output", str(corpus), "--status-only"])
            self.assertEqual(code, 0)
            self.assertIn('"captured": 1', stdout.getvalue())
            self.assertEqual(before, (corpus / "index.yaml").read_bytes())


if __name__ == "__main__":
    unittest.main()
