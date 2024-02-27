/* 
Function set use-form-hook hidden field value (`institutions[ID].isDeleted`) = true,
selects next available(not deleted) institution
and set open state to false

Requires:
- index to delede
- formValues from { getValues } = useForm()
- access to state of RecordForm
- access to { setValue } = useForm()
*/

export function handleInstitutionDelete({
  indexToDelete,
  formValues,
  setSelectedInstitutionIndex,
  setIsInstitutionOpen,
  formSetValue,
}) {
  const nextIndex = getNextInstitutionIndex({
    currentIndex: indexToDelete,
    formValues,
  });
  formSetValue(`institutions.${indexToDelete}.isDeleted`, true);
  setSelectedInstitutionIndex(nextIndex);
  setIsInstitutionOpen(false);
}

function getNextInstitutionIndex({ currentIndex, formValues }) {
  const institutionsIndexes = formValues.map((institution, index) => ({
    index,
    isDeleted: institution.isDeleted,
  }));
  const availableIndexes = institutionsIndexes
    .filter((institution) => institution.isDeleted != true)
    .map((institution) => institution.index);
  const nextNumber = (number, array) => {
    if (array.length <= 1) {
      return null; // TODO Implement empty state
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i] > number) {
        return array[i] || array[0];
      }
    }
    return array[0];
  };
  return nextNumber(currentIndex, availableIndexes);
}
