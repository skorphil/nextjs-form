"use client";
export function handleSavingError({ toast, error }) {
  toast({
    title: "Error saving record",
    description: error.message,
    status: "error",
    isClosable: true,
  });
}
