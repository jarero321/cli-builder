import * as p from "@clack/prompts";
import chalk from "chalk";
import { createGradient, DEFAULT_GRADIENT_COLORS } from "./styles.ts";

/**
 * Displays a success message with green styling.
 * Typically used at the end of a successful operation.
 *
 * @param message - The success message to display
 *
 * @example
 * ```typescript
 * showSuccess("Project created successfully!");
 * ```
 */
export function showSuccess(message: string): void {
  p.outro(chalk.green(message));
}

/**
 * Displays an error message with appropriate error styling.
 *
 * @param message - The error message to display
 *
 * @example
 * ```typescript
 * showError("Failed to install dependencies");
 * ```
 */
export function showError(message: string): void {
  p.log.error(message);
}

/**
 * Displays an informational message.
 *
 * @param message - The info message to display
 *
 * @example
 * ```typescript
 * showInfo("Found 5 installed packages");
 * ```
 */
export function showInfo(message: string): void {
  p.log.info(message);
}

/**
 * Displays a warning message with appropriate warning styling.
 *
 * @param message - The warning message to display
 *
 * @example
 * ```typescript
 * showWarning("This action cannot be undone");
 * ```
 */
export function showWarning(message: string): void {
  p.log.warn(message);
}

/**
 * Displays a horizontal separator line.
 *
 * @param width - The width of the separator in characters. Defaults to 50
 *
 * @example
 * ```typescript
 * showSeparator();
 * // or with custom width
 * showSeparator(80);
 * ```
 */
export function showSeparator(width = 50): void {
  console.log();
  console.log(chalk.dim("─".repeat(width)));
  console.log();
}

/**
 * Configuration options for the goodbye message.
 */
export interface GoodbyeConfig {
  /** Custom goodbye message. Defaults to "Thanks for using our CLI!" */
  message?: string;
  /** Custom gradient colors for the message */
  gradientColors?: readonly string[];
}

/**
 * Displays a styled goodbye message with gradient colors.
 * Typically used when exiting the CLI.
 *
 * @param config - Optional configuration for the goodbye message
 *
 * @example
 * ```typescript
 * showGoodbye();
 * // or with custom message
 * showGoodbye({ message: "Thanks for using MyApp!" });
 * ```
 */
export function showGoodbye(config: GoodbyeConfig = {}): void {
  const {
    message = "Thanks for using our CLI!",
    gradientColors = DEFAULT_GRADIENT_COLORS,
  } = config;

  const gradient = createGradient(gradientColors);
  console.log();
  p.outro(gradient(`✨ ${message}`));
}

/**
 * Prompts the user for confirmation with a yes/no question.
 *
 * @param message - The confirmation question to ask
 * @returns true if confirmed, false if cancelled or declined
 *
 * @example
 * ```typescript
 * const confirmed = await confirmAction("Are you sure you want to delete?");
 * if (confirmed) {
 *   // proceed with deletion
 * }
 * ```
 */
export async function confirmAction(message: string): Promise<boolean> {
  const result = await p.confirm({
    message,
  });

  if (p.isCancel(result)) {
    return false;
  }

  return result;
}

/**
 * Displays a note box with optional title.
 *
 * @param message - The note content
 * @param title - Optional title for the note box
 *
 * @example
 * ```typescript
 * showNote("cd my-project\nnpm start", "Next steps");
 * ```
 */
export function showNote(message: string, title?: string): void {
  p.note(message, title);
}

/** Re-export of clack prompts for direct access */
export { p as clack, chalk };
