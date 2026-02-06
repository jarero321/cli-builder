<div align="center">

```
      _ _       _           _ _     _
  ___| (_)     | |__  _   _(_) | __| | ___ _ __
 / __| | |_____| '_ \| | | | | |/ _` |/ _ \ '__|
| (__| | |_____| |_) | |_| | | | (_| |  __/ |
 \___|_|_|     |_.__/ \__,_|_|_|\__,_|\___|_|
```

### I kept rewriting the same CLI boilerplate. So I extracted it into a package.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white)

[![npm version](https://img.shields.io/npm/v/@cjarero183006/cli-builder?style=flat-square&color=00d4ff)](https://www.npmjs.com/package/@cjarero183006/cli-builder)
[![npm downloads](https://img.shields.io/npm/dm/@cjarero183006/cli-builder?style=flat-square&color=7c3aed)](https://www.npmjs.com/package/@cjarero183006/cli-builder)
[![License](https://img.shields.io/badge/license-MIT-brightgreen?style=flat-square)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-34%20passed-brightgreen?style=flat-square)](package.json)

**Shared UI components and utilities for building beautiful CLIs**

[Quick Start](#quick-start) · [API Reference](#api-reference) · [Shared Configs](#shared-configs) · [Used By](#used-by)

</div>

---

## Why I Built This

Every CLI I built needed the same things: a banner, a spinner, colored messages, safe shell execution. I was copy-pasting between `claude-skills` and `create-clean-app`.

Now both import from one place. One fix, every CLI gets it.

---

## Quick Start

```bash
npm install @cjarero183006/cli-builder
```

```typescript
import { showBanner, createProgressReporter, showSuccess } from "@cjarero183006/cli-builder/ui";

showBanner({ title: "My CLI", subtitle: "v1.0.0" });

const progress = createProgressReporter();
progress.start("Installing dependencies...");
// ... do work
progress.stop("Dependencies installed!");

showSuccess("Done!");
```

---

## API Reference

### UI (`@cjarero183006/cli-builder/ui`)

| Export | Description |
|--------|-------------|
| `showBanner(config)` | ASCII art banner with gradient colors |
| `createProgressReporter()` | Spinner-based progress indicator |
| `showSuccess(message)` | Green success message |
| `showError(message)` | Red error message |
| `showInfo(message)` | Blue info message |
| `showWarning(message)` | Yellow warning message |
| `showSeparator()` | Visual separator line |
| `showNote(title, message)` | Note box |
| `showGoodbye(config?)` | Goodbye message |
| `confirmAction(message)` | Yes/no confirmation prompt |
| `createGradient(colors)` | Custom gradient function |
| `defaultGradient` | Pre-configured gradient |
| `clack` | Re-export of @clack/prompts |
| `chalk` | Re-export of chalk |

### Interfaces (`@cjarero183006/cli-builder/interfaces`)

| Export | Description |
|--------|-------------|
| `ProgressReporter` | `{ start(msg): void, stop(msg): void }` |
| `Result<T>` | `{ success: boolean, data?: T, error?: string }` |

### Utils (`@cjarero183006/cli-builder/utils`)

| Export | Description |
|--------|-------------|
| `sleep(ms)` | Async delay |
| `formatError(error, default?)` | Extract error message |
| `wrapError(error, context)` | Add context to error |
| `execSafe(command, options?)` | Safe shell execution |
| `gitClone(url, dest, options?)` | Clone repo safely |
| `escapeShellArg(arg)` | Escape shell argument |
| `isShellSafe(input)` | Validate shell input |
| `isValidGitUrl(url)` | Validate git URL format |

---

## Shared Configs

### TypeScript

```json
{
  "extends": "@cjarero183006/cli-builder/configs/tsconfig.base.json",
  "compilerOptions": { "outDir": "dist" },
  "include": ["src"]
}
```

### Vitest

```typescript
import { defineConfig } from "vitest/config";
import baseConfig from "@cjarero183006/cli-builder/configs/vitest.base.js";

export default defineConfig({ ...baseConfig });
```

---

## Used By

| Package | What it does |
|---------|--------------|
| [@cjarero183006/claude-skills](https://www.npmjs.com/package/@cjarero183006/claude-skills) | Claude Code skills manager |
| [@cjarero183006/create-clean-app](https://www.npmjs.com/package/@cjarero183006/create-clean-app) | Clean Architecture scaffolder |

---

## Architecture

```
src/
├── ui/               # Banner, progress, prompts, styles
├── interfaces/       # ProgressReporter, Result<T>
├── utils/            # Shell, error, sleep
└── index.ts          # Main entry
```

| Aspect | Choice |
|--------|--------|
| Architecture | Modular with subpath exports |
| Testing | Vitest (34 passing) |
| Build | tsup (ESM) |
| Dependencies | @clack/prompts, chalk, figlet, gradient-string |

---

## Development

```bash
git clone https://github.com/jarero321/cli-builder.git
cd cli-builder
bun install
bun run dev
```

| Script | What it does |
|--------|--------------|
| `bun run dev` | Watch mode |
| `bun run build` | Production build |
| `bun run test:run` | Single run |
| `bun run test:coverage` | Coverage report |

---

## License

MIT

---

<div align="center">

**[Report Bug](https://github.com/jarero321/cli-builder/issues)** · **[Request Feature](https://github.com/jarero321/cli-builder/issues)**

</div>
