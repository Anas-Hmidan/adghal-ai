import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="h-16 w-16 text-green-600 animate-spin mb-4" />
        <p className="text-xl text-green-700">Loading resources...</p>
      </div>
    </div>
  )
}

