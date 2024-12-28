"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {" "}
      <h1 className="text-4xl text-white font-bold mb-4">Aurora</h1>
      <p className="text-lg text-white mb-8">
        Multimodal AI-Chatbot turning text to image.
      </p>
      <div className="center text-black-700">
        <button
          type="button"
          style={{ color: "black" }}
          className="text-color px-6 py-2 bg-gray-100 rounded-md hover:bg-gray-300 transition-colors"
          onClick={() => {
            router.push("/chat");
          }}
        >
          Chat
        </button>
      </div>
    </main>
  );
}
