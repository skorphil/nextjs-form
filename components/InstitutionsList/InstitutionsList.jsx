"use client";

import { InstitutionsTabsList } from "../InstitutionsTabsList";
import { InstitutionContainer } from "../InstitutionContainer";
import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import { useVisualViewportSize } from "../../app/hooks";
import classes from "./InstitutionsList.module.css";
import { useFieldArray } from "react-hook-form";

function InstitutionsList({ simulateKeyboard = false, isIntitutionOpen }) {
  const { height } = useVisualViewportSize();
  const isKeyboardOpened = simulateKeyboard || height < 650;

  const arrayName = `institutions`;
  const { fields: institutions, remove } = useFieldArray({
    name: arrayName,
  });

  return (
    <Tabs
      flexGrow={1}
      minH="200px"
      // className={classes.institutionsList}
      h="100%"
      // display="flex"
      // flexDir="column"
      variant="grid"
      padding={isIntitutionOpen || 2}
    >
      <TabPanels flexGrow={1} flexShrink={1} minH="200px">
        {institutions.map((institution, index) => (
          <TabPanel p={0} key={institution.id} h="100%">
            <InstitutionContainer
              institutionName={`institutions.${index}`}
              isInstitutionOpen={isIntitutionOpen}
              // institutionId={index}
              // isExpanded={isExpanded}
              // institution={institution}
            />
          </TabPanel>
        ))}
      </TabPanels>
      {isIntitutionOpen || (
        <InstitutionsTabsList
          simulateKeyboard={isKeyboardOpened}
          institutions={institutions}
        />
      )}
    </Tabs>
  );
}

export { InstitutionsList };
