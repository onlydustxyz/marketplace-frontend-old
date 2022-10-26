import type { StorybookViteConfig } from "@storybook/builder-vite";
import path from "path";

const config: StorybookViteConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
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
