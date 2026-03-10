"use client";

import { ArrowBigUp } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import Markdown from "react-markdown";
import { Spinner } from "./ui/loading";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useLayoutEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    //send to ai
    sendMessage({ text: input });
    setInput("");
  };

  return (
    // message display
    <div className="py-2 h-screen flex flex-col items-center">
      <header className="w-full mt-1 border-b border-gray-200 sm:border-none">
        <h1 className="text-center mx-auto text-2xl font-semibold sm:font-medium text-stone-900 sm:text-left sm:ml-2">
          Chat to Gemini
        </h1>
      </header>
      {/* message */}

      <section className="overflow-y-auto flex-1 px-4 py-2 w-full ">
        {messages.map((message) => (
          <div className="mx-auto sm:max-w-3xl" key={message.id}>
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return (
                    <div
                      key={`${message.id}-${i}`}
                      className={`${
                        message.role === "user"
                          ? "bg-gray-200 ml-auto mr-4 rounded-xl mb-2 w-fit max-w-5/6 sm:mr-5"
                          : "max-w-[98%] mx-auto"
                      } p-2.5 mt-12`}
                    >
                      {message.role === "user" ? (
                        <p className="font-semibold text-2xl">You</p>
                      ) : (
                        <p className="font-semibold text-2xl">Assistant</p>
                      )}
                      {
                        <div className="prose max-w-full">
                          <Markdown>{part.text}</Markdown>
                        </div>
                      }
                    </div>
                  );
              }
            })}
          </div>
        ))}
        {status === "submitted" && (
          <div className="mx-auto sm:max-w-3xl">
            <div className="max-w-[98%] mx-auto p-2.5 mt-12 flex items-center gap-1.5">
              <p className="font-semibold text-2xl">Assistant</p>
              <Spinner className="size-6" />
            </div>
          </div>
        )}
        <div ref={messageEndRef} className="h-4"></div>
      </section>

      {/* input box */}
      <section className="px-2 w-full max-w-3xl">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex items-center gap-4 mx-auto mb-2 mt-2 p-1.5 bg-slate-200 rounded-3xl border-2 border-slate-200 shadow-sm  sm:bg-zinc-200 sm:rounded-2xl sm:border-gray-300 sm:mb-6 sm:mt-0"
        >
          <textarea
            className="grow pl-1 focus:outline-0 text-left max-h-44 resize-none overflow-y-auto p-0.5"
            placeholder="Ask Gemini 🦜"
            rows={1}
            onInput={(e) => setInput(e.currentTarget.value)}
            value={input}
            ref={textAreaRef}
          />
          <button
            disabled={
              !input.trim() || status === "submitted" || status === "streaming"
            }
            className="rounded-full p-1.5 bg-black text-white mt-autocursor-pointer disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <ArrowBigUp strokeWidth={1.5} />
          </button>
        </form>
      </section>
    </div>
  );
}
