import type { StorybookViteConfig } from "@storybook/builder-vite";
import path from "path";
import postcss from "postcss";
import * as tailwindcss from "../tailwind.config";

const config: StorybookViteConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: postcss,
          postcssOptions: {
            plugins: {
              tailwindcss,
              autoprefixer: {},
            },
          },
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  viteFinal: async config => {
    config.resolve = {
      alias: { src: path.resolve(__dirname, "../src") },
    };
    return config;
  },
};

export default config;
