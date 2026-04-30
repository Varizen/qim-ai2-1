import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface LogoProps {
  href?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { container: "w-6 h-6", icon: "w-3 h-3", text: "text-sm" },
  md: { container: "w-8 h-8", icon: "w-4 h-4", text: "text-lg" },
  lg: { container: "w-10 h-10", icon: "w-5 h-5", text: "text-xl" },
};

export default function Logo({ href = "/", showText = true, size = "md" }: LogoProps) {
  const s = sizeMap[size];

  const content = (
    <>
      <div className={`${s.container} relative overflow-hidden rounded-lg bg-gradient-to-br from-[#6D5DFC] to-[#14B8A6] flex items-center justify-center flex-shrink-0`}>
        <Image
          src="/qim-legacy-logo.png"
          alt="QiM-AI2.1"
          fill
          sizes="40px"
          className="object-cover"
        />
        <Sparkles className={`${s.icon} text-white opacity-0`} />
      </div>
      {showText && (
        <span className={`font-bold ${s.text} tracking-tight`}>QiM-AI2.1</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center gap-2 hover:opacity-90 transition">
        {content}
      </Link>
    );
  }

  return <div className="flex items-center gap-2">{content}</div>;
}
