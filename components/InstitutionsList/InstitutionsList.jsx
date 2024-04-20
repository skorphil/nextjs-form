"use client";

import { InstitutionsTabsList } from "../InstitutionsTabsList";
import { Tabs } from "@chakra-ui/react";
import { useVisualViewportSize } from "../../app/hooks";
import classes from "./InstitutionsList.module.css";
import { useFormContext } from "react-hook-form";
import { InstitutionPanel } from "./components";

function InstitutionsList({
  institutionPanelOverlay,
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
      <InstitutionPanel
        institutionPanelOverlay={institutionPanelOverlay}
        institutions={institutions}
        selectedInstitution={selectedInstitution}
        isInstitutionOpen={isInstitutionOpen}
      />
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
