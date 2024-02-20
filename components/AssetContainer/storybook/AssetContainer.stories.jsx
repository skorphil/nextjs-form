import { AssetContainer } from "~/AssetContainer";
import { AssetContainerDecorator } from "./AssetContainerDecorator";

const meta = {
  title: "RecordForm/AssetContainer",
  component: AssetContainer,
  decorators: [
    (Story, { args }) => (
      <AssetContainerDecorator>
        <Story />
      </AssetContainerDecorator>
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
