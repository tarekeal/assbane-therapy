import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/data/navigation";
import { DesktopNavLinks } from "@/components/mobile-nav";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export async function Navbar() {
  const t = await getTranslations("nav");

  const items = navItems.map((item) => ({
    key: item.key,
    href: item.href,
    label: t(item.key),
  }));

  const bookLabel = t("bookAppointment");

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-[var(--shadow-sm)]"
      role="banner"
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight text-primary rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Assbane Therapy - Home"
        >
          Assbane Therapy
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
          <DesktopNavLinks items={items} />
        </nav>

        {/* Desktop: Language Switcher + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/book" className={cn(buttonVariants({ size: "lg" }))}>
            {bookLabel}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <MobileNav />
      </div>
    </header>
  );
}
