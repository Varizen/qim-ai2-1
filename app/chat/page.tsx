"use client";

import { useState, useRef, useEffect } from "react";
import Logo from "@/components/Logo";
import {
  Send, Bot, User, Sparkles, BookOpen, Mic, Menu, X, Loader2,
  LayoutDashboard, Search, FileText, Settings, CreditCard, FlaskConical,
  Brain, Globe
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type ChatMode = "general" | "professional";

const sidebarSections = [
  {
    title: "Core",
    items: [
      { label: "Chat", icon: BookOpen, href: "/chat" },
      { label: "Playground", icon: FlaskConical, href: "/chat?mode=playground" },
    ],
  },
  {
    title: "Knowledge",
    items: [
      { label: "Sources", icon: FileText, href: "/admin" },
      { label: "Citations", icon: Search, href: "/research" },
      { label: "Memory", icon: Brain, href: "/dashboard" },
    ],
  },
  {
    title: "Build",
    items: [
      { label: "API Keys", icon: CreditCard, href: "/dashboard" },
      { label: "Plugins", icon: Sparkles, href: "/dashboard" },
    ],
  },
  {
    title: "Labs",
    items: [
      { label: "HakimSarker Intelligence", icon: Brain, href: "/research" },
      { label: "Social Work Lab", icon: Globe, href: "/research" },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Logs", icon: FileText, href: "/dashboard" },
      { label: "Settings", icon: Settings, href: "/dashboard" },
    ],
  },
];

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [history, setHistory] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm QiM-AI2.1, your personal AI tutor. What would you like to learn today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>("general");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  const send = async () => {
    if (!msg.trim() || loading) return;
    const userMsg = msg.trim();
    setMsg("");
    setHistory((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, mode }),
      });
      const data = await res.json();
      setHistory((prev) => [...prev, { role: "assistant", content: data.reply || data.error || "Hmm, I didn't catch that." }]);
    } catch {
      setHistory((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const suggestions = [
    "Explain quantum physics simply",
    "Help me understand calculus",
    "Write a poem about learning",
    "What is machine learning?",
  ];

  return (
    <div className="flex h-screen bg-[#0B0F1A] text-[#E5E7EB]">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-20 h-full w-72 bg-[#111827] border-r border-[#E5E7EB]/10 transform transition-transform duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]/10">
          <Logo href="/" />
          <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar" className="md:hidden text-[#E5E7EB]/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3">
          <button
            onClick={() =>
              setHistory([
                {
                  role: "assistant",
                  content: "Hello! I'm QiM-AI2.1, your personal AI tutor. What would you like to learn today?",
                },
              ])
            }
            aria-label="Start new conversation"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0B0F1A] hover:bg-[#1a2236] transition text-sm font-medium"
          >
            <BookOpen className="w-4 h-4" />
            New Conversation
          </button>
        </div>

        <div className="px-3 pb-2">
          <div className="flex gap-1 p-1 rounded-lg bg-[#0B0F1A]">
            <button
              onClick={() => setMode("general")}
              className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                mode === "general"
                  ? "bg-[#6D5DFC] text-white"
                  : "text-[#E5E7EB]/50 hover:text-white"
              }`}
            >
              General
            </button>
            <button
              onClick={() => setMode("professional")}
              className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                mode === "professional"
                  ? "bg-[#6D5DFC] text-white"
                  : "text-[#E5E7EB]/50 hover:text-white"
              }`}
            >
              Professional
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <div className="px-4 py-2 text-xs font-semibold text-[#E5E7EB]/30 uppercase tracking-wider">
                {section.title}
              </div>
              <div className="px-3 space-y-0.5">
                {section.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#E5E7EB]/60 hover:bg-[#0B0F1A] hover:text-[#E5E7EB] transition"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#E5E7EB]/10">
          <a
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#E5E7EB]/60 hover:bg-[#0B0F1A] hover:text-[#E5E7EB] transition"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </a>
          <p className="text-xs text-[#E5E7EB]/20 text-center mt-3">
            by hakimsarker.org · powered by Varizen Inc. · developped with love from Dhaka, Kuala Lumpur and Wyoming· in association with SohaelTasneem Foundation Ltd - a non-profit organization and ISWR, University of Dhaka.
          </p>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]/10 bg-[#0B0F1A]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="md:hidden text-[#E5E7EB]/50 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-[#14B8A6] rounded-full absolute -top-0.5 -right-0.5 animate-pulse" />
                <Bot className="w-5 h-5 text-[#6D5DFC]" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">QiM-AI2.1</h2>
                <p className="text-xs text-[#14B8A6]">
                  {mode === "general" ? "General Mode" : "Professional Mode"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition bg-[#111827] text-[#E5E7EB]/60 hover:text-white"
            >
              <Brain className="w-3.5 h-3.5" />
              Context
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {history.length === 1 && (
            <div className="max-w-2xl mx-auto mt-8">
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-[#6D5DFC] via-[#14B8A6] to-[#6D5DFC] bg-clip-text text-transparent mb-2">
                What can I help you learn?
              </h1>
              <p className="text-center text-[#E5E7EB]/40 text-sm mb-8">
                Your personal AI tutor — inspired by great teaching.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setMsg(s);
                    }}
                    aria-label={`Suggestion: ${s}`}
                    className="p-4 rounded-xl bg-[#111827] border border-[#E5E7EB]/5 hover:border-[#6D5DFC]/30 hover:bg-[#111827]/80 transition text-left text-sm text-[#E5E7EB]/70"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {history.map((h, i) => (
            <div
              key={i}
              className={`flex gap-4 ${h.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {h.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6D5DFC] to-[#14B8A6] flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-3xl px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  h.role === "user"
                    ? "bg-[#6D5DFC] text-white rounded-br-md"
                    : "bg-[#111827] border border-[#E5E7EB]/10 text-[#E5E7EB]/90 rounded-bl-md"
                }`}
              >
                {h.content}
              </div>
              {h.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-[#111827] flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-[#E5E7EB]/60" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6D5DFC] to-[#14B8A6] flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-[#111827] border border-[#E5E7EB]/10 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-[#6D5DFC] animate-spin" />
                <span className="text-sm text-[#E5E7EB]/40">QiM-AI2.1 is thinking...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input Area */}
        <div className="px-4 pb-4 pt-2 bg-[#0B0F1A]">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 bg-[#111827] border border-[#E5E7EB]/10 rounded-2xl px-4 py-3 focus-within:border-[#6D5DFC]/40 focus-within:ring-1 focus-within:ring-[#6D5DFC]/20 transition">
              <button
                aria-label="Voice input"
                className="p-1.5 rounded-lg text-[#E5E7EB]/30 hover:text-[#E5E7EB]/70 hover:bg-[#0B0F1A] transition flex-shrink-0"
              >
                <Mic className="w-5 h-5" />
              </button>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask QiM-AI2.1 anything..."
                rows={1}
                className="flex-1 bg-transparent text-sm text-[#E5E7EB] placeholder-[#E5E7EB]/30 resize-none outline-none max-h-32 py-1 min-h-[24px]"
              />
              <button
                onClick={send}
                disabled={!msg.trim() || loading}
                aria-label="Send message"
                className={`p-2 rounded-xl flex-shrink-0 transition ${
                  msg.trim() && !loading
                    ? "bg-[#6D5DFC] text-white hover:bg-[#6D5DFC]/90 shadow-lg shadow-[#6D5DFC]/20"
                    : "bg-[#111827] text-[#E5E7EB]/20 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-xs text-[#E5E7EB]/20 mt-2">
              QiM-AI2.1 can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </main>

      {/* Context Panel (Professional Mode) */}
      {mode === "professional" && (
        <aside className="hidden lg:flex w-80 bg-[#111827] border-l border-[#E5E7EB]/10 flex-col">
          <div className="p-4 border-b border-[#E5E7EB]/10">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#6D5DFC]" />
              Context Panel
            </h3>
          </div>
          <div className="flex-1 p-4 space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-[#E5E7EB]/40 uppercase tracking-wider mb-2">
                Active Sources
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0B0F1A] text-sm">
                  <FileText className="w-4 h-4 text-[#14B8A6]" />
                  <span className="text-[#E5E7EB]/70">Syllabus 2024.pdf</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0B0F1A] text-sm">
                  <Search className="w-4 h-4 text-[#6D5DFC]" />
                  <span className="text-[#E5E7EB]/70">Semantic Scholar</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#E5E7EB]/40 uppercase tracking-wider mb-2">
                Citations
              </h4>
              <p className="text-sm text-[#E5E7EB]/50">
                No citations yet. Start a research query to see results.
              </p>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
