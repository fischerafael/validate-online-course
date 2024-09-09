"use client";

import { useCourseState } from "@/client/hooks/useCourseState";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const PageAppNewEdit = () => {
  const { state, methods } = useCourseState();

  const { push } = useRouter();

  const onPreview = () => {
    push(`/app/course/preview`);
  };

  return (
    <Chakra.VStack w="full" align="center" p="8" spacing="8">
      <Chakra.HStack
        w="full"
        h="fit-content"
        maxW="800px"
        justify="space-between"
      >
        <Chakra.Text>VCO</Chakra.Text>
        <Chakra.Button>My Courses</Chakra.Button>
      </Chakra.HStack>

      <Chakra.VStack w="full" maxW="800px" align="flex-start" gap="8">
        <Chakra.Text textTransform="capitalize">Hero Section</Chakra.Text>

        <Chakra.VStack w="full" gap="4">
          <Chakra.HStack w="full" gap="4">
            <Chakra.Input
              value={state.state.currHashtag}
              placeholder="Hashtags"
              onChange={(e) =>
                methods.onChangeString("currHashtag", e.target.value)
              }
            />
            <Chakra.Button
              onClick={() =>
                methods.onAddArrValue("hashtags", state.state.currHashtag)
              }
            >
              Add Hashtag
            </Chakra.Button>
          </Chakra.HStack>
          <Chakra.HStack w="full" flexWrap="wrap">
            {state.state.hashtags.map((hs) => (
              <Chakra.Tag
                onClick={() => methods.onRemoveValue("hashtags", hs)}
                key={hs}
              >
                {hs}
              </Chakra.Tag>
            ))}
          </Chakra.HStack>

          <Chakra.Textarea
            placeholder="Heading"
            value={state.state.heading}
            onChange={(e) => methods.onChangeString("heading", e.target.value)}
          />
          <Chakra.Textarea
            placeholder="Subheading"
            value={state.state.subHeading}
            onChange={(e) =>
              methods.onChangeString("subHeading", e.target.value)
            }
          />
          <Chakra.Input
            placeholder="Button CTA"
            value={state.state.cta}
            onChange={(e) => methods.onChangeString("cta", e.target.value)}
          />
        </Chakra.VStack>

        <Chakra.Text textTransform="capitalize">Features section</Chakra.Text>

        <Chakra.VStack w="full" gap="4">
          <Chakra.Input
            placeholder="Section Title (e.g. 'What you will learn')"
            value={state.state.featuresSectionTitle}
            onChange={(e) =>
              methods.onChangeString("featuresSectionTitle", e.target.value)
            }
          />
          <Chakra.HStack w="full" gap="4">
            <Chakra.Input
              value={state.state.currFeature}
              onChange={(e) =>
                methods.onChangeString("currFeature", e.target.value)
              }
              placeholder="Features"
            />
            <Chakra.Button
              onClick={() =>
                methods.onAddArrValue("features", state.state.currFeature)
              }
            >
              Add Feature
            </Chakra.Button>
          </Chakra.HStack>
          <Chakra.HStack w="full" flexWrap="wrap">
            {state.state.features.map((hs) => (
              <Chakra.Tag
                onClick={() => methods.onRemoveValue("features", hs)}
                key={hs}
              >
                {hs}
              </Chakra.Tag>
            ))}
          </Chakra.HStack>
        </Chakra.VStack>

        <Chakra.Text textTransform="capitalize">
          Author Details Section
        </Chakra.Text>

        <Chakra.VStack w="full" gap="4">
          <Chakra.Input
            placeholder="Section Title (e.g. 'Your Teacher')"
            value={state.state.authorSectionTitle}
            onChange={(e) =>
              methods.onChangeString("authorSectionTitle", e.target.value)
            }
          />
          <Chakra.Input
            placeholder="Author Name"
            value={state.state.authorName}
            onChange={(e) =>
              methods.onChangeString("authorName", e.target.value)
            }
          />
          <Chakra.Input
            placeholder="Author Avatar Photo"
            value={state.state.authorAvatar}
            onChange={(e) =>
              methods.onChangeString("authorAvatar", e.target.value)
            }
          />
          <Chakra.Textarea
            placeholder="Author Bio"
            value={state.state.authorBio}
            onChange={(e) =>
              methods.onChangeString("authorBio", e.target.value)
            }
          />
        </Chakra.VStack>

        <Chakra.HStack w="full" justify="space-between">
          <Chakra.Button isDisabled>Generate with AI</Chakra.Button>
          <Chakra.Button
            onClick={onPreview}
            isDisabled={!state.isAllValuesFilled}
          >
            Preview Landing Page
          </Chakra.Button>
        </Chakra.HStack>
      </Chakra.VStack>
    </Chakra.VStack>
  );
};
