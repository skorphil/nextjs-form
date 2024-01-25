import AssetContainer from "./AssetContainer";

const meta = {
  title: "RecordForm/AssetContainer",
  component: AssetContainer,
};
export default meta;

export const Default = {
  args: {
    isExpanded: true,
    asset: {
      amount: 10000,
      currency: "usd",
      isEarning: false,
      description: "My Visa debit card",
    },
  },
};
