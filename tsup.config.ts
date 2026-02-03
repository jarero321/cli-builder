import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/ui/index.ts",
    "src/interfaces/index.ts",
    "src/utils/index.ts",
  ],
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: false,
  treeshake: true,
});
