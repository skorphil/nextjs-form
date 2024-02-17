import RecordForm from "./RecordForm";

const meta = {
  title: "app/RecordForm",
  component: RecordForm,
};
export default meta;

export const Default = {
  args: {
    prevRecord: {
      institutions: [
        {
          name: "City Bank",
          country: "it",
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
        {
          name: "Wells & Fargo",
          country: "",
          assets: [
            {
              amount: 6443,
              currency: "brl",
              isEarning: false,
              description: "Debit card",
            },
            {
              amount: 8765,
              currency: "eur",
              isEarning: true,
              description: "My Deposit",
            },
            {
              amount: 1234,
              currency: "cny",
              isEarning: true,
              description: "",
            },
          ],
        },
        {
          name: "Bank Of America",
          country: "",
          assets: [
            {
              amount: 1700,
              currency: "usd",
              isEarning: false,
              description: "My Visa debit card",
            },
            {
              amount: 376000,
              currency: "usd",
              isEarning: true,
              description: "My Deposit",
            },
          ],
        },
        {
          name: "Raiffeisen Bank",
          country: "",
          assets: [
            {
              amount: 888,
              currency: "usd",
              isEarning: false,
              description: "My Visa debit card",
            },
          ],
        },
      ],
    },
  },
};
