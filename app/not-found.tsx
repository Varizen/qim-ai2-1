import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background-legacy text-foreground-legacy flex flex-col items-center justify-center px-6">
      <div className="absolute top-6 left-6">
        <Logo />
      </div>
      <div className="w-16 h-16 rounded-full bg-primary-subtle flex items-center justify-center mb-6">
        <SearchX className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
        404 — Page Not Found
      </h1>
      <p className="text-text-muted-legacy max-w-md text-center mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition shadow-lg shadow-primary/20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
      <footer className="absolute bottom-6 text-center text-xs text-text-disabled-legacy space-y-1">
        <p>
          <span className="text-text-secondary-legacy">by</span>{" "}
          <span className="text-primary">hakimsarker.org</span>
          <span className="mx-1">·</span>
          <span className="text-accent">Varizen Inc.</span>
        </p>
        <p className="text-text-disabled-legacy">with love from Dhaka, Kuala Lumpur and Wyoming</p>
        <p className="text-text-disabled-legacy">SohaelTasneem Foundation Ltd · a non-profit organization · ISWR, University of Dhaka</p>
      </footer>
    </main>
  );
}
