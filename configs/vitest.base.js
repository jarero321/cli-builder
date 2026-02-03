import { defineConfig } from "vitest/config";

export function createVitestConfig(options = {}) {
  const { include = ["src/__tests__/**/*.spec.ts"], exclude = [] } = options;

  return defineConfig({
    test: {
      globals: true,
      environment: "node",
      include,
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        exclude: ["src/__tests__/**", "dist/**", ...exclude],
      },
    },
  });
}

export default createVitestConfig();
