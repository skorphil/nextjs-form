/* 
Root element of the form
*/

"use client";

import { useForm, FormProvider } from "react-hook-form";

import classes from "./RecordForm.module.css";
import { Button, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { CgMinimizeAlt } from "react-icons/cg";

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
  // TODO check naming conventions for submitAction server action
  const isClient = typeof window !== "undefined";
  const [isIntitutionOpen, setIsInstitutionOpen] = useState(false);

  const handleInstitutionOpen = () => {
    setIsInstitutionOpen((val) => !val);
  };

  const formMethods = {
    ...useForm({
      defaultValues: prevRecord,
    }),
    handlers: {
      handleInstitutionOpen: handleInstitutionOpen,
    },
  };

  return (
    <FormProvider {...formMethods}>
      <form className={classes.RecordForm} /* action={onSubmit} */>
        {isIntitutionOpen || (
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
          isIntitutionOpen={isIntitutionOpen}
          // institutions={prevRecord.institutions}
        />
      </form>
      <DevTool control={formMethods.control} />
    </FormProvider>
  );
}
