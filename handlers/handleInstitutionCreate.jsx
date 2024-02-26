/* 
Function appends new array item,
selects newly appended item,
and set open state to open created institution.

Requires:
- access to state of RecordForm
- access to useFieldArray() methods
*/

const defaultNewInstitutionValues = {
  name: "",
  country: "",
  assets: [
    {
      amount: "",
      currency: "",
      isEarning: false,
      description: "",
    },
  ],
};

export function handleInstitutionCreate({
  arrayAppend,
  arrayFields,
  setSelectedInstitutionIndex,
  setIsInstitutionOpen,
}) {
  const newInstitutionIndex = arrayFields.length;

  arrayAppend(defaultNewInstitutionValues);
  setSelectedInstitutionIndex(newInstitutionIndex);
  setIsInstitutionOpen(true);
}
