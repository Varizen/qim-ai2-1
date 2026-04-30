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
    <main className="min-h-screen bg-background-legacy text-foreground-legacy">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border-legacy bg-background-legacy/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-text-muted-low hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/chat" className="text-sm text-text-secondary-legacy hover:text-white transition">Chat</Link>
          <Link href="/research" className="text-sm text-text-secondary-legacy hover:text-white transition">Research</Link>
          <Link href="/admin" className="text-sm text-text-secondary-legacy hover:text-white transition">Admin</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-text-muted-legacy mt-1">Overview of your learning and research.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-5 rounded-xl bg-surface-card border border-border-light">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-xs text-text-muted-legacy uppercase tracking-wider">Total Citations</span>
                </div>
                <p className="text-3xl font-bold">{(data?.totalCitations || 0).toLocaleString()}</p>
              </div>
              <div className="p-5 rounded-xl bg-surface-card border border-border-light">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span className="text-xs text-text-muted-legacy uppercase tracking-wider">Papers Indexed</span>
                </div>
                <p className="text-3xl font-bold">{data?.recentPapers || 0}</p>
              </div>
              <div className="p-5 rounded-xl bg-surface-card border border-border-light">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-xs text-text-muted-legacy uppercase tracking-wider">Authors Tracked</span>
                </div>
                <p className="text-3xl font-bold">{data?.topAuthors?.length || 0}</p>
              </div>
            </div>

            {/* Top Authors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-surface-card border border-border-light">
                <h2 className="text-sm font-semibold text-foreground-legacy/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Top Authors
                </h2>
                {data?.topAuthors && data.topAuthors.length > 0 ? (
                  <div className="space-y-3">
                    {data.topAuthors.map((a, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background-legacy">
                        <div>
                          <p className="text-sm font-medium">{a.name}</p>
                          <p className="text-xs text-text-muted-legacy">{a.papers} papers</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary">{a.totalCitations}</p>
                          <p className="text-xs text-text-muted-low">citations</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-muted-low py-6 text-center">No author data yet. Visit the Research page to start searching.</p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="p-5 rounded-xl bg-surface-card border border-border-light">
                <h2 className="text-sm font-semibold text-text-secondary-legacy uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  <Link href="/chat" className="flex items-center gap-3 p-3 rounded-lg bg-surface-dark hover:bg-surface-hover transition text-sm">
                    <Brain className="w-4 h-4 text-primary" />
                    Start AI Tutor Chat
                    <TrendingUp className="w-3 h-3 text-text-disabled-legacy ml-auto" />
                  </Link>
                  <Link href="/research" className="flex items-center gap-3 p-3 rounded-lg bg-surface-dark hover:bg-surface-hover transition text-sm">
                    <Search className="w-4 h-4 text-accent" />
                    Search Research Papers
                    <TrendingUp className="w-3 h-3 text-text-disabled-legacy ml-auto" />
                  </Link>
                  <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg bg-surface-dark hover:bg-surface-hover transition text-sm">
                    <FileText className="w-4 h-4 text-primary" />
                    Upload Training Data
                    <TrendingUp className="w-3 h-3 text-text-disabled-legacy ml-auto" />
                  </Link>
                  <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-surface-dark hover:bg-surface-hover transition text-sm">
                    <CreditCard className="w-4 h-4 text-accent" />
                    Manage Credits
                    <TrendingUp className="w-3 h-3 text-text-disabled-legacy ml-auto" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-text-disabled-legacy space-y-1">
        <p>
          <span className="text-text-secondary-legacy">by</span>{" "}
          <span className="text-primary">hakimsarker.org</span>
          <span className="mx-1">·</span>
          <span className="text-accent">Varizen Inc.</span>
        </p>
        <p className="text-text-disabled-legacy">with love from Dhaka, Kuala Lumpur and Wyoming</p>
        <p className="text-text-disabled-legacy">SohaelTasneem Foundation Ltd · a non-profit organization · ISWR, University of Dhaka</p>
      </footer>
    </main>
  );
}
