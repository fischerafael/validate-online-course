"use client";

import { Header } from "@/client/components/Header";
import { LandingPage } from "@/client/components/LandingPage";
import { useCourseState } from "@/client/hooks/useCourseState";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { actionGenerateCourseContent } from "./actions";
import { useState } from "react";

export const PageAppNewAI = () => {
  const { state, methods } = useCourseState();
  const [isLoading, setLoading] = useState(false);

  const { push } = useRouter();

  const onGenerateContent = async () => {
    setLoading(true);
    try {
      const { jsonContent } = await actionGenerateCourseContent(state.courseAI);
      methods.onCourseSetResponseFromAI(jsonContent);
      push(`/app/course/preview`);
    } catch (e: any) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onViewAll = () => {
    push(`/app/course`);
  };

  return (
    <Chakra.VStack w="full" align="center" p="8" spacing="8">
      <Header />
      <Chakra.VStack maxW="800px" w="full" gap="4">
        <Chakra.Textarea
          placeholder="Target Audience"
          minH="10vh"
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
        <Chakra.Textarea
          placeholder="Any unfair advantage or differentiator of the course?"
          minH="10vh"
          value={state.courseAI.unfairAdvantage}
          onChange={(e) =>
            methods.onStateAIChange("unfairAdvantage", e.target.value)
          }
        />
        <Chakra.Input
          placeholder="Language"
          value={state.courseAI.language}
          onChange={(e) => methods.onStateAIChange("language", e.target.value)}
        />
      </Chakra.VStack>

      <Chakra.HStack maxW="800px" w="full" justify="space-between">
        <Chakra.Button onClick={onViewAll}>View All Your Courses</Chakra.Button>
        <Chakra.Button
          isDisabled={!state.isAiAudienceAndAboutFilled}
          onClick={onGenerateContent}
          isLoading={isLoading}
          bg="gray.900"
          color="white"
        >
          Generate Landing Page Content
        </Chakra.Button>
      </Chakra.HStack>
    </Chakra.VStack>
  );
};
