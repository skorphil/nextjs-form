import {
  Button,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  Box,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";

export function FormWarning({ heading, message, onHide }) {
  return (
    <Box bg="yellow.900" m={2} borderRadius="md">
      <Accordion w="100%" allowToggle>
        <AccordionItem borderStyle="none">
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {heading}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel maxH="180px" overflow="auto" pb={4}>
            <Text>{message}</Text>
            <Button mt={2} variant="link" onClick={onHide}>
              Hide warning
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
