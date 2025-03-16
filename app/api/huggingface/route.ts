import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Get API key from environment variables
    const apiKey = process.env.HUGGINGFACE_API_KEY

    if (!apiKey) {
      console.error("HUGGINGFACE_API_KEY is not set")
      return NextResponse.json({ error: "API key is not configured" }, { status: 500 })
    }

    console.log("Calling Hugging Face API with prompt length:", prompt.length)

    // Call Hugging Face API
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
          return_full_text: false,
          stop: ["Human:", "User:", "Question:", "You:"],
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Hugging Face API error (${response.status}): ${errorText}`)
      return NextResponse.json({ error: `Hugging Face API error: ${response.statusText}` }, { status: response.status })
    }

    const result = await response.json()
    console.log("Hugging Face API response received")

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in Hugging Face API route:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

