export type Locale = "en" | "bn";

export const defaultLocale: Locale = "en";

export const translations = {
  en: {
    // Navigation
    nav: {
      biography: "Biography",
      research: "Research",
      knowledgeAI: "Knowledge AI",
      dashboard: "Dashboard",
      signIn: "Sign in",
      signUp: "Sign up",
      admin: "Admin",
      chat: "Chat",
      success: "Success",
      notFound: "Page Not Found",
    },
    // Hero
    hero: {
      badge: "www.hakimsarker.org",
      title: "Where Professor Abdul Hakim Sarker's Wisdom Lives On Through AI.",
      subtitle:
        "Preserving the knowledge, wisdom, and social welfare contributions of Professor Abdul Hakim Sarker Ph.D. (1947-2025), Professor of ISWR, University of Dhaka, for future generations.",
      ctaPrimary: "Start Secure Access",
      ctaSecondary: "View Biography",
      signal1: "One-tap social access",
      signal2: "Verified mobile entry",
      signal3: "Adaptive 2FA protection",
    },
    // Legacy mark
    legacy: {
      label: "QiM-AI2.1",
      title: "Legacy Intelligence Nexus",
      description:
        "Scholarship, memory, and guided learning shaped into a digital knowledge companion.",
    },
    // Timeline
    timeline: {
      sectionLabel: "Legacy Signal",
      sectionTitle: "A professor's work, preserved for future learners.",
      items: [
        "Professor (Retd.), Institute of Social Welfare & Research, University of Dhaka",
        "Former Vice-Chancellor, Islamic University, Kushtia",
        "Former Director, ISWR, University of Dhaka",
        "Ph.D. in Sociological Criminology on Juvenile Sociopathy",
      ],
    },
    // Pillars
    pillars: [
      {
        title: "Social Welfare",
        text: "A lifetime of teaching and research across social development, human behavior, community organization, public health, and social service management.",
      },
      {
        title: "Justice & Victimology",
        text: "Founder and former coordinator of Victimology and Restorative Justice at ISWR, with deep work on juvenile sociopathy and socio-legal intervention.",
      },
      {
        title: "Public Knowledge",
        text: "UNESCO, UNDP, UNICEF, World Bank, ADB, and national research engagements translated scholarship into community-facing social policy.",
      },
    ],
    // Quote section
    quote: {
      title: "From social science to intelligent memory.",
      text: "HakimSarker.org becomes the public home for a curated digital legacy: academic background, publications, research themes, and an AI-supported learning path grounded in Professor Sarker's social work, criminology, victimology, and community development scholarship.",
    },
    // Knowledge
    knowledge: {
      title: "Knowledge Domains",
      areas: [
        "Juvenile delinquency",
        "Restorative justice",
        "Social work education",
        "Human security",
        "Community development",
        "Social research methods",
        "Public policy",
        "Criminology",
      ],
      builtLabel: "Built as a digital legacy of knowledge and wisdom",
      builtText:
        "The QiM-AI2.1 system remains the technology layer, now presented through the memorial and academic identity of Professor Abdul Hakim Sarker Ph.D.",
    },
    // Company
    company: {
      label: "Company & Tech Support",
      text: "Company and technical support information remains with the existing QiM-AI2.1 platform association.",
      cta: "Research Tools",
    },
    // Secure Gateway
    gateway: {
      label: "Secure Knowledge Gateway",
      title: "A trusted path from family memory to future learning.",
      text: "HakimSarker.org preserves a meaningful scholarly legacy, so access should feel simple, respectful, and safe. Learners, family, researchers, and institutions enter through verified identity, then gain stronger account protection as their relationship with the archive grows.",
      cards: [
        {
          title: "Verified entry",
          text: "Every visitor begins with a clear sign-in path that protects the archive without making learning feel difficult.",
        },
        {
          title: "Human access",
          text: "Modern account options support scholars, students, and family members wherever they are connecting from.",
        },
        {
          title: "Long-term trust",
          text: "As users continue using the platform, stronger protection keeps personal access and institutional memory secure.",
        },
      ],
    },
    // Footer
    footer: {
      by: "by",
      poweredBy: "powered by",
      developed: "developed with love from Dhaka, Kuala Lumpur and Wyoming",
      association: "in association with",
      nonprofit: "a non-profit organization",
      and: "and",
      language: "Language",
      english: "English",
      bangla: "বাংলা",
      // 6-column menu
      menu: {
        explore: {
          title: "Explore",
          links: [
            { label: "Biography", href: "/bio" },
            { label: "Research", href: "/research" },
            { label: "Knowledge AI", href: "/chat" },
            { label: "Dashboard", href: "/dashboard" },
          ],
        },
        knowledge: {
          title: "Knowledge",
          links: [
            { label: "Social Welfare", href: "/research" },
            { label: "Victimology", href: "/research" },
            { label: "Public Policy", href: "/research" },
            { label: "Criminology", href: "/research" },
          ],
        },
        account: {
          title: "Account",
          links: [
            { label: "Sign In", href: "/sign-in" },
            { label: "Sign Up", href: "/sign-up" },
            { label: "Secure MFA", href: "/secure-mfa" },
            { label: "Admin", href: "/admin" },
          ],
        },
        resources: {
          title: "Resources",
          links: [
            { label: "Research Tools", href: "/research" },
            { label: "Citations", href: "/research" },
            { label: "Publications", href: "/research" },
            { label: "Memory Archive", href: "/dashboard" },
          ],
        },
        organization: {
          title: "Organization",
          links: [
            { label: "HakimSarker.org", href: "https://hakimsarker.org" },
            { label: "Varizen Inc.", href: "#" },
            { label: "SohaelTasneem Foundation", href: "#" },
            { label: "ISWR, DU", href: "#" },
          ],
        },
        legal: {
          title: "Legal",
          links: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Cookie Policy", href: "#" },
            { label: "Accessibility", href: "#" },
          ],
        },
      },
      copyright: "© 2026 HakimSarker.org. All rights reserved.",
    },
  },
  bn: {
    // Navigation
    nav: {
      biography: "জীবনী",
      research: "গবেষণা",
      knowledgeAI: "জ্ঞান এআই",
      dashboard: "ড্যাশবোর্ড",
      signIn: "সাইন ইন",
      signUp: "সাইন আপ",
      admin: "অ্যাডমিন",
      chat: "চ্যাট",
      success: "সফল",
      notFound: "পৃষ্ঠা পাওয়া যায়নি",
    },
    // Hero
    hero: {
      badge: "www.hakimsarker.org",
      title: "প্রফেসর আবদুল হাকিম সরকারের প্রজ্ঞা এআই-এর মাধ্যমে বেঁচে থাকুক।",
      subtitle:
        "ঢাকা বিশ্ববিদ্যালয়ের আইএসডব্লিউআর-এর প্রফেসর আবদুল হাকিম সরকার পিএইচডি (১৯৪৭-২০২৫)-এর জ্ঞান, প্রজ্ঞা এবং সমাজকল্যাণ অবদান ভবিষ্যৎ প্রজন্মের জন্য সংরক্ষণ করা হচ্ছে।",
      ctaPrimary: "নিরাপদ অ্যাক্সেস শুরু করুন",
      ctaSecondary: "জীবনী দেখুন",
      signal1: "এক-ট্যাপ সোশ্যাল অ্যাক্সেস",
      signal2: "যাচাইকৃত মোবাইল প্রবেশ",
      signal3: "অ্যাডাপ্টিভ ২এফএ সুরক্ষা",
    },
    // Legacy mark
    legacy: {
      label: "কিউআইএম-এআই২.১",
      title: "ঐতিহ্য বুদ্ধিমত্তা কেন্দ্র",
      description:
        "বৃত্তি, স্মৃতি এবং পরিচালিত শিক্ষা একটি ডিজিটাল জ্ঞান সঙ্গীতে রূপান্তরিত।",
    },
    // Timeline
    timeline: {
      sectionLabel: "ঐতিহ্যের সংকেত",
      sectionTitle: "একজন অধ্যাপকের কাজ, ভবিষ্যৎ শিক্ষার্থীদের জন্য সংরক্ষিত।",
      items: [
        "অবসরপ্রাপ্ত প্রফেসর, সমাজকল্যাণ ও গবেষণা ইনস্টিটিউট, ঢাকা বিশ্ববিদ্যালয়",
        "সাবেক উপাচার্য, ইসলামী বিশ্ববিদ্যালয়, কুষ্টিয়া",
        "সাবেক পরিচালক, আইএসডব্লিউআর, ঢাকা বিশ্ববিদ্যালয়",
        "কিশোর সোসিওপ্যাথি নিয়ে সামাজিক অপরাধবিদ্যায় পিএইচডি",
      ],
    },
    // Pillars
    pillars: [
      {
        title: "সমাজকল্যাণ",
        text: "সামাজিক উন্নয়ন, মানব আচরণ, সম্প্রদায় সংগঠন, জনস্বাস্থ্য এবং সামাজিক সেবা ব্যবস্থাপনা জুড়ে শিক্ষাদান ও গবেষণার একটি জীবন।",
      },
      {
        title: "বিচার ও ভিক্টিমোলজি",
        text: "আইএসডব্লিউআর-এ ভিক্টিমোলজি এবং পুনর্বাসনমূলক বিচারের প্রতিষ্ঠাতা এবং সাবেক সমন্বয়ক, কিশোর সোসিওপ্যাথি এবং সামাজিক-আইনি হস্তক্ষেপ নিয়ে গভীর কাজ।",
      },
      {
        title: "জনসাধারণের জ্ঞান",
        text: "ইউনেস্কো, ইউএনডিপি, ইউনিসেফ, বিশ্বব্যাংক, এডিবি এবং জাতীয় গবেষণা অংশগ্রহণ বৃত্তিকে সম্প্রদায়-মুখী সামাজিক নীতিতে রূপান্তরিত করেছে।",
      },
    ],
    // Quote section
    quote: {
      title: "সামাজিক বিজ্ঞান থেকে বুদ্ধিমত্তাসম্পন্ন স্মৃতি।",
      text: "HakimSarker.org একটি কিউরেটেড ডিজিটাল ঐতিহ্যের জন্য সর্বজনীন আবাস হয়ে উঠেছে: একাডেমিক পটভূমি, প্রকাশনা, গবেষণার থিম এবং প্রফেসর সরকারের সামাজিক কাজ, অপরাধবিদ্যা, ভিক্টিমোলজি এবং সম্প্রদায় উন্নয়ন বৃত্তিতে ভিত্তি করে একটি এআই-সমর্থিত শিক্ষাপথ।",
    },
    // Knowledge
    knowledge: {
      title: "জ্ঞানের ক্ষেত্র",
      areas: [
        "কিশোর অপরাধ",
        "পুনর্বাসনমূলক বিচার",
        "সামাজিক কর্ম শিক্ষা",
        "মানব নিরাপত্তা",
        "সম্প্রদায় উন্নয়ন",
        "সামাজিক গবেষণা পদ্ধতি",
        "জননীতি",
        "অপরাধবিদ্যা",
      ],
      builtLabel: "জ্ঞান ও প্রজ্ঞার একটি ডিজিটাল ঐতিহ্য হিসাবে নির্মিত",
      builtText:
        "কিউআইএম-এআই২.১ সিস্টেম প্রযুক্তিগত স্তর হিসাবে রয়ে গেছে, এখন প্রফেসর আবদুল হাকিম সরকার পিএইচডি-এর স্মৃতি এবং একাডেমিক পরিচয়ের মাধ্যমে উপস্থাপিত।",
    },
    // Company
    company: {
      label: "কোম্পানি ও টেক সাপোর্ট",
      text: "কোম্পানি এবং প্রযুক্তিগত সহায়তার তথ্য বিদ্যমান কিউআইএম-এআই২.১ প্ল্যাটফর্ম অ্যাসোসিয়েশনের সাথে রয়ে গেছে।",
      cta: "গবেষণা সরঞ্জাম",
    },
    // Secure Gateway
    gateway: {
      label: "নিরাপদ জ্ঞান গেটওয়ে",
      title: "পারিবারিক স্মৃতি থেকে ভবিষ্যৎ শিক্ষায় একটি বিশ্বস্ত পথ।",
      text: "HakimSarker.org একটি অর্থবহ বৃত্তিগত ঐতিহ্য সংরক্ষণ করে, তাই অ্যাক্সেস সহজ, সম্মানজনক এবং নিরাপদ মনে হওয়া উচিত। শিক্ষার্থী, পরিবার, গবেষক এবং প্রতিষ্ঠান যাচাইকৃত পরিচয়ের মাধ্যমে প্রবেশ করে, তারপর আর্কাইভের সাথে তাদের সম্পর্ক বাড়ার সাথে সাথে আরও শক্তিশালী অ্যাকাউন্ট সুরক্ষা লাভ করে।",
      cards: [
        {
          title: "যাচাইকৃত প্রবেশ",
          text: "প্রতিটি দর্শক একটি স্পষ্ট সাইন-ইন পথ দিয়ে শুরু করে যা শিক্ষাকে কঠিন না করে আর্কাইভকে সুরক্ষিত করে।",
        },
        {
          title: "মানব অ্যাক্সেস",
          text: "আধুনিক অ্যাকাউন্ট বিকল্পগুলি পণ্ডিত, ছাত্র এবং পরিবারের সদস্যদের সমর্থন করে যেখান থেকেই তারা সংযোগ করুক না কেন।",
        },
        {
          title: "দীর্ঘমেয়াদী বিশ্বাস",
          text: "ব্যবহারকারীরা প্ল্যাটফর্মটি ব্যবহার করা চালিয়ে যাওয়ার সাথে সাথে, আরও শক্তিশালী সুরক্ষা ব্যক্তিগত অ্যাক্সেস এবং প্রাতিষ্ঠানিক স্মৃতি নিরাপদ রাখে।",
        },
      ],
    },
    // Footer
    footer: {
      by: "দ্বারা",
      poweredBy: "প্রযুক্তি",
      developed: "ঢাকা, কুয়ালালামপুর এবং ওয়াইওমিং থেকে ভালোবাসা নিয়ে তৈরি",
      association: "সহযোগিতায়",
      nonprofit: "একটি অলাভজনক সংস্থা",
      and: "এবং",
      language: "ভাষা",
      english: "English",
      bangla: "বাংলা",
      // 6-column menu
      menu: {
        explore: {
          title: "অন্বেষণ",
          links: [
            { label: "জীবনী", href: "/bio" },
            { label: "গবেষণা", href: "/research" },
            { label: "জ্ঞান এআই", href: "/chat" },
            { label: "ড্যাশবোর্ড", href: "/dashboard" },
          ],
        },
        knowledge: {
          title: "জ্ঞান",
          links: [
            { label: "সমাজকল্যাণ", href: "/research" },
            { label: "ভিক্টিমোলজি", href: "/research" },
            { label: "জননীতি", href: "/research" },
            { label: "অপরাধবিদ্যা", href: "/research" },
          ],
        },
        account: {
          title: "অ্যাকাউন্ট",
          links: [
            { label: "সাইন ইন", href: "/sign-in" },
            { label: "সাইন আপ", href: "/sign-up" },
            { label: "নিরাপদ এমএফএ", href: "/secure-mfa" },
            { label: "অ্যাডমিন", href: "/admin" },
          ],
        },
        resources: {
          title: "সম্পদ",
          links: [
            { label: "গবেষণা সরঞ্জাম", href: "/research" },
            { label: "উদ্ধৃতি", href: "/research" },
            { label: "প্রকাশনা", href: "/research" },
            { label: "স্মৃতি আর্কাইভ", href: "/dashboard" },
          ],
        },
        organization: {
          title: "সংস্থা",
          links: [
            { label: "HakimSarker.org", href: "https://hakimsarker.org" },
            { label: "Varizen Inc.", href: "#" },
            { label: "সোহেলতাসনীম ফাউন্ডেশন", href: "#" },
            { label: "আইএসডব্লিউআর, ঢাবি", href: "#" },
          ],
        },
        legal: {
          title: "আইনি",
          links: [
            { label: "গোপনীয়তা নীতি", href: "#" },
            { label: "সেবার শর্তাবলী", href: "#" },
            { label: "কুকি নীতি", href: "#" },
            { label: "অ্যাক্সেসিবিলিটি", href: "#" },
          ],
        },
      },
      copyright: "© ২০২৬ HakimSarker.org। সর্বস্বত্ব সংরক্ষিত।",
    },
  },
} as const;

export type Translations = typeof translations.en;

export function getTranslation(locale: Locale): Translations {
  return (translations as unknown as Record<Locale, Translations>)[locale] || translations[defaultLocale];
}
