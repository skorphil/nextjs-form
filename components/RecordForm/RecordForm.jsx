/* 
Root element of the form
*/

"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import classes from "./RecordForm.module.css";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

import { InstitutionsList } from "components/InstitutionsList";
import { FormHeader } from "~/FormHeader";
import { DevTool } from "@hookform/devtools";
import { handleInstitution } from "handlers";

const prevRecord = {
  institutions: [
    {
      name: "City Bank",
      country: "it",
      isDeleted: false,
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
      isDeleted: false,
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
      isDeleted: false,
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
      isDeleted: false,
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
  const isClient = typeof window !== "undefined";
  const [isInstitutionOpen, setIsInstitutionOpen] = useState(false);
  const [selectedInstitutionIndex, setSelectedInstitutionIndex] = useState(0);
  const arrayName = "institutions";
  const { control, ...form } = useForm({
    defaultValues: prevRecord,
  });
  const institutionsFieldArray = useFieldArray({
    control,
    name: arrayName,
  });

  const formMethods = {
    control,
    ...form,
    institutionsFieldArray,
    handlers: {
      handleInstitutionOpen: () => setIsInstitutionOpen((val) => !val),
      handleInstitutionSelect: (index) => setSelectedInstitutionIndex(index),
      handleInstitutionCreate: () =>
        handleInstitution.create({
          arrayAppend: institutionsFieldArray.append,
          arrayFields: institutionsFieldArray.fields,
          setSelectedInstitutionIndex,
          setIsInstitutionOpen,
        }),
      handleInstitutionDelete: (indexToDelete) =>
        handleInstitution.delete({
          indexToDelete,
          formValues: form.getValues(arrayName),
          setSelectedInstitutionIndex,
          setIsInstitutionOpen,
          formSetValue: form.setValue,
        }),
      handleInstitutionRestore: (indexToRestore) =>
        handleInstitution.restore({
          formSetValue: form.setValue,
          indexToRestore,
          setSelectedInstitutionIndex,
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
