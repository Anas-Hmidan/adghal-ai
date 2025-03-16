import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThreeBackground from "@/components/three-background"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Three.js Background */}
      <div className="fixed inset-0 -z-10">
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-green-50 to-emerald-100" />}>
          <ThreeBackground />
        </Suspense>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-20 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iW2iviYOMizneOxAiMqFzsnYQOhvLs.png"
              alt="Adghal AI Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-4">Adghal AI</h1>
          <p className="text-xl md:text-2xl text-green-800 mb-2">Your companion for environmental impact</p>
          <p className="text-green-700 max-w-2xl mb-8">
            Get personalized advice, discover inspiring stories, and find opportunities to make a difference for our
            planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/chat">
                Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link href="/resources">Explore Resources</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-green-900 mb-12">How Adghal AI Can Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Personalized Suggestions"
              description="Get tailored recommendations for reducing your environmental footprint based on your lifestyle and interests."
            />
            <FeatureCard
              title="Inspiring Stories"
              description="Discover success stories from around the world that showcase the positive impact of environmental initiatives."
            />
            <FeatureCard
              title="Volunteer Opportunities"
              description="Find local and global opportunities to participate in environmental conservation and sustainability projects."
            />
            <FeatureCard
              title="Educational Resources"
              description="Access curated content to deepen your understanding of environmental issues and sustainable practices."
            />
            <FeatureCard
              title="Community Connection"
              description="Connect with like-minded individuals and organizations committed to environmental causes."
            />
            <FeatureCard
              title="Impact Tracking"
              description="Monitor and celebrate your contributions to environmental sustainability over time."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-green-900 mb-4">Ready to Make a Difference?</h2>
            <p className="text-green-700 mb-8">
              Start your journey towards a more sustainable future with Adghal AI as your guide.
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/chat">Chat with Adghal AI</Link>
            </Button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm py-8 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-800 mb-2">
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
          <p className="text-green-700 text-sm">
            © {new Date().getFullYear()} Adghal AI - Empowering Environmental Action
          </p>
          <p className="text-green-600/70 text-xs mt-2">
            Powered by: Hugging Face API (Mistral-7B) & DuckDuckGo Search API
          </p>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-green-100">
      <CardHeader>
        <CardTitle className="text-green-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-green-700">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

