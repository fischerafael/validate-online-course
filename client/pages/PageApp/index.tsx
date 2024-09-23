"use client";

import { actionListLpsByCompanyId } from "@/client/actions";
import { Header } from "@/client/components/Header";
import { LeadsDrawer } from "@/client/components/LeadsDrawer";
import { pages } from "@/client/config/pages";
import { useAuth } from "@/client/hooks/useAuth";
import * as Chakra from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

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

  const { isOpen, onOpen, onClose } = Chakra.useDisclosure();

  const onOpenSelect = (slug: string) => {
    setSelected(slug);
    onOpen();
  };

  const onCloseDeselect = () => {
    setSelected("");
    onClose();
  };

  const [selected, setSelected] = useState("");

  const leadsOfSelected = data.find((lp) => lp.slug === selected)?.leads || [];

  return (
    <Chakra.VStack w="full" align="center" p="8" spacing="8">
      <LeadsDrawer
        isOpen={isOpen}
        onClose={onCloseDeselect}
        leads={leadsOfSelected}
      />
      <Header
        action={
          <Chakra.HStack>
            <Chakra.Button onClick={methods.onLogOut}>Log Out</Chakra.Button>
            <Link href={pages.appShop.href}>
              <Chakra.Button>Shop</Chakra.Button>
            </Link>
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
          const ctr = lp.views > 0 ? (lp.leads.length / lp.views) * 100 : 0;
          return (
            <Chakra.Card
              w="full"
              border="1px"
              borderColor="gray.300"
              p="4"
              borderRadius="xl"
              shadow="none"
            >
              <Chakra.CardHeader
                display="flex"
                justifyContent={"space-between"}
                w="full"
              >
                <Chakra.Heading size="md" textTransform={"uppercase"}>
                  {lp.slug}
                </Chakra.Heading>
                <Chakra.HStack>
                  <Chakra.Tag>
                    {`Created at ${new Date(lp.createdAt).toLocaleDateString(
                      "pt-BR"
                    )}`}
                  </Chakra.Tag>
                  <Chakra.Tag>{lp.views} views</Chakra.Tag>
                  <Chakra.Tag>{lp.leads.length} leads</Chakra.Tag>
                  <Chakra.Tag>{ctr.toFixed(2)} % CTR</Chakra.Tag>
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
                  <Chakra.Button onClick={() => onOpenSelect(lp.slug)}>
                    View Leads
                  </Chakra.Button>
                </Chakra.HStack>
              </Chakra.CardBody>
            </Chakra.Card>
          );
        })}
      </Chakra.VStack>
    </Chakra.VStack>
  );
};
