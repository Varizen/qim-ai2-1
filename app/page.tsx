"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  Building2,
  Landmark,
  LibraryBig,
  Network,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

export default function Home() {
  const { t, isBangla } = useLanguage();
  const fontClass = isBangla ? "font-bangla" : "";

  return (
    <main className="min-h-screen overflow-hidden bg-[#07100f] text-[#edf7f5]">
      {/* Hero Section */}
      <section className="relative min-h-screen border-b border-white/10 bg-[radial-gradient(circle_at_20%_15%,rgba(21,128,106,0.34),transparent_30%),radial-gradient(circle_at_84%_24%,rgba(226,183,90,0.18),transparent_28%),linear-gradient(135deg,#07100f_0%,#0d1f22_48%,#120f1b_100%)]">
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:54px_54px]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#07100f] to-transparent" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6">
          <Logo />
          <div className="hidden items-center gap-5 md:flex">
            <Link href="/bio" className="text-sm text-white/68 transition hover:text-white">
              {t.nav.biography}
            </Link>
            <Link href="/research" className="text-sm text-white/68 transition hover:text-white">
              {t.nav.research}
            </Link>
            <Link href="/chat" className="text-sm text-white/68 transition hover:text-white">
              {t.nav.knowledgeAI}
            </Link>
            <Link href="/dashboard" className="text-sm text-white/68 transition hover:text-white">
              {t.nav.dashboard}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/sign-in" className="hidden text-sm text-white/68 transition hover:text-white sm:inline">
              {t.nav.signIn}
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full border border-[#f2c766]/35 bg-[#f2c766]/10 px-4 py-2 text-sm font-semibold text-[#f7dc96] transition hover:bg-[#f2c766]/18"
            >
              {t.nav.signUp}
            </Link>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-12 px-5 pb-20 pt-8 sm:px-6 lg:grid-cols-[1.03fr_0.97fr]">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d8b45f]/40 bg-[#d8b45f]/10 px-4 py-2 text-sm text-[#f7dc96]">
              <Sparkles className="h-4 w-4" />
              {t.hero.badge}
            </div>

            <h1 className={`max-w-4xl text-4xl font-semibold leading-[1.04] tracking-normal text-white sm:text-5xl lg:text-6xl ${fontClass}`}>
              {t.hero.title}
            </h1>

            <p className={`mt-7 max-w-2xl text-lg leading-8 text-white/72 ${fontClass}`}>
              {t.hero.subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#f2c766] px-6 py-3 text-sm font-semibold text-[#10140f] shadow-[0_18px_55px_rgba(242,199,102,0.24)] transition hover:bg-[#ffe08a] ${fontClass}`}
              >
                <UserRound className="h-5 w-5" />
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/bio"
                className={`inline-flex items-center justify-center gap-2 rounded-lg border border-white/16 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/12 ${fontClass}`}
              >
                <BookOpen className="h-5 w-5" />
                {t.hero.ctaSecondary}
              </Link>
            </div>
            <div className="mt-6 grid max-w-xl gap-2 sm:grid-cols-3">
              {[t.hero.signal1, t.hero.signal2, t.hero.signal3].map((signal) => (
                <div key={signal} className={`rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-center text-xs font-medium text-white/62 backdrop-blur ${fontClass}`}>
                  {signal}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute inset-6 rounded-full border border-[#2dd4bf]/25" />
            <div className="absolute inset-14 rounded-full border border-[#f2c766]/20" />
            <div className="relative aspect-square rounded-full border border-white/12 bg-[#09211f]/70 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur">
              <div className="flex h-full flex-col items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.13),rgba(255,255,255,0.03))] p-9 text-center">
                <Image
                  src="/qim-legacy-logo.png"
                  alt="QiM-AI2.1 legacy mark"
                  width={144}
                  height={144}
                  priority
                  className="h-28 w-28 rounded-3xl object-cover shadow-2xl shadow-black/30 sm:h-36 sm:w-36"
                />
                <p className={`mt-8 text-sm uppercase tracking-[0.28em] text-[#83f0d9] ${fontClass}`}>{t.legacy.label}</p>
                <h2 className={`mt-3 text-3xl font-semibold text-white sm:text-4xl ${fontClass}`}>{t.legacy.title}</h2>
                <p className={`mt-4 max-w-xs text-sm leading-6 text-white/62 ${fontClass}`}>
                  {t.legacy.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:px-6 lg:grid-cols-[0.84fr_1.16fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-[#83f0d9]">{t.timeline.sectionLabel}</p>
          <h2 className={`mt-4 text-3xl font-semibold text-white sm:text-4xl ${fontClass}`}>{t.timeline.sectionTitle}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.timeline.items.map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
              <Landmark className="mb-4 h-5 w-5 text-[#f2c766]" />
              <p className={`text-sm leading-6 text-white/74 ${fontClass}`}>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars Section */}
      <section className="border-y border-white/10 bg-[#0a1918]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:px-6 lg:grid-cols-3">
          {t.pillars.map(({ title, text }) => (
            <article key={title} className="rounded-lg border border-white/10 bg-[#0f2422] p-6">
              {title === t.pillars[0].title && <Scale className="h-7 w-7 text-[#83f0d9]" />}
              {title === t.pillars[1].title && <ShieldCheck className="h-7 w-7 text-[#83f0d9]" />}
              {title === t.pillars[2].title && <Network className="h-7 w-7 text-[#83f0d9]" />}
              <h3 className={`mt-5 text-xl font-semibold text-white ${fontClass}`}>{title}</h3>
              <p className={`mt-3 text-sm leading-6 text-white/64 ${fontClass}`}>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1fr_0.92fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-7">
          <Quote className="h-8 w-8 text-[#f2c766]" />
          <h2 className={`mt-5 text-3xl font-semibold text-white ${fontClass}`}>{t.quote.title}</h2>
          <p className={`mt-5 text-base leading-8 text-white/68 ${fontClass}`}>{t.quote.text}</p>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-[#83f0d9]" />
            <h3 className={`text-xl font-semibold text-white ${fontClass}`}>{t.knowledge.title}</h3>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {t.knowledge.areas.map((area) => (
              <span key={area} className={`rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-white/72 ${fontClass}`}>
                {area}
              </span>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-[#f2c766]/25 bg-[#f2c766]/10 p-5">
            <div className="flex items-center gap-3">
              <LibraryBig className="h-5 w-5 text-[#f2c766]" />
              <p className={`text-sm font-semibold text-[#f8dc8d] ${fontClass}`}>{t.knowledge.builtLabel}</p>
            </div>
            <p className={`mt-3 text-sm leading-6 text-white/62 ${fontClass}`}>
              {t.knowledge.builtText}
            </p>
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section className="border-t border-white/10 bg-[#081211]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-[#83f0d9]" />
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">{t.company.label}</p>
            </div>
            <p className={`mt-3 max-w-2xl text-sm leading-6 text-white/62 ${fontClass}`}>
              {t.company.text}
            </p>
          </div>
          <Link
            href="/research"
            className={`inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8 ${fontClass}`}
          >
            {t.company.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Secure Gateway Section */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(109,93,252,0.32),transparent_34%),radial-gradient(circle_at_18%_80%,rgba(20,184,166,0.18),transparent_28%),radial-gradient(circle_at_84%_70%,rgba(242,199,102,0.14),transparent_26%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-20 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.28em] text-[#83f0d9]">{t.gateway.label}</p>
            <h2 className={`mt-5 text-4xl font-semibold leading-tight text-white sm:text-6xl ${fontClass}`}>
              {t.gateway.title}
            </h2>
            <p className={`mt-6 max-w-2xl text-base leading-8 text-white/62 ${fontClass}`}>
              {t.gateway.text}
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.gateway.cards.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_70px_rgba(109,93,252,0.12)] backdrop-blur">
                <BadgeCheck className="h-6 w-6 text-[#f2c766]" />
                <h3 className={`mt-4 text-base font-semibold text-white ${fontClass}`}>{item.title}</h3>
                <p className={`mt-3 text-sm leading-6 text-white/58 ${fontClass}`}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Full-Screen Footer */}
      <Footer />
    </main>
  );
}
