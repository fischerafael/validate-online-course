"use client";

import { actionCreateTransaction, actionPublishLP } from "@/client/actions";
import { Header } from "@/client/components/Header";
import { LandingPage } from "@/client/components/LandingPage";
import { pages } from "@/client/config/pages";
import { useAuth } from "@/client/hooks/useAuth";
import { useCourseState } from "@/client/hooks/useCourseState";
import { payment } from "@/payment/config";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const PageAppPreview = () => {
  const { methods: methodsAuth, state: stateAuth } = useAuth();
  const { state } = useCourseState();
  const { push } = useRouter();
  const toast = Chakra.useToast();
  const [isLoading, setLoading] = useState(false);

  const onEdit = () => {
    push(pages.appReview.href);
  };

  const onPublishLp = async () => {
    try {
      setLoading(true);
      await actionPublishLP({
        companyId: methodsAuth.getCompanyId()!,
        companyOwner: methodsAuth.getAuthState()?.email!,
        content: state.courseContentLandingPage,
        slug: "",
        title: state.courseAI.title,
        successLink: state.courseAI.successLink,
      });
      await actionCreateTransaction({
        email: methodsAuth.getAuthState()?.email!,
        product: JSON.stringify({
          product: payment.prices.publishLandingPage.title,
        }),
        quantity: payment.prices.publishLandingPage.quantity,
        total: payment.prices.publishLandingPage.quantity,
        type: "debit",
        status: "confirmed",
      });
      toast({
        title: "Success!",
        variant: "success",
      });
      push(pages.app.href);
    } catch (e: any) {
      console.log("[e]", e);
      toast({
        title: "Error!",
        description: e?.message,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onTryDiffSettings = () => {
    push(pages.appNew.href);
  };

  return (
    <Chakra.VStack w="full" align="center" p="8" spacing="8">
      <Header
        logoSlot={
          <Chakra.HStack>
            <Chakra.Avatar
              size="sm"
              name={methodsAuth.getAuthState()?.name}
              src={methodsAuth.getAuthState()?.avatarURL}
            />
            <Chakra.VStack spacing="0" align="flex-start">
              <Chakra.Text fontSize="md" w="fit-content">
                {methodsAuth.getAuthState()?.name}
              </Chakra.Text>
              <Chakra.HStack>
                <Chakra.Text fontSize="xs" w="fit-content">
                  {methodsAuth.getAuthState()?.email}
                </Chakra.Text>
                <Chakra.Tag
                  size="sm"
                  minW="80px"
                  display="flex"
                  justifyContent="center"
                >
                  {stateAuth.credits} credits
                </Chakra.Tag>
              </Chakra.HStack>
            </Chakra.VStack>
          </Chakra.HStack>
        }
      />
      <Chakra.VStack maxW="800px" w="full" gap="8">
        <Chakra.VStack
          w="full"
          shadow="md"
          overflow="hidden"
          borderRadius="lg"
          border="1px"
          borderColor="gray.200"
        >
          <LandingPage content={state.courseContentLandingPage} />
        </Chakra.VStack>

        <Chakra.HStack w="full" justify="space-between">
          <Chakra.Button
            size="sm"
            variant="outline"
            textTransform="capitalize"
            onClick={onTryDiffSettings}
          >
            Try something different
          </Chakra.Button>

          <Chakra.HStack>
            <Chakra.Button
              size="sm"
              variant="outline"
              textTransform="capitalize"
              onClick={onEdit}
            >
              Edit Copy
            </Chakra.Button>
            <Chakra.Button
              textTransform="capitalize"
              size="sm"
              bg="gray.900"
              color="white"
              onClick={onPublishLp}
              isLoading={isLoading}
            >
              Publish Landing Page ({payment.prices.publishLandingPage.quantity}{" "}
              credits)
            </Chakra.Button>
          </Chakra.HStack>
        </Chakra.HStack>
      </Chakra.VStack>
    </Chakra.VStack>
  );
};
