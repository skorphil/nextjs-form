"use client";
import { Heading, Text } from "@chakra-ui/react";

interface handleFetchErrorProps {
    error: Error
    setFormOverlay: React.Dispatch<React.SetStateAction<OverlayProps>>
}

interface OverlayProps {
    children: React.ReactNode;
    errorMessage?: string;
    image?: string;
}

export function handleFetchError({ error, setFormOverlay }: handleFetchErrorProps): void {
    
  setFormOverlay({
    children: (
      <>
        <Heading as="h1" size="md">
          Cannot check previos record
        </Heading>
        <Text>Try to reload the page</Text>
      </>
    ),
    errorMessage: error.stack,
    image: "/server-down.svg",
  });
}
