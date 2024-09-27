"use client";

import { useAuth } from "@/client/hooks/useAuth";
import * as Chakra from "@chakra-ui/react";
import { Header } from "../Header";

export const HeaderContainer = ({
  actionSlot,
}: {
  actionSlot?: React.ReactElement;
}) => {
  const { methods: methodsAuth, state: stateAuth } = useAuth();

  return (
    <Header
      logoSlot={
        <Chakra.HStack>
          <Chakra.Avatar
            size="sm"
            name={methodsAuth.getAuthState()?.name}
            src={methodsAuth.getAuthState()?.avatarURL}
          />
          <Chakra.VStack spacing="0" align="flex-start">
            <Chakra.Text fontSize="md" w="fit-content">
              {methodsAuth.getAuthState()?.name}
            </Chakra.Text>
            <Chakra.HStack>
              <Chakra.Text fontSize="xs" w="fit-content">
                {methodsAuth.getAuthState()?.email}
              </Chakra.Text>
              <Chakra.Tag
                size="sm"
                minW="80px"
                display="flex"
                justifyContent="center"
              >
                {stateAuth.credits} credits
              </Chakra.Tag>
            </Chakra.HStack>
          </Chakra.VStack>
        </Chakra.HStack>
      }
      action={actionSlot}
    />
  );
};
