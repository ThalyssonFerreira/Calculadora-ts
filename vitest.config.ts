import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      reporter: ["text", "html"],
      reportsDirectory: "coverage",
      // Conta só os arquivos que fazem sentido medir agora
      include: ["src/evaluate.ts"],
      exclude: ["src/main.ts"],
      // (Opcional) coloque metas realistas pro currículo
      thresholds: {
        statements: 85,
        branches: 70,
        functions: 90,
        lines: 85,
      },
    },
  },
});
