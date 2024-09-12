"use client";

import { Header } from "@/client/components/Header";
import { LandingPage } from "@/client/components/LandingPage";
import { pages } from "@/client/config/pages";
import { useCourseState } from "@/client/hooks/useCourseState";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const PageAppPreview = () => {
  const { state } = useCourseState();

  const { push } = useRouter();

  const onEdit = () => {
    push(pages.appReview.href);
  };

  const onPublishLp = () => {
    alert("publish");
  };

  const onTryDiffSettings = () => {
    push(pages.appNew.href);
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
          borderColor="gray.300"
        >
          <LandingPage content={state.courseContentLandingPage} />
        </Chakra.VStack>

        <Chakra.HStack w="full" justify="space-between">
          <Chakra.Button onClick={onTryDiffSettings}>
            Try different settings
          </Chakra.Button>

          <Chakra.HStack>
            <Chakra.Button onClick={onEdit}>
              Edit Content Manually
            </Chakra.Button>
            <Chakra.Button bg="gray.900" color="white" onClick={onPublishLp}>
              Publish Course Landing Page
            </Chakra.Button>
          </Chakra.HStack>
        </Chakra.HStack>
      </Chakra.VStack>
    </Chakra.VStack>
  );
};
