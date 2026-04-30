"use client";

import { useLanguage } from "./LanguageProvider";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-white/50" />
      <span className="text-xs text-white/40 uppercase tracking-wider">{t.footer.language}</span>
      <div className="flex rounded-full border border-white/15 bg-white/[0.06] p-0.5">
        <button
          onClick={() => setLocale("en")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            locale === "en"
              ? "bg-white/15 text-white"
              : "text-white/40 hover:text-white/70"
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => setLocale("bn")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            locale === "bn"
              ? "bg-white/15 text-white"
              : "text-white/40 hover:text-white/70"
          }`}
          aria-label="Switch to Bangla"
        >
          BN
        </button>
      </div>
    </div>
  );
}
