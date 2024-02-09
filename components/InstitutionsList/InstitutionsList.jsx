"use client";

import { InstitutionsTabsList } from "../InstitutionsTabsList";
import { InstitutionContainer } from "../InstitutionContainer";
import { Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import { useVisualViewportSize } from "../../app/hooks";
import classes from "./InstitutionsList.module.css";

function InstitutionsList({
  institutions,
  isExpanded,
  simulateKeyboard = false,
}) {
  const { height } = useVisualViewportSize();
  const isKeyboardOpened = simulateKeyboard || height < 650;

  return (
    <Tabs
      // className={classes.institutionsList}
      h={isKeyboardOpened && height}
      // display="flex"
      // flexDir="column"
      variant="grid"
      padding={isExpanded || 2}
    >
      <TabPanels flexGrow={isKeyboardOpened && 1} flexShrink={1} minH="200px">
        {institutions.map((institution, index) => (
          <TabPanel
            p={0}
            key={"tab-panel-" + index}
            h={isKeyboardOpened ? "100%" : "230px"}
          >
            <InstitutionContainer
              isExpanded={isExpanded}
              institution={institution}
            />
          </TabPanel>
        ))}
      </TabPanels>
      {isExpanded || (
        <InstitutionsTabsList
          simulateKeyboard={isKeyboardOpened}
          institutions={institutions}
        />
      )}
    </Tabs>
  );
}

export { InstitutionsList };
