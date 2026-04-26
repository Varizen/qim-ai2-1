"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowLeft, Loader2, AlertCircle } from "lucide-react";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [verifying, setVerifying] = useState(!!sessionId);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/billing/session/${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        setVerified(data.status === "paid");
      })
      .catch(() => setVerified(false))
      .finally(() => setVerifying(false));
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-[#0B0F1A] text-[#E5E7EB] flex flex-col items-center justify-center px-6">
      <div className="absolute top-6 left-6">
        <Logo />
      </div>
      {verifying ? (
        <>
          <Loader2 className="w-8 h-8 text-[#6D5DFC] animate-spin mb-4" />
          <p className="text-[#E5E7EB]/50">Verifying your payment...</p>
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-full bg-[#14B8A6]/10 flex items-center justify-center mb-6">
            {verified ? (
              <CheckCircle className="w-8 h-8 text-[#14B8A6]" />
            ) : (
              <AlertCircle className="w-8 h-8 text-yellow-400" />
            )}
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#14B8A6] to-[#6D5DFC] bg-clip-text text-transparent mb-3">
            {verified ? "Payment Successful!" : "Payment Verification"}
          </h1>
          <p className="text-[#E5E7EB]/50 max-w-md text-center mb-8">
            {verified
              ? "Thank you for subscribing to QiM-AI2.1. Your AI tutor is now fully unlocked."
              : "We could not verify your payment session. If you completed payment, your subscription will be active shortly."}
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6D5DFC] text-white font-medium hover:bg-[#6D5DFC]/90 transition shadow-lg shadow-[#6D5DFC]/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Dashboard
          </Link>
        </>
      )}
      <footer className="absolute bottom-6 text-center text-xs text-[#E5E7EB]/20">
        by hakimsarker.org · powered by Varizen Inc. · developped with love from Dhaka, Kuala Lumpur and Wyoming· in association with SohaelTasneem Foundation Ltd - a non-profit organization and ISWR, University of Dhaka.
      </footer>
    </main>
  );
}
