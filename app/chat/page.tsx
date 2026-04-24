"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, BookOpen, Mic, Menu, X, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

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
        body: JSON.stringify({ message: userMsg }),
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
    <div className="flex h-screen bg-neutral-950 text-neutral-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-20 h-full w-72 bg-neutral-900 border-r border-neutral-800 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">QiM-AI2.1</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar" className="md:hidden text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3">
          <button
            onClick={() => setHistory([{ role: "assistant", content: "Hello! I'm QiM-AI2.1, your personal AI tutor. What would you like to learn today?" }])}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition text-sm font-medium"
          >
            <BookOpen className="w-4 h-4" />
            New Conversation
          </button>
        </div>

        <div className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">History</div>
        <div className="px-3 space-y-1">
          {history.filter((m) => m.role === "user").slice(-5).map((m, i) => (
            <div key={i} className="px-3 py-2 rounded-lg text-sm text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 truncate cursor-pointer transition">
              {m.content.slice(0, 30)}...
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
          <p className="text-xs text-neutral-500 text-center">by hakimsarker.org · Varizen Inc.</p>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} aria-label="Open sidebar" className="md:hidden text-neutral-400 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-emerald-500 rounded-full absolute -top-0.5 -right-0.5 animate-pulse" />
                <Bot className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">QiM-AI2.1</h2>
                <p className="text-xs text-emerald-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Model badge hidden */}
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {history.length === 1 && (
            <div className="max-w-2xl mx-auto mt-8">
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent mb-2">
                What can I help you learn?
              </h1>
              <p className="text-center text-neutral-500 text-sm mb-8">Your personal AI tutor — inspired by great teaching.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setMsg(s); }}
                    className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-violet-500/40 hover:bg-neutral-800/50 transition text-left text-sm text-neutral-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {history.map((h, i) => (
            <div key={i} className={`flex gap-4 ${h.role === "user" ? "justify-end" : "justify-start"}`}>
              {h.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-3xl px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  h.role === "user"
                    ? "bg-violet-600 text-white rounded-br-md"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-md"
                }`}
              >
                {h.content}
              </div>
              {h.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-neutral-300" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                <span className="text-sm text-neutral-400">QiM-AI2.1 is thinking...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input Area */}
        <div className="px-4 pb-4 pt-2 bg-neutral-950">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 focus-within:border-violet-500/40 focus-within:ring-1 focus-within:ring-violet-500/20 transition">
              <button aria-label="Voice input" className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition flex-shrink-0">
                <Mic className="w-5 h-5" />
              </button>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask QiM-AI2.1 anything..."
                rows={1}
                className="flex-1 bg-transparent text-sm text-neutral-100 placeholder-neutral-500 resize-none outline-none max-h-32 py-1 min-h-[24px]"
              />
              <button
                onClick={send}
                disabled={!msg.trim() || loading}
                className={`p-2 rounded-xl flex-shrink-0 transition ${
                  msg.trim() && !loading
                    ? "bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-600/20"
                    : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-xs text-neutral-600 mt-2">
              QiM-AI2.1 can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
