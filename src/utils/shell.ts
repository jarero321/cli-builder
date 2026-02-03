import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface ExecResult {
  stdout: string;
  stderr: string;
}

export interface ExecOptions {
  cwd?: string;
  timeout?: number;
  maxBuffer?: number;
}

/**
 * Validates that a string is safe to use in shell commands.
 * Checks for common shell injection patterns.
 *
 * @param input - The string to validate
 * @returns true if the input appears safe
 */
export function isShellSafe(input: string): boolean {
  const dangerousPatterns = [
    /[;&|`$]/, // Command chaining and substitution
    /\$\(/, // Command substitution
    /\$\{/, // Variable expansion
    /[<>]/, // Redirections
    /\\.{2,}/, // Path traversal
    /\n|\r/, // Newlines
  ];

  return !dangerousPatterns.some((pattern) => pattern.test(input));
}

/**
 * Escapes a string for safe use in shell commands.
 *
 * @param input - The string to escape
 * @returns Escaped string safe for shell use
 */
export function escapeShellArg(input: string): string {
  return `'${input.replace(/'/g, "'\\''")}'`;
}

/**
 * Executes a shell command safely with proper error handling.
 *
 * @param command - The command to execute
 * @param options - Execution options
 * @returns Promise with stdout and stderr
 * @throws Error with descriptive message if command fails
 *
 * @example
 * ```typescript
 * const { stdout } = await execSafe("git status", { cwd: projectPath });
 * ```
 */
export async function execSafe(command: string, options: ExecOptions = {}): Promise<ExecResult> {
  const { cwd, timeout = 120000, maxBuffer = 10 * 1024 * 1024 } = options;

  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd,
      timeout,
      maxBuffer,
    });

    return { stdout, stderr };
  } catch (error) {
    if (error instanceof Error) {
      const execError = error as Error & { code?: number; stderr?: string };
      const stderr = execError.stderr || "";
      const code = execError.code || 1;

      throw new Error(`Command failed with code ${code}: ${error.message}${stderr ? `\n${stderr}` : ""}`);
    }
    throw error;
  }
}

/**
 * Executes a git clone command safely.
 *
 * @param repoUrl - The repository URL to clone
 * @param destPath - The destination path
 * @param options - Additional options
 * @returns Promise that resolves when clone completes
 * @throws Error if URL validation fails or clone fails
 */
export async function gitClone(
  repoUrl: string,
  destPath: string,
  options: { depth?: number; cwd?: string } = {}
): Promise<void> {
  if (!isValidGitUrl(repoUrl)) {
    throw new Error(`Invalid git URL: ${repoUrl}`);
  }

  if (!isShellSafe(destPath)) {
    throw new Error(`Invalid destination path: ${destPath}`);
  }

  const { depth = 1, cwd } = options;
  const depthArg = depth > 0 ? `--depth ${depth}` : "";

  await execSafe(`git clone ${depthArg} ${escapeShellArg(repoUrl)} ${escapeShellArg(destPath)}`, { cwd });
}

/**
 * Validates that a string is a valid git URL.
 *
 * @param url - The URL to validate
 * @returns true if valid git URL
 */
export function isValidGitUrl(url: string): boolean {
  const gitUrlPatterns = [
    /^https?:\/\/[^\s]+\.git$/,
    /^https?:\/\/github\.com\/[^\s]+$/,
    /^https?:\/\/gitlab\.com\/[^\s]+$/,
    /^https?:\/\/bitbucket\.org\/[^\s]+$/,
    /^git@[^\s]+:[^\s]+\.git$/,
  ];

  return gitUrlPatterns.some((pattern) => pattern.test(url));
}
