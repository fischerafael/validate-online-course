"use client";

import * as Chakra from "@chakra-ui/react";
import { useState } from "react";

interface Section {
  id: string;
  settings: { title: string; task: string };
  context: { local: string; sections: string[]; selected: string };
  output: {
    template: string;
    size: number;
  };
  result: {
    content: string;
  };
}

const generateId = () => new Date().getTime().toString();

const INITIAL_SECTION: Section = {
  id: "",
  settings: {
    title: "",
    task: "",
  },
  context: {
    local: "",
    sections: [],
    selected: "",
  },
  output: {
    template: "",
    size: 400,
  },
  result: { content: "" },
};

export const usePageSettings = () => {
  const [sections, setSections] = useState<Section[]>([]);

  console.log("[sections]", sections);

  const onAddSection = () => {
    setSections((prev) => [...prev, { ...INITIAL_SECTION, id: generateId() }]);
  };

  const onRemoveSection = (id: string) => {
    setSections((prev) => prev.filter((sec) => sec.id !== id));
  };

  const onChangeSettings = (
    id: string,
    key: "title" | "task",
    value: string
  ) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === id) {
          return {
            ...section,
            settings: { ...section.settings, [key]: value },
          };
        }
        return section;
      })
    );
  };

  const getSettings = (id: string, key: "title" | "task") => {
    return sections.find((sec) => sec.id === id)?.settings[key];
  };

  const onChangeContext = (
    id: string,
    key: "selected" | "local",
    value: string
  ) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === id) {
          return {
            ...section,
            context: { ...section.context, [key]: value },
          };
        }
        return section;
      })
    );
  };

  const getContext = (id: string, key: "selected" | "local") => {
    return sections.find((sec) => sec.id === id)?.context[key];
  };

  const onAddSectionAsReference = (
    sectionId: string,
    referenceSectionId: string
  ) => {
    setSections((prev) =>
      prev.map((section) => {
        if (sectionId === section.id) {
          return {
            ...section,
            context: {
              ...section.context,
              sections: [...section.context.sections, referenceSectionId],
            },
          };
        }
        return section;
      })
    );
  };

  const onRemoveSectionAsReference = (
    sectionId: string,
    referenceSectionId: string
  ) => {
    setSections((prev) =>
      prev.map((section) => {
        if (sectionId === section.id) {
          return {
            ...section,
            context: {
              ...section.context,
              sections: section.context.sections.filter(
                (secId) => secId !== referenceSectionId
              ),
            },
          };
        }
        return section;
      })
    );
  };

  const getListOfSectionOptions = (currentSectionId: string) => {
    return sections
      .map((sec) => ({
        value: sec.id,
        label: sec.settings.title,
      }))
      .filter((sec) => sec.value !== currentSectionId && !!sec.label);
  };

  return {
    state: {
      sections,
    },
    methods: {
      onAddSection,
      onRemoveSection,
      onChangeSettings,
      getSettings,
      getListOfSectionOptions,
      onAddSectionAsReference,
      onRemoveSectionAsReference,
      getContext,
      onChangeContext,
    },
  };
};

export const PageApp = () => {
  const { state, methods } = usePageSettings();

  return (
    <Chakra.VStack
      w="full"
      minH="100vh"
      justifyContent="start"
      justify="center"
      pb="16"
    >
      <Chakra.HStack
        w="full"
        p="4"
        justify="space-between"
        position="sticky"
        bgColor="white"
        zIndex="100"
        top="0"
      >
        <Chakra.Text>AI Science</Chakra.Text>
        <Chakra.HStack>
          <Chakra.Button onClick={methods.onAddSection}>
            Add Section
          </Chakra.Button>
        </Chakra.HStack>
      </Chakra.HStack>

      <Chakra.VStack w="full" p="4" gap="12" divider={<Chakra.Divider />}>
        {state.sections.map((section) => {
          return (
            <Chakra.VStack key={section.id} w="full" gap="4" align="flex-start">
              {!!section.settings.title && (
                <Chakra.HStack w="full" justify="space-between">
                  <Chakra.Text fontSize="xl" fontWeight="semibold">
                    {section.settings.title}
                  </Chakra.Text>
                  <Chakra.Button
                    onClick={() => methods.onRemoveSection(section.id)}
                  >
                    Remove
                  </Chakra.Button>
                </Chakra.HStack>
              )}
              <Chakra.Grid w="full" gap="4" templateColumns="1fr 1fr 2fr 2fr">
                {/* SETTINGS */}
                <Chakra.VStack w="full" gap="4">
                  <Chakra.Input
                    placeholder="Title"
                    h="16"
                    value={methods.getSettings(section.id, "title")}
                    onChange={(e) =>
                      methods.onChangeSettings(
                        section.id,
                        "title",
                        e.target.value
                      )
                    }
                  />
                  <Chakra.Textarea
                    placeholder="Task"
                    h="full"
                    value={methods.getSettings(section.id, "task")}
                    onChange={(e) =>
                      methods.onChangeSettings(
                        section.id,
                        "task",
                        e.target.value
                      )
                    }
                  />
                </Chakra.VStack>
                {/* CONTEXT */}
                <Chakra.VStack w="full" gap="4">
                  <Chakra.Textarea placeholder="Context" h="full" />
                  <Chakra.HStack w="full" gap="4">
                    <Chakra.Select
                      placeholder="Other Sections"
                      value={methods.getContext(section.id, "selected")}
                      onChange={(e) =>
                        methods.onChangeContext(
                          section.id,
                          "selected",
                          e.target.value
                        )
                      }
                    >
                      {methods
                        .getListOfSectionOptions(section.id)
                        .map((sec) => (
                          <option key={sec.value}>{sec.label}</option>
                        ))}
                    </Chakra.Select>
                    <Chakra.Button
                      onClick={() =>
                        methods.onAddSectionAsReference(section.id, "")
                      }
                    >
                      +
                    </Chakra.Button>
                  </Chakra.HStack>
                </Chakra.VStack>
                {/* OUTPUT */}
                <Chakra.VStack w="full" gap="4">
                  <Chakra.Textarea placeholder="Output Template" h="full" />
                  <Chakra.Input
                    type="number"
                    placeholder="Text Size (words)"
                    h="16"
                  />
                </Chakra.VStack>
                {/* RESULT */}
                <Chakra.VStack w="full" gap="4">
                  <Chakra.Textarea placeholder="Generated Content" h="full" />
                </Chakra.VStack>
              </Chakra.Grid>

              <Chakra.HStack justify="flex-end" w="full">
                <Chakra.Button>Copy Generated Content</Chakra.Button>
                <Chakra.Button>Generate</Chakra.Button>
              </Chakra.HStack>
            </Chakra.VStack>
          );
        })}
      </Chakra.VStack>
    </Chakra.VStack>
  );
};
