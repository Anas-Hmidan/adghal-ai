"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Leaf, Send, ArrowLeft, Loader2, Search, ExternalLink } from "lucide-react"
import Link from "next/link"
import { generateHuggingFaceResponse } from "@/utils/huggingface"
import {
  searchDuckDuckGo,
  needsCurrentInformation,
  generateSearchQuery,
  summarizeSearchResults,
  type SearchResult,
} from "@/utils/search"
import { generateMockResponse } from "@/utils/mock-responses"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  source?: "ai" | "search"
  searchResults?: SearchResult[]
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm Adghal AI, your guide to environmental action. How can I help you make a positive impact today?",
      source: "ai",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Get conversation history for context
  const getConversationHistory = (): string => {
    return messages
      .slice(-6) // Only use the last 6 messages for context
      .map((msg) => `${msg.role === "user" ? "Human" : "Assistant"}: ${msg.content}`)
      .join("\n")
  }

  // Check if the query is a simple greeting
  const isGreeting = (query: string): boolean => {
    const lowerQuery = query.toLowerCase().trim()
    return (
      lowerQuery === "hello" ||
      lowerQuery === "hi" ||
      lowerQuery === "hey" ||
      lowerQuery === "greetings" ||
      lowerQuery === "hello there" ||
      lowerQuery === "hi there"
    )
  }

  // Check if the query is a simple identity question
  const isIdentityQuestion = (query: string): boolean => {
    const lowerQuery = query.toLowerCase().trim()
    return (
      lowerQuery === "what is your name?" ||
      lowerQuery === "what's your name?" ||
      lowerQuery === "who are you?" ||
      lowerQuery === "whats your name" ||
      lowerQuery === "what is your name" ||
      lowerQuery === "your name" ||
      lowerQuery === "your name?" ||
      lowerQuery === "name?"
    )
  }

  // Function to sanitize AI responses
  const sanitizeResponse = (response: string): string => {
    // Remove any mock conversation patterns
    let cleaned = response

    // Remove any "Human:" or "User:" patterns that might be in the response
    cleaned = cleaned.replace(/Human:.*?Assistant:/g, "Assistant:")
    cleaned = cleaned.replace(/User:.*?Assistant:/g, "Assistant:")

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setApiError(null)

    try {
      let responseText = ""
      let source: "ai" | "search" = "ai"
      let searchResults: SearchResult[] | undefined = undefined

      // Handle greetings directly
      if (isGreeting(input)) {
        responseText =
          "Hello! I'm Adghal AI, your environmental assistant. How can I help you make a positive impact on the environment today?"
      }
      // Handle identity questions directly
      else if (isIdentityQuestion(input)) {
        responseText =
          "I am Adghal AI, your environmental assistant. My name 'Adghal' means 'jungle' in Arabic, reflecting my focus on nature and environmental sustainability."
      }
      // Check if the query needs current information
      else if (needsCurrentInformation(input)) {
        try {
          // Generate a search query
          const searchQuery = generateSearchQuery(input)

          // Search for current information
          const results = await searchDuckDuckGo(searchQuery)

          if (results.length > 0) {
            // Summarize search results
            responseText = summarizeSearchResults(results)
            source = "search"
            searchResults = results
          } else {
            // Fallback to AI if no search results
            try {
              const conversationHistory = getConversationHistory()
              responseText = await generateHuggingFaceResponse(input, conversationHistory)
              // Sanitize the response to remove any mock conversation patterns
              responseText = sanitizeResponse(responseText)
            } catch (aiError) {
              console.error("AI generation error:", aiError)
              // Fallback to mock responses if AI fails
              responseText = generateMockResponse(input)
            }
          }
        } catch (searchError) {
          console.error("Search error:", searchError)
          // Fallback to AI if search fails
          try {
            const conversationHistory = getConversationHistory()
            responseText = await generateHuggingFaceResponse(input, conversationHistory)
            // Sanitize the response to remove any mock conversation patterns
            responseText = sanitizeResponse(responseText)
          } catch (aiError) {
            console.error("AI generation error after search failure:", aiError)
            // Fallback to mock responses if both search and AI fail
            responseText = generateMockResponse(input)
          }
        }
      } else {
        // Use Hugging Face for general queries
        try {
          const conversationHistory = getConversationHistory()
          responseText = await generateHuggingFaceResponse(input, conversationHistory)
          // Sanitize the response to remove any mock conversation patterns
          responseText = sanitizeResponse(responseText)
        } catch (aiError) {
          console.error("AI generation error for general query:", aiError)
          // Fallback to mock responses if AI fails
          responseText = generateMockResponse(input)
        }
      }

      // Add AI response
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseText,
        source,
        searchResults,
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      setApiError("Failed to generate a response. Using pre-defined answers instead.")

      // Add error message with fallback response
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: generateMockResponse(input),
        source: "ai",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Example suggestions for users
  const suggestions = [
    "How can I reduce plastic waste?",
    "Tell me about successful reforestation projects",
    "What are current volunteer opportunities near me?",
    "How can I make my home more energy efficient?",
    "What are the latest environmental events this month?",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-green-800">Chat with Adghal AI</h1>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="bg-white/90 backdrop-blur-sm border-green-100 p-4 h-[70vh] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 mr-2">
                    {message.source === "search" ? (
                      <AvatarFallback className="bg-blue-100 text-blue-800">
                        <Search className="h-4 w-4" />
                      </AvatarFallback>
                    ) : (
                      <>
                        <AvatarImage
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iW2iviYOMizneOxAiMqFzsnYQOhvLs.png"
                          alt="Adghal AI"
                        />
                        <AvatarFallback className="bg-green-100 text-green-800">
                          <Leaf className="h-4 w-4 text-green-600" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-green-600 text-white rounded-tr-none"
                      : message.source === "search"
                        ? "bg-blue-100 text-blue-900 rounded-tl-none"
                        : "bg-green-100 text-green-900 rounded-tl-none"
                  }`}
                >
                  {message.content}

                  {/* Show source links for search results */}
                  {message.source === "search" && message.searchResults && message.searchResults.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-blue-200">
                      <p className="text-xs text-blue-700 mb-1">Sources:</p>
                      <div className="flex flex-col gap-1">
                        {message.searchResults.slice(0, 2).map((result, index) => (
                          <a
                            key={index}
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs flex items-center text-blue-700 hover:underline"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            {result.title || result.url}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8 ml-2">
                    <AvatarImage
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-03-16%2014.39.43%20-%20A%20simple%20and%20clear%20circular%20icon%20design%20that%20symbolizes%20love%20for%20nature%20and%20making%20the%20world%20a%20better%20place.%20The%20design%20features%20a%20pair%20of%20abstract%20ha-4Iokz0h6y3ccOM5x52nttj1LpJ5tOE.webp"
                      alt="User"
                    />
                    <AvatarFallback className="bg-green-600 text-white">You</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iW2iviYOMizneOxAiMqFzsnYQOhvLs.png"
                    alt="Adghal AI"
                  />
                  <AvatarFallback className="bg-green-100 text-green-800">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-green-100 text-green-900 p-3 rounded-lg rounded-tl-none">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="mb-4">
              <p className="text-sm text-green-700 mb-2">Try asking about:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-green-700 border-green-200 hover:bg-green-50"
                    onClick={() => setInput(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border-green-200 focus-visible:ring-green-500"
              disabled={isLoading}
            />
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </Card>
        <footer className="mt-6 text-center">
          <p className="text-green-800 mb-1">
            Created with care by{" "}
            <a
              href="https://www.linkedin.com/in/anas-hmidan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline font-medium"
            >
              Anas Hmidan
            </a>{" "}
            🌿
          </p>
          <p className="text-green-600/70 text-xs">Powered by: Hugging Face API (Mistral-7B) & DuckDuckGo Search API</p>
        </footer>
      </div>
    </div>
  )
}

