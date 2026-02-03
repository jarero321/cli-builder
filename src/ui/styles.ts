import gradient from "gradient-string";
import chalk from "chalk";

/**
 * Default gradient colors used throughout the CLI (cyan -> purple -> pink).
 */
export const DEFAULT_GRADIENT_COLORS = ["#00d4ff", "#7c3aed", "#f472b6"] as const;

/**
 * Type representing a gradient function that can colorize strings.
 */
export type GradientFunction = ReturnType<typeof gradient>;

/**
 * Creates a gradient function with custom colors.
 *
 * @param colors - Array of color hex codes for the gradient
 * @returns A function that applies the gradient to strings
 *
 * @example
 * ```typescript
 * const myGradient = createGradient(["#ff0000", "#00ff00"]);
 * console.log(myGradient("Hello World"));
 * ```
 */
export function createGradient(colors: readonly string[] = DEFAULT_GRADIENT_COLORS): GradientFunction {
  return gradient([...colors]);
}

/**
 * Pre-configured gradient using the default colors.
 * Ready to use without creating a new instance.
 *
 * @example
 * ```typescript
 * console.log(defaultGradient("Styled Text"));
 * ```
 */
export const defaultGradient: GradientFunction = createGradient();

/** Re-export chalk for styling text */
export { chalk };
