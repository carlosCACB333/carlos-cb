import { getMatchesFromEmbeddings } from "./chatpdf";
import { getEmbeddings } from "./open-ai";

export async function getContext(namespace: string, query: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(namespace, queryEmbeddings);

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
  // 5 vectors
  return docs.join("\n").substring(0, 3000);
}
