import { RecordForm } from "~/RecordForm";
import { Center } from "@chakra-ui/react";
export default function Page() {
  return (
    <Center zIndex={999} pos="fixed" w="100%">
      <RecordForm />
    </Center>
  );
}
