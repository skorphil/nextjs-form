/* 
Root element of the form
*/

"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import classes from "./RecordForm.module.css";
import { Button, Progress, useToast, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

import { InstitutionsList } from "components/InstitutionsList";
import { FormHeader } from "~/FormHeader";
// import { DevTool } from "@hookform/devtools";
import { handleInstitution } from "handlers";
import { useRouter } from "next/navigation";
import { appendRecord } from "serverActions/appendRecord";
// import { getLatestRecord } from "serverActions/getLatestRecord";
import { FormStateOverlay } from "./FormStateOverlay";
import { getDefaultValues } from "./utils/getDefaultValues";
import { isInCurrentMonth } from "./utils/isDateInCurrentMonth";
import { FormWarning } from "./FormWarning";

export function RecordForm() {
  const [isInstitutionOpen, setIsInstitutionOpen] = useState(false);
  const [selectedInstitutionIndex, setSelectedInstitutionIndex] = useState(0);
  const [formOverlay, setFormOverlay] = useState(false);
  const [warningState, setWarningState] = useState(null);
  const toast = useToast({ position: "top" });
  const router = useRouter();
  const arrayName = "institutions";

  const { control, ...form } = useForm({
    defaultValues: async () => {
      try {
        const initialValues = await getDefaultValues();
        if (initialValues === null) {
          setFormOverlay({
            children: (
              <>
                <Heading as="h1" size="md">
                  No institutions were added yet
                </Heading>
                <Text>Create your first institution</Text>
                <Button
                  mt={2}
                  onClick={() => {
                    formMethods.handlers.handleInstitutionCreate();
                    setFormOverlay(null);
                  }}
                >
                  Add institution
                </Button>
              </>
            ),
            image: "/empty.svg",
          });
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
        setFormOverlay({
          children: (
            <>
              <Heading as="h1" size="md">
                Cannot check previos record
              </Heading>
              <Text>Try to reload the page</Text>
            </>
          ),
          errorMessage: error.stack,
          image: "/server-down.svg",
        });
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
                  isDisabled={form.formState.isLoading || formOverlay}
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
      ) : formOverlay ? (
        <FormStateOverlay
          image={formOverlay.image}
          errorMessage={formOverlay.errorMessage}
        >
          {formOverlay.children}
        </FormStateOverlay>
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
