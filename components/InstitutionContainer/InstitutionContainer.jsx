"use Client";

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
} from "@chakra-ui/react";
import AssetContainer from "../AssetContainer/AssetContainer";
import { CgMinimizeAlt } from "react-icons/cg";

export function InstitutionContainer({
  institution,
  assetContainer,
  isExpanded,
}) {
  return (
    <>
      <VStack
        alignItems="start"
        pos="relative"
        spacing={isExpanded ? 8 : 4}
        borderRadius={isExpanded || "lg"}
        padding={isExpanded ? 2 : 3}
        bg="whiteAlpha.50"
        h="100%"
        minHeight={isExpanded && "100vh"}
      >
        {isExpanded || (
          <Heading flexShrink={0} size="sm">
            {institution.name}
          </Heading>
        )}
        {isExpanded && (
          <HStack w="100%" align="end" spacing={3}>
            <InstitutionNameInput />
            <InstitutionCountryInput />
          </HStack>
        )}
        <AssetsList isExpanded={isExpanded} institution={institution} />
        {isExpanded || (
          <Button flexShrink={0} variant="outline" w="100%">
            Edit
          </Button>
        )}
      </VStack>
    </>
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

const AssetsList = ({ isExpanded, institution }) => {
  return (
    <VStack
      height="100%"
      // maxHeight={isExpanded ? false : "166px"}
      w="100%"
      overflow="auto"
      spacing={isExpanded ? 6 : 2}
      align="start"
    >
      {institution.assets.map((asset, index) => (
        <AssetContainer
          key={`asset-${index}`}
          isExpanded={isExpanded}
          asset={asset}
        />
      ))}

      {isExpanded && (
        <>
          <Button flexShrink={0}>Add Asset</Button>
          <ButtonGroup alignSelf="end">
            <Button variant="outline">Delete</Button>
            <Button variant="outline">Reset</Button>
          </ButtonGroup>
        </>
      )}
    </VStack>
  );
};

const InstitutionNameInput = ({ name }) => {
  return (
    <FormControl>
      <FormLabel name="institutionName">Institution Name</FormLabel>
      <Input px={2} w="100%" />
    </FormControl>
  );
};

const InstitutionCountryInput = ({ country }) => {
  return (
    <FormControl w={20}>
      <FormLabel name="institutionName">Country</FormLabel>
      <Input px={2} />
    </FormControl>
  );
};
