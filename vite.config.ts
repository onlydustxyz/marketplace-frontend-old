import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { ViteSentryPluginOptions } from "vite-plugin-sentry";
import viteSentry from "vite-plugin-sentry";

const sentryConfig: ViteSentryPluginOptions = {
  url: "https://sentry.io",
  authToken: process.env.MARKETPLACE_SENTRY_AUTH_TOKEN,
  org: process.env.MARKETPLACE_SENTRY_ORG,
  project: process.env.MARKETPLACE_SENTRY_PROJECT,
  release: process.env.MARKETPLACE_SENTRY_RELEASE,
  deploy: {
    env: "production",
  },
  setCommits: {
    auto: true,
  },
  sourceMaps: {
    include: ["./dist/assets"],
    ignore: ["node_modules"],
    urlPrefix: "~/assets",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "MARKETPLACE_",
  plugins: [react(), viteSentry(sentryConfig)],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          starknet: ["@starknet-react/core", "get-starknet", "starknet"],
          "react-dom": ["react-dom"],
        },
        sourcemapExcludeSources: true,
      },
    },
  },
});
