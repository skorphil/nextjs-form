"use client";
import { InstitutionContainer } from "../../InstitutionContainer";
import { TabPanels, TabPanel } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { getInstitutionPanelOverlayState } from "../utils/getInstitutionPanelOverlayState";
import { InstitutionPanelOverlayAllDeleted } from "./InstitutionPanelOverlayAllDeleted";
import { InstitutionPanelOverlayInstitutionsLoaded } from "./InstitutionPanelOverlayInstitutionsLoaded";

// TODO add all instituion deleted state
export function InstitutionPanel({
  institutions,
  selectedInstitution,
  isInstitutionOpen,
}) {
  const {
    formState: { defaultValues },
    getValues,
  } = useFormContext();

  const overlayState = getInstitutionPanelOverlayState(
    defaultValues,
    getValues
  );

  return (
    <TabPanels
      bg="gray.800"
      borderRadius={isInstitutionOpen || "lg"}
      h="100%"
      minHeight="260px"
      flexGrow={1}
      flexShrink={1}
    >
      {selectedInstitution !== null ? (
        institutions.map((institution, index) => (
          <TabPanel p={0} key={institution.id} h="100%" overflow="auto">
            <InstitutionContainer
              institutionName={`institutions.${index}`}
              isInstitutionOpen={isInstitutionOpen}
            />
          </TabPanel>
        ))
      ) : overlayState == "success" && selectedInstitution == null ? (
        <InstitutionPanelOverlayInstitutionsLoaded />
      ) : overlayState == "allDeleted" && selectedInstitution == null ? (
        <InstitutionPanelOverlayAllDeleted />
      ) : (
        false
      )}
    </TabPanels>
  );
}
