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
    <main className="min-h-screen bg-[#0B0F1A] text-[#E5E7EB] flex flex-col items-center justify-center px-6">
      <div className="absolute top-6 left-6">
        <Logo />
      </div>
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-[#6D5DFC] bg-clip-text text-transparent mb-3">
        Something went wrong
      </h1>
      <p className="text-[#E5E7EB]/50 max-w-md text-center mb-2">
        An unexpected error occurred. We have been notified and are working on a fix.
      </p>
      {error.digest && (
        <p className="text-xs text-[#E5E7EB]/20 mb-8 font-mono">Error ID: {error.digest}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6D5DFC] text-white font-medium hover:bg-[#6D5DFC]/90 transition shadow-lg shadow-[#6D5DFC]/20"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111827] border border-[#E5E7EB]/10 text-[#E5E7EB] font-medium hover:bg-[#111827]/80 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
      <footer className="absolute bottom-6 text-center text-xs text-[#E5E7EB]/20">
        by hakimsarker.org · powered by Varizen Inc. · developped with love from Dhaka, Kuala Lumpur and Wyoming· in association with SohaelTasneem Foundation Ltd - a non-profit organization and ISWR, University of Dhaka.
      </footer>
    </main>
  );
}
