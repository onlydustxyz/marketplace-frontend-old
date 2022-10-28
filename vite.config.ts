/// <reference types="vitest" />
import { defineConfig } from "vite";
import istanbul from "vite-plugin-istanbul";

import * as path from "path";
import react from "@vitejs/plugin-react";
import viteSentry from "vite-plugin-sentry";

export default defineConfig(({ mode }) => {
  const plugins = [];

  // if (mode === "test") {
  //   const istanbulPlugin = istanbul({
  //     include: "src/*",
  //     exclude: [
  //       "node_modules",
  //       "tests",
  //       "cypress",
  //       "App/tests",
  //       "*.config.ts",
  //       "*.config.js",
  //       ".eslintrc.js",
  //       ".storybook",
  //     ],
  //     extension: [".ts", ".tsx"],
  //     requireEnv: true,
  //     envPrefix: "MARKETPLACE_",
  //     // forceBuildInstrument: true,
  //   });

  //   console.log({ ...istanbulPlugin });

  //   // istanbulPlugin.enforce = "post";
  //   plugins.push(istanbulPlugin);
  // }

  plugins.push(
    react({
      babel: {
        plugins: [["istanbul"]],
      },
    })
  );
  plugins.push(
    viteSentry({
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
      dryRun:
        !process.env.MARKETPLACE_SENTRY_AUTH_TOKEN ||
        !process.env.MARKETPLACE_SENTRY_ORG ||
        !process.env.MARKETPLACE_SENTRY_PROJECT ||
        !process.env.MARKETPLACE_SENTRY_RELEASE,
    })
  );

  return {
    envPrefix: "MARKETPLACE_",
    plugins,
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./src"),
        tests: path.resolve(__dirname, "./tests"),
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
        external: new RegExp("/coverage/.*"),
      },
    },
    server: {
      watch: {
        ignored: ["**/coverage/**"],
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        provider: "istanbul",
        reporter: ["html", "clover"],
      },
    },
  };
});
