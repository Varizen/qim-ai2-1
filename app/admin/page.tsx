"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Upload, FileText, Brain, Database, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

type Step = "upload" | "parse" | "chunk" | "embed" | "store";

const steps: { key: Step; label: string; icon: typeof Upload }[] = [
  { key: "upload", label: "Upload", icon: Upload },
  { key: "parse", label: "Parse", icon: FileText },
  { key: "chunk", label: "Chunk", icon: Brain },
  { key: "embed", label: "Embed", icon: Database },
  { key: "store", label: "Store", icon: CheckCircle },
];

export default function Admin() {
  const [file, setFile] = useState<File | null>(null);
  const [purpose, setPurpose] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [status, setStatus] = useState("");
  const [activeStep, setActiveStep] = useState<Step>("upload");
  const [uploading, setUploading] = useState(false);

  const upload = async () => {
    if (!file) return;
    if (!adminToken.trim()) {
      setStatus("Admin token is required.");
      return;
    }
    setUploading(true);
    setActiveStep("upload");
    setStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("purpose", purpose);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken.trim()}` },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setActiveStep("store");
        setStatus("Uploaded and stored successfully!");
      } else {
        setStatus(data.error || "Failed");
      }
    } catch {
      setStatus("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

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
          <Link href="/dashboard" className="text-sm text-text-secondary-legacy hover:text-white transition">Dashboard</Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3">
            AI Training Panel
          </h1>
          <p className="text-text-muted-legacy max-w-xl mx-auto">
            Upload your syllabus, books, PDFs, audio, or video. The AI will parse, chunk, embed, and store them for intelligent tutoring.
          </p>
        </div>

        {/* Pipeline Steps */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {steps.map((s, i) => {
            const isActive = steps.findIndex((x) => x.key === activeStep) >= i;
            const Icon = s.icon;
            return (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? "bg-primary-muted text-primary border border-primary-border"
                      : "bg-surface-card text-text-disabled-legacy border border-border-light"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {s.label}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-4 h-px ${isActive ? "bg-primary-border" : "bg-border-light"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Upload Form */}
        <div className="p-6 rounded-2xl bg-surface-card border border-border-light">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Upload Knowledge Base
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-text-secondary-legacy mb-1">
                Upload File
              </label>
              <div className="relative">
                <input
                  id="file-upload"
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files?.[0] || null);
                    setActiveStep("upload");
                  }}
                  className="block w-full text-sm text-text-secondary-legacy file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-muted file:text-primary hover:file:bg-primary/30 bg-surface-dark border border-border-legacy rounded-lg px-4 py-2"
                />
              </div>
              {file && (
                <p className="mt-2 text-xs text-accent flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            <div>
              <label htmlFor="admin-token" className="block text-sm font-medium text-text-secondary-legacy mb-1">
                Admin Token
              </label>
              <input
                id="admin-token"
                type="password"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                placeholder="Enter ADMIN_TOKEN"
                autoComplete="off"
                className="block w-full bg-surface-dark border border-border-legacy rounded-lg px-4 py-2 text-sm text-foreground-legacy placeholder-text-muted-low focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition"
              />
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-text-secondary-legacy mb-1">
                Purpose
              </label>
              <input
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. math, science, social work"
                className="block w-full bg-surface-dark border border-border-legacy rounded-lg px-4 py-2 text-sm text-foreground-legacy placeholder-text-muted-low focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition"
              />
            </div>

            <button
              onClick={upload}
              disabled={!file || !adminToken.trim() || uploading}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition ${
                file && adminToken.trim() && !uploading
                  ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                  : "bg-surface-card text-text-disabled-legacy cursor-not-allowed border border-border-light"
              }`}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  Train AI
                </>
              )}
            </button>

            {status && (
              <p className={`text-sm flex items-center gap-1 ${status.includes("success") ? "text-accent" : "text-error"}`}>
                {status.includes("success") ? <CheckCircle className="w-4 h-4" /> : null}
                {status}
              </p>
            )}
          </div>
        </div>

        {/* Supported Formats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
          {["PDF", "Books", "Syllabus", "Audio", "Video"].map((fmt) => (
            <div key={fmt} className="p-3 rounded-xl bg-surface-card border border-border-light text-center">
              <FileText className="w-5 h-5 text-primary/50 mx-auto mb-1" />
              <span className="text-xs text-text-muted-legacy">{fmt}</span>
            </div>
          ))}
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
