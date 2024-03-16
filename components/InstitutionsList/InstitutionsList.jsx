"use client";

import { InstitutionsTabsList } from "../InstitutionsTabsList";
import { InstitutionContainer } from "../InstitutionContainer";
import {
  Tabs,
  Text,
  TabPanels,
  TabPanel,
  Center,
  Heading,
  VStack,
  Image,
} from "@chakra-ui/react";
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
      <ContentPanel
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

function ContentPanel({
  institutions,
  selectedInstitution,
  isInstitutionOpen,
}) {
  return (
    <TabPanels
      bg="gray.800"
      borderRadius={isInstitutionOpen || "lg"}
      h="100%"
      minHeight="260px"
      flexGrow={1}
      flexShrink={1}
    >
      {selectedInstitution === null ? (
        <ContentPanelOverlay
          image="/institutions-loaded.svg"
          headingText="Institutions loaded from latest&nbsp;record"
          text="Edit institutions to reflect asset updates"
        />
      ) : (
        false
      )}
      {institutions.map((institution, index) => (
        <TabPanel p={0} key={institution.id} h="100%">
          <InstitutionContainer
            institutionName={`institutions.${index}`}
            isInstitutionOpen={isInstitutionOpen}
          />
        </TabPanel>
      ))}
    </TabPanels>
  );
}

function ContentPanelOverlay({ image, headingText, text }) {
  return (
    <Center h="100%" p={2}>
      <VStack gap={12}>
        <Image src={image} alt="Illustration" boxSize="140px" />

        <VStack>
          <Heading textAlign="center" size="md">
            {headingText}
          </Heading>
          <Text>{text}</Text>
        </VStack>
      </VStack>
    </Center>
  );
}
