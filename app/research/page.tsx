"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  Search, BookOpen, User, TrendingUp, ExternalLink, Loader2,
  ArrowLeft
} from "lucide-react";

interface Paper {
  title: string;
  authors: string[];
  year: number | null;
  citationCount: number;
  url: string;
}

interface AuthorStat {
  name: string;
  totalCitations: number;
  papers: number;
  score: number;
}

export default function Research() {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState<Paper[]>([]);
  const [authors, setAuthors] = useState<AuthorStat[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = async () => {
    if (!query.trim() || loading) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/research?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      setPapers(data.papers || []);
      setAuthors(data.authors || []);
    } catch {
      setPapers([]);
      setAuthors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      search();
    }
  };

  const totalCitations = papers.reduce((sum, p) => sum + (p.citationCount || 0), 0);

  return (
    <main className="min-h-screen bg-background-legacy text-foreground-legacy">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border-legacy bg-background-legacy/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-foreground-legacy/50 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/chat" className="text-sm text-foreground-legacy/70 hover:text-white transition">Chat</Link>
          <Link href="/dashboard" className="text-sm text-foreground-legacy/70 hover:text-white transition">Dashboard</Link>
          <Link href="/admin" className="text-sm text-foreground-legacy/70 hover:text-white transition">Admin</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3">
            Research Portal
          </h1>
          <p className="text-foreground-legacy/50 max-w-xl mx-auto">
            Search academic papers, discover authors, and explore citation intelligence powered by Semantic Scholar.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center gap-2 bg-surface-card border border-border-legacy rounded-2xl px-4 py-3 focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20 transition">
            <Search className="w-5 h-5 text-foreground-legacy/30 flex-shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search papers, authors, topics..."
              className="flex-1 bg-transparent text-sm text-foreground-legacy placeholder-text-muted-low outline-none"
            />
            <button
              onClick={search}
              disabled={loading || !query.trim()}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
                query.trim() && !loading
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-surface-card text-foreground-legacy/20 cursor-not-allowed"
              }`}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {["Abdul Hakim Sarker", "juvenile delinquency Bangladesh", "restorative justice Bangladesh", "social work"].map((q) => (
              <button
                key={q}
                onClick={() => { setQuery(q); }}
                className="px-3 py-1 rounded-full bg-surface-card border border-border-light text-xs text-foreground-legacy/50 hover:border-primary-border hover:text-foreground-legacy/80 transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        {searched && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-surface-card border border-border-light">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground-legacy/40 uppercase tracking-wider">Papers Found</span>
              </div>
              <p className="text-2xl font-bold">{papers.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-border-light">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-xs text-foreground-legacy/40 uppercase tracking-wider">Total Citations</span>
              </div>
              <p className="text-2xl font-bold">{totalCitations.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-border-light">
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground-legacy/40 uppercase tracking-wider">Authors</span>
              </div>
              <p className="text-2xl font-bold">{authors.length}</p>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Papers */}
          <div>
            <h2 className="text-sm font-semibold text-foreground-legacy/60 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Papers
            </h2>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : papers.length === 0 && searched ? (
              <div className="text-center py-12 text-foreground-legacy/30 text-sm">No papers found. Try a different query.</div>
            ) : (
              <div className="space-y-3">
                {papers.map((p, i) => (
                  <div key={i} className="p-4 rounded-xl bg-surface-card border border-border-light hover:border-primary/20 transition">
                    <h3 className="font-medium text-sm mb-1">{p.title}</h3>
                    <p className="text-xs text-foreground-legacy/40 mb-2">{p.authors.join(", ")}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-foreground-legacy/30">
                        <span>{p.year || "N/A"}</span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {p.citationCount} citations
                        </span>
                      </div>
                      {p.url && (
                        <Link href={p.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Authors */}
          <div>
            <h2 className="text-sm font-semibold text-foreground-legacy/60 uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              Top Authors
            </h2>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : authors.length === 0 && searched ? (
              <div className="text-center py-12 text-foreground-legacy/30 text-sm">No authors found.</div>
            ) : (
              <div className="space-y-3">
                {authors.map((a, i) => (
                  <div key={i} className="p-4 rounded-xl bg-surface-card border border-border-light hover:border-accent/20 transition">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-sm">{a.name}</h3>
                      <span className="text-xs font-bold text-primary">#{i + 1}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-foreground-legacy/40">
                      <div>
                        <p className="text-foreground-legacy/60 font-medium">{a.totalCitations}</p>
                        <p>Citations</p>
                      </div>
                      <div>
                        <p className="text-foreground-legacy/60 font-medium">{a.papers}</p>
                        <p>Papers</p>
                      </div>
                      <div>
                        <p className="text-foreground-legacy/60 font-medium">{a.score.toFixed(1)}</p>
                        <p>Score</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-foreground-legacy/20 space-y-1">
        <p>
          <span className="text-foreground-legacy/40">by</span>{" "}
          <span className="text-primary">hakimsarker.org</span>
          <span className="mx-1">·</span>
          <span className="text-accent">Varizen Inc.</span>
        </p>
        <p className="text-foreground-legacy/15">with love from Dhaka, Kuala Lumpur and Wyoming</p>
        <p className="text-foreground-legacy/15">SohaelTasneem Foundation Ltd · a non-profit organization · ISWR, University of Dhaka</p>
      </footer>
    </main>
  );
}
