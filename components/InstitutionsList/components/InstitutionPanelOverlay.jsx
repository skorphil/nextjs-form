import { Text, Center, Heading, VStack, Image } from "@chakra-ui/react";

export function InstitutionPanelOverlay({ image, headingText, text }) {
  return (
    <Center h="100%" p={2}>
      <VStack gap={12}>
        <Image src={image} alt="Illustration" boxSize="240px" />

        <VStack>
          <Heading textAlign="center" size="md">
            {headingText}
          </Heading>
          <Text>{text}</Text>
        </VStack>
      </VStack>
    </Center>
  );
}
