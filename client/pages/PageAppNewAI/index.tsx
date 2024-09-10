"use client";

import { Header } from "@/client/components/Header";
import { LandingPage } from "@/client/components/LandingPage";
import { useCourseState } from "@/client/hooks/useCourseState";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const PageAppNewAI = () => {
  const { state } = useCourseState();

  const { push } = useRouter();

  const onReview = () => {
    push(`/app/course/edit`);
  };

  const onViewAll = () => {
    push(`/app/course`);
  };

  return (
    <Chakra.VStack w="full" align="center" p="8" spacing="8">
      <Header />
      <Chakra.VStack maxW="800px" w="full" gap="4">
        <Chakra.Textarea placeholder="What is the Course?" minH="20vh" />
        <Chakra.Textarea placeholder="Extra Context" minH="20vh" />
        <Chakra.Textarea placeholder="Target Audience" minH="10vh" />
        <Chakra.Input placeholder="Language" />
      </Chakra.VStack>

      <Chakra.HStack maxW="800px" w="full" justify="space-between">
        <Chakra.Button onClick={onViewAll}>View All Your Courses</Chakra.Button>
        <Chakra.Button onClick={onReview}>
          Review Landing Page Content
        </Chakra.Button>
      </Chakra.HStack>
    </Chakra.VStack>
  );
};
