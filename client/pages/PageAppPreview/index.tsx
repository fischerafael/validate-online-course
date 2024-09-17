"use client";

import { actionPublishLP } from "@/client/actions";
import { Header } from "@/client/components/Header";
import { LandingPage } from "@/client/components/LandingPage";
import { pages } from "@/client/config/pages";
import { useAuth } from "@/client/hooks/useAuth";
import { useCourseState } from "@/client/hooks/useCourseState";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const PageAppPreview = () => {
  const { state } = useCourseState();
  const { methods } = useAuth();

  const { push } = useRouter();

  console.log("[companyId]", methods.getCompanyId());

  const onEdit = () => {
    push(pages.appReview.href);
  };

  const onPublishLp = () => {
    try {
      actionPublishLP({
        companyId: methods.getCompanyId()!,
        companyOwner: methods.getAuthState()?.email!,
        content: state.courseContentLandingPage,
        slug: "",
        title: "",
      });
    } catch (e: any) {}
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
          <Chakra.Button textTransform="capitalize" onClick={onTryDiffSettings}>
            Try something different
          </Chakra.Button>

          <Chakra.HStack>
            <Chakra.Button textTransform="capitalize" onClick={onEdit}>
              Edit Copy
            </Chakra.Button>
            <Chakra.Button
              textTransform="capitalize"
              bg="gray.900"
              color="white"
              onClick={onPublishLp}
            >
              Publish Landing Page
            </Chakra.Button>
          </Chakra.HStack>
        </Chakra.HStack>
      </Chakra.VStack>
    </Chakra.VStack>
  );
};
