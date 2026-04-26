import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0B0F1A] text-[#E5E7EB] flex flex-col items-center justify-center px-6">
      <div className="absolute top-6 left-6">
        <Logo />
      </div>
      <div className="w-16 h-16 rounded-full bg-[#6D5DFC]/10 flex items-center justify-center mb-6">
        <SearchX className="w-8 h-8 text-[#6D5DFC]" />
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#6D5DFC] to-[#14B8A6] bg-clip-text text-transparent mb-3">
        404 — Page Not Found
      </h1>
      <p className="text-[#E5E7EB]/50 max-w-md text-center mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6D5DFC] text-white font-medium hover:bg-[#6D5DFC]/90 transition shadow-lg shadow-[#6D5DFC]/20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
      <footer className="absolute bottom-6 text-center text-xs text-[#E5E7EB]/20">
        by hakimsarker.org · powered by Varizen Inc. · developped with love from Dhaka, Kuala Lumpur and Wyoming· in association with SohaelTasneem Foundation Ltd - a non-profit organization and ISWR, University of Dhaka.
      </footer>
    </main>
  );
}
