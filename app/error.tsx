"use client";

import { useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background-legacy text-foreground-legacy flex flex-col items-center justify-center px-6">
      <div className="absolute top-6 left-6">
        <Logo />
      </div>
      <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-error" />
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-error to-primary bg-clip-text text-transparent mb-3">
        Something went wrong
      </h1>
      <p className="text-text-muted-legacy max-w-md text-center mb-2">
        An unexpected error occurred. We have been notified and are working on a fix.
      </p>
      {error.digest && (
        <p className="text-xs text-text-disabled-legacy mb-8 font-mono">Error ID: {error.digest}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition shadow-lg shadow-primary/20"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-card border border-border-legacy text-foreground-legacy font-medium hover:bg-surface-card/80 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
      <footer className="absolute bottom-6 text-center text-xs text-text-disabled-legacy space-y-1">
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
