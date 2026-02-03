/**
 * Generic result type for operations that can succeed or fail.
 * Follows the Result pattern for explicit error handling.
 *
 * @template T - The type of data returned on success
 *
 * @example
 * ```typescript
 * async function installPackage(name: string): Promise<Result<Package>> {
 *   try {
 *     const pkg = await doInstall(name);
 *     return { success: true, data: pkg };
 *   } catch (error) {
 *     return { success: false, error: formatError(error) };
 *   }
 * }
 *
 * const result = await installPackage("my-pkg");
 * if (result.success) {
 *   console.log("Installed:", result.data);
 * } else {
 *   console.error("Failed:", result.error);
 * }
 * ```
 */
export interface Result<T> {
  /** Whether the operation succeeded */
  success: boolean;
  /** The result data (only present when success is true) */
  data?: T;
  /** Error message (only present when success is false) */
  error?: string;
}
