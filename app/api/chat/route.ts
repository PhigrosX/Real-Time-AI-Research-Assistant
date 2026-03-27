import { convertToModelMessages, stepCountIs, streamText, UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { tavilySearch } from "@tavily/ai-sdk";

const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const GENERATIVE_MODEL_VERSION = process.env.GENERATIVE_MODEL_VERSION;

// checking for API keys and versions
export async function POST(req: Request) {
  if (!GOOGLE_API_KEY) {
    return new Response("Missing GOOGLE_GENERATIVE_AI_API_KEY in environment", {
      status: 500,
    });
  }

  if (!TAVILY_API_KEY) {
    return new Response("Missing TAVILY_API_KEY in environment", {
      status: 500,
    });
  }

  if (!GENERATIVE_MODEL_VERSION) {
    return new Response("Missing GENERATIVE_MODEL_VERSION in environment", {
      status: 500,
    });
  }

  //get the user message, use [] to get the complete history
  const { messages }: { messages: UIMessage[] } = await req.json();
  //send the message to ai and get the result
  const result = streamText({
    model: google(GENERATIVE_MODEL_VERSION), //e.g: "gemini-2.5-flash"
    messages: await convertToModelMessages(messages),
    system: `Format your response in markdown with clear sections and formatting.`,
    tools: {
      // search tool
      tavilySearch: tavilySearch({
        searchDepth: "basic",
        maxResults: 5,
        includeAnswer: true,
      }),
      // weather: tool({
      //   description: "Get the weather in a location (fahrenheit)",
      //   inputSchema: z.object({
      //     location: z.string().describe("The location to get the weather for"),
      //   }),
      //   execute: async ({ location }) => {
      //     const temperature = Math.round(Math.random() * (90 - 32) + 32);
      //     return { location, temperature };
      //   },
      // }),
    },
    stopWhen: stepCountIs(3),
  });
  //convert the result to UI message and return
  return result.toUIMessageStreamResponse();
}
