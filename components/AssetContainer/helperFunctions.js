export const formatCurrency = (assetName, event) => {
  const modifiedValue = event.target.value.toUpperCase();
  setValue(`${assetName}.currency`, modifiedValue);
};
