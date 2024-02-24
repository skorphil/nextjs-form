"use client";

// TODO fix animation framer https://github.com/skorphil/nextjs-form/issues/25

import { InstitutionTab } from "../InstitutionTab";
import { TabList, Heading, Button, Box, IconButton } from "@chakra-ui/react";

import classes from "./InstitutionsTabsList.module.css";
import { CgMathPlus } from "react-icons/cg";
import { useVisualViewportSize } from "../../app/hooks";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";

export function InstitutionsTabsList({ simulateKeyboard = false }) {
  const {
    institutionsFieldArray: { fields: institutions },
    handlers: { handleInstitutionCreate },
  } = useFormContext();
  const { height } = useVisualViewportSize();
  const isKeyboardOpened =
    simulateKeyboard || (window.innerHeight - height > 200 ? true : false);

  return (
    <Box my={isKeyboardOpened || 3}>
      {isKeyboardOpened || <Heading size="md">Record Institutions</Heading>}
      <Box
        key="boxtab1"
        overflowX={isKeyboardOpened && "auto"}
        px={isKeyboardOpened && 2}
        py={2}
      >
        <TabList
          key="tablist"
          className={`${classes.grid} ${isKeyboardOpened ? classes.collapsed : classes.expanded}`}
        >
          {institutions.map((institution, index) => (
            <InstitutionTab
              width={isKeyboardOpened && "180px"}
              institutionName={`institutions.${index}`}
              key={institution.id}
            />
          ))}
          {isKeyboardOpened ? (
            <NewInstitutionButtonCollapsed
              onCreateInstitution={handleInstitutionCreate}
            />
          ) : (
            <NewInstitutionButtonExpanded
              onCreateInstitution={handleInstitutionCreate}
            />
          )}
        </TabList>
      </Box>
    </Box>
  );
}

function NewInstitutionButtonExpanded({ onCreateInstitution }) {
  return (
    <Button variant="outline" onClick={onCreateInstitution}>
      <Box as="span" overflow="hidden">
        Add institution
      </Box>
    </Button>
  );
}

function NewInstitutionButtonCollapsed({ onCreateInstitution }) {
  return (
    <IconButton
      onClick={onCreateInstitution}
      variant="outline"
      aria-label="Add institution"
      icon={<CgMathPlus />}
    />
  );
}
