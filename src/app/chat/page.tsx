"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [inputText, setInputText] = useState(""); //this is for the user's message to the AI for image generation
  const [imageUrl, setImageUrl] = useState<string | null>(null); //this is for the response from the AI in form of images
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      console.log("Response data:", data);

      if (!data.success) {
        throw new Error(data.error || "Failed to generate image");
      }
      if (data.imageurl) {
        setImageUrl(data.imageUrl);
      }
      console.log(data.imageUrl);

      setInputText("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // TODO: Update the UI here to show the images generated
    <>
      <div className="min-h-screen flex flex-col justify-between p-8">
        <main className="flex-1 flex flex-col items-center gap-8">
          <div className="max-w-3xl mx-auto px-4 bg-white-400">
            Hello, my name is Aurora and I am an AI text-to-image generator.
            What do you want to generate?
          </div>
          {imageUrl && (
            <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-lg">
              <Image
                src={imageUrl}
                alt="Generated artwork"
                className="w-full h-auto"
                width={800}
                height={600}
              />
            </div>
          )}

          <footer className="w-full max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="flex-1 p-3 rounded-lg bg-black/[.05] dark:bg-white/[.06] border border-black/[.08] dark:border-white/[.145] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  placeholder="Describe the image you want to generate..."
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 rounded-lg bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Generating..." : "Generate"}
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 rounded-lg bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </footer>
        </main>
      </div>
    </>
  );
}
