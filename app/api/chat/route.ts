import { convertToModelMessages, stepCountIs, streamText, UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { tavilySearch } from "@tavily/ai-sdk";

export async function POST(req: Request) {
  //get the user message, use [] to get the complete history
  const { messages }: { messages: UIMessage[] } = await req.json();
  //send the message to ai and get the result
  const result = streamText({
    model: google("gemini-2.5-flash"),
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
