import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/EGESHKA_front/",
  plugins: [react()],
  assetsInclude: ["**/*.riv"],
  server: {
    allowedHosts: true,
  },
});
