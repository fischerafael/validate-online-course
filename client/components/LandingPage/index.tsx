"use client";

import * as Chakra from "@chakra-ui/react";
import * as Icon from "react-icons/hi";

import { LandingPageActions, LandingPageContent } from "@/client/entities";

export const LandingPage = ({
  content,
  actions,
}: {
  content: LandingPageContent;
  actions?: LandingPageActions;
}) => {
  const isValid = !!actions?.value;

  return (
    <Chakra.VStack bg="white" w="full" align="center" gap="20">
      <Chakra.VStack pt="8" px="8" w="full" maxW="800px" gap="8">
        <Chakra.HStack>
          {content.contentHashtags.map((hash) => (
            <Chakra.Tag key={hash}>{hash}</Chakra.Tag>
          ))}
        </Chakra.HStack>
        <Chakra.Heading fontSize="6xl" textAlign="center" maxW="5500px">
          {content.contentHeroHeading}
        </Chakra.Heading>
        <Chakra.Text fontSize="xl" textAlign="center">
          {content.contentHeroSubHeading}
        </Chakra.Text>

        <Chakra.HStack w="full" maxW="600px" gap="0">
          <Chakra.Input
            size="lg"
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            placeholder="email"
            borderColor="gray.300"
            value={actions?.value}
            onChange={(e) =>
              actions?.onChangeValue && actions.onChangeValue(e.target.value)
            }
          />
          <Chakra.Button
            size="lg"
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            bg="gray.800"
            color="gray.50"
            onClick={actions?.onSubmit}
            isDisabled={!isValid}
            isLoading={actions?.isLoading}
          >
            {content.contentLandingPageCTA}
          </Chakra.Button>
        </Chakra.HStack>
      </Chakra.VStack>

      <Chakra.VStack px="8" w="full" maxW="800px" gap="8">
        <Chakra.Heading>{content.contentFeaturesSectionLabel}</Chakra.Heading>
        <Chakra.Grid templateColumns={["1fr", "1fr 1fr"]} gap="8" w="full">
          {content.contentFeaturesList.map((feature) => (
            <Chakra.HStack w="full" align="start" key={feature} gap="4">
              <Chakra.Icon as={Icon.HiOutlineCheck} />
              <Chakra.Text textTransform="capitalize">{feature}</Chakra.Text>
            </Chakra.HStack>
          ))}
        </Chakra.Grid>
      </Chakra.VStack>

      <Chakra.HStack>
        <Chakra.Text fontSize="xs">{`By ${content.contentAuthorName}`}</Chakra.Text>
        <Chakra.Avatar
          size="xs"
          src={content.contentAuthorAvatar}
          name={content.contentAuthorName}
          bg="gray.900"
          color="gray.50"
        />
      </Chakra.HStack>

      <Chakra.VStack
        w="full"
        bg="gray.100"
        p="8"
        borderTop="1px"
        borderColor="gray.300"
      >
        <Chakra.HStack w="full" gap="0" maxW="600px" py="8">
          <Chakra.Input
            size="lg"
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            bg="white"
            placeholder="email"
            borderColor="gray.300"
            value={actions?.value}
            onChange={(e) =>
              actions?.onChangeValue && actions.onChangeValue(e.target.value)
            }
          />
          <Chakra.Button
            size="lg"
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            bg="gray.800"
            color="gray.50"
            onClick={actions?.onSubmit}
            isDisabled={!isValid}
            isLoading={actions?.isLoading}
          >
            {content.contentLandingPageCTA}
          </Chakra.Button>
        </Chakra.HStack>
      </Chakra.VStack>
    </Chakra.VStack>
  );
};
