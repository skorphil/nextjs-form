"use Client";
import { Heading, IconButton, HStack } from "@chakra-ui/react";
import { CgPen } from "react-icons/cg";

export const CompactHeader = ({ text, onEdit }) => {
  return (
    <HStack justifyContent="space-between" w="100%">
      <Heading flexShrink={0} size="sm">
        {text}
      </Heading>
      <IconButton
        onClick={onEdit}
        variant="ghost"
        aria-label="Edit institution"
        icon={<CgPen />}
      />
    </HStack>
  );
};
