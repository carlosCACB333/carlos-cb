import { env } from "@/utils";
import { Pinecone } from "@pinecone-database/pinecone";

export const pc = new Pinecone({
  apiKey: env.pinecone.apiKey,
});
