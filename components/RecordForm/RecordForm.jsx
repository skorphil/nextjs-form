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
// import { getLatestRecord } from "serverActions/getLatestRecord";
import { FetchingErrorState } from "./FetchingErrorState";
import { getDefaultValues } from "./utils/getDefaultValues";
import { isInCurrentMonth } from "./utils/isDateInCurrentMonth";
import { FormWarning } from "./FormWarning";

export function RecordForm() {
  const [isInstitutionOpen, setIsInstitutionOpen] = useState(false);
  const [selectedInstitutionIndex, setSelectedInstitutionIndex] = useState(0);
  const [errorState, setErrorState] = useState(false);
  const [warningState, setWarningState] = useState(null);
  const toast = useToast({ position: "top" });
  const router = useRouter();
  const arrayName = "institutions";

  const { control, ...form } = useForm({
    defaultValues: async () => {
      try {
        const initialValues = await getDefaultValues();
        if (initialValues === null) {
          console.log("no def values");
        } else if (isInCurrentMonth(initialValues.date)) {
          setWarningState({
            heading: `Record from ${new Date(
              initialValues.date
            ).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
            })} will be replaced`,
            message: `There is a saved record for this month already.
            Saving current record will override that.`,
            isVisible: true,
          });
        }
        return initialValues;
      } catch (error) {
        setErrorState(error.stack);
      }
    },
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
        <>
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
                  onClick={formMethods.handleSubmit(async (data) => {
                    try {
                      await appendRecord(data);
                      router.push("/");
                      toast({
                        title: "Record saved",
                        status: "success",
                        duration: 3000,
                      });
                    } catch (error) {
                      toast({
                        title: "Error saving record",
                        description: error.message,
                        status: "error",
                        isClosable: true,
                      });
                    }
                  })}
                >
                  Save
                </Button>
              </>
            }
          />
          {warningState?.isVisible && (
            <FormWarning
              {...warningState}
              onHide={() =>
                setWarningState((current) => ({
                  ...current,
                  isVisible: false,
                }))
              }
            />
          )}
        </>
      )}

      {form.formState.isLoading ? (
        <Progress size="xs" isIndeterminate />
      ) : errorState ? (
        <FetchingErrorState errorMessage={errorState} />
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
