import * as p from "@clack/prompts";
import type { ProgressReporter } from "../interfaces/index.ts";

/**
 * Creates a progress reporter for displaying loading spinners.
 * Uses clack's spinner component under the hood.
 *
 * @returns A ProgressReporter instance with start and stop methods
 *
 * @example
 * ```typescript
 * const progress = createProgressReporter();
 *
 * progress.start("Installing dependencies...");
 * await installDeps();
 * progress.stop("Dependencies installed");
 * ```
 */
export function createProgressReporter(): ProgressReporter {
  const spinner = p.spinner();
  return {
    start: (message: string) => spinner.start(message),
    stop: (message: string) => spinner.stop(message),
  };
}
