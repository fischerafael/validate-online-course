"use client";

import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Header } from "@/client/components/Header";
import Link from "next/link";
import { pages } from "@/client/config/pages";
import { payment } from "@/lib/payment/config";
import {
  actionCreatePaymentCheckout,
  actionCreateTransaction,
} from "@/client/actions";
import { CreateTransactionInput } from "@/server/services/company";
import { useAuth } from "@/client/hooks/useAuth";
import { HeaderContainer } from "@/client/components/HeaderContainer";

export const PageAppShop = () => {
  const { methods, state } = useAuth();

  const onCreateCheckout = async ({
    priceId,
    productId,
    quantity,
    total,
  }: {
    priceId: string;
    productId: string;
    quantity: number;
    total: number;
  }) => {
    try {
      const payload: CreateTransactionInput = {
        email: methods.getAuthState()?.email!,
        product: JSON.stringify({
          productId: productId,
          priceId: priceId,
        }),
        quantity: quantity,
        total: total,
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
      <HeaderContainer
        actionSlot={
          <Chakra.HStack>
            <Link href={pages.app.href}>
              <Chakra.Button size="sm" variant="outline">
                Back to Landing Pages
              </Chakra.Button>
            </Link>
          </Chakra.HStack>
        }
      />

      <Chakra.Grid w="full" maxW="800px" gap="8">
        <Chakra.VStack
          w="full"
          p="8"
          border="1px"
          borderRadius="md"
          borderColor="gray.200"
        >
          <Chakra.Heading fontSize="xl">{`US$ ${payment.products.credits_100.priceLabel}`}</Chakra.Heading>
          <Chakra.Text>
            {payment.products.credits_100.credits} Credits
          </Chakra.Text>
          <Chakra.Button
            bg="gray.800"
            color="white"
            onClick={() =>
              onCreateCheckout({
                priceId: payment.products.credits_100.priceId,
                productId: payment.products.credits_100.priceId,
                quantity: payment.products.credits_100.credits,
                total: payment.products.credits_100.priceInCents,
              })
            }
          >
            Purchase
          </Chakra.Button>
        </Chakra.VStack>

        {/* <Chakra.VStack
          w="full"
          p="8"
          border="1px"
          borderRadius="md"
          borderColor="gray.200"
        >
          <Chakra.Heading fontSize="xl">{`US$ ${payment.products.credits_10.priceLabel}`}</Chakra.Heading>
          <Chakra.Text>
            {payment.products.credits_10.credits} Credits
          </Chakra.Text>
          <Chakra.Button
            bg="gray.800"
            color="white"
            onClick={() =>
              onCreateCheckout({
                priceId: payment.products.credits_10.priceId,
                productId: payment.products.credits_10.priceId,
                quantity: payment.products.credits_10.credits,
                total: payment.products.credits_10.priceInCents,
              })
            }
          >
            Purchase
          </Chakra.Button>
        </Chakra.VStack> */}
      </Chakra.Grid>
    </Chakra.VStack>
  );
};
