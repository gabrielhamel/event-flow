import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["./src/**/*.test.{ts,tsx}"],
    passWithNoTests: true,
  },
});
