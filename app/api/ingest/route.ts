import { getSupabase } from "@/app/lib/utils";
import { google, type GoogleEmbeddingModelOptions } from "@ai-sdk/google";
import { embed } from "ai";

const model = google.embedding("gemini-embedding-2-preview");

const { client: supabase, message } = getSupabase();

export async function POST(req: Request) {
  try {
    //check supabase connection
    if (!supabase) {
      return Response.json(
        {
          code: 500,
          data: null,
          message: `database connection failed: ${message}`,
        },
        { status: 500 },
      );
    }

    //parase the text from client
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return Response.json(
        {
          code: 400,
          data: null,
          message: "content cannot be null",
        },
        { status: 400 },
      );
    }

    //embed text into vectors
    const { embedding } = await embed({
      model,
      value: text,
      providerOptions: {
        google: {
          outputDimensionality: 768, // optional, number of dimensions for the embedding
        } satisfies GoogleEmbeddingModelOptions,
      },
    });

    //inert into Supabase
    const { data, error } = await supabase
      .from("documents")
      .insert({ title: "test", body: text, embedding })
      .select();

    if (error) {
      console.error(`failed in writting database: ${error.message}`);
      return Response.json(
        { code: 500, data: null, message: error.message },
        { status: 500 },
      );
    } else {
      // console.log(data);
      return Response.json(
        {
          code: 200,
          data: {
            embedding,
            insertId: data[0].id,
          },
          message: "Vector generation successful",
        },
        { status: 200 },
      );
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "unknown error";

    return Response.json(
      {
        code: 500,
        data: null,
        message: errorMessage,
      },
      { status: 500 },
    );
  }
}
