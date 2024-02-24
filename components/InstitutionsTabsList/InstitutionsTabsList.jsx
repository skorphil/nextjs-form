"use client";

// TODO fix animation framer https://github.com/skorphil/nextjs-form/issues/25

import { InstitutionTab } from "../InstitutionTab";
import {
  Tabs,
  TabList,
  Heading,
  Button,
  Box,
  IconButton,
} from "@chakra-ui/react";

import classes from "./InstitutionsTabsList.module.css";
import { CgMathPlus } from "react-icons/cg";
import { useVisualViewportSize } from "../../app/hooks";
import { motion } from "framer-motion";

export function InstitutionsTabsList({
  institutions,
  simulateKeyboard = false,
}) {
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
          {institutions.map((institution, id) => (
            <InstitutionTab
              // transition="2s linear"
              // as={motion.div}
              // layout="position"
              width={isKeyboardOpened && "180px"}
              institutionName={`institutions.${id}`}
              key={`institutionTab-${id}`}
              name={institution.name}
              state="new"
            />
          ))}
          {isKeyboardOpened
            ? newInstitutionButtonCollapsed
            : newInstitutionButtonExpanded}
        </TabList>
      </Box>
    </Box>
  );
}

const newInstitutionButtonExpanded = (
  <Button variant="outline">
    <Box as="span" overflow="hidden">
      Add institution
    </Box>
  </Button>
);

const newInstitutionButtonCollapsed = (
  <IconButton
    variant="outline"
    aria-label="Add institution"
    icon={<CgMathPlus />}
  />
);
