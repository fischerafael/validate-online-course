"use client";

import { Header } from "@/client/components/Header";
import { LandingPage } from "@/client/components/LandingPage";
import { useCourseState } from "@/client/hooks/useCourseState";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const PageAppNewPreview = () => {
  const { state } = useCourseState();

  const { push } = useRouter();

  const onEdit = () => {
    push(`/app/course/edit`);
  };

  return (
    <Chakra.VStack w="full" align="center" p="8" spacing="8">
      <Header />
      <Chakra.VStack maxW="800px" w="full" gap="8">
        <Chakra.VStack
          w="full"
          shadow="xl"
          overflow="hidden"
          borderRadius="lg"
          border="1px"
          borderColor="gray.200"
        >
          <LandingPage content={state.landingPageContent} />
        </Chakra.VStack>

        <Chakra.HStack w="full" justify="space-between">
          <Chakra.Button onClick={onEdit}>
            Edit Course Landing Page
          </Chakra.Button>
          <Chakra.Button
            isDisabled={!state.isAllValuesFilled}
            onClick={() => {}}
          >
            Publish Course Landing Page
          </Chakra.Button>
        </Chakra.HStack>
      </Chakra.VStack>
    </Chakra.VStack>
  );
};
