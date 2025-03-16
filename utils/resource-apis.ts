// Utility functions for fetching environmental resources from various APIs

import { cache } from "react"

// Types for our resources
export interface LearningResource {
  id: string
  title: string
  description: string
  link: string
  category: string
  imageUrl?: string
}

export interface EventResource {
  id: string
  title: string
  description: string
  link: string
  date: string
  location: string
  category: string
}

export interface Organization {
  id: string
  title: string
  description: string
  link: string
  category: string
  logoUrl?: string
}

export interface Initiative {
  id: string
  title: string
  description: string
  link: string
  category: string
  imageUrl?: string
}

// Cache the API responses to reduce API calls
export const fetchLearningResources = cache(async (): Promise<LearningResource[]> => {
  try {
    // Try multiple environmental subjects to get better results
    const environmentalSubjects = [
      "climate_change",
      "environmental_protection",
      "sustainability",
      "conservation_of_natural_resources",
      "ecology",
    ]

    // Randomly select one subject to avoid hitting rate limits
    const selectedSubject = environmentalSubjects[Math.floor(Math.random() * environmentalSubjects.length)]

    // Fetch books with the selected environmental subject
    const openLibraryResponse = await fetch(`https://openlibrary.org/subjects/${selectedSubject}.json?limit=12`)

    if (!openLibraryResponse.ok) {
      throw new Error("Failed to fetch from Open Library")
    }

    const openLibraryData = await openLibraryResponse.json()

    // Transform and filter the data to ensure environmental relevance
    const resources: LearningResource[] = []

    if (openLibraryData.works && openLibraryData.works.length > 0) {
      // Process each work and filter for relevance
      for (const work of openLibraryData.works) {
        // Check if the title or subject contains environmental keywords
        const title = work.title.toLowerCase()
        const isRelevant =
          title.includes("environment") ||
          title.includes("climate") ||
          title.includes("earth") ||
          title.includes("sustainable") ||
          title.includes("ecology") ||
          title.includes("nature") ||
          title.includes("conservation") ||
          title.includes("green") ||
          title.includes("planet")

        if (
          isRelevant ||
          (work.subject &&
            work.subject.some(
              (s: string) =>
                s.toLowerCase().includes("environment") ||
                s.toLowerCase().includes("climate") ||
                s.toLowerCase().includes("ecology"),
            ))
        ) {
          resources.push({
            id: work.key,
            title: work.title,
            description:
              work.description?.value ||
              `A book about ${selectedSubject.replace(/_/g, " ")} published ${work.first_publish_year || "recently"}.`,
            link: `https://openlibrary.org${work.key}`,
            category: "Book",
            imageUrl: work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg` : undefined,
          })
        }
      }
    }

    // If we didn't get enough relevant results, add some from our curated list
    if (resources.length < 6) {
      const curatedResources = getEnvironmentalLearningResources()
      const neededCount = 6 - resources.length

      for (let i = 0; i < neededCount && i < curatedResources.length; i++) {
        resources.push(curatedResources[i])
      }
    }

    return resources
  } catch (error) {
    console.error("Error fetching learning resources:", error)
    // Return our curated environmental resources as fallback
    return getEnvironmentalLearningResources()
  }
})

export const fetchEvents = cache(async (): Promise<EventResource[]> => {
  try {
    // Try to fetch environmental events
    // Note: This would require an Eventbrite API key
    // const eventbriteResponse = await fetch(
    //   `https://www.eventbriteapi.com/v3/events/search/?q=environmental&categories=111&token=${EVENTBRITE_API_KEY}`
    // );

    // Since we don't want to require API keys, we'll use our fallback data
    // but in a real app, you would parse the response and transform it

    return getFallbackEvents()
  } catch (error) {
    console.error("Error fetching events:", error)
    return getFallbackEvents()
  }
})

export const fetchOrganizations = cache(async (): Promise<Organization[]> => {
  // For organizations, we'll use real links but with our curated data
  // as there's no simple API for environmental organizations
  return getOrganizations()
})

export const fetchInitiatives = cache(async (): Promise<Initiative[]> => {
  // For initiatives, we'll use real links but with our curated data
  return getInitiatives()
})

// Curated environmental learning resources with real, working links
function getEnvironmentalLearningResources(): LearningResource[] {
  return [
    {
      id: "1",
      title: "Climate Change: The Science, Impacts and Solutions",
      description:
        "A comprehensive guide to understanding the science of climate change, its global impacts, and potential solutions to mitigate its effects.",
      link: "https://climate.nasa.gov/evidence/",
      category: "Guide",
      imageUrl:
        "https://climate.nasa.gov/system/internal_resources/details/original/103_shutterstock_88550854-740px.jpg",
    },
    {
      id: "2",
      title: "Sustainable Living: A Practical Guide",
      description:
        "Practical tips and strategies for reducing your environmental footprint in everyday life, from energy conservation to waste reduction.",
      link: "https://www.globalstewards.org/ecotips.htm",
      category: "Guide",
    },
    {
      id: "3",
      title: "Biodiversity and Conservation in the 21st Century",
      description:
        "Learn about the importance of biodiversity, current threats to ecosystems, and how conservation efforts are making a difference globally.",
      link: "https://www.worldwildlife.org/initiatives/wildlife-conservation",
      category: "Article",
    },
    {
      id: "4",
      title: "Renewable Energy Technologies Explained",
      description:
        "An overview of different renewable energy sources including solar, wind, hydro, and geothermal, and their role in combating climate change.",
      link: "https://www.eia.gov/energyexplained/renewable-sources/",
      category: "Guide",
    },
    {
      id: "5",
      title: "The Ocean Plastic Crisis: Solutions for a Cleaner Future",
      description:
        "Understand the crisis of plastic pollution in our oceans, its impact on marine life, and what's being done globally to address it.",
      link: "https://oceanservice.noaa.gov/hazards/marinedebris/",
      category: "Article",
    },
    {
      id: "6",
      title: "Sustainable Agriculture: Feeding the World Without Destroying It",
      description:
        "Explore how sustainable farming practices can help protect the environment while ensuring food security for a growing global population.",
      link: "https://www.nrcs.usda.gov/conservation-basics/conservation-by-state/sustainable-agriculture",
      category: "Guide",
    },
    {
      id: "7",
      title: "Environmental Justice: Ensuring Equity in the Green Transition",
      description:
        "An examination of how environmental issues disproportionately affect disadvantaged communities and approaches to ensure a just transition.",
      link: "https://www.epa.gov/environmentaljustice",
      category: "Article",
    },
    {
      id: "8",
      title: "The Sixth Extinction: Understanding Biodiversity Loss",
      description:
        "An exploration of the current mass extinction event, its causes, and what can be done to prevent further loss of species.",
      link: "https://www.nationalgeographic.com/animals/article/sixth-extinction-explained",
      category: "Article",
    },
    {
      id: "9",
      title: "Green Building Design: Principles and Practices",
      description:
        "Learn about sustainable architecture and how green building practices can reduce environmental impact while creating healthier spaces.",
      link: "https://www.usgbc.org/leed",
      category: "Guide",
    },
  ]
}

function getFallbackEvents(): EventResource[] {
  // Current and upcoming events with real links
  const currentYear = new Date().getFullYear()

  return [
    {
      id: "1",
      title: "World Environment Day",
      description: "Annual global event on June 5th celebrating environmental action and awareness.",
      link: "https://www.worldenvironmentday.global/",
      date: `June 5, ${currentYear}`,
      location: "Global",
      category: "Global Event",
    },
    {
      id: "2",
      title: "Earth Day",
      description: "Annual event celebrated around the world to demonstrate support for environmental protection.",
      link: "https://www.earthday.org/earth-day-2023/",
      date: `April 22, ${currentYear}`,
      location: "Global",
      category: "Global Event",
    },
    {
      id: "3",
      title: "Climate Week NYC",
      description: "Biggest climate event on earth, in conjunction with the UN General Assembly.",
      link: "https://www.climateweeknyc.org/",
      date: `September, ${currentYear}`,
      location: "New York City, USA",
      category: "Conference",
    },
    {
      id: "4",
      title: "Earth Hour",
      description:
        "Global event encouraging individuals to turn off non-essential lights for one hour to raise awareness about climate change.",
      link: "https://www.earthhour.org/",
      date: `March, ${currentYear}`,
      location: "Global",
      category: "Global Event",
    },
    {
      id: "5",
      title: "International Day of Forests",
      description: "Annual celebration of forests to raise awareness of the importance of all types of forests.",
      link: "https://www.fao.org/international-day-of-forests/",
      date: `March 21, ${currentYear}`,
      location: "Global",
      category: "Global Event",
    },
    {
      id: "6",
      title: "World Oceans Day",
      description: "Annual celebration of the ocean and marine environment.",
      link: "https://worldoceanday.org/",
      date: `June 8, ${currentYear}`,
      location: "Global",
      category: "Global Event",
    },
  ]
}

function getOrganizations(): Organization[] {
  return [
    {
      id: "1",
      title: "World Wildlife Fund (WWF)",
      description: "International organization working to protect wildlife and reduce human impact on the environment.",
      link: "https://www.worldwildlife.org/",
      category: "International NGO",
      logoUrl: "https://c402277.ssl.cf1.rackcdn.com/photos/18331/images/original/WWF_25mm_no_tab.png",
    },
    {
      id: "2",
      title: "Greenpeace",
      description:
        "Global environmental organization focused on issues like climate change, deforestation, and ocean conservation.",
      link: "https://www.greenpeace.org/",
      category: "International NGO",
    },
    {
      id: "3",
      title: "The Nature Conservancy",
      description: "Environmental nonprofit working to protect ecologically important lands and waters.",
      link: "https://www.nature.org/",
      category: "International NGO",
    },
    {
      id: "4",
      title: "Sierra Club",
      description: "One of the oldest and largest environmental organizations in the United States.",
      link: "https://www.sierraclub.org/",
      category: "National NGO",
    },
    {
      id: "5",
      title: "Conservation International",
      description: "Organization working to protect nature for the benefit of humanity.",
      link: "https://www.conservation.org/",
      category: "International NGO",
    },
    {
      id: "6",
      title: "Environmental Defense Fund",
      description:
        "Environmental advocacy group focused on creating economically viable solutions to environmental problems.",
      link: "https://www.edf.org/",
      category: "National NGO",
    },
  ]
}

function getInitiatives(): Initiative[] {
  return [
    {
      id: "1",
      title: "The Great Green Wall",
      description: "Initiative to combat desertification by growing an 8,000 km natural wall of trees across Africa.",
      link: "https://www.greatgreenwall.org/",
      category: "Reforestation",
    },
    {
      id: "2",
      title: "Plastic Free July",
      description: "Global movement encouraging people to reduce single-use plastic waste.",
      link: "https://www.plasticfreejuly.org/",
      category: "Waste Reduction",
    },
    {
      id: "3",
      title: "Trillion Trees",
      description: "Global initiative to protect and restore one trillion trees by 2050.",
      link: "https://trilliontrees.org/",
      category: "Reforestation",
    },
    {
      id: "4",
      title: "Clean Seas Campaign",
      description: "UN Environment initiative addressing marine plastic pollution.",
      link: "https://www.cleanseas.org/",
      category: "Ocean Conservation",
    },
    {
      id: "5",
      title: "RE100",
      description: "Global initiative bringing together businesses committed to 100% renewable electricity.",
      link: "https://www.there100.org/",
      category: "Renewable Energy",
    },
    {
      id: "6",
      title: "Global Covenant of Mayors",
      description:
        "International alliance of cities and local governments with a shared long-term vision of promoting voluntary action to combat climate change.",
      link: "https://www.globalcovenantofmayors.org/",
      category: "Climate Action",
    },
  ]
}

