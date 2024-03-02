"use client";

import { FormControl, FormLabel, Input, HStack } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { NumericFormatWrapper } from "./NumericFormatWrapper";

export function AmountInput({ assetName, isCompact }) {
  const { register, setValue } = useFormContext();

  return (
    <HStack align="end" spacing={1} flex={1}>
      <FormControl>
        {isCompact || <FormLabel>Amount</FormLabel>}
        <Controller
          name={`${assetName}.amount`}
          render={({ field: { onChange, ...field } }) => (
            <Input
              as={NumericFormatWrapper}
              onChange={(e) => {
                onChange(parseFloat(e.target.value.replace(/[^0-9.]/g, "")));
              }}
              thousandSeparator=" "
              decimalSeparator="."
              {...field}
            />
          )}
        />
      </FormControl>
      <Input
        {...register(`${assetName}.currency`)}
        placeholder="USD"
        flexShrink={0}
        w={14}
        px={2}
      />
    </HStack>
  );
}
