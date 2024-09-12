"use client";

import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Header } from "@/client/components/Header";
import { useAuth } from "@/client/hooks/useAuth";

export const PageApp = () => {
  const { methods } = useAuth();

  return (
    <Chakra.VStack w="full" align="center" p="8" spacing="8">
      <Header
        action={
          <Chakra.HStack>
            <Chakra.Button onClick={methods.onLogOut}>Log Out</Chakra.Button>
            <Chakra.Button
              bg="gray.800"
              color="white"
              onClick={methods.onLogOut}
            >
              New Landing Page
            </Chakra.Button>
          </Chakra.HStack>
        }
      />
    </Chakra.VStack>
  );
};
