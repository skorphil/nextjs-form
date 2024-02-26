"use Client";

// TODO add animation transaction from collapsed do expanded

import {
  Heading,
  VStack,
  FormLabel,
  FormControl,
  Input,
  IconButton,
  HStack,
  Button,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";
import { AssetContainer } from "~/AssetContainer";
import { CgMinimizeAlt, CgPen } from "react-icons/cg";
import { useFormContext, useFieldArray } from "react-hook-form";
import { FormHeader } from "~/FormHeader";

// TODO fixed header
// TODO Fix keyboard openLayout
// TODO Update stories to suit use-form
export function InstitutionContainer({ institutionName, isInstitutionOpen }) {
  // console.log("InstitutionContainer Rendered");
  const { getValues, handlers: formHandlers = { handleInstitutionOpen } } =
    useFormContext();

  return (
    <VStack
      bg="gray.800"
      borderRadius={isInstitutionOpen || "lg"}
      h="fit-content"
      minHeight="100%"
    >
      {isInstitutionOpen && (
        <Box
          borderBottom="1px"
          borderColor="whiteAlpha.200"
          bg="gray.800"
          position="fixed"
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
        h="100%"
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
            <InstitutionNameInput institutionName={institutionName} />
            <InstitutionCountryInput institutionName={institutionName} />
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

const ExpandedHeader = () => {
  return (
    <HStack
      as="header"
      zIndex={129}
      overflow="hidden"
      pos="fixed"
      top={0}
      w="100%"
      align="center"
      spacing={3}
      justify={"space-between"}
    >
      <Heading size="md">Edit Institution</Heading>
      <IconButton
        variant="solid"
        aria-label="Minimize institution form"
        icon={<CgMinimizeAlt />}
      />
    </HStack>
  );
};

const AssetsList = ({ isInstitutionOpen, institutionName }) => {
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
    getValues, // for testing
    setValue, // for testing
    handlers: { handleInstitutionDelete },
    // formState: { defaultValues },
  } = useFormContext();

  return (
    <VStack
      p="1px"
      w="100%"
      overflow="auto"
      spacing={isInstitutionOpen ? 6 : 2}
      align="start"
    >
      {/* {getValues(`${institutionName}.isDeleted`) && <p>deleted institution</p>} */}
      {assets.map((asset, index) => (
        <AssetContainer
          key={asset.id}
          onDeleteAsset={() => remove(index)}
          assetName={`${arrayName}.${index}`}
          isCompact={!isInstitutionOpen}
        />
      ))}
      {/* TEST HERE */}
      <Button onClick={() => console.log("assets:", assets)}>Log assets</Button>
      {/* <Button onClick={() => console.log("dirtyFields:", dirtyFields)}>
        Log dirty
      </Button> */}
      <Button onClick={() => setValue(`${institutionName}.isDeleted`, true)}>
        set isDeleted Value
      </Button>
      <Button onClick={() => console.log(getValues(`${institutionName}`))}>
        get institution Values
      </Button>
      <Button onClick={() => console.log(defaultValues.institutions[0])}>
        get DefaultValues of institution
      </Button>

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

const InstitutionNameInput = ({ institutionName }) => {
  const { register } = useFormContext();
  return (
    <FormControl>
      <FormLabel>Institution Name</FormLabel>
      <Input
        disabled={true}
        {...register(`${institutionName}.name`, {
          // disabled: true, // Not showing it inside header with `getValues` or `watch`.
        })}
        px={2}
        w="100%"
      />
    </FormControl>
  );
};

const InstitutionCountryInput = ({ institutionName }) => {
  const { register } = useFormContext();
  return (
    <FormControl w={20}>
      <FormLabel>Country</FormLabel>
      <Input
        disabled={true}
        {...register(`${institutionName}.country`, {})}
        px={2}
      />
    </FormControl>
  );
};

const CompactHeader = ({ text, onEdit }) => {
  return (
    <HStack justifyContent="space-between" w="100%">
      <Heading flexShrink={0} size="sm">
        {text}
      </Heading>
      <IconButton
        onClick={onEdit}
        variant="ghost"
        aria-label="Edit institution"
        icon={<CgPen />}
      />
    </HStack>
  );
};
