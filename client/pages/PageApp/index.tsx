"use client";

import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Header } from "@/client/components/Header";
import { useAuth } from "@/client/hooks/useAuth";
import Link from "next/link";
import { pages } from "@/client/config/pages";
import { useQuery } from "@tanstack/react-query";
import { actionListLpsByCompanyId } from "@/client/actions";
import { usePathname, useRouter } from "next/navigation";

export const PageApp = () => {
  const { methods } = useAuth();
  const toast = Chakra.useToast();

  const companyId = methods.getCompanyId();

  const { data } = useQuery({
    queryKey: ["list-lps", companyId],
    enabled: !!companyId,
    queryFn: () => actionListLpsByCompanyId({ companyId: companyId! }),
    initialData: [],
  });

  const onCopyLink = async (slug: string) => {
    const link = getLink(slug);
    await window.navigator.clipboard.writeText(link);
    toast({
      title: "Success",
      description: "Link copied to clipboard",
      variant: "success",
    });
  };

  const getLink = (slug: string) => {
    const link = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${slug}`;
    return link;
  };

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
      <Chakra.VStack w="full" maxW="800px">
        {data.map((lp) => {
          return (
            <Chakra.Card w="full">
              <Chakra.CardHeader
                display="flex"
                justifyContent={"space-between"}
                w="full"
              >
                <Chakra.Heading size="md" textTransform={"uppercase"}>
                  {lp.slug}
                </Chakra.Heading>
                <Chakra.HStack>
                  <Chakra.Tag>{lp.views} views</Chakra.Tag>
                  <Chakra.Tag>{lp.leads.length} leads</Chakra.Tag>
                </Chakra.HStack>
              </Chakra.CardHeader>
              <Chakra.CardBody
                display="flex"
                justifyContent={"space-between"}
                w="full"
              >
                <Chakra.HStack w="full" justify="flex-end">
                  <Link href={getLink(lp.slug)} target="_blank">
                    <Chakra.Button>View Live</Chakra.Button>
                  </Link>
                  <Chakra.Button onClick={() => onCopyLink(lp.slug)}>
                    Copy Link
                  </Chakra.Button>
                  <Chakra.Button>View Leads</Chakra.Button>
                </Chakra.HStack>
              </Chakra.CardBody>
            </Chakra.Card>
          );
        })}
      </Chakra.VStack>
    </Chakra.VStack>
  );
};
