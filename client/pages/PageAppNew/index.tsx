"use client";

import { HeaderContainer } from "@/client/components/HeaderContainer";
import { pages } from "@/client/config/pages";
import { useAuth } from "@/client/hooks/useAuth";
import { useCourseState } from "@/client/hooks/useCourseState";
import { payment } from "@/lib/payment/config";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  actionCreateTransaction,
  actionGenerateCourseContent,
  actionListAllSlugs,
} from "../../actions";
import Link from "next/link";
import { utils } from "@/client/utils";
import { InputText } from "@/lib/ui/InputText";
import { InputTextArea } from "@/lib/ui/InputTextArea";
import { InputSelect } from "@/lib/ui/InputSelect";

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

      const slugs = await actionListAllSlugs();
      if (slugs.includes(state.courseAI.slug))
        throw new Error(
          "Course with this slug already exists. Try a different one"
        );

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
                Buy Credits
              </Chakra.Button>
            </Link>
            <Chakra.Button size="sm" variant="outline" onClick={onViewAll}>
              Back To Landing Pages
            </Chakra.Button>
          </Chakra.HStack>
        }
      />

      <Chakra.VStack maxW="800px" w="full" gap="4" align="flex-start">
        <InputText
          label="Title"
          placeholder="Title"
          value={state.courseAI.title}
          onChange={(e) => methods.onStateAIChange("title", e.target.value)}
        />

        <InputText
          label="Slug"
          placeholder="Slug"
          value={state.courseAI.slug}
          onChange={(e) => methods.onStateAIChange("slug", e.target.value)}
        />

        <InputText
          label="Target Audience"
          placeholder="Target Audience"
          value={state.courseAI.targetAudience}
          onChange={(e) =>
            methods.onStateAIChange("targetAudience", e.target.value)
          }
        />

        <InputTextArea
          label="What is the course about?"
          placeholder="What is the course about?"
          minH="10vh"
          value={state.courseAI.whatIsTheCourseAbout}
          onChange={(e) =>
            methods.onStateAIChange("whatIsTheCourseAbout", e.target.value)
          }
        />

        {/* <InputTextArea
          label="Any other relevant context to this course?"
          placeholder="Any other relevant context to this course?"
          minH="10vh"
          value={state.courseAI.extraContext}
          onChange={(e) =>
            methods.onStateAIChange("extraContext", e.target.value)
          }
        /> */}

        <InputText
          label="Unfair Advantage (optional)"
          placeholder="Any unfair advantage or differentiator of the course?"
          value={state.courseAI.unfairAdvantage}
          onChange={(e) =>
            methods.onStateAIChange("unfairAdvantage", e.target.value)
          }
        />

        <InputSelect
          label="Course Language"
          placeholder="Language"
          value={state.courseAI.language}
          onChange={(e) => methods.onStateAIChange("language", e.target.value)}
          options={[
            { key: "eng", value: "English" },
            { key: "spa", value: "Spanish" },
            { key: "zho", value: "Chinese" },
            { key: "hin", value: "Hindi" },
            { key: "ara", value: "Arabic" },
            { key: "por", value: "Portuguese" },
            { key: "rus", value: "Russian" },
            { key: "jpn", value: "Japanese" },
            { key: "fra", value: "French" },
            { key: "deu", value: "German" },
            { key: "kor", value: "Korean" },
            { key: "ita", value: "Italian" },
            { key: "ben", value: "Bengali" },
            { key: "tur", value: "Turkish" },
            { key: "vie", value: "Vietnamese" },
            { key: "tha", value: "Thai" },
            { key: "nld", value: "Dutch" },
            { key: "swe", value: "Swedish" },
            { key: "pol", value: "Polish" },
            { key: "ukr", value: "Ukrainian" },
          ]}
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
