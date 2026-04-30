import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  ArrowRight,
  Brain,
  GraduationCap,
  Landmark,
  LibraryBig,
  PlayCircle,
  Quote,
  Scale,
  ShieldCheck,
} from "lucide-react";

const biographyHighlights = [
  "Professor (Retd.), Institute of Social Welfare & Research, University of Dhaka",
  "Former Vice-Chancellor, Islamic University, Kushtia",
  "Former Director, ISWR, University of Dhaka",
  "Ph.D. in Sociological Criminology on Juvenile Sociopathy",
];

const researchThemes = [
  "Social welfare and community development",
  "Victimology and restorative justice",
  "Juvenile delinquency and socio-legal intervention",
  "Human security, public policy, and social research",
];

const videoItems = [
  {
    title: "Memorial Lecture Archive",
    text: "A dedicated space for lectures, interviews, and family-curated video memories.",
  },
  {
    title: "Scholarship in Context",
    text: "Short videos can explain Professor Sarker's research themes for students and researchers.",
  },
  {
    title: "Oral History Collection",
    text: "Future video stories from colleagues, students, and institutions can be added here.",
  },
];

export default function BioPage() {
  return (
    <main className="min-h-screen bg-[#07100f] text-[#edf7f5]">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_16%_16%,rgba(20,184,166,0.25),transparent_30%),radial-gradient(circle_at_86%_14%,rgba(242,199,102,0.15),transparent_28%),linear-gradient(135deg,#07100f,#0f2023_55%,#07070c)]">
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:58px_58px]" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6">
          <Logo />
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-white/68 transition hover:text-white">
              Home
            </Link>
            <Link href="/research" className="hidden text-sm text-white/68 transition hover:text-white sm:inline">
              Research
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full border border-accent-gold-border bg-accent-gold-bg px-4 py-2 text-sm font-semibold text-accent-gold-hover transition hover:bg-accent-gold/18"
            >
              Sign up
            </Link>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="absolute -inset-5 rounded-[3rem] bg-accent-gold-bg blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.055] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.44)] backdrop-blur">
              <Image
                src="/qim-legacy-logo.png"
                alt="Professor Abdul Hakim Sarker digital legacy portrait placeholder"
                width={720}
                height={820}
                priority
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-b-[1.5rem] bg-gradient-to-t from-black/86 to-transparent p-6 pt-24">
                <p className="text-sm uppercase tracking-[0.24em] text-[#83f0d9]">1947-2025</p>
                <h1 className="mt-2 text-2xl font-semibold text-white">Professor Abdul Hakim Sarker Ph.D.</h1>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-accent-gold">Biography</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-6xl">
              A life of scholarship, public service, and social justice.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/68">
              Professor Abdul Hakim Sarker Ph.D. devoted his academic and public life to social welfare, criminology,
              victimology, restorative justice, and the development of knowledge for communities. HakimSarker.org
              preserves this legacy as a living digital archive powered by QiM-AI2.1.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {biographyHighlights.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
                  <Landmark className="mb-3 h-5 w-5 text-accent-gold" />
                  <p className="text-sm leading-6 text-white/72">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-7">
          <Quote className="h-8 w-8 text-accent-gold" />
          <h2 className="mt-5 text-3xl font-semibold text-white">Knowledge for humanity.</h2>
          <p className="mt-5 text-base leading-8 text-white/68">
            His work connected university research with practical human development: strengthening social work education,
            understanding juvenile sociopathy, advancing restorative justice, and helping institutions translate knowledge
            into service.
          </p>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          {researchThemes.map((theme, index) => {
            const Icon = [Scale, ShieldCheck, GraduationCap, Brain][index];
            return (
              <div key={theme} className="rounded-2xl border border-white/10 bg-surface-elevated p-6">
                <Icon className="h-6 w-6 text-[#83f0d9]" />
                <p className="mt-4 text-sm font-semibold leading-6 text-white/78">{theme}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-[#83f0d9]">Photo & Video Archive</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">A dedicated media home for his legacy.</h2>
            </div>
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-gold px-5 py-3 text-sm font-semibold text-[#10140f] transition hover:bg-accent-gold-hover"
            >
              Ask the Knowledge AI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {videoItems.map((item) => (
              <article key={item.title} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045]">
                <div className="flex aspect-video items-center justify-center bg-[radial-gradient(circle_at_center,rgba(109,93,252,0.28),rgba(20,184,166,0.08),rgba(0,0,0,0.92))]">
                  <PlayCircle className="h-14 w-14 text-white/82 transition group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/62">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        <div className="rounded-2xl border border-accent-gold/25 bg-accent-gold-bg p-7">
          <div className="flex items-center gap-3">
            <LibraryBig className="h-6 w-6 text-accent-gold" />
            <h2 className="text-xl font-semibold text-[#f8dc8d]">QiM-AI2.1 digital legacy layer</h2>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/66">
            Replace the placeholder image and media cards with verified family photos, institutional portraits, recorded
            lectures, interviews, and documentary clips when those assets are ready.
          </p>
        </div>
      </section>
    </main>
  );
}
