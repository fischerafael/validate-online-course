"use client";

import { Header } from "@/client/components/Header";
import { pages } from "@/client/config/pages";
import * as Chakra from "@chakra-ui/react";
import Link from "next/link";

export const PageAppSettings = () => {
  return (
    <Chakra.VStack w="full" align="center" p="8" spacing="8">
      <Header
        action={
          <Chakra.HStack>
            <Link href={pages.app.href}>
              <Chakra.Button size="sm" variant="outline">
                Back to Landing Pages
              </Chakra.Button>
            </Link>
          </Chakra.HStack>
        }
      />

      <Chakra.VStack w="full" maxW="800px" gap="4"></Chakra.VStack>
    </Chakra.VStack>
  );
};
