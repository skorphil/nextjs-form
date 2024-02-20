/* 
Root element of the form
*/

"use client";

import { useForm, FormProvider } from "react-hook-form";

import classes from "./RecordForm.module.css";
import { Input, Button, Checkbox } from "@chakra-ui/react";
import { useState } from "react";

import { InstitutionsList } from "../InstitutionsList";
import { FormHeader } from "~/FormHeader";

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

  const formMethods = useForm({
    defaultValues: prevRecord,
  });

  return (
    <FormProvider {...formMethods}>
      <form className={classes.RecordForm} /* action={onSubmit} */>
        <FormHeader
          text="New Record"
          rightButtons={
            <>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </>
          }
        />
        <InstitutionsList institutions={prevRecord.institutions} />
      </form>
      <Button onClick={() => console.log(formMethods.getValues())}>
        console.log form data
      </Button>
    </FormProvider>
  );
}
