"use Client";
import { FormLabel, FormControl, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export const InstitutionNameInput = ({ institutionName, disabled }) => {
  const { register } = useFormContext();
  return (
    <FormControl>
      <FormLabel>Institution Name</FormLabel>
      <Input
        disabled={disabled}
        {...register(`${institutionName}.name`, {})}
        px={2}
        w="100%"
      />
    </FormControl>
  );
};
