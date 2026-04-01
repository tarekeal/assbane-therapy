"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const localeLabels: Record<Locale, string> = {
  fr: "FR",
  nl: "NL",
  en: "EN",
};

export function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function handleLocaleChange(locale: Locale) {
    router.replace(pathname, { locale });
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language switcher">
      {routing.locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && (
            <span className="mx-1 text-muted-foreground/40 select-none" aria-hidden="true">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => handleLocaleChange(locale)}
            aria-label={`Switch to ${localeLabels[locale]}`}
            aria-current={locale === currentLocale ? "true" : undefined}
            className={cn(
              "px-1.5 py-0.5 text-sm font-medium transition-colors rounded-[var(--radius)]",
              "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              locale === currentLocale
                ? "text-primary font-bold underline underline-offset-4"
                : "text-muted-foreground"
            )}
          >
            {localeLabels[locale]}
          </button>
        </span>
      ))}
    </div>
  );
}
