"use client";

import { IconButton, Tab, forwardRef, Box } from "@chakra-ui/react";
import { CgUndo } from "react-icons/cg";
import { useFormContext, useWatch } from "react-hook-form";
import classes from "./InstitutionTab.module.css";
// const defaultValues = {
//   institutions: [
//     {
//       name: "City Bank",
//       country: "it",
//       isDeleted: false,
//       assets: [
//         {
//           amount: 10000,
//           currency: "usd",
//           isEarning: false,
//           description: "My Visa debit card",
//         },
//         {
//           amount: 300000,
//           currency: "eur",
//           isEarning: true,
//           description: "My Deposit",
//         },
//         {
//           amount: 1000,
//           currency: "cny",
//           isEarning: true,
//           description: "",
//         },
//         {
//           amount: 5000,
//           currency: "chf",
//           isEarning: false,
//           description: "",
//         },
//       ],
//     },
//     {
//       name: "Wells & Fargo",
//       country: "",
//       isDeleted: false,
//       assets: [
//         {
//           amount: 6443,
//           currency: "brl",
//           isEarning: false,
//           description: "Debit card",
//         },
//         {
//           amount: 8765,
//           currency: "eur",
//           isEarning: true,
//           description: "My Deposit",
//         },
//         {
//           amount: 1234,
//           currency: "cny",
//           isEarning: true,
//           description: "",
//         },
//       ],
//     },
//     {
//       name: "Bank Of America",
//       country: "",
//       isDeleted: false,
//       assets: [
//         {
//           amount: 1700,
//           currency: "usd",
//           isEarning: false,
//           description: "My Visa debit card",
//         },
//         {
//           amount: 376000,
//           currency: "usd",
//           isEarning: true,
//           description: "My Deposit",
//         },
//       ],
//     },
//     {
//       name: "Raiffeisen Bank",
//       country: "",
//       isDeleted: false,
//       assets: [
//         {
//           amount: 888,
//           currency: "usd",
//           isEarning: false,
//           description: "My Visa debit card",
//         },
//       ],
//     },
//   ],
// };

export const InstitutionTab = forwardRef(
  ({ institutionName, ...props }, ref) => {
    const {
      formState: { defaultValues },
      control,
      watch,
      institutionsFieldArray,
    } = useFormContext();
    const institutionFields =
      institutionsFieldArray.fields[getInstitutionIndex(institutionName)];
    const institutionDefaultValues =
      defaultValues.institutions[getInstitutionIndex(institutionName)];
    const isDeleted = false; /* watch(`${institutionName}.isDeleted`); */
    const institutionCurrentValues = watch(institutionName);
    const isChanged =
      JSON.stringify(institutionDefaultValues) !==
      JSON.stringify(institutionCurrentValues);
    const isNew = institutionFields.name === "";
    const state = isNew ? "new" : isChanged ? "updated" : null;
    const name =
      useWatch({
        control,
        name: `${institutionName}.name`,
      }) || "New Institution";

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
