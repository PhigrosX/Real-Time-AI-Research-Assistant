import { convertToModelMessages, streamText, UIMessage } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  //get the user message, use [] to get the complete history
  const { messages }: { messages: UIMessage[] } = await req.json();
  //send the message to ai and get the result
  const result = streamText({
    model: google("gemini-3-flash-preview"),
    messages: await convertToModelMessages(messages),
  });
  //convert the result to UI message and return
  return result.toUIMessageStreamResponse();
}
