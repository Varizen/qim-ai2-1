import Link from "next/link";
import { TaskSetupMFA, UserProfile } from "@clerk/nextjs";
import Logo from "@/components/Logo";
import { getMfaPolicyStatus } from "@/lib/auth-policy";
import { ShieldCheck } from "lucide-react";

export default async function SecureMfaPage() {
  const status = await getMfaPolicyStatus();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(109,93,252,0.26),transparent_34%),linear-gradient(135deg,#07100f,#0d1f22)] px-6 py-10 text-foreground-legacy">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Logo />
        <Link href="/" className="text-sm text-white/60 transition hover:text-white">
          Back to site
        </Link>
      </div>

      <section className="mx-auto grid max-w-6xl items-start gap-10 py-16 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-gold-border bg-accent-gold-bg px-4 py-2 text-sm text-accent-gold-hover">
            <ShieldCheck className="h-4 w-4" />
            Mandatory account protection
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Set up two-factor authentication to continue.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">
            Accounts older than 3 months require second-factor protection. Use authenticator app, passkey, or another
            available Clerk-supported factor, then return to the site.
          </p>
          {status.isAuthenticated && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.045] p-5 text-sm text-white/64">
              Account age: <span className="font-semibold text-white">{status.accountAgeDays} days</span>
              <span className="mx-2 text-white/20">·</span>
              2FA required after <span className="font-semibold text-white">{status.requiredAfterDays} days</span>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.38)]">
          <TaskSetupMFA redirectUrlComplete="/" fallback={<UserProfile routing="path" path="/secure-mfa" />} />
        </div>
      </section>
    </main>
  );
}
