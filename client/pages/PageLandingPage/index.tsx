"use client";

import { LandingPage } from "@/client/components/LandingPage";
import { LandingPageContent } from "@/client/entities";

export const PageLandingPage = () => {
  const landingPage: LandingPageContent = {
    contentHashtags: ["ai", "langchain"],
    contentHeroHeading:
      "LangChain- Develop LLM powered applications with LangChain",
    contentHeroSubHeading:
      "Learn LangChain by building FAST a real world generative ai LLM powered application LLM (Python, Latest Version 0.2.6)",
    contentLandingPageCTA: "Join Waitlist",
    contentFeaturesSectionLabel: "What you will learn",
    contentFeaturesList: [
      "Become proficient in LangChain",
      "Have 3 end to end working LangChain based generative AI applications",
      "Prompt Engineering Theory: Chain of Thought, ReAct, Few Shot prompting and understand how LangChain is build under the hood",
      "Large Language Models theory for software engineers",
      "RAG, Vectorestores/ Vector Databasrs (Pinecone, FAISS)",
      "LangChain: Lots of chains Chains, Agents, DocumentLoader, TextSplitter, OutputParser, Memory",
      "Have 3 end to end working LangChain based generative AI applications",
    ],
    contentAuthorName: "Rafael Fischer",
    contentAuthorLink: "#",
    contentAuthorAvatar: "#",
    contentAuthorSectionLabel: "Your Teacher",
    contentAuthorBio:
      "I am a passionate Software Engineer with years of experience in back-end development, one of the first engineers at Orca Security, and now I am working as a Customer Engineer at Google Cloud.",
  };

  return <LandingPage content={landingPage} />;
};
