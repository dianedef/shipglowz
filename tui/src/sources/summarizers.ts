import type { Diagnostic } from "../types/models.ts";
import type { TextSummary, ProjectItem, SpecItem } from "../types/models.ts";
import {
  trafficFromText,
  stripLeadingTraffic,
  trafficFromStatus,
  trafficFromSpecStatus,
  trafficFromAudit,
  isDoneOrDeferred,
  topLines,
  tableCells,
  isTableSeparator,
  parseMarkdownTableRows,
  cellFor,
  cleanInlineMarkdown
} from "../statusMaps.ts";
import {
  parseCanonicalRecords,
  taskDedupeKey,
  auditDedupeKey,
  registerDedupe,
  type DedupEntry
} from "./canonicalRecords.ts";

export interface TaskSource {
  content: string;
  defaultProject?: string;
  sourcePath: string;
  redactedSourcePath: string;
}

export function sectionLines(summary: TextSummary, max = 6): string[] {
  const lines = summary.lines.slice(0, max);
  return lines.length ? [`${summary.label}:`, ...lines] : [`${summary.label}: none`];
}

export function withBlankLinesBetween(items: string[]): string[] {
  return items.flatMap((item, index) => (index === items.length - 1 ? [item] : [item, ""]));
}

export function visibleWindowStart(selectedIndex: number, total: number, max: number): number {
  if (total <= max) {
    return 0;
  }
  return Math.max(0, Math.min(selectedIndex - max + 1, total - max));
}

export function selectableSectionLines(summary: TextSummary, selectedIndex: number, max = 6): string[] {
  const start = visibleWindowStart(selectedIndex, summary.lines.length, max);
  const lines = summary.lines.slice(start, start + max);
  if (!lines.length) {
    return [`${summary.label}: none`];
  }

  return [
    `${summary.label}:`,
    ...withBlankLinesBetween(lines.map((line, index) => {
      const actualIndex = start + index;
      const marker = actualIndex === selectedIndex ? ">" : " ";
      const trafficMatch = line.match(/^((?:🔴|🟠|🟢|🟡)\s+)(.*)$/);
      if (trafficMatch) {
        return `${trafficMatch[1]}${marker} ${trafficMatch[2]}`;
      }
      return `${marker} ${line}`;
    }))
  ];
}

export function filteredSummaryLines(summary: TextSummary, projectFilter: string, selectedProject: ProjectItem | undefined): string[] {
  const filter = projectFilter.trim().toLowerCase();
  if (!filter) {
    return summary.lines;
  }

  const projectName = selectedProject?.name.toLowerCase().trim();
  const terms = [filter, projectName].filter((term): term is string => Boolean(term));
  return summary.lines.filter((line) => {
    const normalized = line.toLowerCase();
    return terms.some((term) => normalized.includes(term));
  });
}

const PROJECT_VISIBLE_COUNT = 12;
const SPEC_VISIBLE_COUNT = 8;
const TASK_VISIBLE_COUNT = 10;
const AUDIT_VISIBLE_COUNT = 12;
const PROJECT_GRID_COLUMNS = 3;
const PROJECT_GRID_COLUMN_WIDTH = 16;

export function listProjectLines(projects: ProjectItem[], selectedIndex: number): string[] {
  if (!projects.length) {
    return ["No projects match the current filter."];
  }

  const start = Math.floor(selectedIndex / PROJECT_VISIBLE_COUNT) * PROJECT_VISIBLE_COUNT;
  const visibleProjects = projects.slice(start, start + PROJECT_VISIBLE_COUNT);
  const lines: string[] = [];
  for (let row = 0; row < Math.ceil(visibleProjects.length / PROJECT_GRID_COLUMNS); row += 1) {
    const cells: string[] = [];
    for (let column = 0; column < PROJECT_GRID_COLUMNS; column += 1) {
      const visibleIndex = row * PROJECT_GRID_COLUMNS + column;
      const index = start + visibleIndex;
      const project = visibleProjects[visibleIndex];
      if (!project) {
        continue;
      }
      const marker = index === selectedIndex ? ">" : " ";
      const rawCell = `${marker} ${project.name}`;
      const cell = rawCell.length > PROJECT_GRID_COLUMN_WIDTH
        ? `${rawCell.slice(0, PROJECT_GRID_COLUMN_WIDTH - 3)}...`
        : rawCell;
      cells.push(cell.padEnd(PROJECT_GRID_COLUMN_WIDTH, " "));
    }
    lines.push(cells.join(" ").trimEnd());
    if (row < Math.ceil(visibleProjects.length / PROJECT_GRID_COLUMNS) - 1) {
      lines.push("");
    }
  }
  return lines;
}

