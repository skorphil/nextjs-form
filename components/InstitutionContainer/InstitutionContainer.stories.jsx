import { FormProviderDecorator } from "stories/FormProviderDecorator";
import { InstitutionContainer } from "~/InstitutionContainer";

const meta = {
  title: "RecordForm/InstitutionContainer",
  component: InstitutionContainer,
  decorators: [
    (Story, { args }) => (
      <FormProviderDecorator>
        <Story />
      </FormProviderDecorator>
    ),
  ],
};
export default meta;

export const Collapsed = {
  args: {
    isInstitutionOpen: false,
    institutionName: "institutions.0",
  },
};

export const Fullscreen = {
  args: {
    isInstitutionOpen: true,
    institutionName: "institutions.0",
  },
};
