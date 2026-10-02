import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Thumbnails are pre-sized WebP files; next/image would only re-encode them.
  { rules: { "@next/next/no-img-element": "off" } },
  globalIgnores([".next/**", "out/**", "public/**", "next-env.d.ts", "test-results/**", "playwright-report/**", ".claude/**"]),
]);
