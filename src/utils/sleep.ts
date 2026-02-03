/**
 * Pauses execution for the specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to sleep
 * @returns A promise that resolves after the specified time
 *
 * @example
 * ```typescript
 * await sleep(1000); // Wait 1 second
 * console.log("1 second has passed");
 * ```
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
