import { realpath, stat, readFile } from "node:fs/promises";
import path from "node:path";
import type { Diagnostic } from "../types/models.ts";

const DEFAULT_FILE_SIZE_LIMIT = 2 * 1024 * 1024;

export interface SourcePolicyConfig {
  roots: string[];
  fileSizeLimitBytes?: number;
}

export interface SourceReadResult {
  ok: boolean;
  content?: string;
  realPath?: string;
  diagnostic?: Diagnostic;
}

export class SourcePolicy {
  private readonly roots: string[];
  private readonly fileSizeLimitBytes: number;

  constructor(config: SourcePolicyConfig) {
    this.roots = config.roots.map((r) => path.resolve(r));
    this.fileSizeLimitBytes = config.fileSizeLimitBytes ?? DEFAULT_FILE_SIZE_LIMIT;
  }

  redactPath(inputPath: string): string {
    const normalized = inputPath.replace(/\\\\/g, "/");
    const parts = normalized.split("/").filter(Boolean);
    if (parts.length <= 2) {
      return "<redacted-path>";
    }
    return `${parts[0]}/${parts[1]}/.../${parts[parts.length - 1]}`;
  }

  async safeRead(filePath: string): Promise<SourceReadResult> {
    try {
      const requested = path.resolve(filePath);
      const resolved = await realpath(requested);
      if (!this.isAllowed(resolved)) {
        return {
          ok: false,
          diagnostic: {
            code: "SOURCE_NOT_ALLOWLISTED",
            severity: "error",
            source: this.redactPath(filePath),
            message: "Denied source outside allowlisted roots"
          }
        };
      }

      const fileStat = await stat(resolved);
      if (!fileStat.isFile()) {
        return {
          ok: false,
          diagnostic: {
            code: "SOURCE_NOT_FILE",
            severity: "warning",
            source: this.redactPath(filePath),
            message: "Source exists but is not a file"
          }
        };
      }

      if (fileStat.size > this.fileSizeLimitBytes) {
        return {
          ok: false,
          diagnostic: {
            code: "SOURCE_TOO_LARGE",
            severity: "warning",
            source: this.redactPath(filePath),
            message: `Source exceeds size limit (${this.fileSizeLimitBytes} bytes)`
          }
        };
      }

      const content = await readFile(resolved, "utf8");
      return { ok: true, content, realPath: resolved };
    } catch {
      return {
        ok: false,
        diagnostic: {
          code: "SOURCE_UNREADABLE",
          severity: "warning",
          source: this.redactPath(filePath),
          message: "Source missing or unreadable"
        }
      };
    }
  }

  private isAllowed(resolvedPath: string): boolean {
    const normalized = path.resolve(resolvedPath);
    return this.roots.some((root) => {
      const rel = path.relative(root, normalized);
      return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
    });
  }
}
