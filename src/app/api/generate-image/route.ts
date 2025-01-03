import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    const apiSecret = request.headers.get("X-API-SECRET");

    if (apiSecret != process.env.API_SECRET) {
      return NextResponse.json({ error: "Unauthorized " }, { status: 401 });
    }

    // TODO: Call your Image Generation API here
    // For now, we'll just echo back the text
    // Modal API goes here, the link goes in the await fetch function and it should return an image

    console.log(text);

    const url = new URL("https://d3n-ops--aurora-be-model-health.modal.run/");

    url.searchParams.set("prompt", text);

    console.log("Requesting URL", url.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.MODAL_API || "",
        Accept: "image/jpeg",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Response:", errorText);
      throw new Error(
        "HTTP error! status: ${response.status}, message: ${errorText}"
      );
    }

    const imageBuffer = await response.arrayBuffer();

    const imageFile = "${crypto.randomUUID()}.jpg";

    const blob = await put(imageFile, imageBuffer, {
      access: "public",
      contentType: "image/jpeg",
    });

    return NextResponse.json({
      success: true,
      imageUrl: blob.url,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
