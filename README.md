<div align="center">

# cli-builder

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white)

[![npm version](https://img.shields.io/npm/v/@cjarero183006/cli-builder?style=flat-square&color=00d4ff)](https://www.npmjs.com/package/@cjarero183006/cli-builder)
[![License](https://img.shields.io/badge/license-MIT-7c3aed?style=flat-square)](LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/jarero321/cli-builder/ci.yml?branch=main&style=flat-square)](https://github.com/jarero321/cli-builder/actions)

**Shared UI components and utilities for building beautiful CLI applications**

[Installation](#installation) · [Usage](#usage) · [API Reference](#api-reference) · [Shared Configs](#shared-configs)

</div>

---

## Overview

`cli-builder` provides a collection of reusable components for building professional CLI applications with consistent styling, progress indicators, and user prompts. Built with TypeScript and designed for ESM projects.

## Features

| Feature | Description |
|---------|-------------|
| **Banner Display** | ASCII art banners with gradient colors using figlet |
| **Progress Reporter** | Spinner-based progress indicators |
| **User Prompts** | Styled success, error, warning, and info messages |
| **Shell Utilities** | Safe command execution with input validation |
| **Error Handling** | Consistent error formatting utilities |
| **Shared Configs** | Base TypeScript and Vitest configurations |

## Installation

```bash
# Using npm
npm install @cjarero183006/cli-builder

# Using bun
bun add @cjarero183006/cli-builder

# Using pnpm
pnpm add @cjarero183006/cli-builder
```

## Usage

### UI Components

```typescript
import {
  showBanner,
  createProgressReporter,
  showSuccess,
  showError,
  showInfo,
  showWarning,
  confirmAction,
} from "@cjarero183006/cli-builder/ui";

// Display a styled banner
showBanner({
  title: "My CLI",
  subtitle: "v1.0.0",
  clearScreen: true,
});

// Progress indicator
const progress = createProgressReporter();
progress.start("Installing dependencies...");
// ... do work
progress.stop("Dependencies installed!");

// User feedback
showSuccess("Operation completed");
showError("Something went wrong");
showInfo("Processing files...");
showWarning("This action cannot be undone");

// Confirmation prompt
const confirmed = await confirmAction("Delete all files?");
```

### Interfaces

```typescript
import type { ProgressReporter, Result } from "@cjarero183006/cli-builder/interfaces";

// ProgressReporter interface
interface ProgressReporter {
  start(message: string): void;
  stop(message: string): void;
}

// Result type for operation outcomes
interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### Utilities

```typescript
import {
  sleep,
  formatError,
  wrapError,
  execSafe,
  gitClone,
  escapeShellArg,
  isValidGitUrl,
} from "@cjarero183006/cli-builder/utils";

// Async delay
await sleep(1000);

// Error formatting
const message = formatError(error, "Default message");
const contextual = wrapError(error, "Failed to connect");

// Safe shell execution
const result = await execSafe("npm install");
if (result.success) {
  console.log(result.stdout);
}

// Git operations with URL validation
if (isValidGitUrl(url)) {
  await gitClone(url, "./destination", { depth: 1 });
}

// Shell argument escaping
const safeArg = escapeShellArg(userInput);
```

## API Reference

### UI Module (`@cjarero183006/cli-builder/ui`)

| Export | Type | Description |
|--------|------|-------------|
| `showBanner(config)` | Function | Display ASCII art banner with gradient |
| `createProgressReporter()` | Function | Create a spinner-based progress reporter |
| `showSuccess(message)` | Function | Display success message with green styling |
| `showError(message)` | Function | Display error message with red styling |
| `showInfo(message)` | Function | Display info message with blue styling |
| `showWarning(message)` | Function | Display warning message with yellow styling |
| `showSeparator()` | Function | Display a visual separator line |
| `showGoodbye(config?)` | Function | Display goodbye message |
| `showNote(title, message)` | Function | Display a note box |
| `confirmAction(message)` | Function | Prompt for yes/no confirmation |
| `createGradient(colors)` | Function | Create custom gradient function |
| `defaultGradient` | GradientFunction | Pre-configured gradient |
| `clack` | Object | Re-export of @clack/prompts |
| `chalk` | Object | Re-export of chalk |

### Interfaces Module (`@cjarero183006/cli-builder/interfaces`)

| Export | Type | Description |
|--------|------|-------------|
| `ProgressReporter` | Interface | Progress indicator contract |
| `Result<T>` | Type | Generic result wrapper |

### Utils Module (`@cjarero183006/cli-builder/utils`)

| Export | Type | Description |
|--------|------|-------------|
| `sleep(ms)` | Function | Async delay utility |
| `formatError(error, default?)` | Function | Extract error message |
| `wrapError(error, context)` | Function | Add context to error |
| `execSafe(command, options?)` | Function | Safe shell command execution |
| `gitClone(url, dest, options?)` | Function | Clone git repository safely |
| `escapeShellArg(arg)` | Function | Escape shell argument |
| `isShellSafe(input)` | Function | Validate shell input |
| `isValidGitUrl(url)` | Function | Validate git URL format |

## Shared Configs

### TypeScript Configuration

Extend the base TypeScript config in your `tsconfig.json`:

```json
{
  "extends": "@cjarero183006/cli-builder/configs/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### Vitest Configuration

Use the base Vitest config in your `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";
import baseConfig from "@cjarero183006/cli-builder/configs/vitest.base.js";

export default defineConfig({
  ...baseConfig,
  // Your overrides here
});
```

## Development

### Setup

```bash
git clone https://github.com/jarero321/cli-builder.git
cd cli-builder
bun install
```

### Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Watch mode for development |
| `bun run build` | Build for production |
| `bunx vitest run` | Run tests |
| `bun run test:coverage` | Run tests with coverage |

### Tech Stack

| Technology | Purpose |
|------------|---------|
| TypeScript | Type-safe development |
| tsup | Build & bundling with ESM output |
| Vitest | Testing framework |
| @clack/prompts | Interactive CLI prompts |
| chalk | Terminal styling |
| figlet | ASCII art text |
| gradient-string | Colorful gradients |

## Used By

- [@cjarero183006/claude-skills](https://www.npmjs.com/package/@cjarero183006/claude-skills) - Claude Code skills manager
- [@cjarero183006/create-clean-app](https://www.npmjs.com/package/@cjarero183006/create-clean-app) - Clean Architecture scaffolder

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Carlos](https://github.com/jarero321)

---

<div align="center">

**[Report Bug](https://github.com/jarero321/cli-builder/issues)** · **[Request Feature](https://github.com/jarero321/cli-builder/issues)**

</div>
