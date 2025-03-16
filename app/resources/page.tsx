import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, BookOpen, Calendar, Globe, Users, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  fetchLearningResources,
  fetchEvents,
  fetchOrganizations,
  fetchInitiatives,
  type LearningResource,
  type EventResource,
  type Organization,
  type Initiative,
} from "@/utils/resource-apis"
import { Suspense } from "react"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-green-800">Environmental Resources</h1>
        </div>

        {/* Resources Tabs */}
        <Tabs defaultValue="learn" className="mb-12">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto bg-green-100">
            <TabsTrigger value="learn" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger
              value="organizations"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Organizations
            </TabsTrigger>
            <TabsTrigger
              value="initiatives"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Globe className="h-4 w-4 mr-2" />
              Initiatives
            </TabsTrigger>
          </TabsList>

          {/* Learn Tab */}
          <TabsContent value="learn">
            <Suspense fallback={<LoadingResources />}>
              <LearnResources />
            </Suspense>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <Suspense fallback={<LoadingResources />}>
              <EventsResources />
            </Suspense>
          </TabsContent>

          {/* Organizations Tab */}
          <TabsContent value="organizations">
            <Suspense fallback={<LoadingResources />}>
              <OrganizationsResources />
            </Suspense>
          </TabsContent>

          {/* Initiatives Tab */}
          <TabsContent value="initiatives">
            <Suspense fallback={<LoadingResources />}>
              <InitiativesResources />
            </Suspense>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Need Personalized Guidance?</h2>
          <p className="text-green-700 mb-6">
            Chat with Adghal AI to get customized recommendations and advice tailored to your interests and location.
          </p>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/chat">Start a Conversation</Link>
          </Button>
        </div>
        <footer className="bg-white/80 backdrop-blur-sm py-6 mt-8 rounded-lg">
          <div className="container mx-auto px-4 text-center">
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
            <p className="text-green-600/70 text-xs">
              Powered by: Hugging Face API (Mistral-7B) & DuckDuckGo Search API
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

// Component for the Learn tab
async function LearnResources() {
  const resources = await fetchLearningResources()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <LearningResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  )
}

// Component for the Events tab
async function EventsResources() {
  const events = await fetchEvents()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventResourceCard key={event.id} event={event} />
      ))}
    </div>
  )
}

// Component for the Organizations tab
async function OrganizationsResources() {
  const organizations = await fetchOrganizations()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {organizations.map((org) => (
        <OrganizationCard key={org.id} organization={org} />
      ))}
    </div>
  )
}

// Component for the Initiatives tab
async function InitiativesResources() {
  const initiatives = await fetchInitiatives()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initiatives.map((initiative) => (
        <InitiativeCard key={initiative.id} initiative={initiative} />
      ))}
    </div>
  )
}

// Loading component
function LoadingResources() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 text-green-600 animate-spin mb-4" />
      <p className="text-green-700">Loading resources...</p>
    </div>
  )
}

// Card components for each resource type
function LearningResourceCard({ resource }: { resource: LearningResource }) {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-green-100 h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-green-800">{resource.title}</CardTitle>
        </div>
        <CardDescription className="text-xs text-green-600 font-medium">{resource.category}</CardDescription>
      </CardHeader>
      {resource.imageUrl && (
        <div className="px-6 pb-2">
          <div className="relative h-40 w-full overflow-hidden rounded-md">
            <Image src={resource.imageUrl || "/placeholder.svg"} alt={resource.title} fill className="object-cover" />
          </div>
        </div>
      )}
      <CardContent className="flex-grow">
        <p className="text-green-700">{resource.description}</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full border-green-200 text-green-700 hover:bg-green-50"
        >
          <Link href={resource.link} target="_blank" rel="noopener noreferrer">
            Learn More <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function EventResourceCard({ event }: { event: EventResource }) {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-green-100 h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-green-800">{event.title}</CardTitle>
        </div>
        <CardDescription className="text-xs text-green-600 font-medium">{event.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-2">
          <span className="text-sm font-medium text-green-800">Date: </span>
          <span className="text-sm text-green-700">{event.date}</span>
        </div>
        <div className="mb-4">
          <span className="text-sm font-medium text-green-800">Location: </span>
          <span className="text-sm text-green-700">{event.location}</span>
        </div>
        <p className="text-green-700">{event.description}</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full border-green-200 text-green-700 hover:bg-green-50"
        >
          <Link href={event.link} target="_blank" rel="noopener noreferrer">
            Event Details <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function OrganizationCard({ organization }: { organization: Organization }) {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-green-100 h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-green-800">{organization.title}</CardTitle>
        </div>
        <CardDescription className="text-xs text-green-600 font-medium">{organization.category}</CardDescription>
      </CardHeader>
      {organization.logoUrl && (
        <div className="px-6 pb-2">
          <div className="relative h-20 w-full">
            <Image
              src={organization.logoUrl || "/placeholder.svg"}
              alt={organization.title}
              width={200}
              height={80}
              className="object-contain mx-auto"
            />
          </div>
        </div>
      )}
      <CardContent className="flex-grow">
        <p className="text-green-700">{organization.description}</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full border-green-200 text-green-700 hover:bg-green-50"
        >
          <Link href={organization.link} target="_blank" rel="noopener noreferrer">
            Visit Website <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function InitiativeCard({ initiative }: { initiative: Initiative }) {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-green-100 h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-green-800">{initiative.title}</CardTitle>
        </div>
        <CardDescription className="text-xs text-green-600 font-medium">{initiative.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-green-700">{initiative.description}</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full border-green-200 text-green-700 hover:bg-green-50"
        >
          <Link href={initiative.link} target="_blank" rel="noopener noreferrer">
            Learn More <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

