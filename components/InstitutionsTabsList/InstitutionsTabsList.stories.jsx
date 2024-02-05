import InstitutionsTabsList from "./InstitutionsTabsList";

export default {
  title: "RecordForm/InstitutionsTabsList",
  component: InstitutionsTabsList,
  decorators: [
    (Story) => (
      <>
        <Story />
        <input type="text" placeholder="test keyboard" />
      </>
    ),
  ],
};

export const Expanded = {
  args: {
    simulateKeyboard: false,
    institutions: [
      {
        name: "City Bank",
        country: "it",
        assets: [],
      },
      {
        name: "Wells & Fargo",
        country: "",
        assets: [],
      },
      {
        name: "Bank Of America",
        country: "",
        assets: [],
      },
      {
        name: "Raiffeisen Bank",
        country: "",
        assets: [],
      },
    ],
  },
};

export const Collapsed = {
  args: {
    simulateKeyboard: true,
    institutions: [
      {
        name: "City Bank",
        country: "it",
        assets: [],
      },
      {
        name: "Wells & Fargo",
        country: "",
        assets: [],
      },
      {
        name: "Bank Of America",
        country: "",
        assets: [],
      },
      {
        name: "Raiffeisen Bank",
        country: "",
        assets: [],
      },
    ],
  },
};
