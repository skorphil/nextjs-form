import InstitutionTab from "./InstitutionTab";
import { Tabs, TabList } from "@chakra-ui/react";

export default {
  title: "RecordForm/InstitutionTab",
  component: InstitutionTab,
  decorators: [
    (Story) => (
      <Tabs variant="grid">
        <TabList>
          <Story />
          <Story />
        </TabList>
      </Tabs>
    ),
  ],
};

export const Default = {
  args: {
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
