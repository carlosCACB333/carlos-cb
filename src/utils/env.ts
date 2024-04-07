export const env = {
  site: {
    url: process.env.SITE_URL || "",
  },
  cms: {
    url: process.env.GRAPHCMS_URL || "",
    token: process.env.GRAPHCMS_TOKEN || "",
    media: process.env.NEXT_PUBLIC_GRAPHCMS_MEDIA || "",
  },
  author: {
    email: process.env.AUTHOR_EMAIL || "",
    password: process.env.AUTHOR_PASSWORD || "",
  },
  revalidate: 3600,
  openIa: {
    apiKey: process.env.OPENAI_API_KEY || "",
  },
  apiKey: process.env.API_KEY || "",

  pinecone: {
    apiKey: process.env.PINECONE_API_KEY || "",
    index: process.env.PINECONE_INDEX || "",
    selfNameSpace: process.env.PINECONE_SELF_NAMESPACE || "",
  },
};

export const ALLOWED_LOCALES = ["es", "en"];

export const __PROD__ = process.env.NODE_ENV === "production";
