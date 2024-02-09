import { Button, ButtonGroup, Heading, HStack } from "@chakra-ui/react";

export function FormHeader({ rightButtons, text }) {
  return (
    <HStack gap={4} p={2} justifyContent="space-between">
      <Heading
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
        size="lg"
      >
        {text}
      </Heading>

      <ButtonGroup>{rightButtons}</ButtonGroup>
    </HStack>
  );
}

// const rightButton = (
//   <>
//     <Button variant="outline">Cancel</Button>
//     <Button>Save</Button>
//   </>
// );
