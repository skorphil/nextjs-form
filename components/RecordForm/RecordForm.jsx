/* 
Root element of the form
*/

"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import classes from "./RecordForm.module.css";
import { Button, Progress, useToast } from "@chakra-ui/react";
import { useState } from "react";

import { InstitutionsList } from "components/InstitutionsList";
import { FormHeader } from "~/FormHeader";
// import { DevTool } from "@hookform/devtools";
import { handleInstitution } from "handlers";
import { useRouter } from "next/navigation";
import { appendRecord } from "serverActions/appendRecord";
import { getLatestRecord } from "serverActions/getLatestRecord";

export function RecordForm() {
  const [isInstitutionOpen, setIsInstitutionOpen] = useState(false);
  const [selectedInstitutionIndex, setSelectedInstitutionIndex] = useState(0);
  const router = useRouter();
  const arrayName = "institutions";

  const { control, ...form } = useForm({
    defaultValues: async () => getLatestRecord(),
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
      {isInstitutionOpen || (
        <FormHeader
          text="New Record"
          rightButtons={
            <>
              <Button
                onClick={() => {
                  router.push("/");
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={formMethods.handleSubmit((data) => {
                  appendRecord(data);
                })}
              >
                Save
              </Button>
            </>
          }
        />
      )}
      {form.formState.isLoading ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <form className={classes.RecordForm}>
          <InstitutionsList
            isInstitutionOpen={isInstitutionOpen}
            selectedInstitution={selectedInstitutionIndex}
          />
        </form>
      )}
      {/* <DevTool control={formMethods.control} /> */}
    </FormProvider>
  );
}
