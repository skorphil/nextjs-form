import { FormHeader } from "./FormHeader";
import { Button, IconButton } from "@chakra-ui/react";
import { CgMinimizeAlt } from "react-icons/cg";

const meta = {
  title: "RecordForm/FormHeader",
  component: FormHeader,
  argTypes: {
    rightButtons: {
      options: ["saveCancel", "minimize"],
      control: { type: "radio" },
      mapping: {
        saveCancel: (
          <>
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </>
        ),
        minimize: (
          <IconButton
            aria-label="minimize"
            icon={<CgMinimizeAlt size="24px" />}
          />
        ),
      },
    },
  },
};
export default meta;

export const Default = {
  args: {
    text: "New Record",
  },
};
