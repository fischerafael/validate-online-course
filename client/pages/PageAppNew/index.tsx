"use client";

import { HeaderContainer } from "@/client/components/HeaderContainer";
import { pages } from "@/client/config/pages";
import { useAuth } from "@/client/hooks/useAuth";
import { useCourseState } from "@/client/hooks/useCourseState";
import { payment } from "@/payment/config";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  actionCreateTransaction,
  actionGenerateCourseContent,
} from "../../actions";
import Link from "next/link";
import { utils } from "@/client/utils";

export const PageAppNew = () => {
  const { methods: methodsAuth, state: stateAuth } = useAuth();
  const { state, methods } = useCourseState();
  const [isLoading, setLoading] = useState(false);
  useAuth();
  const toast = Chakra.useToast();

  const { push } = useRouter();

  const onGenerateContent = async () => {
    setLoading(true);
    try {
      utils.hasEnoughCredit({
        balance: stateAuth.credits,
        cost: payment.prices.generateLandingPageCopy.quantity,
      });

      await actionCreateTransaction({
        email: methodsAuth.getAuthState()?.email!,
        product: JSON.stringify({
          product: payment.prices.generateLandingPageCopy.title,
        }),
        quantity: payment.prices.generateLandingPageCopy.quantity,
        total: payment.prices.generateLandingPageCopy.quantity,
        type: "debit",
        status: "confirmed",
      });
      const { jsonContent } = await actionGenerateCourseContent(state.courseAI);
      methods.onCourseSetResponseFromAI(jsonContent);
      push(pages.appPreview.href);
    } catch (e: any) {
      toast({
        status: "info",
        title: "Oops!",
        description: e?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const onViewAll = () => {
    push(pages.app.href);
  };

  const onResetInputs = () => {
    methods.onResetAIState();
  };

  return (
    <Chakra.VStack w="full" align="center" p="8" spacing="8">
      <HeaderContainer
        actionSlot={
          <Chakra.HStack w="full" justify="flex-end">
            <Link href={pages.appShop.href}>
              <Chakra.Button
                size="sm"
                variant="outline"
                bg="gray.800"
                color="white"
              >
                Shop
              </Chakra.Button>
            </Link>
            <Chakra.Button size="sm" variant="outline" onClick={onViewAll}>
              View All Your Courses
            </Chakra.Button>
          </Chakra.HStack>
        }
      />

      <Chakra.VStack
        maxW="800px"
        w="full"
        gap="8"
        overflow="hidden"
        borderRadius="lg"
        border="1px"
        borderColor="gray.200"
        p="8"
        align="flex-start"
      >
        <Chakra.HStack w="full" gap="8">
          <Chakra.Input
            placeholder="Title"
            value={state.courseAI.title}
            onChange={(e) => methods.onStateAIChange("title", e.target.value)}
          />
          <Chakra.Input
            placeholder="Slug"
            value={state.courseAI.slug}
            onChange={(e) => methods.onStateAIChange("slug", e.target.value)}
          />
        </Chakra.HStack>

        <Chakra.Input
          placeholder="Target Audience"
          value={state.courseAI.targetAudience}
          onChange={(e) =>
            methods.onStateAIChange("targetAudience", e.target.value)
          }
        />
        <Chakra.Textarea
          placeholder="What is the course about?"
          minH="10vh"
          value={state.courseAI.whatIsTheCourseAbout}
          onChange={(e) =>
            methods.onStateAIChange("whatIsTheCourseAbout", e.target.value)
          }
        />
        <Chakra.Textarea
          placeholder="Any other relevant context to this course?"
          minH="10vh"
          value={state.courseAI.extraContext}
          onChange={(e) =>
            methods.onStateAIChange("extraContext", e.target.value)
          }
        />
        <Chakra.Input
          placeholder="Any unfair advantage or differentiator of the course?"
          value={state.courseAI.unfairAdvantage}
          onChange={(e) =>
            methods.onStateAIChange("unfairAdvantage", e.target.value)
          }
        />
        {/* <Chakra.Input
          placeholder="Success Link (offer something after a user has joined)"
          value={state.courseAI.successLink}
          onChange={(e) =>
            methods.onStateAIChange("successLink", e.target.value)
          }
        /> */}
        <Chakra.Input
          placeholder="Language"
          value={state.courseAI.language}
          onChange={(e) => methods.onStateAIChange("language", e.target.value)}
        />
      </Chakra.VStack>

      <Chakra.HStack maxW="800px" w="full" justify="space-between">
        <Chakra.Button
          variant="outline"
          size="sm"
          textTransform="capitalize"
          onClick={onResetInputs}
        >
          Reset Inputs
        </Chakra.Button>
        <Chakra.Button
          isDisabled={!state.isAiAudienceAndAboutFilled}
          onClick={onGenerateContent}
          isLoading={isLoading}
          bg="gray.900"
          size="sm"
          color="white"
        >
          Generate Landing Page Content (
          {payment.prices.generateLandingPageCopy.quantity} credits)
        </Chakra.Button>
      </Chakra.HStack>
    </Chakra.VStack>
  );
};
