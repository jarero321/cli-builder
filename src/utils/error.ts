/**
 * Formats an unknown error into a user-friendly string message.
 * Safely extracts the message from Error instances or returns a default message.
 *
 * @param error - The error to format (can be any type)
 * @param defaultMessage - Default message if error is not an Error instance
 * @returns A string representation of the error
 *
 * @example
 * ```typescript
 * try {
 *   await someOperation();
 * } catch (error) {
 *   console.error(formatError(error));
 * }
 * ```
 */
export function formatError(error: unknown, defaultMessage = "Unknown error"): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return defaultMessage;
}

/**
 * Wraps an error with additional context.
 *
 * @param error - The original error
 * @param context - Additional context to prepend
 * @returns Formatted error message with context
 *
 * @example
 * ```typescript
 * catch (error) {
 *   return { success: false, error: wrapError(error, "Failed to install") };
 * }
 * ```
 */
export function wrapError(error: unknown, context: string): string {
  return `${context}: ${formatError(error)}`;
}
