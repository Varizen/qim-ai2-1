"use client";

import { createContext, useContext, useCallback, useSyncExternalStore, ReactNode } from "react";
import { Locale, defaultLocale, getTranslation, Translations } from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  isBangla: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "qim-locale";
const CHANGE_EVENT = "qim-locale-change";

function getServerSnapshot(): Locale {
  return defaultLocale;
}

function getSnapshot(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "en" || stored === "bn") return stored;
  } catch {
    // localStorage may not be available
  }
  return defaultLocale;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const storageHandler = () => callback();
  const customHandler = () => callback();
  window.addEventListener("storage", storageHandler);
  window.addEventListener(CHANGE_EVENT, customHandler);
  return () => {
    window.removeEventListener("storage", storageHandler);
    window.removeEventListener(CHANGE_EVENT, customHandler);
  };
}

function emitLocaleChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = useCallback((newLocale: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // ignore
    }
    document.documentElement.lang = newLocale;
    emitLocaleChange();
  }, []);

  const t = getTranslation(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isBangla: locale === "bn" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
