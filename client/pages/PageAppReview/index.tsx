"use client";

import { Header } from "@/client/components/Header";
import { pages } from "@/client/config/pages";
import { useCourseState } from "@/client/hooks/useCourseState";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const PageAppReview = () => {
  const { state, methods } = useCourseState();

  const { push } = useRouter();

  const onPreview = () => {
    push(pages.appPreview.href);
  };

  const onGoToAI = () => {
    push(pages.appNew.href);
  };

  return (
    <Chakra.VStack w="full" align="center" p="8" spacing="8">
      <Header />

      <Chakra.VStack w="full" maxW="800px" align="flex-start" gap="8">
        <Chakra.Text textTransform="capitalize">Hero Section</Chakra.Text>

        <Chakra.VStack w="full" gap="4">
          <Chakra.HStack w="full" gap="4">
            <Chakra.Input
              value={state.courseState.currHashtag}
              placeholder="Hashtags"
              onChange={(e) =>
                methods.onCourseChangeString("currHashtag", e.target.value)
              }
            />
            <Chakra.Button
              onClick={() =>
                methods.onCourseAddArrValue(
                  "hashtags",
                  state.courseState.currHashtag
                )
              }
            >
              Add Hashtag
            </Chakra.Button>
          </Chakra.HStack>
          <Chakra.HStack w="full" flexWrap="wrap">
            {state.courseState.hashtags.map((hs) => (
              <Chakra.Tag
                onClick={() => methods.onCourseRemoveValue("hashtags", hs)}
                key={hs}
              >
                {hs}
              </Chakra.Tag>
            ))}
          </Chakra.HStack>

          <Chakra.Textarea
            placeholder="Heading"
            value={state.courseState.heading}
            onChange={(e) =>
              methods.onCourseChangeString("heading", e.target.value)
            }
          />
          <Chakra.Textarea
            placeholder="Subheading"
            value={state.courseState.subHeading}
            onChange={(e) =>
              methods.onCourseChangeString("subHeading", e.target.value)
            }
          />
          <Chakra.Input
            placeholder="Button CTA"
            value={state.courseState.cta}
            onChange={(e) =>
              methods.onCourseChangeString("cta", e.target.value)
            }
          />
        </Chakra.VStack>

        <Chakra.Text textTransform="capitalize">Features section</Chakra.Text>

        <Chakra.VStack w="full" gap="4">
          <Chakra.Input
            placeholder="Section Title (e.g. 'What you will learn')"
            value={state.courseState.featuresSectionTitle}
            onChange={(e) =>
              methods.onCourseChangeString(
                "featuresSectionTitle",
                e.target.value
              )
            }
          />
          <Chakra.HStack w="full" gap="4">
            <Chakra.Input
              value={state.courseState.currFeature}
              onChange={(e) =>
                methods.onCourseChangeString("currFeature", e.target.value)
              }
              placeholder="Features"
            />
            <Chakra.Button
              onClick={() =>
                methods.onCourseAddArrValue(
                  "features",
                  state.courseState.currFeature
                )
              }
            >
              Add Feature
            </Chakra.Button>
          </Chakra.HStack>
          <Chakra.HStack w="full" flexWrap="wrap">
            {state.courseState.features.map((hs) => (
              <Chakra.Tag
                onClick={() => methods.onCourseRemoveValue("features", hs)}
                key={hs}
              >
                {hs}
              </Chakra.Tag>
            ))}
          </Chakra.HStack>
        </Chakra.VStack>

        <Chakra.HStack w="full" justify="space-between">
          <Chakra.Button onClick={onGoToAI}>
            Try different settings
          </Chakra.Button>

          <Chakra.Button
            onClick={onPreview}
            isDisabled={!state.isCourseStateValuesFilled}
            bg="gray.900"
            color="white"
          >
            Preview Landing Page
          </Chakra.Button>
        </Chakra.HStack>
      </Chakra.VStack>
    </Chakra.VStack>
  );
};
