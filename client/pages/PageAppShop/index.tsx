"use client";

import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Header } from "@/client/components/Header";
import Link from "next/link";
import { pages } from "@/client/config/pages";
import { payment } from "@/payment/config";
import { actionCreatePaymentCheckout } from "@/client/actions";

export const PageAppShop = () => {
  const onCreateCheckout = async ({ priceId }: { priceId: string }) => {
    try {
      console.log("[here]");
      const checkoutUrl = await actionCreatePaymentCheckout({
        priceId,
        transactionId: "test_transaction",
      });
      window.location.href = checkoutUrl;
    } catch (e: any) {
      console.log("[e]", e);
    }
  };

  return (
    <Chakra.VStack w="full" align="center" p="8" spacing="8">
      <Header
        action={
          <Chakra.HStack>
            <Link href={pages.app.href}>
              <Chakra.Button bg="gray.800" color="white">
                Back to Landing Pages
              </Chakra.Button>
            </Link>
          </Chakra.HStack>
        }
      />

      <Chakra.Grid w="full" maxW="800px">
        <Chakra.VStack
          w="full"
          p="8"
          border="1px"
          borderRadius="md"
          borderColor="gray.200"
        >
          <Chakra.Heading fontSize="xl">{`US$ ${payment.products.credits_10.priceLabel}`}</Chakra.Heading>
          <Chakra.Text>100 Credits</Chakra.Text>
          <Chakra.Button
            onClick={() =>
              onCreateCheckout({
                priceId: payment.products.credits_10.priceId,
              })
            }
          >
            Purchase
          </Chakra.Button>
        </Chakra.VStack>
      </Chakra.Grid>
    </Chakra.VStack>
  );
};
