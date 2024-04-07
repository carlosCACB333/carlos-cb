import { openai } from "@/libs/open-ai";

export const getEmbeddings = async (text: string) => {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });

    const result = await response.json();
    return result.data[0].embedding as number[];
  } catch (error) {
    console.error("ERROR OPENAI:", error);
    return [];
  }
};
