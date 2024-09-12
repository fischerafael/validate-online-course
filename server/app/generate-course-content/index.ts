import OpenAI from "openai";
import { AIResponse, StateAI } from "@/client/hooks/useCourseState";

export const useCaseGenerateCourseContent = async (input: StateAI) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `
                você é um ux writer / copywriter muito experiente em criar copys para landing pages de cursos de alta conversão.
            `,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
                crie o conteúdo para um curso online, baseado nas seguintes informações

                targetAudience: ${input.targetAudience}
                
                whatIsTheCourseAbout: ${input.whatIsTheCourseAbout}

                extraContext: ${input.extraContext}

                unfairAdvantage: ${input.unfairAdvantage}

                language: ${input.language}
            `,
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            type: "text",
            text: `            
                output json desejado:

                heading: string; // max 7 words
                subHeading: string; // min 10 words - max 24 words
                cta: string; // max 2 short words
                hashtags: string[]; // min 1 - max 3
                featuresSectionTitle: string;
                features: string[]; // min 3 medium sized sentences  - max 6 edium sized sentences
            `,
          },
        ],
      },
    ],
    temperature: 0.3,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "json_object",
    },
  });

  const content = response.choices[0].message.content;

  const jsonContent: AIResponse = content ? JSON.parse(content) : {};

  return {
    content: content,
    jsonContent,
  };
};
