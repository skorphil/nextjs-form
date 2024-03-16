/*
Root element of the form
*/
"use client";
import { Button, Heading, Text } from "@chakra-ui/react";

export function handleEmptyState({ setFormOverlay, handleInstitutionCreate }) {
  setFormOverlay({
    children: (
      <>
        <Heading as="h1" size="md">
          No institutions were added yet
        </Heading>
        <Text>Create your first institution</Text>
        <Button
          mt={2}
          onClick={() => {
            handleInstitutionCreate();
            setFormOverlay(null);
          }}
        >
          Add institution
        </Button>
      </>
    ),
    image: "/empty.svg",
  });
}
