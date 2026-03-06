"use client";

import { ArrowBigUp } from "lucide-react";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    //send to ai
    sendMessage({ text: input });

    setInput("");
  };

  return (
    // message display
    <div className="flex flex-col items-center justify-between p-3.5 h-screen">
      <div className="sm:mr-auto sm:mt-0.5 sm:ml-1">
        <h1 className="text-2xl font-semibold sm:font-medium text-stone-900">
          Chat to Gemini
        </h1>
      </div>
      <div>
        {/* <p>this is message</p> */}
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "user" ? "user" : "ai"}
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return <div key={`${message.id}-${i}`}>{part.text}</div>;
              }
            })}
          </div>
        ))}
      </div>
      {/* input box */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex items-center gap-4 w-full p-1.5 bg-slate-200 rounded-3xl border-2 border-slate-200 shadow-sm max-w-3xl sm:bg-zinc-200 sm:rounded-2xl sm:border-gray-300 sm:mb-5"
      >
        <textarea
          className="grow pl-1 focus:outline-0 text-left max-h-44 resize-none overflow-y-auto p-0.5"
          placeholder="Ask Gemini 🦜"
          rows={1}
          onInput={(e) => {
            // reset the height
            e.currentTarget.style.height = "auto";
            // reset scroll height
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
            setInput(e.currentTarget.value);
          }}
          value={input}
        />
        <button className="cursor-pointer rounded-full p-1.5 bg-black text-white mt-auto">
          <ArrowBigUp strokeWidth={1.5} />
        </button>
      </form>
    </div>
  );
}
