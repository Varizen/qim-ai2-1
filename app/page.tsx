"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { BookOpen, ArrowRight, Brain, GraduationCap, Globe, Sparkles } from "lucide-react";

export default function Home() {
  const [hovered, setHovered] = useState(false);

  return (
    <main className="min-h-screen bg-[#0B0F1A] text-[#E5E7EB] relative overflow-hidden">
      {/* Subtle orb background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6D5DFC]/5 blur-3xl pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Logo />
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-[#E5E7EB]/70 hover:text-white transition">Dashboard</Link>
          <Link href="/chat" className="text-sm text-[#E5E7EB]/70 hover:text-white transition">Chat</Link>
          <Link href="/admin" className="text-sm text-[#E5E7EB]/70 hover:text-white transition">Admin</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111827] border border-[#6D5DFC]/20 text-sm text-[#6D5DFC] mb-8">
          <Brain className="w-4 h-4" />
          AI tutor trained on YOUR syllabus — not generic
        </div>

        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight mb-6">
          Learn deeply with{" "}
          <span className="bg-gradient-to-r from-[#6D5DFC] via-[#14B8A6] to-[#6D5DFC] bg-clip-text text-transparent">
            QiM-AI2.1
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[#E5E7EB]/60 max-w-2xl mb-10">
          Your personal AI tutor inspired by great teaching. Upload your syllabus, ask anything, and get answers backed by real research.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/chat"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#6D5DFC] text-white font-semibold hover:bg-[#6D5DFC]/90 transition shadow-lg shadow-[#6D5DFC]/20"
          >
            <BookOpen className="w-5 h-5" />
            Start Learning
            <ArrowRight className={`w-4 h-4 transition-transform ${hovered ? "translate-x-1" : ""}`} />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#111827] border border-[#E5E7EB]/10 text-[#E5E7EB] font-semibold hover:bg-[#111827]/80 transition"
          >
            <GraduationCap className="w-5 h-5" />
            Go to Dashboard
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#111827] border border-[#E5E7EB]/5 hover:border-[#6D5DFC]/20 transition">
            <div className="w-10 h-10 rounded-lg bg-[#6D5DFC]/10 flex items-center justify-center mb-4">
              <Brain className="w-5 h-5 text-[#6D5DFC]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI Tutor</h3>
            <p className="text-sm text-[#E5E7EB]/50">Personalized learning with a wise professor approach — simple first, then deep.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#111827] border border-[#E5E7EB]/5 hover:border-[#14B8A6]/20 transition">
            <div className="w-10 h-10 rounded-lg bg-[#14B8A6]/10 flex items-center justify-center mb-4">
              <Globe className="w-5 h-5 text-[#14B8A6]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Research Engine</h3>
            <p className="text-sm text-[#E5E7EB]/50">Search papers, view authors, and get influence scores from Semantic Scholar.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#111827] border border-[#E5E7EB]/5 hover:border-[#6D5DFC]/20 transition">
            <div className="w-10 h-10 rounded-lg bg-[#6D5DFC]/10 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-[#6D5DFC]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Citation Intelligence</h3>
            <p className="text-sm text-[#E5E7EB]/50">Upload your syllabus, parse, chunk, embed, and train the AI on your content.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-xs text-[#E5E7EB]/30 space-y-1">
        <p>
          <span className="text-[#E5E7EB]/50">by</span>{" "}
          <a href="https://hakimsarker.org" target="_blank" rel="noopener noreferrer" className="text-[#6D5DFC] hover:underline">hakimsarker.org</a>
          <span className="mx-1">·</span>
          <span className="text-[#E5E7EB]/50">powered by</span>{" "}
          <span className="text-[#14B8A6]">Varizen Inc.</span>
        </p>
        <p>
          <span className="text-[#E5E7EB]/40">developped with love from Dhaka, Kuala Lumpur and Wyoming</span>
        </p>
        <p>
          <span className="text-[#E5E7EB]/30">in association with</span>{" "}
          <span className="text-[#E5E7EB]/40">SohaelTasneem Foundation Ltd</span>
          <span className="mx-1 text-[#E5E7EB]/20">·</span>
          <span className="text-[#E5E7EB]/30">a non-profit organization</span>
        </p>
        <p>
          <span className="text-[#E5E7EB]/30">and</span>{" "}
          <span className="text-[#E5E7EB]/40">ISWR, University of Dhaka</span>
        </p>
      </footer>
    </main>
  );
}
