/* 
Root element of the form
*/

"use client";

// import { DevTool } from "@hookform/devtools";
import classes from "./RecordForm.module.css";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, Progress, useToast } from "@chakra-ui/react";
import { InstitutionsList } from "components/InstitutionsList";
import { FormHeader } from "components/FormHeader";
import { FormStateOverlay, FormWarning } from "./components";

import { appendRecord } from "serverActions/appendRecord";
import { getDefaultValues } from "./utils";
import { handleInstitution } from "handlers";
import { handleSavingSuccess, handleSavingError } from "./handlers";

export function RecordForm() {
  const [isInstitutionOpen, setIsInstitutionOpen] = useState(false);
  const [selectedInstitutionIndex, setSelectedInstitutionIndex] =
    useState(null);
  const [formOverlay, setFormOverlay] = useState(false);
  const [warningState, setWarningState] = useState(null);
  const toast = useToast({ position: "top" });
  const router = useRouter();
  const arrayName = "institutions";
  const { control, ...form } = useForm({
    defaultValues: async () =>
      getDefaultValues({
        setFormOverlay,
        setWarningState,
        handleInstitutionCreate: formMethods.handlers.handleInstitutionCreate,
      }),
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
                      handleSavingSuccess({ toast });
                    } catch (error) {
                      handleSavingError({ toast, error });
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
