"use Client";
import { FormLabel, FormControl, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export const InstitutionCountryInput = ({ institutionName, disabled }) => {
  const { register } = useFormContext();
  return (
    <FormControl w={20}>
      <FormLabel>Country</FormLabel>
      <Input
        disabled={disabled}
        {...register(`${institutionName}.country`, {})}
        px={2}
      />
    </FormControl>
  );
};
