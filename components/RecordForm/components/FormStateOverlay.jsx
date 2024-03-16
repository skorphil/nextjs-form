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

export function FormStateOverlay({ image, errorMessage, children }) {
  /**
   * Overlay to display errors or states in RecordForm
   */
  return (
    <VStack justifyContent="space-between" h="100%">
      <Center flexGrow={1}>
        <VStack>
          {image && (
            <Image
              src={image}
              alt="Server error illustration"
              boxSize="240px"
            />
          )}
          {children}
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
