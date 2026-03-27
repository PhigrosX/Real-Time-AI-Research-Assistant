"use client";

import { useState } from "react";

export default function Test() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/ingest", {
        method: "POST",
        body: JSON.stringify({ text: message }),
      });
      if (!response.ok) {
        throw new Error(`error in embedding: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.embedding);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("unknown error");
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl">test</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col items-center gap-3"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-2"
        />
        <button className="bg-[#2563eb] cursor-pointer border-2">go</button>
      </form>
    </div>
  );
}
