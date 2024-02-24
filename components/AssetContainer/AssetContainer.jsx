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
  NumberInput,
  NumberInputField,
  VStack,
  HStack,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useFormContext } from "react-hook-form";

// TODO format registered number input
// TODO format currency to all caps
// TODO currency validation and autocomplete based on external API
export function AssetContainer({
  assetName,
  isCompact = false,
  onDeleteAsset,
}) {
  const { register, setValue, getFieldState, formState } = useFormContext();
  // const { isDirty } = getFieldState(`${assetName}`, formState);

  const amountInput = (
    <HStack align="end" spacing={1} flex={1}>
      {/* <p>{`fieldState: ${isDirty}`}</p> */}
      <FormControl>
        {isCompact || <FormLabel>Amount</FormLabel>}
        <NumberInput>
          <NumberInputField
            {...register(`${assetName}.amount`, { valueAsNumber: true })}
            px={2}
          />
        </NumberInput>
      </FormControl>
      <Input
        {...register(`${assetName}.currency`, {
          onChange: (e) => {
            const upperCaseValue = e.target.value.toUpperCase();
            setValue(`${assetName}.currency`, upperCaseValue);
          },
        })}
        placeholder="USD"
        flexShrink={0}
        w={14}
        px={2}
      />
    </HStack>
  );

  return (
    <VStack align="start" spacing={3} w="100%">
      <HStack w="100%" align="end" spacing={4}>
        {amountInput}
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

// const [amount, setAmount] = useState(0);
// const numFormat = (val) => val.toLocaleString();
// const parse = (val) => Number(val.replace(/^\$/, ""));
