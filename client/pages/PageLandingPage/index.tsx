"use client";

import React from "react";
import * as Chakra from "@chakra-ui/react";
import * as Icon from "react-icons/hi";

export const PageLandingPage = () => {
  const landingPage = {
    hashtags: ["ai", "langchain"],
    heading: "LangChain- Develop LLM powered applications with LangChain",
    subHeading:
      "Learn LangChain by building FAST a real world generative ai LLM powered application LLM (Python, Latest Version 0.2.6)",
    author: "Rafael Fischer",
    authorLink: "#",
    authorAvatar: "#",
    authorLabel: "Your Teacher",
    authorBio:
      "I am a passionate Software Engineer with years of experience in back-end development, one of the first engineers at Orca Security, and now I am working as a Customer Engineer at Google Cloud.",
    whatYouWillLearnLabel: "What you will learn",
    whatYouWillLearnFeatures: [
      "Become proficient in LangChain",
      "Have 3 end to end working LangChain based generative AI applications",
      "Prompt Engineering Theory: Chain of Thought, ReAct, Few Shot prompting and understand how LangChain is build under the hood",
      "Large Language Models theory for software engineers",
      "RAG, Vectorestores/ Vector Databasrs (Pinecone, FAISS)",
      "LangChain: Lots of chains Chains, Agents, DocumentLoader, TextSplitter, OutputParser, Memory",
      "Have 3 end to end working LangChain based generative AI applications",
    ],
    courseFeaturesLabel: "This course includes",
    courseFeatures: ["2 hours", "online", "on-demand", "certificate"],
    courseContentLabel: "Content of the course",
    courseContent: [
      {
        section: "intro",
        lessons: ["Setup", "History of LLMs", "What is Langchain"],
      },
      {
        section: "Gist of Langchain",
        lessons: ["How it works", "How to setup", "What is Langchain"],
      },
    ],
    landingPageCta: "Join Waitlist",
  };

  return (
    <Chakra.VStack w="full" align="center" gap="20">
      <Chakra.VStack pt="8" px="8" w="full" maxW="800px" gap="8">
        <Chakra.HStack>
          {landingPage.hashtags.map((hash) => (
            <Chakra.Tag key={hash}>#{hash}</Chakra.Tag>
          ))}
        </Chakra.HStack>
        <Chakra.Heading fontSize="6xl" textAlign="center">
          {landingPage.heading}
        </Chakra.Heading>
        <Chakra.Text fontSize="xl" textAlign="center">
          {landingPage.subHeading}
        </Chakra.Text>
        <Chakra.Text>
          by{" "}
          <Chakra.Link href={landingPage.authorLink}>
            {landingPage.author}
          </Chakra.Link>
        </Chakra.Text>
        <Chakra.HStack w="full" maxW="600px" gap="0">
          <Chakra.Input
            size="lg"
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
          />
          <Chakra.Button
            size="lg"
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            bg="gray.800"
            color="gray.50"
          >
            {landingPage.landingPageCta}
          </Chakra.Button>
        </Chakra.HStack>
      </Chakra.VStack>

      <Chakra.VStack px="8" w="full" maxW="800px" gap="8">
        <Chakra.Heading>{landingPage.whatYouWillLearnLabel}</Chakra.Heading>
        <Chakra.Grid templateColumns={["1fr", "1fr 1fr"]} gap="8" w="full">
          {landingPage.whatYouWillLearnFeatures.map((feature) => (
            <Chakra.HStack w="full" align="start" key={feature} gap="4">
              <Chakra.Icon as={Icon.HiOutlineCheck} />
              <Chakra.Text textTransform="capitalize">{feature}</Chakra.Text>
            </Chakra.HStack>
          ))}
        </Chakra.Grid>
      </Chakra.VStack>

      <Chakra.VStack px="8" w="full" maxW="800px" gap="8">
        <Chakra.Heading>{landingPage.courseFeaturesLabel}</Chakra.Heading>
        <Chakra.Grid templateColumns={["1fr", "1fr 1fr"]} gap="4" w="full">
          {landingPage.courseFeatures.map((feature) => (
            <Chakra.VStack
              w="full"
              p="4"
              border="1px"
              borderRadius="lg"
              borderColor="gray.200"
              bg="gray.50"
              key={feature}
            >
              <Chakra.Text>{feature}</Chakra.Text>
            </Chakra.VStack>
          ))}
        </Chakra.Grid>
      </Chakra.VStack>

      <Chakra.VStack w="full" p="8">
        <Chakra.HStack w="full" gap="0" maxW="600px" py="8">
          <Chakra.Input
            size="lg"
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            bg="white"
          />
          <Chakra.Button
            size="lg"
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            bg="gray.800"
            color="gray.50"
          >
            {landingPage.landingPageCta}
          </Chakra.Button>
        </Chakra.HStack>
      </Chakra.VStack>

      <Chakra.VStack px="8" w="full" maxW="800px" gap="8">
        <Chakra.Heading>{landingPage.courseContentLabel}</Chakra.Heading>
        <Chakra.VStack
          w="full"
          align="start"
          spacing="0"
          border="1px"
          borderRadius="lg"
          borderColor="gray.200"
          bg="gray.50"
          overflow="hidden"
        >
          {landingPage.courseContent.map((feature, index) => (
            <Chakra.VStack
              divider={<Chakra.Divider />}
              w="full"
              spacing="0"
              align="start"
              key={index}
            >
              <Chakra.Text fontSize="lg" p="4" textTransform="capitalize">
                {feature.section}
              </Chakra.Text>
              {feature.lessons.map((lesson) => (
                <Chakra.VStack
                  align="start"
                  p="4"
                  w="full"
                  bg="white"
                  key={lesson}
                >
                  <Chakra.Text fontSize="sm">{lesson}</Chakra.Text>
                </Chakra.VStack>
              ))}
            </Chakra.VStack>
          ))}
        </Chakra.VStack>
      </Chakra.VStack>

      <Chakra.VStack px="8" w="full" maxW="800px" gap="8">
        <Chakra.Heading>{landingPage.authorLabel}</Chakra.Heading>
        <Chakra.HStack h="full" gap="8">
          <Chakra.Avatar
            src={landingPage.authorAvatar}
            name={landingPage.author}
            bg="gray.900"
            color="gray.50"
          />
          <Chakra.VStack w="full" align="flex-start" gap="0">
            <Chakra.Heading fontSize="xl">{landingPage.author}</Chakra.Heading>
            <Chakra.Text>{landingPage.authorBio}</Chakra.Text>
          </Chakra.VStack>
        </Chakra.HStack>
      </Chakra.VStack>

      <Chakra.VStack w="full" bg="gray.50" p="8">
        <Chakra.HStack w="full" gap="0" maxW="600px" py="8">
          <Chakra.Input
            size="lg"
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            bg="white"
          />
          <Chakra.Button
            size="lg"
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            bg="gray.800"
            color="gray.50"
          >
            {landingPage.landingPageCta}
          </Chakra.Button>
        </Chakra.HStack>
      </Chakra.VStack>
    </Chakra.VStack>
  );
};
