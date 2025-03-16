import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Adghal AI - Environmental Impact Assistant",
  description: "Your guide to making a positive environmental impact",
   
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
      <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzOGExNjkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1sZWFmIj48cGF0aCBkPSJNMTEgMjBBNyA3IDAgMCAxIDkuOCA2LjFDMTUuNSA1IDE3IDQuNDggMTkgMmMxIDIgMiA0LjE4IDIgOCAwIDUuNS00Ljc4IDEwLTEwIDEwWiIvPjxwYXRoIGQ9Ik0yIDIxYzAtMyAxLjg1LTUuMzYgNS4wOC02QzkuNSAxNC41MiAxMiAxMyAxMyAxMiIvPjwvc3ZnPg=="
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'