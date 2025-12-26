import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: 'MetaSense AI - Voice-Driven Metadata Intelligence',
  description: 'Enterprise-grade metadata exploration and generation powered by AI.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.variable, outfit.variable, "font-sans min-h-screen antialiased bg-background text-foreground selection:bg-blue-500/30")}>
        <main className="relative flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
