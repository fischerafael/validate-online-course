"use client";

import React, { useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { action } from "./action";

export const Page = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const onSubmit = async () => {
    setLoading(true);
    try {
      const data = await action(url);
      setContent(data.content);
    } catch (e) {
      console.log("[e]", e);
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setContent("");
    setUrl("");
  };

  console.log(url);

  return (
    <Chakra.VStack w="full" gap="4" p="4">
      <Chakra.HStack w="full">
        <Chakra.Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Link"
        />
        <Chakra.Button isLoading={isLoading} onClick={onSubmit}>
          Extract
        </Chakra.Button>
        <Chakra.Button onClick={onReset}>Reset</Chakra.Button>
      </Chakra.HStack>

      {content && (
        <Chakra.VStack w="full">
          <Chakra.Textarea
            minH="60vh"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            w="full"
          />
        </Chakra.VStack>
      )}
    </Chakra.VStack>
  );
};
