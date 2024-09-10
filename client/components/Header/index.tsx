"use client";

import * as Chakra from "@chakra-ui/react";
import React from "react";

export const Header = () => {
  return (
    <Chakra.HStack
      w="full"
      h="fit-content"
      maxW="800px"
      justify="space-between"
    >
      <Chakra.Text>VCO</Chakra.Text>
      <Chakra.Button>My Courses</Chakra.Button>
    </Chakra.HStack>
  );
};
