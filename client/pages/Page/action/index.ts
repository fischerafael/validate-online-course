"use server";

import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

export interface Action {
  (url: string): Promise<{
    content: string;
    description: string;
    title: string;
    author: string;
  }>;
}

export const action: Action = async (url: string) => {
  const loader = YoutubeLoader.createFromUrl(url, {
    addVideoInfo: true,
  });

  const docs = await loader.load();

  const video = docs[0];
  const content = video.pageContent;
  const description = video.metadata.description;
  const title = video.metadata.title;
  const author = video.metadata.author;

  const result = {
    content,
    description,
    title,
    author,
  };

  return result;
};
