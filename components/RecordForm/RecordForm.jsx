/* 
Root element of the form
*/

"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";

import classes from "./RecordForm.module.css";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

import { InstitutionsList } from "../InstitutionsList";
import { FormHeader } from "~/FormHeader";
import { DevTool } from "@hookform/devtools";

const prevRecord = {
  institutions: [
    {
      name: "City Bank",
      country: "it",
      assets: [
        {
          amount: 10000,
          currency: "usd",
          isEarning: false,
          description: "My Visa debit card",
        },
        {
          amount: 300000,
          currency: "eur",
          isEarning: true,
          description: "My Deposit",
        },
        {
          amount: 1000,
          currency: "cny",
          isEarning: true,
          description: "",
        },
        {
          amount: 5000,
          currency: "chf",
          isEarning: false,
          description: "",
        },
      ],
    },
    {
      name: "Wells & Fargo",
      country: "",
      assets: [
        {
          amount: 6443,
          currency: "brl",
          isEarning: false,
          description: "Debit card",
        },
        {
          amount: 8765,
          currency: "eur",
          isEarning: true,
          description: "My Deposit",
        },
        {
          amount: 1234,
          currency: "cny",
          isEarning: true,
          description: "",
        },
      ],
    },
    {
      name: "Bank Of America",
      country: "",
      assets: [
        {
          amount: 1700,
          currency: "usd",
          isEarning: false,
          description: "My Visa debit card",
        },
        {
          amount: 376000,
          currency: "usd",
          isEarning: true,
          description: "My Deposit",
        },
      ],
    },
    {
      name: "Raiffeisen Bank",
      country: "",
      assets: [
        {
          amount: 888,
          currency: "usd",
          isEarning: false,
          description: "My Visa debit card",
        },
      ],
    },
  ],
};

export function RecordForm({ onSubmit }) {
  // check naming conventions for submitAction server action
  const isClient = typeof window !== "undefined";
  const [isInstitutionOpen, setIsInstitutionOpen] = useState(false);
  const [selectedInstitutionIndex, setSelectedInstitutionIndex] = useState(0);

  const { control, ...form } = useForm({
    defaultValues: prevRecord,
  });

  const institutionsFieldArray = useFieldArray({
    control,
    name: `institutions`,
  });

  const formMethods = {
    control,
    ...form,
    institutionsFieldArray,
    handlers: {
      handleInstitutionOpen: () => handleInstitutionOpen(setIsInstitutionOpen),
      handleInstitutionCreate: () =>
        handleInstitutionCreate({
          append: institutionsFieldArray.append,
          fields: institutionsFieldArray.fields,
          setSelectedIndex: setSelectedInstitutionIndex,
          setIsInstitutionOpen: setIsInstitutionOpen,
        }),
      handleTabsChange: (index) =>
        handleTabsChange({
          index: index,
          setSelectedIndex: setSelectedInstitutionIndex,
        }),
    },
  };

  return (
    <FormProvider {...formMethods}>
      <form className={classes.RecordForm} /* action={onSubmit} */>
        {isInstitutionOpen || (
          <FormHeader
            text="New Record"
            rightButtons={
              <>
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => console.log(formMethods.getValues())}>
                  Save
                </Button>
              </>
            }
          />
        )}
        <InstitutionsList
          isInstitutionOpen={isInstitutionOpen}
          selectedInstitution={selectedInstitutionIndex}
        />
      </form>
      {/* <DevTool control={formMethods.control} /> */}
    </FormProvider>
  );
}

function handleInstitutionOpen(setState, value) {
  value ? setState(value) : setState((val) => !val);
}

function handleInstitutionCreate({
  append,
  setSelectedIndex,
  fields,
  setIsInstitutionOpen,
}) {
  append({
    name: "",
    country: "",
    assets: [
      {
        amount: "",
        currency: "",
        isEarning: false,
        description: "",
      },
    ],
  });
  const newInstitutionIndex = fields.length;
  handleTabsChange({
    index: newInstitutionIndex,
    setSelectedIndex: setSelectedIndex,
  });
  handleInstitutionOpen(setIsInstitutionOpen, true);
}

function handleTabsChange({ index, setSelectedIndex }) {
  setSelectedIndex(index);
}
