"use server";

export async function generateImage(text: string) {
  try {
    const response = await fetch("http://localhost:3000/api/generate-image", {
      method: "POST",
      headers: {
        "Content-type": "applications/json",
        "X-API-SECRET": process.env.API_SECRET || "",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("HTTP error! status: ${response.json}");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Server Error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate image",
    };
  }
}
