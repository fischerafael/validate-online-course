"use client";

import { useAuth } from "@/client/hooks/useAuth";
import * as Chakra from "@chakra-ui/react";
import * as Icon from "react-icons/hi";

export const PageLandingPage = () => {
  const { state, methods } = useAuth();

  return (
    <Chakra.VStack bg="white" w="full" align="center" gap="16">
      <Chakra.VStack pt="24" px="8" w="full" maxW="800px" gap="4">
        <Chakra.HStack>
          {landingPage.contentHashtags.map((hash) => (
            <Chakra.Tag key={hash}>{hash}</Chakra.Tag>
          ))}
        </Chakra.HStack>
        <Chakra.Heading maxW="500px" fontSize="6xl" textAlign="center">
          {landingPage.contentHeroHeading}
        </Chakra.Heading>
        <Chakra.Text fontSize="xl" textAlign="center">
          {landingPage.contentHeroSubHeading}
        </Chakra.Text>
        <Chakra.HStack w="full" justify="center" py="8" maxW="600px" gap="0">
          <Chakra.Button
            size="lg"
            bg="gray.800"
            color="gray.50"
            onClick={methods.onLogIn}
          >
            {landingPage.contentLandingPageCTA}
          </Chakra.Button>
        </Chakra.HStack>
      </Chakra.VStack>

      <Chakra.VStack px="8" w="full" maxW="800px" gap="8">
        <Chakra.Heading>How it works</Chakra.Heading>
        <Chakra.Grid templateColumns={["1fr", "1fr 1fr"]} gap="4" w="full">
          {landingPage.howItWorksList.map((feature, index) => (
            <Chakra.HStack
              // border="1px"
              // borderRadius="xl"
              // borderColor="gray.300"
              // p="8"
              // align="start"
              // key={feature.title}
              // gap="4"
              // maxW="800px"
              gap="8"
              shadow="md"
              overflow="hidden"
              borderRadius="lg"
              border="1px"
              borderColor="gray.300"
              p="8"
              align="flex-start"
            >
              {/* <Chakra.Icon as={Icon.HiOutlineChevronRight} /> */}
              <Chakra.VStack align="start">
                <Chakra.Text fontSize="xl" textTransform="capitalize">
                  {`${index + 1}. ${feature.title}`}
                </Chakra.Text>
                <Chakra.Text fontSize="sm" textTransform="capitalize">
                  {feature.sub}
                </Chakra.Text>
              </Chakra.VStack>
            </Chakra.HStack>
          ))}
        </Chakra.Grid>
      </Chakra.VStack>

      <Chakra.VStack px="8" w="full" maxW="800px" gap="16">
        <Chakra.Heading>
          {landingPage.contentFeaturesSectionLabel}
        </Chakra.Heading>
        <Chakra.Grid templateColumns={["1fr", "1fr 1fr"]} gap="8" w="full">
          {landingPage.contentFeaturesList.map((feature) => (
            <Chakra.HStack w="full" align="start" key={feature} gap="4">
              <Chakra.Icon as={Icon.HiOutlineCheck} />
              <Chakra.Text textTransform="capitalize">{feature}</Chakra.Text>
            </Chakra.HStack>
          ))}
        </Chakra.Grid>
      </Chakra.VStack>

      <Chakra.HStack w="full" justify="center" py="8" maxW="600px" gap="0">
        <Chakra.Button
          size="lg"
          bg="gray.800"
          color="gray.50"
          onClick={methods.onLogIn}
        >
          {landingPage.contentLandingPageCTA}
        </Chakra.Button>
      </Chakra.HStack>

      <Chakra.VStack w="full" bg="gray.100" p="8">
        <Chakra.Text fontSize="xs">
          {new Date().getFullYear()} - Developed and Idealized by{" "}
          <a target="_blank" href="https://www.linkedin.com/in/fischerafael/">
            Rafael Fischer
          </a>
        </Chakra.Text>
      </Chakra.VStack>
    </Chakra.VStack>
  );
};

const landingPage = {
  contentHashtags: ["#QuickValidation", "#OnlineCourses", "#AI"],
  contentHeroHeading: "Validate your course in seconds",
  contentHeroSubHeading:
    "Create instant AI-powered landing pages and test your audience's interest.",
  contentLandingPageCTA: "Validate Course Idea Now",
  contentFeaturesSectionLabel: "Why Insta Course Validator?",
  contentFeaturesList: [
    "Use artificial intelligence to create minimalist and highly effective landing pages in seconds.",
    "Share the landing page link and start collecting emails from interested users on the waiting list immediately.",
    "Save time and effort by avoiding recording courses that don't generate interest.",
    "Easily customize the AI-generated landing page content if desired.",
    "Test multiple course ideas or different landing page variations to maximize your success potential.",
  ],
  howItWorksList: [
    {
      sub: "Provide details about your course, such as target audience, course topic, language, and any extra context.",
      title: "Answer Basic Questions",
    },
    {
      sub: "Our AI creates a minimalist, high-conversion landing page complete with all necessary copy.",
      title: "AI-Generated Landing Page",
    },
    {
      sub: "Review and adjust the AI-generated copy to better fit your vision, if desired.",
      title: "Customize If Needed",
    },
    {
      sub: "Publish your landing page and promote the link to your audience.",
      title: "Publish and Share",
    },
    {
      sub: "Potential students visit the landing page and sign up for the course waiting list.",
      title: "Collect Leads",
    },
    {
      sub: "A high number of sign-ups indicates strong interest, suggesting your course will be a success.",
      title: "Validate Interest",
    },
    {
      sub: "Start building a list of leads ready to purchase your course, even before recording any lessons.",
      title: "Build Leads Early",
    },
  ],
};
