"use client";

import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Header } from "@/client/components/Header";
import Link from "next/link";
import { pages } from "@/client/config/pages";
import { payment } from "@/payment/config";
import {
  actionCreatePaymentCheckout,
  actionCreateTransaction,
} from "@/client/actions";
import { CreateTransactionInput } from "@/server/services/company";
import { useAuth } from "@/client/hooks/useAuth";

export const PageAppShop = () => {
  const { methods } = useAuth();

  const onCreateCheckout = async ({ priceId }: { priceId: string }) => {
    try {
      const payload: CreateTransactionInput = {
        email: methods.getAuthState()?.email!,
        product: JSON.stringify({
          productId: payment.products.credits_100.productId,
          priceId: payment.products.credits_100.priceId,
        }),
        quantity: payment.products.credits_100.credits,
        total: payment.products.credits_100.priceInCents,
        type: "credit",
        status: "pending",
      };

      const transaction = await actionCreateTransaction(payload);

      const { url } = await actionCreatePaymentCheckout({
        priceId,
        transactionId: transaction.id!,
        companyId: methods.getCompanyId()!,
        email: methods.getAuthState()?.email!,
      });

      window.location.href = url;
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
              <Chakra.Button size="sm" variant="outline">
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
          <Chakra.Heading fontSize="xl">{`US$ ${payment.products.credits_100.priceLabel}`}</Chakra.Heading>
          <Chakra.Text>100 Credits</Chakra.Text>
          <Chakra.Button
            bg="gray.800"
            color="white"
            onClick={() =>
              onCreateCheckout({
                priceId: payment.products.credits_100.priceId,
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
