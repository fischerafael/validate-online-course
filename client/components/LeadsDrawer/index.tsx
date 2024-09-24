"use client";

import { LandingPageServerLead } from "@/server/usecases";
import * as Chakra from "@chakra-ui/react";
import React from "react";

export function LeadsDrawer({
  isOpen,
  onClose,
  leads = [],
}: {
  onClose: () => void;
  isOpen: boolean;
  leads: LandingPageServerLead[];
}) {
  return (
    <>
      <Chakra.Drawer
        size="md"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <Chakra.DrawerOverlay />
        <Chakra.DrawerContent>
          <Chakra.DrawerCloseButton />
          <Chakra.DrawerHeader>
            <Chakra.Heading fontSize="md">
              Leads ({leads.length})
            </Chakra.Heading>
          </Chakra.DrawerHeader>

          <Chakra.DrawerBody w="full">
            <Chakra.VStack
              overflowY="auto"
              h="full"
              w="full"
              maxH="70vh"
              align="flex-start"
              gap="4"
            >
              {leads.map((lead) => (
                <Chakra.HStack
                  border="1px"
                  borderColor="gray.200"
                  p="4"
                  borderRadius="xl"
                  spacing="0"
                  w="full"
                  justify="space-between"
                  key={lead.email}
                  _hover={{ shadow: "lg" }}
                >
                  <Chakra.Text>{lead.email}</Chakra.Text>
                  <Chakra.Tag size="sm">
                    {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                  </Chakra.Tag>
                </Chakra.HStack>
              ))}
            </Chakra.VStack>
          </Chakra.DrawerBody>

          <Chakra.DrawerFooter>
            <Chakra.Button variant="outline" onClick={onClose}>
              Close
            </Chakra.Button>
          </Chakra.DrawerFooter>
        </Chakra.DrawerContent>
      </Chakra.Drawer>
    </>
  );
}
