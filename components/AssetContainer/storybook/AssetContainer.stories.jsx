import { AssetContainer } from "~/AssetContainer";
import { FormProviderDecorator } from "stories/FormProviderDecorator";

const meta = {
  title: "RecordForm/AssetContainer",
  component: AssetContainer,
  decorators: [
    (Story, { args }) => (
      <FormProviderDecorator>
        <Story />
      </FormProviderDecorator>
    ),
  ],
};
export default meta;

export const Expanded = {
  args: {
    isCompact: false,
    assetName: "institutions.0.assets.0",
  },
};

export const Compact = {
  args: {
    ...Expanded.args,
    isCompact: true,
  },
};
