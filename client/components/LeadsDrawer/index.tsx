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
          <Chakra.DrawerHeader>Leads ({leads.length})</Chakra.DrawerHeader>

          <Chakra.DrawerBody w="full">
            <Chakra.VStack
              overflowY="auto"
              h="full"
              w="full"
              maxH="70vh"
              align="flex-start"
            >
              {leads.map((lead) => (
                <Chakra.VStack
                  border="1px"
                  borderColor="gray.300"
                  p="4"
                  borderRadius="xl"
                  spacing="0"
                  w="full"
                  align="flex-start"
                  key={lead.email}
                >
                  <Chakra.Text>{lead.email}</Chakra.Text>
                  <Chakra.Text fontSize="xs">
                    {new Date(lead.createdAt).toLocaleDateString("en")}
                  </Chakra.Text>
                </Chakra.VStack>
              ))}
            </Chakra.VStack>
          </Chakra.DrawerBody>

          <Chakra.DrawerFooter>
            <Chakra.Button onClick={onClose}>Close</Chakra.Button>
          </Chakra.DrawerFooter>
        </Chakra.DrawerContent>
      </Chakra.Drawer>
    </>
  );
}
