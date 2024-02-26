"use client";

import { IconButton, Tab, forwardRef, Box } from "@chakra-ui/react";
import { CgUndo } from "react-icons/cg";
import { useFormContext, useWatch } from "react-hook-form";
import classes from "./InstitutionTab.module.css";

export const InstitutionTab = forwardRef(
  ({ institutionName, ...props }, ref) => {
    const {
      formState: { defaultValues },
      control,
      institutionsFieldArray,
    } = useFormContext();
    const institutionFields =
      institutionsFieldArray.fields[getInstitutionIndex(institutionName)];
    const institutionDefaultValues =
      defaultValues.institutions[getInstitutionIndex(institutionName)];
    const institutionCurrentValues = useWatch({
      control,
      name: institutionName,
    });
    const isDeleted = institutionCurrentValues.isDeleted;

    const isChanged =
      JSON.stringify(institutionDefaultValues) !==
      JSON.stringify(institutionCurrentValues);
    const isNew = institutionFields.name === "";
    const state = isNew ? "new" : isChanged ? "updated" : null;
    const name = institutionCurrentValues.name || "New Institution";

    return (
      <Tab
        isDisabled={isDeleted}
        as={isDeleted && "div"}
        className={`${classes.tab} ${isDeleted && classes.deleted}`}
        ref={ref}
        {...props}
      >
        <Box className={classes.tabName}>{name}</Box>
        <TabRightSection state={state} isDeleted={isDeleted} />
      </Tab>
    );
  }
);

function TabRightSection({ state, isDeleted }) {
  if (isDeleted) {
    return (
      <IconButton
        marginRight={-4}
        variant="ghost"
        aria-label="Restore institution"
        icon={<CgUndo className={classes.deleteIcon} />}
        onClick={(e) => {
          e.stopPropagation();
          console.log("restore");
        }}
      />
    );
  } else if (state === "updated" || state === "new") {
    return (
      <Box className={classes.stateIcon} marginRight={-2}>
        {state === "updated" ? "UPD" : "NEW"}
      </Box>
    );
  } else return false;
}

function getInstitutionIndex(institutionName) {
  const index = parseInt(institutionName.split(".")[1]);
  return index;
}
