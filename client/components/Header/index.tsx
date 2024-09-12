"use client";

import * as Chakra from "@chakra-ui/react";
import React from "react";

export const Header = ({ action }: { action?: React.ReactElement }) => {
  return (
    <Chakra.HStack
      w="full"
      h="fit-content"
      maxW="800px"
      justify="space-between"
    >
      <Chakra.Image src="/logo.svg" />
      {action}
    </Chakra.HStack>
  );
};
