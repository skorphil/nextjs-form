"use client";

import { IconButton, Tab, forwardRef, Box } from "@chakra-ui/react";
import { CgUndo } from "react-icons/cg";
import { useFormContext, useWatch } from "react-hook-form";
import classes from "./InstitutionTab.module.css";

export const InstitutionTab = forwardRef(
  ({ isDeleted = false, institutionName, ...props }, ref) => {
    const { formState, getValues, control } = useFormContext();
    const institutionDefaultValues =
      formState.defaultValues.institutions[
        getInstitutionIndex(institutionName)
      ];
    const institutionCurrentValues = getValues(institutionName);
    const isChanged =
      JSON.stringify(institutionDefaultValues) !==
      JSON.stringify(institutionCurrentValues);
    const state = isChanged ? "updated" : null;
    const name = useWatch({
      control,
      name: `${institutionName}.name`,
    });

    return (
      <Tab
        isDisabled={isDeleted}
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
