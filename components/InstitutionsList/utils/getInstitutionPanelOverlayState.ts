import { DefaultValues, FieldValues, UseFormGetValues } from "react-hook-form";

/**
 * Function for deriving the InstitutionPanelOverlay state
 * from useFormContext
 */
export function getInstitutionPanelOverlayState(defaultValues:DefaultValues<FieldValues>, getValues:UseFormGetValues<FieldValues>) {
    const formValues = getValues("institutions");
    const isAllDeleted = isAllInstitutionsDeleted(formValues);
    const isFetchedPrevious = isFetchedPreviousRecords(defaultValues, isAllDeleted);
//   console.log("isFetchedPrevious TS", isFetchedPrevious);
//   console.log("isAllDeleted TS", isAllDeleted);

if (isFetchedPrevious && !isAllDeleted) {
    return 'success'
  } else if (isAllDeleted) {
    return 'allDeleted'
  } else return false;
}

function isAllInstitutionsDeleted(formValues) {
    const institutionsIndexes = formValues.map((institution, index) => ({
      index,
      isDeleted: institution.isDeleted,
    }));
    const availableIndexes = institutionsIndexes
      .filter((institution) => institution.isDeleted != true)
      .map((institution) => institution.index);
  
    if (institutionsIndexes.length > 0 && availableIndexes.length == 0) {
      return true;
    } else return false;
  }
  
  function isFetchedPreviousRecords(defaultValues, isAllDeleted) {
    if (defaultValues.institutions && !isAllDeleted) {
      return true;
    } else return false;
  }
  