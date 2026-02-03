/**
 * Interface for reporting progress during long-running operations.
 * Typically implemented using a spinner or loading indicator.
 *
 * @example
 * ```typescript
 * function doWork(progress: ProgressReporter) {
 *   progress.start("Working...");
 *   // ... do work ...
 *   progress.stop("Done!");
 * }
 * ```
 */
export interface ProgressReporter {
  /**
   * Starts the progress indicator with a message.
   * @param message - The message to display while in progress
   */
  start(message: string): void;

  /**
   * Stops the progress indicator with a completion message.
   * @param message - The message to display when complete
   */
  stop(message: string): void;
}
