/* 
Root element of the form
*/

"use client";

import classes from "./RecordForm.module.css";
import { Input, Button, Checkbox } from "@chakra-ui/react";
import { useState } from "react";

import { InstitutionsList } from "../InstitutionsList";
import { FormHeader } from "~/FormHeader";

export default function RecordForm({ onSubmit, prevRecord }) {
  // TODO check naming conventions for submitAction server action
  const isClient = typeof window !== "undefined";

  return (
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
  );
}
