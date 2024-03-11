"use client";

import { Box, Button, Center } from "@chakra-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RecordForm } from "~/RecordForm";
import { getLatestRecord } from "serverActions/getLatestRecord";

export default function Home() {
  // const isClient = typeof window !== "undefined";
  const isFormOpen = useSearchParams().get("newrecord");

  return (
    <>
      {isFormOpen && (
        <Center
          h="100dvh"
          pos="absolute"
          width="100%"
          bg="rgb(0 0 0 / 0.8)"
          zIndex="overlay"
        >
          <Box
            display="flex"
            flexDir="column"
            bg="chakra-body-bg"
            borderRadius={[0, "md"]}
            h={["100%", "90%"]}
            w="100%"
            maxW={[null, "28em"]}
            overflow="hidden"
          >
            <RecordForm />
          </Box>
        </Center>
      )}
      <main>
        <Button onClick={async () => getLatestRecord()}>
          Log latest record
        </Button>
        <nav>
          <Link href="/?newrecord=true">Add record</Link>
        </nav>
        main page
      </main>
    </>
  );
}
