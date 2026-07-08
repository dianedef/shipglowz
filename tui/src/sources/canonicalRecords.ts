import type { Diagnostic } from "../types/models.ts";

export interface CanonicalOperationalRecord {
  kind: "task" | "audit" | "spec";
  traffic: string;
  project: string;
  title: string;
  fields: Record<string, string>;
  line: number;
  raw: string;
}

export interface DedupEntry {
  type: "canonical" | "legacy";
  source: string;
  line: number;
}

export function canonicalRecordDiagnostics(
  diagnostics: Diagnostic[],
  code: string,
  sourcePath: string,
  line: number,
  message: string
): void {
  diagnostics.push({
    code,
    severity: "warning",
    source: `${sourcePath}:${line}`,
    message
  });
}

export function addDedupDiagnostic(
  diagnostics: Diagnostic[],
  recordKind: string,
  key: string,
  existing: DedupEntry,
  duplicate: DedupEntry
): void {
  diagnostics.push({
    code: `${recordKind.toUpperCase()}_DEDUPE`,
    severity: "warning",
    source: `${duplicate.source}:${duplicate.line}`,
    message: `Duplicate ${recordKind} key "${key}" ignored in favor of ${existing.type} record at ${existing.source}:${existing.line}`
  });
}

export function parseCanonicalRecords(content: string, sourcePath: string, diagnostics: Diagnostic[]): CanonicalOperationalRecord[] {
  const lines = content.split("\n");
  const records: CanonicalOperationalRecord[] = [];
  const hasCanonicalPrefix = (line: string): boolean =>
    line.startsWith("🔴") || line.startsWith("🟠") || line.startsWith("🟡") || line.startsWith("🟢") || line.startsWith("✅");

  for (const [index, rawLine] of lines.entries()) {
    const line = rawLine.trim();
    if (!hasCanonicalPrefix(line)) {
      continue;
    }

    const match = line.match(/^(🔴|🟠|🟡|🟢|✅)\s+\[([^\]]+)\]\s+(.*)$/u);
    if (!match) {
      continue;
    }

    const rawTraffic = match[1] ?? "";
    const project = (match[2] ?? "").trim();
    const summary = (match[3] ?? "").trim();

    const cells = splitCanonicalCells(summary);
    if (cells.length === 0) {
      canonicalRecordDiagnostics(diagnostics, "CANONICAL_RECORD_MALFORMED", sourcePath, index + 1, "Canonical operational line has no fields");
      continue;
    }

    const [firstCell, ...fieldCells] = cells;
    const kindSeparator = (firstCell ?? "").indexOf(": ");
    if (kindSeparator === -1) {
      canonicalRecordDiagnostics(
        diagnostics,
        "CANONICAL_RECORD_MALFORMED",
        sourcePath,
        index + 1,
        "Canonical operational line missing kind/title separator"
      );
      continue;
    }

    const kindToken = firstCell.slice(0, kindSeparator).trim().toLowerCase();
    if (kindToken !== "task" && kindToken !== "audit" && kindToken !== "spec") {
      canonicalRecordDiagnostics(
        diagnostics,
        "CANONICAL_RECORD_KIND_UNKNOWN",
        sourcePath,
        index + 1,
        `Unknown operational kind "${kindToken}"`
      );
      continue;
    }

    const title = unescapeCanonicalField(firstCell.slice(kindSeparator + 2).trim());
    if (!title) {
      canonicalRecordDiagnostics(
        diagnostics,
        "CANONICAL_RECORD_MISSING_FIELD",
        sourcePath,
        index + 1,
        "Canonical operational line missing title"
      );
      continue;
    }

    const fields: Record<string, string> = {};
    for (const fieldCell of fieldCells) {
      const fieldSeparator = fieldCell.indexOf(": ");
      if (fieldSeparator === -1) {
        canonicalRecordDiagnostics(
          diagnostics,
          "CANONICAL_RECORD_MALFORMED",
          sourcePath,
          index + 1,
          `Malformed field "${fieldCell}"`
        );
        continue;
      }

      const key = fieldCell.slice(0, fieldSeparator).trim().toLowerCase();
      const value = unescapeCanonicalField(fieldCell.slice(fieldSeparator + 2).trim());
      if (key) {
        fields[key] = value;
      }
    }

    records.push({
      kind: kindToken,
      traffic: rawTraffic === "✅" ? "🟢" : rawTraffic,
      project,
      title,
      fields,
      line: index + 1,
      raw: line
    });
  }
  return records;
}

export function splitCanonicalCells(value: string): string[] {
  const cells: string[] = [];
  let current = "";

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    if (char === "|" && index > 0 && value[index - 1] === " " && value[index + 1] === " ") {
      const normalized = current.endsWith(" ") ? current.slice(0, -1) : current;
      cells.push(normalized.trim());
      current = "";
      index += 1;
      continue;
    }
    current += char;
  }

  const tail = current.trim();
  if (tail) {
    cells.push(tail);
  }
  return cells;
}

export function unescapeCanonicalField(value: string): string {
  return value.replace(/\\([\\|n\[\]])/g, (_match, escaped: string) => {
    if (escaped === "n") {
      return "\n";
    }
    return escaped;
  });
}

const normalizedFieldValue = (value: string | undefined): string =>
  (value ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "");

export function taskDedupeKey(project: string, id: string | undefined, title: string, area: string | undefined): string {
  const normalizedProject = normalizedFieldValue(project);
  if (id) {
    return `${normalizedProject}|id:${normalizedFieldValue(id)}`;
  }
  return `${normalizedProject}|title:${normalizedFieldValue(title)}${area ? `|area:${normalizedFieldValue(area)}` : ""}`;
}

export function auditDedupeKey(project: string, id: string | undefined, date: string, overall: string, scope: string, title: string): string {
  const normalizedProject = normalizedFieldValue(project);
  if (id) {
    return `${normalizedProject}|id:${normalizedFieldValue(id)}`;
  }
  const scopeOrTitle = scope || title;
  return `${normalizedProject}|${normalizedFieldValue(date)}|${normalizedFieldValue(overall)}|${normalizedFieldValue(scopeOrTitle)}`;
}

export function specDedupeKey(project: string, id: string | undefined, filePath: string | undefined, title: string): string {
  const normalizedProject = normalizedFieldValue(project);
  if (id) {
    return `${normalizedProject}|id:${normalizedFieldValue(id)}`;
  }
  if (filePath) {
    return `${normalizedProject}|path:${normalizedFieldValue(filePath)}`;
  }
  return `${normalizedProject}|title:${normalizedFieldValue(title)}`;
}

export function registerDedupe(
  seen: Map<string, DedupEntry>,
  key: string,
  recordKind: string,
  source: string,
  line: number,
  type: "canonical" | "legacy",
  diagnostics: Diagnostic[]
): boolean {
  const existing = seen.get(key);
  if (!existing) {
    seen.set(key, { type, source, line });
    return true;
  }
  addDedupDiagnostic(diagnostics, recordKind, key, existing, { type, source, line });
  return false;
}
