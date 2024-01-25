import InstitutionContainer from "./InstitutionContainer";

const meta = {
  title: "RecordForm/InstitutionContainer",
  component: InstitutionContainer,
};
export default meta;

export const Collapsed = {
  args: {
    isExpanded: false,
    institution: {
      name: "City Bank",
      country: "fr",
      assets: [
        {
          amount: 10000,
          currency: "usd",
          isEarning: false,
          description: "My Visa debit card",
        },
        {
          amount: 300000,
          currency: "eur",
          isEarning: true,
          description: "My Deposit",
        },
        {
          amount: 1000,
          currency: "cny",
          isEarning: true,
          description: "",
        },
        {
          amount: 5000,
          currency: "chf",
          isEarning: false,
          description: "",
        },
      ],
    },
    assetContainer: null,
  },
};

export const Expanded = {
  args: {
    isExpanded: true,
    institution: {
      name: "City Bank",
      country: "fr",
      assets: [
        {
          amount: 10000,
          currency: "usd",
          isEarning: false,
          description: "My Visa debit card",
        },
        {
          amount: 300000,
          currency: "eur",
          isEarning: true,
          description: "My Deposit",
        },
        {
          amount: 1000,
          currency: "cny",
          isEarning: true,
          description: "",
        },
        {
          amount: 5000,
          currency: "chf",
          isEarning: false,
          description: "",
        },
      ],
    },
    assetContainer: null,
  },
};
