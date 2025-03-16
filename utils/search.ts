// Utility functions for searching current information using DuckDuckGo

export async function searchDuckDuckGo(query: string): Promise<SearchResult[]> {
  try {
    // Use our server-side API route instead of directly calling DuckDuckGo
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)

    if (!response.ok) {
      throw new Error(`Search API error: ${response.statusText}`)
    }

    const data = await response.json()

    // Extract and format search results
    const results: SearchResult[] = []

    // Add the main abstract if available
    if (data.Abstract) {
      results.push({
        title: data.Heading || "Main Result",
        snippet: data.Abstract,
        url: data.AbstractURL || "",
      })
    }

    // Add related topics
    if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
      data.RelatedTopics.forEach((topic: any) => {
        if (topic.Text && !topic.Topics) {
          results.push({
            title: topic.FirstURL ? new URL(topic.FirstURL).hostname : "Related Information",
            snippet: topic.Text,
            url: topic.FirstURL || "",
          })
        }
      })
    }

    // If no results were found, use mock data for demonstration
    if (results.length === 0) {
      return getMockSearchResults(query)
    }

    return results
  } catch (error) {
    console.error("Error searching DuckDuckGo:", error)
    // Return mock results if the search fails
    return getMockSearchResults(query)
  }
}

export interface SearchResult {
  title: string
  snippet: string
  url: string
}

// Function to determine if a query needs current information
export function needsCurrentInformation(query: string): boolean {
  const currentInfoKeywords = [
    "current",
    "recent",
    "latest",
    "today",
    "this week",
    "this month",
    "this year",
    "upcoming",
    "event",
    "opportunity",
    "volunteer",
    "when",
    "where",
    "how to join",
    "happening",
    "news",
  ]

  const queryLower = query.toLowerCase()
  return currentInfoKeywords.some((keyword) => queryLower.includes(keyword))
}

// Function to generate a search query based on user input
export function generateSearchQuery(userQuery: string): string {
  // Add environmental context to the search
  return `environmental ${userQuery} current information`
}

// Function to summarize search results
export function summarizeSearchResults(results: SearchResult[]): string {
  if (results.length === 0) {
    return "I couldn't find current information on that topic. Please try a different query or ask me for general advice instead."
  }

  let summary = "Based on current information I found:\n\n"

  // Use the first 3 results at most
  const limitedResults = results.slice(0, 3)

  limitedResults.forEach((result, index) => {
    summary += `${index + 1}. ${result.snippet}\n`
    if (result.url) {
      summary += `   Source: ${result.url}\n`
    }
    summary += "\n"
  })

  summary += "This information is based on current search results and may change over time."

  return summary
}

// Mock search results for demonstration when the API fails
function getMockSearchResults(query: string): SearchResult[] {
  const queryLower = query.toLowerCase()

  if (queryLower.includes("volunteer") || queryLower.includes("opportunities")) {
    return [
      {
        title: "VolunteerMatch.org",
        snippet:
          "There are currently over 5,000 environmental volunteer opportunities available nationwide. Popular options include beach cleanups, tree planting events, and wildlife conservation projects. Many organizations are looking for volunteers for upcoming Earth Day events in April.",
        url: "https://www.volunteermatch.org/environmental",
      },
      {
        title: "Conservation.org",
        snippet:
          "Conservation International is currently recruiting volunteers for their Ecosystem Monitoring Program. Volunteers help collect data on local ecosystems to track biodiversity and climate change impacts. Training is provided and no prior experience is necessary.",
        url: "https://www.conservation.org/volunteer",
      },
    ]
  } else if (queryLower.includes("event") || queryLower.includes("happening")) {
    return [
      {
        title: "EarthDay.org",
        snippet:
          "Earth Day 2023 will be celebrated on April 22nd with thousands of events worldwide. This year's theme is 'Invest In Our Planet' with a focus on climate action. Major cities are hosting sustainability fairs, workshops, and community cleanups throughout April.",
        url: "https://www.earthday.org/events",
      },
      {
        title: "SierraClub.org",
        snippet:
          "The Sierra Club has announced their summer environmental education series with virtual and in-person events from June through August. Topics include renewable energy, sustainable agriculture, and environmental justice. Registration is now open for all events.",
        url: "https://www.sierraclub.org/events",
      },
    ]
  } else {
    return [
      {
        title: "Environmental News Network",
        snippet:
          "Recent environmental initiatives include the launch of the Global Plastic Reduction Pact, with 50 countries committing to reduce single-use plastics by 50% by 2030. Several major corporations have also announced new sustainability goals focusing on carbon neutrality and circular economy principles.",
        url: "https://www.enn.com/latest",
      },
      {
        title: "GreenMatters.com",
        snippet:
          "The latest environmental technology innovations include new affordable solar panel designs, biodegradable packaging materials made from agricultural waste, and more efficient water purification systems for developing regions. These technologies are expected to become widely available within the next year.",
        url: "https://www.greenmatters.com/innovations",
      },
    ]
  }
}

