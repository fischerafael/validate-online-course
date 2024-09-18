"use client";

import { LandingPage } from "@/client/components/LandingPage";
import { LandingPageServer } from "@/server/usecases";
import { useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { actionAddLeadToLandingPage } from "@/client/actions";

export const PageDynamicLandingPage = ({
  content,
}: {
  content: LandingPageServer;
}) => {
  const toast = Chakra.useToast();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const addLead = async () => {
    try {
      setLoading(true);
      await actionAddLeadToLandingPage(content.slug, email);
      setEmail("");
      toast({
        variant: "success",
        title: "Success!",
        description:
          "You have successfully joined the wait list of this course!",
      });
    } catch (e: any) {
      toast({
        variant: "error",
        title: "Something went wrong!",
        description: e?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LandingPage
      content={content.content}
      actions={{
        isLoading,
        onChangeValue: (val: string) => setEmail(val),
        onSubmit: addLead,
        value: email,
      }}
    />
  );
};
