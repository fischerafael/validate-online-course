"use client";

import * as Chakra from "@chakra-ui/react";
import React from "react";

export const Header = ({
  action,
  logoSlot = <Chakra.Image src="/logo.svg" />,
}: {
  action?: React.ReactElement;
  logoSlot?: React.ReactElement;
}) => {
  return (
    <Chakra.HStack
      w="full"
      h="fit-content"
      maxW="800px"
      justify="space-between"
    >
      {logoSlot}
      {action}
    </Chakra.HStack>
  );
};
