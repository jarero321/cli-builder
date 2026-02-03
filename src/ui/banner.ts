import figlet from "figlet";
import chalk from "chalk";
import { createGradient, DEFAULT_GRADIENT_COLORS } from "./styles.ts";

/**
 * Configuration options for the CLI banner.
 */
export interface BannerConfig {
  /** The main title text to display in ASCII art */
  title: string;
  /** Optional subtitle displayed below the banner */
  subtitle?: string;
  /** Whether to clear the screen before showing the banner. Defaults to true */
  clearScreen?: boolean;
  /** The figlet font to use. Defaults to "Small" */
  font?: figlet.Fonts;
  /** Custom gradient colors. Defaults to cyan-purple-pink gradient */
  gradientColors?: readonly string[];
}

/**
 * Displays a stylized ASCII art banner with gradient colors.
 *
 * @param config - Banner configuration options
 *
 * @example
 * ```typescript
 * showBanner({
 *   title: "My CLI",
 *   subtitle: "A powerful command-line tool",
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Without clearing the screen and with custom colors
 * showBanner({
 *   title: "App",
 *   clearScreen: false,
 *   gradientColors: ["#ff0000", "#00ff00", "#0000ff"],
 * });
 * ```
 */
export function showBanner(config: BannerConfig): void {
  const {
    title,
    subtitle,
    clearScreen = true,
    font = "Small",
    gradientColors = DEFAULT_GRADIENT_COLORS,
  } = config;

  if (clearScreen) {
    console.clear();
  }

  const gradient = createGradient(gradientColors);
  const bannerText = figlet.textSync(title, { font });

  console.log(gradient(bannerText));

  if (subtitle) {
    console.log(chalk.dim(`  ${subtitle}\n`));
  }
}
