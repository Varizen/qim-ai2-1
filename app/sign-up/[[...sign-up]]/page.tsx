import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#0B0F1A] text-[#E5E7EB] flex flex-col items-center justify-center px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6D5DFC] to-[#14B8A6] bg-clip-text text-transparent text-center">
          QiM-AI2.1
        </h1>
        <p className="text-[#E5E7EB]/50 text-center mt-2">Create your account</p>
      </div>
      <SignUp routing="path" path="/sign-up" />
    </main>
  );
}
