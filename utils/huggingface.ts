// Utility functions for interacting with Hugging Face API

import { generateMockResponse } from "./mock-responses"

export async function generateHuggingFaceResponse(prompt: string, conversationHistory: string): Promise<string> {
  try {
    // Check for simple identity questions or greetings first
    const directResponse = checkDirectResponse(prompt)
    if (directResponse) {
      return directResponse
    }

    // Combine conversation history with the current prompt
    const fullPrompt = `${conversationHistory}
Human: ${prompt}
Assistant:`

    // Call our server-side API route instead of directly calling Hugging Face
    const response = await fetch("/api/huggingface", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: fullPrompt }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API route error (${response.status}): ${errorText}`)
      throw new Error(`API route error: ${response.statusText}`)
    }

    const result = await response.json()

    // Extract the generated text from the response
    let generatedText = ""
    if (Array.isArray(result) && result.length > 0) {
      generatedText = result[0]?.generated_text || ""
    } else if (typeof result === "object" && result.generated_text) {
      generatedText = result.generated_text
    }

    // If we got an empty response, fall back to mock responses
    if (!generatedText.trim()) {
      console.warn("Empty response from Hugging Face API, using fallback")
      return generateMockResponse(prompt)
    }

    // Clean up the response - remove any mock conversation patterns
    generatedText = cleanupResponse(generatedText)

    return generatedText.trim()
  } catch (error) {
    console.error("Error calling Hugging Face API:", error)
    // Fallback to mock responses if API fails
    return generateMockResponse(prompt)
  }
}

// Function to handle simple identity questions and greetings directly without using the API
function checkDirectResponse(prompt: string): string | null {
  const promptLower = prompt.toLowerCase().trim()

  // Handle creator questions
  if (
    promptLower.includes("who created you") ||
    promptLower.includes("who made you") ||
    promptLower.includes("who built you") ||
    promptLower.includes("who developed you") ||
    promptLower.includes("who programmed you") ||
    promptLower.includes("who is your creator") ||
    promptLower.includes("who's your creator") ||
    promptLower.includes("who powers you") ||
    promptLower.includes("who designed you")
  ) {
    return "I was created by Anas Hmidan, someone who cares deeply about our planet and wants to inspire positive change. With a blend of human creativity and AI technology, I exist to help people like you make a difference for nature and our future."
  }

  // Handle name questions
  if (
    promptLower === "what is your name?" ||
    promptLower === "what's your name?" ||
    promptLower === "who are you?" ||
    promptLower === "whats your name" ||
    promptLower === "what is your name" ||
    promptLower === "your name" ||
    promptLower === "your name?" ||
    promptLower === "name?"
  ) {
    return "I am Adghal AI, your environmental assistant. My name 'Adghal' means 'jungle' in Arabic, reflecting my focus on nature and environmental sustainability."
  }

  // Handle greetings
  if (
    promptLower === "hello" ||
    promptLower === "hi" ||
    promptLower === "hey" ||
    promptLower === "greetings" ||
    promptLower === "hello there" ||
    promptLower === "hi there"
  ) {
    return "Hello! I'm Adghal AI, your environmental assistant. How can I help you make a positive impact on the environment today?"
  }

  // Handle purpose questions
  if (
    promptLower === "what do you do?" ||
    promptLower === "what can you do?" ||
    promptLower === "how can you help me?" ||
    promptLower === "what is your purpose?"
  ) {
    return "I'm designed to help you find ways to make a positive environmental impact. I can provide information on reducing waste, conserving energy, finding volunteer opportunities, and learning about environmental initiatives. Feel free to ask me anything related to environmental sustainability!"
  }

  // Return null if it's not a simple identity question or greeting
  return null
}

// Function to clean up responses and remove any mock conversation patterns
function cleanupResponse(text: string): string {
  // Remove any "Human:" or "User:" patterns that might be in the response
  let cleaned = text.replace(/Human:.*?Assistant:/gs, "Assistant:")
  cleaned = cleaned.replace(/User:.*?Assistant:/gs, "Assistant:")

  // If the response contains multiple "Assistant:" parts, keep only the first one
  if (cleaned.includes("Assistant:")) {
    const parts = cleaned.split("Assistant:")
    if (parts.length > 1) {
      cleaned = "Assistant:" + parts[1]
    }
  }

  // Remove any remaining "Assistant:" prefix
  cleaned = cleaned.replace(/^Assistant:\s*/g, "")

  // Remove any text after patterns that suggest a mock conversation continuation
  const cutoffPatterns = ["Human:", "User:", "Question:", "You:", "Person:"]

  for (const pattern of cutoffPatterns) {
    if (cleaned.includes(pattern)) {
      cleaned = cleaned.split(pattern)[0].trim()
    }
  }

  return cleaned
}

