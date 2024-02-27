/* 
Function set react-hook-form hidden field value (`institutions[ID].isDeleted`) = false,
selects restored institution

Requires:
- index to restore
- formSetValue == { getValues } = useForm()
- access to state of RecordForm
*/

export function handleInstitutionRestore({
  indexToRestore,
  formSetValue,
  setSelectedInstitutionIndex,
}) {
  formSetValue(`institutions.${indexToRestore}.isDeleted`, false);
  setSelectedInstitutionIndex(indexToRestore);
}
