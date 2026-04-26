"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  TrendingUp, BookOpen, User, ArrowLeft, Brain,
  FileText, Search, CreditCard, Loader2
} from "lucide-react";

interface DashboardData {
  totalCitations: number;
  topAuthors: { name: string; totalCitations: number; papers: number; score: number }[];
  recentPapers: number;
  trends: { label: string; value: number }[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch demo data — in production this would come from your API
    const fetchData = async () => {
      try {
        const res = await fetch("/api/research?q=social+work");
        const result = await res.json();
        const papers = result.papers || [];
        const authors = result.authors || [];
        const totalCitations = papers.reduce((sum: number, p: { citationCount?: number }) => sum + (p.citationCount || 0), 0);
        setData({
          totalCitations,
          topAuthors: authors.slice(0, 5),
          recentPapers: papers.length,
          trends: [
            { label: "Papers", value: papers.length },
            { label: "Authors", value: authors.length },
            { label: "Citations", value: totalCitations },
          ],
        });
      } catch {
        setData({
          totalCitations: 0,
          topAuthors: [],
          recentPapers: 0,
          trends: [],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0F1A] text-[#E5E7EB]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]/10 bg-[#0B0F1A]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[#E5E7EB]/50 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/chat" className="text-sm text-[#E5E7EB]/70 hover:text-white transition">Chat</Link>
          <Link href="/research" className="text-sm text-[#E5E7EB]/70 hover:text-white transition">Research</Link>
          <Link href="/admin" className="text-sm text-[#E5E7EB]/70 hover:text-white transition">Admin</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6D5DFC] to-[#14B8A6] bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-[#E5E7EB]/50 mt-1">Overview of your learning and research.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#6D5DFC] animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-5 rounded-xl bg-[#111827] border border-[#E5E7EB]/5">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#6D5DFC]" />
                  <span className="text-xs text-[#E5E7EB]/40 uppercase tracking-wider">Total Citations</span>
                </div>
                <p className="text-3xl font-bold">{(data?.totalCitations || 0).toLocaleString()}</p>
              </div>
              <div className="p-5 rounded-xl bg-[#111827] border border-[#E5E7EB]/5">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-[#14B8A6]" />
                  <span className="text-xs text-[#E5E7EB]/40 uppercase tracking-wider">Papers Indexed</span>
                </div>
                <p className="text-3xl font-bold">{data?.recentPapers || 0}</p>
              </div>
              <div className="p-5 rounded-xl bg-[#111827] border border-[#E5E7EB]/5">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-[#6D5DFC]" />
                  <span className="text-xs text-[#E5E7EB]/40 uppercase tracking-wider">Authors Tracked</span>
                </div>
                <p className="text-3xl font-bold">{data?.topAuthors?.length || 0}</p>
              </div>
            </div>

            {/* Top Authors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-[#111827] border border-[#E5E7EB]/5">
                <h2 className="text-sm font-semibold text-[#E5E7EB]/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Top Authors
                </h2>
                {data?.topAuthors && data.topAuthors.length > 0 ? (
                  <div className="space-y-3">
                    {data.topAuthors.map((a, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#0B0F1A]">
                        <div>
                          <p className="text-sm font-medium">{a.name}</p>
                          <p className="text-xs text-[#E5E7EB]/40">{a.papers} papers</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-[#6D5DFC]">{a.totalCitations}</p>
                          <p className="text-xs text-[#E5E7EB]/30">citations</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#E5E7EB]/30 py-6 text-center">No author data yet. Visit the Research page to start searching.</p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="p-5 rounded-xl bg-[#111827] border border-[#E5E7EB]/5">
                <h2 className="text-sm font-semibold text-[#E5E7EB]/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  <Link href="/chat" className="flex items-center gap-3 p-3 rounded-lg bg-[#0B0F1A] hover:bg-[#1a2236] transition text-sm">
                    <Brain className="w-4 h-4 text-[#6D5DFC]" />
                    Start AI Tutor Chat
                    <TrendingUp className="w-3 h-3 text-[#E5E7EB]/20 ml-auto" />
                  </Link>
                  <Link href="/research" className="flex items-center gap-3 p-3 rounded-lg bg-[#0B0F1A] hover:bg-[#1a2236] transition text-sm">
                    <Search className="w-4 h-4 text-[#14B8A6]" />
                    Search Research Papers
                    <TrendingUp className="w-3 h-3 text-[#E5E7EB]/20 ml-auto" />
                  </Link>
                  <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg bg-[#0B0F1A] hover:bg-[#1a2236] transition text-sm">
                    <FileText className="w-4 h-4 text-[#6D5DFC]" />
                    Upload Training Data
                    <TrendingUp className="w-3 h-3 text-[#E5E7EB]/20 ml-auto" />
                  </Link>
                  <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-[#0B0F1A] hover:bg-[#1a2236] transition text-sm">
                    <CreditCard className="w-4 h-4 text-[#14B8A6]" />
                    Manage Credits
                    <TrendingUp className="w-3 h-3 text-[#E5E7EB]/20 ml-auto" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-[#E5E7EB]/20">
        by hakimsarker.org · powered by Varizen Inc. · developped with love from Dhaka, Kuala Lumpur and Wyoming· in association with SohaelTasneem Foundation Ltd - a non-profit organization and ISWR, University of Dhaka.
      </footer>
    </main>
  );
}
