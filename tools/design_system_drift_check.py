#!/usr/bin/env python3
"""Detect likely design-system drift from hardcoded visual values.

The check is intentionally conservative. It is strongest when used with
``--changed`` after UI edits, where new literals are usually actionable drift.
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path


SOURCE_DIRS = ("src", "app", "pages", "components", "lib")
EXCLUDED_PARTS = {
    ".git",
    ".next",
    ".nuxt",
    ".svelte-kit",
    ".astro",
    "build",
    "coverage",
    "dist",
    "node_modules",
    "test-results",
}
EXTENSIONS = {
    ".astro",
    ".css",
    ".dart",
    ".html",
    ".jsx",
    ".scss",
    ".svelte",
    ".ts",
    ".tsx",
    ".vue",
}
TOKEN_SOURCE_HINTS = (
    "token",
    "theme",
    "design-token",
    "variables",
    "palette",
    "color",
    "typography",
    "spacing",
    "radius",
    "shadow",
    "motion",
)
TOKEN_USAGE_HINTS = (
    "var(--",
    "theme(",
    "tokens.",
    "token.",
    "designTokens",
    "Theme.of(",
    "context.theme",
    "ColorScheme",
    "TextTheme",
)


@dataclass(frozen=True)
class Pattern:
    name: str
    regex: re.Pattern[str]


PATTERNS = (
    Pattern(
        "hardcoded color",
        re.compile(
            r"(#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(|\boklch\(|\bColor\(0x[0-9a-fA-F]{6,8}\)|\bColors\.[A-Za-z])"
        ),
    ),
    Pattern(
        "hardcoded CSS dimension",
        re.compile(
            r"\b(font-size|line-height|letter-spacing|gap|row-gap|column-gap|padding|padding-[a-z]+|margin|margin-[a-z]+|inset|top|right|bottom|left|width|height|min-width|max-width|min-height|max-height|border-radius|z-index)\s*:\s*-?(?!0(?:[;,\s)]|px|rem|em|%))[0-9]+(?:\.[0-9]+)?(?:px|rem|em|vh|vw|dvh|svh|lvh|%)?"
        ),
    ),
    Pattern(
        "hardcoded JS/RN/Flutter style value",
        re.compile(
            r"\b(fontSize|lineHeight|letterSpacing|gap|padding|padding[A-Z][A-Za-z]*|margin|margin[A-Z][A-Za-z]*|borderRadius|elevation|shadowRadius|shadowOpacity|zIndex|height|width|top|right|bottom|left|inset)\s*[:=]\s*-?(?!0(?:[;,\s})]))[0-9]+(?:\.[0-9]+)?"
        ),
    ),
    Pattern(
        "hardcoded shadow",
        re.compile(r"\bbox-shadow\s*:\s*(?!var\()[^;]+"),
    ),
    Pattern(
        "hardcoded motion",
        re.compile(r"\b(transition|animation)(?:-[a-z-]+)?\s*:\s*(?!var\()[^;]*(?:\d+ms|\d+\.\d+s|\d+s)"),
    ),
    Pattern(
        "Tailwind arbitrary visual utility",
        re.compile(
            r"\b(?:bg|text|border|shadow|rounded|p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|top|right|bottom|left|inset|w|h|min-w|max-w|min-h|max-h|z)-\[[^\]]+\]"
        ),
    ),
)


@dataclass
class Finding:
    path: Path
    line_no: int
    kind: str
    line: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", default=".", help="Project root to scan.")
    parser.add_argument(
        "--changed",
        action="store_true",
        help="Scan git changed and untracked files only.",
    )
    parser.add_argument(
        "--format",
        choices=("text", "markdown"),
        default="text",
        help="Output format.",
    )
    parser.add_argument(
        "--warn-only",
        action="store_true",
        help="Exit 0 even when findings are reported.",
    )
    parser.add_argument(
        "--max-findings",
        type=int,
        default=120,
        help="Maximum findings to print. Defaults to 120.",
    )
    return parser.parse_args()


def run_git(root: Path, args: list[str]) -> list[str]:
    try:
        result = subprocess.run(
            ["git", *args],
            cwd=root,
            check=True,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
        )
    except (OSError, subprocess.CalledProcessError):
        return []
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def is_excluded(path: Path) -> bool:
    return any(part in EXCLUDED_PARTS for part in path.parts)


def is_probable_token_source(path: Path) -> bool:
    lowered = str(path).lower()
    return any(hint in lowered for hint in TOKEN_SOURCE_HINTS)


def has_token_usage(line: str) -> bool:
    return any(hint in line for hint in TOKEN_USAGE_HINTS)


def candidate_files(root: Path, changed: bool) -> list[Path]:
    if changed:
        names = set(run_git(root, ["diff", "--name-only", "--diff-filter=ACMR", "HEAD"]))
        names.update(run_git(root, ["ls-files", "--others", "--exclude-standard"]))
        files = [root / name for name in sorted(names)]
    else:
        roots = [root / item for item in SOURCE_DIRS if (root / item).exists()]
        if not roots:
            roots = [root]
        files = []
        for source_root in roots:
            files.extend(path for path in source_root.rglob("*") if path.is_file())

    return [
        path
        for path in files
        if path.exists()
        and path.is_file()
        and path.suffix in EXTENSIONS
        and not is_excluded(path.relative_to(root) if path.is_relative_to(root) else path)
    ]


def should_skip_line(path: Path, line: str) -> bool:
    stripped = line.strip()
    if not stripped or stripped.startswith(("//", "/*", "*", "<!--")):
        return True
    if stripped.startswith("--") and ":" in stripped:
        return True
    if is_probable_token_source(path):
        return True
    if has_token_usage(line):
        return True
    return False


def scan_file(root: Path, path: Path) -> list[Finding]:
    findings: list[Finding] = []
    try:
        lines = path.read_text(encoding="utf-8").splitlines()
    except UnicodeDecodeError:
        return findings

    rel = path.relative_to(root) if path.is_relative_to(root) else path
    for line_no, line in enumerate(lines, start=1):
        if should_skip_line(rel, line):
            continue
        for pattern in PATTERNS:
            if pattern.regex.search(line):
                findings.append(Finding(rel, line_no, pattern.name, line.strip()))
                break
    return findings


def render(findings: list[Finding], files: list[Path], fmt: str, max_findings: int) -> None:
    if fmt == "markdown":
        print("# Design-System Drift Check")
        print()
        print(f"- Files scanned: {len(files)}")
        print(f"- Findings: {len(findings)}")
        if not findings:
            print("- Result: pass")
            return
        print("- Result: drift candidates found")
        print()
        print("| File | Line | Kind | Evidence |")
        print("| --- | ---: | --- | --- |")
        for finding in findings[:max_findings]:
            evidence = finding.line.replace("|", "\\|")
            print(f"| `{finding.path}` | {finding.line_no} | {finding.kind} | `{evidence}` |")
        if len(findings) > max_findings:
            print()
            print(f"Only first {max_findings} findings shown.")
        return

    print("Design-system drift check")
    print(f"Files scanned: {len(files)}")
    print(f"Findings: {len(findings)}")
    for finding in findings[:max_findings]:
        print(f"{finding.path}:{finding.line_no}: {finding.kind}: {finding.line}")
    if len(findings) > max_findings:
        print(f"Only first {max_findings} findings shown.")


def main() -> int:
    args = parse_args()
    root = Path(args.root).resolve()
    files = candidate_files(root, args.changed)
    findings: list[Finding] = []
    for path in files:
        findings.extend(scan_file(root, path))

    render(findings, files, args.format, args.max_findings)
    if findings and not args.warn_only:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
