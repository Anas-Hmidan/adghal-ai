import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    // Use DuckDuckGo API
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`,
    )

    if (!response.ok) {
      throw new Error(`DuckDuckGo API error: ${response.statusText}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in search API route:", error)
    return NextResponse.json({ error: "Failed to search" }, { status: 500 })
  }
}

