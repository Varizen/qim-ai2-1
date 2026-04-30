import { SignIn } from "@clerk/nextjs";
import Logo from "@/components/Logo";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_0%,rgba(109,93,252,0.26),transparent_34%),linear-gradient(135deg,#07100f,#0d1f22)] px-6 text-foreground-legacy">
      <div className="mb-8 flex flex-col items-center">
        <Logo href="/" size="lg" />
        <h1 className="mt-6 text-center text-3xl font-bold text-white">Secure sign in</h1>
        <p className="mt-2 max-w-md text-center text-sm leading-6 text-foreground-legacy/55">
          Continue with Google, Microsoft, Apple, or mobile phone 6-digit verification. 2FA becomes mandatory after 3 months of usage.
        </p>
      </div>
      <SignIn routing="path" path="/sign-in" />
    </main>
  );
}
