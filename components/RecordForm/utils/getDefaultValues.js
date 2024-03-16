import { getLatestRecord } from "serverActions/getLatestRecord";
import {
  handleFetchError,
  handleEmptyState,
  handleRecordExist,
} from "../handlers";
import { isInCurrentMonth } from "./isDateInCurrentMonth";

export async function getDefaultValues({
  setFormOverlay,
  handleInstitutionCreate,
  setWarningState,
}) {
  /**
   * Get initial values for the RecordForm and handling errors and warnings,
   * based on received values
   *
   * @param setFormOverlay - state setter from RecordForm
   * @param setWarningState - state setter from RecordForm
   * @param handleInstitutionCreate - handler from formMethods whith arguments
   * from RecordForm
   *
   * @returns object to use as react-form-hook defaultValues for {@link RecordForm}
   * or void if errors / empty states
   */

  let latestRecord = null;
  try {
    latestRecord = await getLatestRecord();
  } catch (error) {
    handleFetchError({ error, setFormOverlay });
    return;
  }
  if (latestRecord === null) {
    handleEmptyState({
      setFormOverlay,
      handleInstitutionCreate,
    });
    return null;
  } else if (isInCurrentMonth(latestRecord.date)) {
    handleRecordExist({
      existingRecordDate: latestRecord.date,
      setWarningState,
    });
  }

  const initialValues = {
    institutions: latestRecord.institutions.map((institution) => ({
      ...institution,
      isDeleted: false,
    })),
  };

  return initialValues;
}
