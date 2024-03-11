import { useToast } from "@chakra-ui/react";

export function SlowLoadingToast() {
  const toast = useToast();
  toast({
    title: "Account created.",
    description: "We've created your account for you.",
    status: "success",
    duration: 5000,
    isClosable: true,
  });
}
