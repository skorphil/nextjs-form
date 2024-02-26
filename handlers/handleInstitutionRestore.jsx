/*
Root element of the form
*/
"use client";

function handleInstitutionRestore({
  indexToRestore,
  setValue,
  setSelectedIndex,
}) {
  setValue("institutions[institutionIndex].isDeleted", false);
  handleTabsChange({ index: institutionIndex, setSelectedIndex });
}
