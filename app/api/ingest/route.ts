import { google, type GoogleEmbeddingModelOptions } from "@ai-sdk/google";
import { embed } from "ai";

const model = google.embedding("gemini-embedding-2-preview");

export async function POST() {
  const { embedding } = await embed({
    model,
    value: "sunny day at the beach",
    providerOptions: {
      google: {
        outputDimensionality: 768, // optional, number of dimensions for the embedding
      } satisfies GoogleEmbeddingModelOptions,
    },
  });

  console.log("em:", embedding);
  return Response.json({
    ok: true,
    embedding: embedding,
  });
}
