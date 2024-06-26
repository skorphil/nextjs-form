"use client";
export function handleRecordExist({ existingRecordDate, setFormAlert }) {
  setFormAlert({
    heading: `Record from ${new Date(existingRecordDate).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "long",
      }
    )} will be replaced`,
    message: `There is a saved record for this month already.
    Saving current record will override that.`,
    isVisible: true,
  });
}
