import {
  VStack,
  Image,
  Heading,
  Text,
  Center,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  Box,
  AccordionPanel,
} from "@chakra-ui/react";

export function FetchingErrorState({ errorMessage }) {
  return (
    <VStack justifyContent="space-between" h="100%">
      <Center flexGrow={1}>
        <VStack>
          <Image
            src="/server-down.svg"
            alt="Server error illustration"
            boxSize="240px"
          />
          <Heading as="h1" size="md">
            Cannot check previos record
          </Heading>
          <Text>Try to reload the page</Text>
        </VStack>
      </Center>

      {errorMessage && (
        <Accordion w="100%" allowToggle>
          <AccordionItem borderBottomStyle="none">
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  System error message
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              fontFamily="mono"
              fontSize="xs"
              maxH="240px"
              overflow="auto"
              pb={4}
            >
              {errorMessage}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </VStack>
  );
}
