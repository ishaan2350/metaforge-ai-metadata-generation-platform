"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, FileText, Mic, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background">

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6 inline-block">
            v1.0 Public Beta
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight font-display bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-300 to-zinc-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          MetaSense <span className="text-blue-500">AI</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Unlock the intelligence hidden in your documents.
          Voice-controlled metadata generation, auditing, and exploration for the modern enterprise.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/dashboard">
            <Button size="lg" className="h-14 px-8 text-lg gap-2">
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="secondary" size="lg" className="h-14 px-8 text-lg">
              View Demo
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 py-20 z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: FileText,
            title: "Auto-Metadata",
            desc: "Automatically generate titles, summaries, and tags for any uploaded document using LLaMA 2."
          },
          {
            icon: Mic,
            title: "Voice Command",
            desc: "Interact with your document store using natural voice commands. 'Show me contracts from July'."
          },
          {
            icon: Sparkles,
            title: "RAG Intelligence",
            desc: "Ask deep questions about your content and get accurate, cited answers instantly."
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-2xl glass border border-white/5 hover:border-blue-500/30 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
          >
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-zinc-400">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] -z-0 pointer-events-none" />
    </div>
  );
}
