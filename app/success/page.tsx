import { CheckCircle, ArrowLeft } from "lucide-react";

export default function Success() {
  return (
    <main className="min-h-screen bg-[#0B0F1A] text-[#E5E7EB] flex flex-col items-center justify-center px-6">
      <div className="w-16 h-16 rounded-full bg-[#14B8A6]/10 flex items-center justify-center mb-6">
        <CheckCircle className="w-8 h-8 text-[#14B8A6]" />
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-[#14B8A6] to-[#6D5DFC] bg-clip-text text-transparent mb-3">
        Payment Successful!
      </h1>
      <p className="text-[#E5E7EB]/50 max-w-md text-center mb-8">
        Thank you for subscribing to QiM-AI2.1. Your AI tutor is now fully unlocked.
      </p>
      <a
        href="/dashboard"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6D5DFC] text-white font-medium hover:bg-[#6D5DFC]/90 transition shadow-lg shadow-[#6D5DFC]/20"
      >
        <ArrowLeft className="w-4 h-4" />
        Go to Dashboard
      </a>
    </main>
  );
}
