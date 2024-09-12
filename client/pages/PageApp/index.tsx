"use client";

import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Header } from "@/client/components/Header";
import { useAuth } from "@/client/hooks/useAuth";
import Link from "next/link";
import { pages } from "@/client/config/pages";

export const PageApp = () => {
  const { methods } = useAuth();

  return (
    <Chakra.VStack w="full" align="center" p="8" spacing="8">
      <Header
        action={
          <Chakra.HStack>
            <Chakra.Button onClick={methods.onLogOut}>Log Out</Chakra.Button>
            <Link href={pages.appNew.href}>
              <Chakra.Button bg="gray.800" color="white">
                New Landing Page
              </Chakra.Button>
            </Link>
          </Chakra.HStack>
        }
      />
    </Chakra.VStack>
  );
};
