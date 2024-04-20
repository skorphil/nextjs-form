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

/**
 * Alert, appended to the top of RecordForm. Used for non-blocking warnings or information.
 * Can be expanded and explicitly closed until reload of the form.
 * @param {string} heading - heading text (always visible)
 * @param {string} message - collapsed text
 * @param {function} [onHide] - handler for hideWarning button
 * @returns
 */
export function FormAlert({ heading, message, onHide }) {
  return (
    <Box bg="yellow.900" m={2} borderRadius="md">
      <Accordion w="100%" allowToggle>
        <AccordionItem borderStyle="none">
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {heading}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel maxH="180px" overflow="auto" pb={4}>
            <Text>{message}</Text>
            {onHide && (
              <Button mt={2} variant="link" onClick={onHide}>
                Hide warning
              </Button>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
