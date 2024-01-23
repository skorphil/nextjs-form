import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  NumberInput,
  NumberInputField,
  VStack,
  HStack,
  Checkbox,
  IconButton,
  InputGroup,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon, SearchIcon } from "@chakra-ui/icons";

export default function AssetContainer() {
  const [isExpanded, setIsExpanded] = useState(false);

  // TODO add 1,000.00 format
  // TODO Look at boilerplate how to bettr make 2 versions (multiple returns kinda bad)
  // TODO do i need input labels?

  return (
    <VStack align="start">
      <HStack w="100%" align="end" spacing={4}>
        <HStack align="end" spacing={1} flex={1}>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <NumberInput>
              <NumberInputField px={2} />
            </NumberInput>
          </FormControl>
          <Input placeholder="USD" flexShrink={0} w={14} px={2} />
        </HStack>
        <Checkbox h={10} size="lg">
          Asset
        </Checkbox>
        <IconButton
          variant="ghost"
          aria-label="Delete asset"
          icon={<DeleteIcon />}
        />
      </HStack>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input px={2} />
      </FormControl>
    </VStack>
  );
}
