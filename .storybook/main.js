/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  // stories: [
  //   "../stories/**/*.mdx",
  //   "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  // ],
  stories: ["../components/**/*.stories.jsx"],
  features: { experimentalRSC: true },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
};

export default config;
