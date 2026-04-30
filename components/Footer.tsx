"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const { t, isBangla } = useLanguage();
  const menu = t.footer.menu;

  const columns = [
    menu.explore,
    menu.knowledge,
    menu.account,
    menu.resources,
    menu.organization,
    menu.legal,
  ];

  return (
    <footer className="relative bg-black text-white">
      {/* Full-screen black footer container */}
      <div className="relative min-h-screen flex flex-col justify-between">
        {/* Top gradient line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Main footer content */}
        <div className="flex-1 flex flex-col justify-center px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            {/* Top row: Brand + Language */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative overflow-hidden rounded-xl bg-gradient-to-br from-[#6D5DFC] to-[#14B8A6] flex items-center justify-center">
                  <Image
                    src="/qim-legacy-logo.png"
                    alt="QiM-AI2.1"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight">QiM-AI2.1</span>
              </div>
              <LanguageSwitcher />
            </div>

            {/* 6-column menu grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
              {columns.map((column) => (
                <div key={column.title}>
                  <h3
                    className={`text-sm font-semibold text-white/80 mb-4 ${
                      isBangla ? "font-bangla" : ""
                    }`}
                  >
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className={`text-sm text-white/40 hover:text-white/80 transition-colors duration-200 ${
                            isBangla ? "font-bangla" : ""
                          }`}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-16 h-px w-full bg-white/10" />

            {/* Middle info section */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-16">
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2">{t.footer.by}</p>
                <a
                  href="https://hakimsarker.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#6D5DFC] hover:underline"
                >
                  hakimsarker.org
                </a>
              </div>
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2">{t.footer.poweredBy}</p>
                <span className="text-sm text-[#14B8A6]">Varizen Inc.</span>
              </div>
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2">{t.footer.association}</p>
                <span className={`text-sm text-white/50 ${isBangla ? "font-bangla" : ""}`}>
                  SohaelTasneem Foundation Ltd
                </span>
                <p className="text-xs text-white/30 mt-1">{t.footer.nonprofit}</p>
              </div>
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2">{t.footer.and}</p>
                <span className={`text-sm text-white/50 ${isBangla ? "font-bangla" : ""}`}>
                  ISWR, University of Dhaka
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Far bottom: Large antigravity-style logo */}
        <div className="relative w-full overflow-hidden pb-8 pt-20">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
            <div className="w-[600px] h-[300px] bg-gradient-to-t from-[#6D5DFC]/10 via-[#14B8A6]/5 to-transparent blur-3xl" />
          </div>

          {/* Large centered logo */}
          <div className="relative flex flex-col items-center justify-center gap-6">
            <div className="relative">
              {/* Outer glow rings */}
              <div className="absolute inset-0 rounded-full border border-white/5 scale-150" />
              <div className="absolute inset-0 rounded-full border border-white/[0.03] scale-125" />

              {/* Logo container */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-gradient-to-br from-[#6D5DFC] to-[#14B8A6] shadow-[0_0_80px_rgba(109,93,252,0.3),0_0_120px_rgba(20,184,166,0.15)] flex items-center justify-center">
                <Image
                  src="/qim-legacy-logo.png"
                  alt="QiM-AI2.1"
                  fill
                  sizes="128px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Brand text below logo */}
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90">
                QiM-AI2.1
              </p>
              <p className={`mt-2 text-sm text-white/30 ${isBangla ? "font-bangla" : ""}`}>
                {t.footer.developed}
              </p>
            </div>

            {/* Copyright */}
            <p className={`text-xs text-white/20 mt-4 ${isBangla ? "font-bangla" : ""}`}>
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
