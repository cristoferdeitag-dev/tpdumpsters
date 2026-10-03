"use client";

// Language state for the online booking (EN default, ES on demand).
// Order of precedence on load: ?lang=es|en in the URL (Spanish ad traffic)
// → the visitor's last choice in localStorage → English. Changing language
// only swaps text: the wizard's booking state lives in BookingWizard and is
// untouched, so nothing the customer typed is lost.
import { createContext, Fragment, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { BOOKING_DICT, BOOKING_LANG_KEY, type BookingDict, type Lang } from "./booking";

interface Ctx {
  lang: Lang;
  t: BookingDict;
  setLang: (lang: Lang) => void;
  /** true only inside a real provider; lets an inner provider defer to an outer one. */
  mounted?: boolean;
}

const BookingLangContext = createContext<Ctx>({
  lang: "en",
  t: BOOKING_DICT.en,
  setLang: () => {},
});

function readInitialLang(): Lang | null {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "es" || q === "en") return q;
  } catch {
    /* no URL access */
  }
  try {
    const saved = localStorage.getItem(BOOKING_LANG_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* storage blocked */
  }
  return null;
}

export function BookingLangProvider({ children }: { children: ReactNode }) {
  // If a provider already wraps this one (the /booking page wraps hero +
  // wizard so both switch together), defer to it: two providers would keep
  // two separate languages and the hero would not follow the toggle.
  const parent = useContext(BookingLangContext);
  // Starts in English on the server and on the first client render (no
  // hydration mismatch), then switches right after mount if needed.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const initial = readInitialLang();
    if (initial) {
      setLangState(initial);
      try {
        localStorage.setItem(BOOKING_LANG_KEY, initial);
      } catch {
        /* storage blocked — the choice just won't be remembered */
      }
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(BOOKING_LANG_KEY, next);
    } catch {
      /* storage blocked */
    }
  }, []);

  if (parent.mounted) return <>{children}</>;

  return (
    <BookingLangContext.Provider value={{ lang, t: BOOKING_DICT[lang], setLang, mounted: true }}>
      {children}
    </BookingLangContext.Provider>
  );
}

export function useBookingLang(): Ctx {
  return useContext(BookingLangContext);
}

/** Renders `**bold**` segments of a dictionary string as <strong>. */
export function rich(text: string, boldClassName = "font-semibold"): ReactNode {
  const parts = text.split("**");
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={boldClassName}>
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

/** "English | Español" switch shown above the wizard. */
export function BookingLangToggle({ className = "" }: { className?: string }) {
  const { lang, t, setLang } = useBookingLang();
  const options: Lang[] = ["en", "es"];
  return (
    <div
      role="group"
      aria-label={t.lang.group}
      className={`inline-flex rounded-lg border border-[#d7dadd] bg-white p-0.5 ${className}`}
    >
      {options.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            onClick={() => setLang(code)}
            className={`px-3 py-1.5 rounded-md text-[12.5px] font-semibold font-[var(--font-poppins)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-red ${
              active ? "bg-[#1d2329] text-white" : "text-[#4b5156] hover:text-[#1d2329]"
            }`}
          >
            {code === "en" ? t.lang.en : t.lang.es}
          </button>
        );
      })}
    </div>
  );
}
