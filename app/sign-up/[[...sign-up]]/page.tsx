import { SignUp } from "@clerk/nextjs";
import Logo from "@/components/Logo";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.24),transparent_34%),linear-gradient(135deg,#07100f,#0B0F1A)] px-6 text-[#E5E7EB]">
      <div className="mb-8 flex flex-col items-center">
        <Logo href="/" size="lg" />
        <h1 className="mt-6 text-center text-3xl font-bold text-white">Create secure access</h1>
        <p className="mt-2 max-w-md text-center text-sm leading-6 text-[#E5E7EB]/55">
          Sign up with Google, Microsoft, Apple, or mobile phone 6-digit verification. 2FA becomes mandatory after 3 months of usage.
        </p>
      </div>
      <SignUp routing="path" path="/sign-up" />
    </main>
  );
}
