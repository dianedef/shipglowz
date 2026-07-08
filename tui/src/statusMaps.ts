export function trafficFromSpecStatus(status: string): string {
  const normalized = status.toLowerCase();
  if (normalized.includes("blocked") || normalized.includes("failed") || normalized.includes("error")) {
    return "🔴";
  }
  if (normalized.includes("draft") || normalized.includes("partial") || normalized.includes("needs")) {
    return "🟠";
  }
  if (normalized.includes("ready") || normalized.includes("active") || normalized.includes("verified") || normalized.includes("reviewed") || normalized.includes("done")) {
    return "🟢";
  }
  return "🟡";
}

export function trafficFromStatus(status: string): string {
  const normalized = status.toLowerCase();
  if (normalized.includes("blocked") || normalized.includes("failed") || normalized.includes("error") || normalized.includes("🔴")) {
    return "🔴";
  }
  if (normalized.includes("in progress") || normalized.includes("partial") || normalized.includes("active") || normalized.includes("🟠")) {
    return "🟠";
  }
  if (normalized.includes("todo") || normalized.includes("draft") || normalized.includes("pending") || normalized.includes("🟡")) {
    return "🟡";
  }
  if (normalized.includes("done") || normalized.includes("ready") || normalized.includes("verified") || normalized.includes("deferred") || normalized.includes("✅") || normalized.includes("💤") || normalized.includes("🟢")) {
    return "🟢";
  }
  return "🟡";
}

export function trafficFromAudit(overall: string | undefined, issues: string | undefined): string {
  const normalizedOverall = (overall ?? "").trim().toUpperCase();
  const grade = [...normalizedOverall.matchAll(/[A-F]/g)].at(-1)?.[0];
  if (grade === "A" || grade === "B") {
    return "🟢";
  }
  if (grade === "C") {
    return "🟠";
  }
  if (grade === "D" || grade === "F") {
    return "🔴";
  }
  const counts = (issues ?? "")
    .match(/\d+/g)
    ?.slice(0, 3)
    .map((count) => Number.parseInt(count, 10)) ?? [];
  if ((counts[0] ?? 0) > 0) {
    return "🔴";
  }
  if ((counts[1] ?? 0) > 0) {
    return "🟠";
  }
  if ((counts[2] ?? 0) > 0) {
    return "🟡";
  }
  return "🟢";
}

export function trafficFromText(value: string | undefined): string | undefined {
  return value?.match(/(?:^|\s)(🔴|🟠|🟡|🟢|✅)(?:\s|$)/u)?.[1]?.replace("✅", "🟢");
}

export function stripLeadingTraffic(value: string): string {
  return value.replace(/^(?:🔴|🟠|🟡|🟢|✅)\s*/u, "").trim();
}

export function isDoneOrDeferred(status: string): boolean {
  const normalized = status.toLowerCase();
  return normalized.includes("done") || normalized.includes("deferred") || normalized.includes("✅") || normalized.includes("💤");
}

export function trafficPriority(traffic: string): number {
  switch (traffic) {
    case "🔴": return 0;
    case "🟠": return 1;
    case "🟡": return 2;
    case "🟢": return 3;
    default: return 4;
  }
}

export type StatusColor = "red" | "yellow" | "green" | "white";

export function statusColor(line: string): StatusColor {
  const lower = line.toLowerCase();
  if (lower.includes("blocked") || lower.includes("not verified") || lower.includes("[error]")) {
    return "red";
  }
  if (lower.includes("pending") || lower.includes("partial") || lower.includes("draft") || lower.includes("[warning]")) {
    return "yellow";
  }
  if (lower.includes("ready") || lower.includes("verified") || lower.includes("done") || lower.includes("[ready]")) {
    return "green";
  }
  return "white";
}

export interface MarkdownTableRow {
  headers: string[];
  cells: string[];
  context?: string;
  lineNumber: number;
}

export function topLines(label: string, content: string, max = 12): { label: string; lines: string[] } {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, max);
  return { label, lines };
}

export function tableCells(line: string): string[] {
  return line
    .trim()
    .split("|")
    .map((cell) => cell.trim())
    .filter(Boolean);
}

export function isTableSeparator(cells: string[]): boolean {
  return Boolean(cells.length) && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

export function parseMarkdownTableRows(content: string): MarkdownTableRow[] {
  const lines = content.split("\n");
  const rows: MarkdownTableRow[] = [];
  let headers: string[] | undefined;
  let context: string | undefined;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]?.trim() ?? "";
    const sectionMatch = line.match(/^#{2,6}\s+(.+)$/);
    if (sectionMatch) {
      context = cleanInlineMarkdown(sectionMatch[1] ?? "");
      headers = undefined;
      continue;
    }
    if (line.startsWith("# ")) {
      context = undefined;
      headers = undefined;
      continue;
    }
    if (!line.startsWith("|")) {
      headers = undefined;
      continue;
    }

    const cells = tableCells(line);
    const nextCells = tableCells(lines[index + 1] ?? "");
    if (isTableSeparator(nextCells)) {
      headers = cells.map((cell) => cell.toLowerCase());
      index += 1;
      continue;
    }

    if (!headers || isTableSeparator(cells)) {
      continue;
    }

    rows.push({ headers, cells, context, lineNumber: index + 1 });
  }

  return rows;
}

export function cellFor(row: MarkdownTableRow, names: string[]): string | undefined {
  const index = row.headers.findIndex((header) => names.includes(header));
  return index === -1 ? undefined : row.cells[index];
}

export function cleanInlineMarkdown(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
