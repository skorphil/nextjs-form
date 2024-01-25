import { Providers } from "../app/providers";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const decorators = [
  (renderStory) => <Providers>{renderStory()}</Providers>,
];
