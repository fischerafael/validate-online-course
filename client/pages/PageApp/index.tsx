"use client";

import { actionListLpsByCompanyId } from "@/client/actions";
import { HeaderContainer } from "@/client/components/HeaderContainer";
import { LeadsDrawer } from "@/client/components/LeadsDrawer";
import { pages } from "@/client/config/pages";
import { useAuth } from "@/client/hooks/useAuth";
import { Tag } from "@/lib/ui/Tag";
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
      <HeaderContainer
        actionSlot={
          <Chakra.HStack w="full" justify="flex-end">
            <Link href={pages.appShop.href}>
              <Chakra.Button
                size="sm"
                variant="outline"
                bg="gray.800"
                color="white"
              >
                Buy Credits
              </Chakra.Button>
            </Link>
            <Chakra.Button
              size="sm"
              variant="outline"
              onClick={methods.onLogOut}
            >
              Log Out
            </Chakra.Button>
          </Chakra.HStack>
        }
      />

      <Chakra.VStack w="full" maxW="800px" gap="4">
        <Chakra.HStack w="full" justify="space-between">
          <Chakra.Heading size="md">Your Landing Pages</Chakra.Heading>
          <Link href={pages.appNew.href}>
            <Chakra.Button size="sm" bg="gray.800" color="white">
              New Course Landing Page
            </Chakra.Button>
          </Link>
        </Chakra.HStack>

        {data.map((lp) => {
          const ctr = lp.views > 0 ? (lp.leads.length / lp.views) * 100 : 0;
          return (
            <Chakra.Card
              w="full"
              border="1px"
              borderColor="gray.200"
              p="8"
              borderRadius="xl"
              shadow="sm"
              _hover={{ shadow: "lg" }}
              gap="8"
            >
              <Chakra.CardHeader
                display="flex"
                justifyContent={"space-between"}
                w="full"
                p="0"
              >
                <Chakra.Heading size="sm">{lp.slug}</Chakra.Heading>
                <Chakra.HStack>
                  <Tag size="sm">
                    {`Created at ${new Date(lp.createdAt).toLocaleDateString(
                      "pt-BR"
                    )}`}
                  </Tag>
                  <Tag size="sm">{lp.views} views</Tag>
                  <Tag size="sm">{lp.leads.length} leads</Tag>
                  <Tag size="sm">{ctr.toFixed(2)} % CTR</Tag>
                </Chakra.HStack>
              </Chakra.CardHeader>
              <Chakra.CardBody
                p="0"
                display="flex"
                justifyContent={"space-between"}
                w="full"
              >
                <Chakra.HStack w="full" justify="space-between">
                  <Chakra.HStack>
                    <Link href={getLink(lp.slug)} target="_blank">
                      <Chakra.Button variant="outline" size="sm">
                        View Live
                      </Chakra.Button>
                    </Link>
                    <Chakra.Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCopyLink(lp.slug)}
                    >
                      Copy Link
                    </Chakra.Button>
                  </Chakra.HStack>

                  <Chakra.Button
                    size="sm"
                    variant="outline"
                    onClick={() => onOpenSelect(lp.slug)}
                  >
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
