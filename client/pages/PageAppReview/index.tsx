"use client";

import { Header } from "@/client/components/Header";
import { pages } from "@/client/config/pages";
import { useCourseState } from "@/client/hooks/useCourseState";
import { InputText } from "@/lib/ui/InputText";
import { InputTextArea } from "@/lib/ui/InputTextArea";
import { Tag } from "@/lib/ui/Tag";
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
        <Chakra.VStack w="full" gap="4" align="flex-start">
          <Chakra.Heading fontSize="md">Hero Section</Chakra.Heading>
          <Chakra.HStack w="full" gap="4" align="flex-end">
            <InputText
              label="Hashtags"
              value={state.courseState.currHashtag}
              placeholder="Hashtags"
              onChange={(e) =>
                methods.onCourseChangeString("currHashtag", e.target.value)
              }
            />
            <Chakra.Button
              variant="outline"
              onClick={() =>
                methods.onCourseAddArrValue(
                  "hashtags",
                  state.courseState.currHashtag
                )
              }
              size="sm"
            >
              Add Hashtag
            </Chakra.Button>
          </Chakra.HStack>
          <Chakra.HStack w="full" flexWrap="wrap">
            {state.courseState.hashtags.map((hs) => (
              <Tag
                size="sm"
                onClick={() => methods.onCourseRemoveValue("hashtags", hs)}
                key={hs}
                hasIconLeft
              >
                {hs}
              </Tag>
            ))}
          </Chakra.HStack>
          <InputTextArea
            label="Heading"
            placeholder="Heading"
            value={state.courseState.heading}
            onChange={(e) =>
              methods.onCourseChangeString("heading", e.target.value)
            }
          />
          <InputTextArea
            label="Subheading"
            placeholder="Subheading"
            value={state.courseState.subHeading}
            onChange={(e) =>
              methods.onCourseChangeString("subHeading", e.target.value)
            }
          />

          <InputText
            label="Button CTA"
            placeholder="Button CTA"
            value={state.courseState.cta}
            size="sm"
            onChange={(e) =>
              methods.onCourseChangeString("cta", e.target.value)
            }
          />
        </Chakra.VStack>

        <Chakra.VStack w="full" gap="4" align="flex-start">
          <Chakra.Heading fontSize="md">Features section</Chakra.Heading>

          <InputText
            label="Section Title (e.g. 'What you will learn')"
            placeholder="Section Title (e.g. 'What you will learn')"
            value={state.courseState.featuresSectionTitle}
            onChange={(e) =>
              methods.onCourseChangeString(
                "featuresSectionTitle",
                e.target.value
              )
            }
          />
          <Chakra.HStack w="full" gap="4" align="flex-end">
            <InputText
              label={state.courseState.currFeature}
              value={state.courseState.currFeature}
              onChange={(e) =>
                methods.onCourseChangeString("currFeature", e.target.value)
              }
              placeholder="Features"
            />

            <Chakra.Button
              size="sm"
              variant="outline"
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
              <Tag
                onClick={() => methods.onCourseRemoveValue("features", hs)}
                key={hs}
                size="sm"
                hasIconLeft
              >
                {hs}
              </Tag>
            ))}
          </Chakra.HStack>
        </Chakra.VStack>

        <Chakra.HStack w="full" justify="space-between">
          <Chakra.Button size="sm" variant="outline" onClick={onGoToAI}>
            Try different settings
          </Chakra.Button>

          <Chakra.Button
            onClick={onPreview}
            isDisabled={!state.isCourseStateValuesFilled}
            bg="gray.900"
            color="white"
            size="sm"
          >
            Preview Landing Page
          </Chakra.Button>
        </Chakra.HStack>
      </Chakra.VStack>
    </Chakra.VStack>
  );
};
