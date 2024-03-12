"use client";

import { InstitutionsTabsList } from "../InstitutionsTabsList";
import { InstitutionContainer } from "../InstitutionContainer";
import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import { useVisualViewportSize } from "../../app/hooks";
import classes from "./InstitutionsList.module.css";
import { useFormContext } from "react-hook-form";

function InstitutionsList({
  simulateKeyboard = false,
  isInstitutionOpen,
  selectedInstitution,
}) {
  const { height } = useVisualViewportSize();
  const isKeyboardOpened = simulateKeyboard || height < 650;
  const {
    institutionsFieldArray: { fields: institutions },
    handlers: { handleInstitutionCreate, handleInstitutionSelect },
  } = useFormContext();

  return (
    <Tabs
      flexGrow={1}
      minH="200px"
      index={selectedInstitution}
      onChange={handleInstitutionSelect}
      h="100%"
      variant="grid"
      padding={isInstitutionOpen || 2}
    >
      <TabPanels flexGrow={1} flexShrink={1} h="200px">
        {institutions.map((institution, index) => (
          <TabPanel p={0} key={institution.id} h="100%">
            <InstitutionContainer
              institutionName={`institutions.${index}`}
              isInstitutionOpen={isInstitutionOpen}
            />
          </TabPanel>
        ))}
      </TabPanels>
      {isInstitutionOpen || (
        <InstitutionsTabsList
          simulateKeyboard={isKeyboardOpened}
          institutionsArray={institutions}
          onCreateInstitution={handleInstitutionCreate}
        />
      )}
    </Tabs>
  );
}

export { InstitutionsList };
