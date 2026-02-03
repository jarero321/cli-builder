import { describe, it, expect } from "vitest";
import { isShellSafe, escapeShellArg, isValidGitUrl } from "../../src/utils/shell.ts";

describe("isShellSafe", () => {
  it("should return true for safe strings", () => {
    expect(isShellSafe("my-project")).toBe(true);
    expect(isShellSafe("simple_name")).toBe(true);
    expect(isShellSafe("project123")).toBe(true);
    expect(isShellSafe("/home/user/project")).toBe(true);
  });

  it("should return false for strings with command chaining", () => {
    expect(isShellSafe("foo; rm -rf /")).toBe(false);
    expect(isShellSafe("foo && bar")).toBe(false);
    expect(isShellSafe("foo | bar")).toBe(false);
  });

  it("should return false for command substitution", () => {
    expect(isShellSafe("$(whoami)")).toBe(false);
    expect(isShellSafe("`whoami`")).toBe(false);
    expect(isShellSafe("${PATH}")).toBe(false);
  });

  it("should return false for redirections", () => {
    expect(isShellSafe("foo > /etc/passwd")).toBe(false);
    expect(isShellSafe("foo < input")).toBe(false);
  });

  it("should return false for newlines", () => {
    expect(isShellSafe("foo\nbar")).toBe(false);
    expect(isShellSafe("foo\rbar")).toBe(false);
  });
});

describe("escapeShellArg", () => {
  it("should wrap string in single quotes", () => {
    expect(escapeShellArg("simple")).toBe("'simple'");
  });

  it("should escape single quotes within string", () => {
    expect(escapeShellArg("it's")).toBe("'it'\\''s'");
  });

  it("should handle empty string", () => {
    expect(escapeShellArg("")).toBe("''");
  });

  it("should handle strings with spaces", () => {
    expect(escapeShellArg("hello world")).toBe("'hello world'");
  });
});

describe("isValidGitUrl", () => {
  it("should accept valid HTTPS URLs ending in .git", () => {
    expect(isValidGitUrl("https://github.com/user/repo.git")).toBe(true);
    expect(isValidGitUrl("https://gitlab.com/user/repo.git")).toBe(true);
  });

  it("should accept GitHub URLs without .git extension", () => {
    expect(isValidGitUrl("https://github.com/user/repo")).toBe(true);
  });

  it("should accept GitLab URLs without .git extension", () => {
    expect(isValidGitUrl("https://gitlab.com/user/repo")).toBe(true);
  });

  it("should accept Bitbucket URLs", () => {
    expect(isValidGitUrl("https://bitbucket.org/user/repo")).toBe(true);
  });

  it("should accept SSH URLs", () => {
    expect(isValidGitUrl("git@github.com:user/repo.git")).toBe(true);
  });

  it("should reject invalid URLs", () => {
    expect(isValidGitUrl("not-a-url")).toBe(false);
    expect(isValidGitUrl("ftp://example.com/repo")).toBe(false);
    expect(isValidGitUrl("")).toBe(false);
  });

  it("should reject URLs with suspicious characters", () => {
    expect(isValidGitUrl("https://github.com/user/repo; rm -rf /")).toBe(false);
  });
});
