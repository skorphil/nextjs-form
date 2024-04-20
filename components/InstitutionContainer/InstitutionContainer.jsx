"use Client";

// TODO add animation transaction from collapsed do expanded

import { VStack, IconButton, HStack, Box } from "@chakra-ui/react";
import { CgMinimizeAlt } from "react-icons/cg";
import { useFormContext } from "react-hook-form";
import { FormHeader } from "~/FormHeader";
import { InstitutionNameInput } from "./InstitutionNameInput";
import { InstitutionCountryInput } from "./InstitutionCountryInput";
import { CompactHeader } from "./CompactHeader";
import { AssetsList } from "./AssetsList";

// TODO fixed header
// TODO Fix keyboard openLayout
// TODO Update stories to suit use-form
export function InstitutionContainer({ institutionName, isInstitutionOpen }) {
  const {
    getValues,
    institutionsFieldArray,
    handlers: formHandlers = { handleInstitutionOpen },
  } = useFormContext();

  console.log("container getValues", getValues("institutions"));
  // Fast solution to allow edit name of newly created institution
  // Will be replaced whith https://github.com/users/skorphil/projects/4/views/1?pane=issue&itemId=53834705
  const institutionIndex = parseInt(institutionName.split(".")[1]);
  const institutionFields = institutionsFieldArray.fields[institutionIndex];
  const isNew = institutionFields.name === "";

  return (
    <VStack
    // bg="gray.800"
    // borderRadius={isInstitutionOpen || "lg"}
    // h="100%"
    // minHeight="100%"
    >
      {isInstitutionOpen && (
        <Box
          borderBottom="1px"
          borderColor="whiteAlpha.200"
          bg="gray.800"
          position="absolute"
          w="100%"
          zIndex={1300}
        >
          <FormHeader
            text="Edit Institution"
            rightButtons={
              <IconButton
                onClick={formHandlers.handleInstitutionOpen}
                variant="solid"
                aria-label="Minimize institution form"
                icon={<CgMinimizeAlt />}
              />
            }
          />
        </Box>
      )}
      <VStack
        marginTop={isInstitutionOpen && 16}
        flexGrow={1}
        w="100%"
        alignItems="start"
        overflow="auto"
        flexShrink={1}
        spacing={isInstitutionOpen ? 8 : 2}
        padding={isInstitutionOpen ? 2 : 3}
      >
        {isInstitutionOpen || (
          <CompactHeader
            onEdit={formHandlers.handleInstitutionOpen}
            text={getValues(`${institutionName}.name`)}
          />
        )}
        {isInstitutionOpen && (
          <HStack w="100%" align="end" spacing={3}>
            <InstitutionNameInput
              institutionName={institutionName}
              disabled={!isNew}
            />
            <InstitutionCountryInput
              institutionName={institutionName}
              disabled={!isNew}
            />
          </HStack>
        )}
        <AssetsList
          isInstitutionOpen={isInstitutionOpen}
          institutionName={institutionName}
        />
      </VStack>
    </VStack>
  );
}
