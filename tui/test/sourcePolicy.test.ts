import { describe, expect, it } from "bun:test";
import { mkdir, mkdtemp, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { SourcePolicy } from "../src/sources/sourcePolicy.ts";

describe("SourcePolicy", () => {
  it("allows reading file in allowlisted root", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "sg-tui-"));
    const file = path.join(root, "a.md");
    await writeFile(file, "ok", "utf8");

    const policy = new SourcePolicy({ roots: [root] });
    const result = await policy.safeRead(file);

    expect(result.ok).toBe(true);
    expect(result.content).toBe("ok");
  });

  it("denies file outside allowlisted roots", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "sg-tui-"));
    const other = await mkdtemp(path.join(tmpdir(), "sg-tui-other-"));
    const file = path.join(other, "b.md");
    await writeFile(file, "x", "utf8");

    const policy = new SourcePolicy({ roots: [root] });
    const result = await policy.safeRead(file);

    expect(result.ok).toBe(false);
    expect(result.diagnostic?.code).toBe("SOURCE_NOT_ALLOWLISTED");
  });

  it("denies symlink escapes", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "sg-tui-"));
    const outside = await mkdtemp(path.join(tmpdir(), "sg-tui-out-"));
    const target = path.join(outside, "secret.md");
    const linkDir = path.join(root, "links");
    const linkPath = path.join(linkDir, "secret.md");

    await writeFile(target, "secret", "utf8");
    await mkdir(linkDir, { recursive: true });
    await symlink(target, linkPath);

    const policy = new SourcePolicy({ roots: [root] });
    const result = await policy.safeRead(linkPath);

    expect(result.ok).toBe(false);
    expect(result.diagnostic?.code).toBe("SOURCE_NOT_ALLOWLISTED");
  });

  it("returns too large diagnostic", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "sg-tui-"));
    const file = path.join(root, "big.md");
    await writeFile(file, "0123456789", "utf8");

    const policy = new SourcePolicy({ roots: [root], fileSizeLimitBytes: 4 });
    const result = await policy.safeRead(file);

    expect(result.ok).toBe(false);
    expect(result.diagnostic?.code).toBe("SOURCE_TOO_LARGE");
  });
});
