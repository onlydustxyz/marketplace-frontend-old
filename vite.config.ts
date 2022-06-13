import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "THEMERGE_",
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
});
