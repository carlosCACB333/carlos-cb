import { env } from "@/utils";
import { Configuration, OpenAIApi } from "openai-edge";

export const openai = new OpenAIApi(
  new Configuration({
    apiKey: env.openIa.apiKey,
  })
);