export function listSpecLines(specs: SpecItem[], selectedIndex: number): string[] {
  if (!specs.length) {
    return ["No specs match the current filter."];
  }
  const start = visibleWindowStart(selectedIndex, specs.length, SPEC_VISIBLE_COUNT);
  return withBlankLinesBetween(specs.slice(start, start + SPEC_VISIBLE_COUNT).map((spec, index) => {
    const actualIndex = start + index;
    const marker = actualIndex === selectedIndex ? ">" : " ";
    const project = spec.project ? `[${spec.project}] ` : "";
    return `${trafficFromSpecStatus(spec.status)} ${marker} ${project}[${spec.status}] ${spec.title}`;
  }));
}

export function buildDetailLines(selectedProject: ProjectItem | undefined, selectedSpec: SpecItem | undefined): string[] {
  const lines: string[] = [];

  if (selectedProject) {
    lines.push("Selected project", `Name: ${selectedProject.name}`);
    lines.push("");
  }

  if (selectedSpec) {
    lines.push(
      "Selected chantier/spec",
      `Title: ${selectedSpec.title}`,
      `Status: ${selectedSpec.status}`,
      `User story: ${selectedSpec.userStory}`,
      `Next step: ${selectedSpec.nextStep}`,
      `Path: ${selectedSpec.path}`,
      "Run history:"
    );
    lines.push(...(selectedSpec.runHistorySummary.length ? selectedSpec.runHistorySummary.map((line) => `  ${line}`) : ["  none"]));
    lines.push("Current chantier flow:");
    lines.push(...(selectedSpec.chantierFlowSummary.length ? selectedSpec.chantierFlowSummary.map((line) => `  ${line}`) : ["  none"]));
    return lines;
  }

  lines.push("No spec details available.");
  return lines;
}

