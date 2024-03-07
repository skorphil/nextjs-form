import { appendRecord } from "serverActions/appendRecord";

export async function handleFormSubmit({ formData, setErrorMessage }) {
  try {
    await appendRecord(formData);
    console.log("Record appended successfully.");
  } catch (error) {
    setErrorMessage(error); // Set error message in state
  }
}
