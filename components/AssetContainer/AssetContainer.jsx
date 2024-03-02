/* 
Component represent the instance of asset inside of the institution.
Fields
  {
    amount: number,
    currency: string,
    description: string,
    isEarning: bool,
  }
Listeners
  deleteAssetButton
Output
  expanded or compact variant
*/

"use client";

import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useFormContext } from "react-hook-form";
import { AmountInput } from "./AmountInput";

// TODO format registered number input
// TODO format currency to all caps
// TODO currency validation and autocomplete based on external API
export function AssetContainer({
  assetName,
  isCompact = false,
  onDeleteAsset,
}) {
  const { register } = useFormContext();

  return (
    <VStack align="start" spacing={3} w="100%">
      <HStack w="100%" align="end" spacing={4}>
        {/* {amountInput} */}
        <AmountInput assetName={assetName} isCompact={isCompact} />
        {isCompact || (
          <Checkbox {...register(`${assetName}.isEarning`)} h={10} size="lg">
            Earning
          </Checkbox>
        )}
        <IconButton
          onClick={onDeleteAsset}
          variant="ghost"
          aria-label="Delete asset"
          icon={<DeleteIcon />}
        />
      </HStack>

      {isCompact || (
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input {...register(`${assetName}.description`)} px={2} />
        </FormControl>
      )}
    </VStack>
  );
}
