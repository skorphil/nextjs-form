import { InstitutionTab } from "./InstitutionTab";
import { Tabs, TabList } from "@chakra-ui/react";

export default {
  title: "RecordForm/InstitutionTab",
  component: InstitutionTab,
  decorators: [
    (Story, { args }) => (
      <Tabs index={args.isSelected ? 0 : null} variant="grid">
        <TabList>
          <Story />
        </TabList>
      </Tabs>
    ),
  ],
};

export const Default = {
  args: {
    isSelected: false,
    isDeleted: false,
    state: null,
    name: "Wells & Fargo",
  },
};

export const Updated = {
  args: {
    isDeleted: false,
    state: "updated",
    name: "Wells & Fargo",
  },
};

export const New = {
  args: {
    isDeleted: false,
    state: "new",
    name: "Wells & Fargo",
  },
};

export const Deleted = {
  args: {
    isDeleted: true,
    state: "updated",
    name: "Wells & Fargo",
  },
};
