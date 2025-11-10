import { defineConfig } from "vitest/config"
import path from "node:path"
import url from "node:url"

const __dirname = url.fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      enabled: false,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
