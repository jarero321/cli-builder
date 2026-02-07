<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,5,30&height=180&section=header&text=cli-builder&fontSize=36&fontColor=fff&animation=fadeIn&fontAlignY=32" />

<div align="center">

![Build](https://img.shields.io/github/actions/workflow/status/jarero321/cli-builder/ci.yml?branch=main&style=for-the-badge)
![npm](https://img.shields.io/npm/v/@cjarero183006/cli-builder?style=for-the-badge)
![Downloads](https://img.shields.io/npm/dm/@cjarero183006/cli-builder?style=for-the-badge&color=7c3aed)
![License](https://img.shields.io/github/license/jarero321/cli-builder?style=for-the-badge)

**Shared UI components and utilities for building beautiful CLI applications.**

[Quick Start](#quick-start) •
[API Reference](#api-reference) •
[Shared Configs](#shared-configs) •
[Used By](#used-by) •
[Contributing](#contributing)

</div>

---

## Features

| Feature | Description |
|:--------|:------------|
| **ASCII Banners** | Gradient-colored ASCII art banners with figlet |
| **Progress Reporters** | Spinner-based progress indicators via @clack/prompts |
| **Styled Messages** | Success, error, info, warning, and goodbye messages |
| **Safe Shell Execution** | Injection-validated `execSafe` and `gitClone` utilities |
| **Shared Configs** | Pre-configured TypeScript and Vitest base configs |
| **Modular Exports** | Subpath exports for tree-shaking (`/ui`, `/utils`, `/interfaces`) |

## Tech Stack

<div align="center">

**Languages & Frameworks**

<img src="https://skillicons.dev/icons?i=ts,nodejs&perline=8" alt="languages" />

**Infrastructure & Tools**

<img src="https://skillicons.dev/icons?i=bun,githubactions,npm&perline=8" alt="infra" />

</div>

## Why I Built This

Every CLI I built needed the same things: a banner, a spinner, colored messages, safe shell execution. I was copy-pasting between `claude-skills` and `create-clean-app`.

Now both import from one place. One fix, every CLI gets it.

---

## Quick Start

### Prerequisites

- Node.js >= 18
- npm, yarn, or bun

### Installation

```bash
npm install @cjarero183006/cli-builder
```

### Usage

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
|:-------|:------------|
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
|:-------|:------------|
| `ProgressReporter` | `{ start(msg): void, stop(msg): void }` |
| `Result<T>` | `{ success: boolean, data?: T, error?: string }` |

### Utils (`@cjarero183006/cli-builder/utils`)

| Export | Description |
|:-------|:------------|
| `sleep(ms)` | Async delay |
| `formatError(error, default?)` | Extract error message |
| `wrapError(error, context)` | Add context to error |
| `execSafe(command, options?)` | Safe shell execution with timeout/buffer config |
| `gitClone(url, dest, options?)` | Clone repo safely with validation |
| `escapeShellArg(arg)` | Escape shell argument |
| `isShellSafe(input)` | Validate shell input against injection patterns |
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

<table>
<tr>
  <td width="50%">
    <h3 align="center">claude-skills</h3>
    <div align="center">
      <p>Claude Code skills manager</p>
      <a href="https://github.com/jarero321/claude-skills">
        <img src="https://img.shields.io/badge/CODE-2ea44f?style=for-the-badge&logo=github&logoColor=white" alt="code" />
      </a>
      <a href="https://www.npmjs.com/package/@cjarero183006/claude-skills">
        <img src="https://img.shields.io/npm/v/@cjarero183006/claude-skills?style=for-the-badge&color=CB3837&logo=npm&logoColor=white" alt="npm" />
      </a>
      <br><br>
      <img src="https://skillicons.dev/icons?i=ts,nodejs" alt="tech" />
    </div>
  </td>
  <td width="50%">
    <h3 align="center">create-clean-app</h3>
    <div align="center">
      <p>Clean Architecture scaffolder</p>
      <a href="https://github.com/jarero321/create-clean-app">
        <img src="https://img.shields.io/badge/CODE-2ea44f?style=for-the-badge&logo=github&logoColor=white" alt="code" />
      </a>
      <a href="https://www.npmjs.com/package/@cjarero183006/create-clean-app">
        <img src="https://img.shields.io/npm/v/@cjarero183006/create-clean-app?style=for-the-badge&color=CB3837&logo=npm&logoColor=white" alt="npm" />
      </a>
      <br><br>
      <img src="https://skillicons.dev/icons?i=ts,nodejs" alt="tech" />
    </div>
  </td>
</tr>
</table>

---

## Architecture

```
src/
├── ui/               # Banner, progress, prompts, styles
├── interfaces/       # ProgressReporter, Result<T>
├── utils/            # Shell, error, sleep
├── configs/          # Shared tsconfig & vitest configs
└── index.ts          # Main entry
```

| Aspect | Choice |
|:-------|:-------|
| **Architecture** | Modular with subpath exports |
| **Testing** | Vitest (34 passing) |
| **Build** | tsup (ESM only) |
| **Dependencies** | @clack/prompts, chalk, figlet, gradient-string |

---

## Development

```bash
git clone https://github.com/jarero321/cli-builder.git
cd cli-builder
bun install
bun run dev
```

| Script | Description |
|:-------|:------------|
| `bun run dev` | Watch mode |
| `bun run build` | Production build |
| `bun run test:run` | Single test run |
| `bun run test:coverage` | Coverage report |

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**[Report Bug](https://github.com/jarero321/cli-builder/issues)** · **[Request Feature](https://github.com/jarero321/cli-builder/issues)**

</div>

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,5,30&height=120&section=footer" />