export function activeTaskContent(content: string): string {
  return content.split(/\n# Legacy Tasks\b/)[0] ?? content;
}

export function projectFromTaskContext(context: string | undefined, defaultProject: string | undefined): string | undefined {
  const normalized = context?.trim();
  if (!normalized) {
    return defaultProject;
  }

  const genericSections = new Set([
    "audit",
    "audits",
    "backlog",
    "current active backlog",
    "dashboard",
    "done",
    "tasks"
  ]);
  return genericSections.has(normalized.toLowerCase()) ? defaultProject : normalized;
}

export function summarizeTasks(sources: TaskSource[], diagnostics: Diagnostic[], max = 12): TextSummary {
  const seen = new Map<string, DedupEntry>();
  const openLines: string[] = [];
  const completedLines: string[] = [];

  const collectCanonicalTasks = (source: TaskSource) => {
    const canonicalRecords = parseCanonicalRecords(source.content, source.sourcePath, diagnostics).filter((record) => record.kind === "task");
    for (const record of canonicalRecords) {
      const status = record.fields.status?.trim();
      if (!status) {
        diagnostics.push({
          code: "TASK_RECORD_MISSING_FIELD",
          severity: "warning",
          source: source.redactedSourcePath,
          message: `Canonical task missing required status field for "${record.title}"`
        });
        continue;
      }

      const project = record.project?.trim() ?? source.defaultProject ?? "";
      const key = taskDedupeKey(project, record.fields.id, record.title, record.fields.area);
      if (!registerDedupe(seen, key, "task", source.redactedSourcePath, record.line, "canonical", diagnostics)) {
        continue;
      }

      const traffic = record.traffic;
      const projectPrefix = project ? `[${project}] ` : "";
      const line = cleanInlineMarkdown(`${traffic} ${projectPrefix}${stripLeadingTraffic(record.title)} — ${status}`);
      const isOpen = !isDoneOrDeferred(status);
      if (isOpen) {
        openLines.push(line);
      } else {
        completedLines.push(line);
      }
    }
  };

  const collectLegacyTasks = (source: TaskSource) => {
    const taskRows = parseMarkdownTableRows(activeTaskContent(source.content)).map((row) => ({ row, source }));
    for (const { row } of taskRows) {
      const task = cellFor(row, ["task", "top priority"]);
      const status = cellFor(row, ["status"]);
      if (!task || !status) {
        continue;
      }

      const project = cellFor(row, ["project"]) ?? projectFromTaskContext(row.context, source.defaultProject);
      const rowArea = row.context ?? undefined;
      const key = taskDedupeKey(project ?? "", undefined, task, rowArea);
      if (!registerDedupe(seen, key, "task", source.redactedSourcePath, row.lineNumber, "legacy", diagnostics)) {
        continue;
      }

      const priority = cellFor(row, ["pri"]);
      const traffic = trafficFromText(priority) ?? trafficFromText(task) ?? trafficFromStatus(status) ?? "🟡";
      const projectPrefix = project ? `[${project}] ` : "";
      const line = cleanInlineMarkdown(`${traffic} ${projectPrefix}${stripLeadingTraffic(task)} — ${status}`);
      const isOpen = !isDoneOrDeferred(status);
      if (isOpen) {
        openLines.push(line);
      } else {
        completedLines.push(line);
      }
    }
  };

  for (const source of sources) {
    collectCanonicalTasks(source);
  }
  for (const source of sources) {
    collectLegacyTasks(source);
  }

  const lines = [...openLines, ...completedLines].slice(0, max);
  return lines.length ? { label: "Tasks", lines } : topLines("Tasks", sources.map((source) => source.content).join("\n"), max);
}

export function summarizeAudits(sources: TaskSource[], diagnostics: Diagnostic[], max = 12): TextSummary {
  const seen = new Map<string, DedupEntry>();
  const lines: string[] = [];

  const collectCanonicalAudits = (source: TaskSource) => {
    const canonicalRecords = parseCanonicalRecords(source.content, source.sourcePath, diagnostics).filter((record) => record.kind === "audit");
    for (const record of canonicalRecords) {
      const date = record.fields.date?.trim() ?? "";
      const overall = record.fields.overall?.trim() ?? "";
      const issues = record.fields.issues?.trim() ?? "";
      const scope = record.fields.scope?.trim() ?? "";
      if (!date || !overall || !issues) {
        diagnostics.push({
          code: "AUDIT_RECORD_MISSING_FIELD",
          severity: "warning",
          source: source.redactedSourcePath,
          message: `Canonical audit missing required fields for "${record.title}"`
        });
        continue;
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        diagnostics.push({
          code: "AUDIT_RECORD_BAD_DATE",
          severity: "warning",
          source: source.redactedSourcePath,
          message: `Invalid audit date "${date}" for "${record.title}"`
        });
        continue;
      }

      const project = record.project?.trim() ?? source.defaultProject ?? "";
      const key = auditDedupeKey(project, record.fields.id, date, overall, scope, record.title);
      if (!registerDedupe(seen, key, "audit", source.redactedSourcePath, record.line, "canonical", diagnostics)) {
        continue;
      }

      const traffic = record.traffic;
      const projectPrefix = project ? `[${project}] ` : "";
      const titleOrScope = scope || record.title;
      const detail = [date, titleOrScope, [overall, issues].filter(Boolean).join(" — ")].filter(Boolean).join(" — ");
      lines.push(cleanInlineMarkdown(`${traffic} ${projectPrefix}${detail}`));
    }
  };

  const collectLegacyAudits = (source: TaskSource) => {
    const auditRows = parseMarkdownTableRows(source.content)
      .filter((row) => cellFor(row, ["date", "date utc"]))
      .reverse()
      .map((row) => ({ row, source }));
    for (const { row } of auditRows) {
      const date = cellFor(row, ["date", "date utc"]) ?? "";
      const project = cellFor(row, ["project"]) ?? source.defaultProject;
      const scope = cellFor(row, ["scope"]) ?? "";
      const overall = cellFor(row, ["overall"]) ?? "";
      const issues = cellFor(row, ["issues"]) ?? "";
      if (!date || !overall || !issues) {
        continue;
      }

      const key = auditDedupeKey(project ?? "", undefined, date, overall, scope, row.context ?? "");
      if (!registerDedupe(seen, key, "audit", source.redactedSourcePath, row.lineNumber, "legacy", diagnostics)) {
        continue;
      }

      const traffic = trafficFromAudit(overall, issues);
      const projectPrefix = project ? `[${project}] ` : "";
      const detail = [date, scope, `${overall} — ${issues}`].filter(Boolean).join(" — ");
      lines.push(cleanInlineMarkdown(`${traffic} ${projectPrefix}${detail}`));
    }
  };

  for (const source of sources) {
    collectCanonicalAudits(source);
  }
  for (const source of sources) {
    collectLegacyAudits(source);
  }

  return lines.length ? { label: "Audits", lines: lines.slice(0, max) } : topLines("Audits", sources.map((source) => source.content).join("\n"), max);
}
