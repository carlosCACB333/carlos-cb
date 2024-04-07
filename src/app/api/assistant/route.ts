import { openai } from "@/libs/open-ai";

import { getContext } from "@/service/context";

import { env } from "@/utils";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const namespace = env.pinecone.selfNameSpace;
  const userMsg = messages.at(-1).content as string;
  const context = await getContext(namespace, userMsg);

  console.log("############", context);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: `
          Eres el asistente de carlos responde las preguntas de acuerdo al contexto que se te proporcione.
          START CONTEXT BLOCK
          ${context}
          END OF CONTEXT BLOCK
          Ten en cuenta el CONTEXT BLOCK que se te proporcione en una conversación. Si el contexto no proporciona la respuesta a la pregunta responde: "Lo siento, pero  no puedo enocntrar información para tu pregunta". No inventes nada que no se extraigas directamente del contexto
          `,
      },
      ...messages,
    ],
    max_tokens: 200,
    temperature: 0.2,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const stream = OpenAIStream(response, {});
  return new StreamingTextResponse(stream);
}