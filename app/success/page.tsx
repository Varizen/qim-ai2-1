"use client";

import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export default function Success() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0B0F1A] text-[#E5E7EB] flex flex-col items-center justify-center px-6">
        <div className="w-8 h-8 border-2 border-[#6D5DFC] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[#E5E7EB]/50">Loading...</p>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
