import { getLatestRecord } from "serverActions/getLatestRecord";

export async function getDefaultValues() {
  /**
   * Getting initial values for the RecordForm
   *
   * @returns object to use as react-form-hook defaultValues for RecordForm
   * or null if no records in db
   */

  const latestRecord = await getLatestRecord();
  if (latestRecord === null) return null;

  const initialValues = {
    date: latestRecord.date,
    institutions: latestRecord.institutions.map((institution) => ({
      ...institution,
      isDeleted: false,
    })),
  };

  return initialValues;
}
