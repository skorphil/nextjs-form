"use Client";
import { VStack, Button, ButtonGroup } from "@chakra-ui/react";
import { AssetContainer } from "~/AssetContainer";
import { useFormContext, useFieldArray } from "react-hook-form";

export const AssetsList = ({ isInstitutionOpen, institutionName }) => {
  const arrayName = `${institutionName}.assets`;
  const institutionIndex = parseInt(institutionName.split(".")[1]);
  // console.log("AssetsList rendered");
  const {
    fields: assets,
    remove,
    append,
  } = useFieldArray({
    name: arrayName,
  });
  const {
    resetField,
    handlers: { handleInstitutionDelete },
  } = useFormContext();

  return (
    <VStack p="1px" w="100%" spacing={isInstitutionOpen ? 6 : 2} align="start">
      {assets.map((asset, index) => (
        <AssetContainer
          key={asset.id}
          onDeleteAsset={() => remove(index)}
          assetName={`${arrayName}.${index}`}
          isCompact={!isInstitutionOpen}
        />
      ))}

      {isInstitutionOpen && (
        <>
          <Button
            onClick={() =>
              append({
                amount: "",
                currency: "",
                isEarning: false,
                description: "",
              })
            }
            flexShrink={0}
          >
            Add Asset
          </Button>
          <ButtonGroup alignSelf="end">
            <Button
              variant="outline"
              onClick={() => handleInstitutionDelete(institutionIndex)}
            >
              Delete
            </Button>
            <Button onClick={() => resetField(arrayName)} variant="outline">
              Reset
            </Button>
          </ButtonGroup>
        </>
      )}
    </VStack>
  );
};
