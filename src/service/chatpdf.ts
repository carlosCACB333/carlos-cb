import { pc } from "@/libs/pinecone";
import { env } from "@/utils";

export const getMatchesFromEmbeddings = async (
  nameSpace: string,
  embedding: number[]
) => {
  try {
    const index = pc.index(env.pinecone.index);
    const ns = index.namespace(nameSpace);
    const query = await ns.query({
      topK: 5,
      vector: embedding,
      includeMetadata: true,
    });
    return query.matches || [];
  } catch (error) {
    console.error("ERROR PINECONE:", error);
    return [];
  }
};
