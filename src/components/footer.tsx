import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/data/navigation";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tServices = await getTranslations("services");
  const tContact = await getTranslations("contact");

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[hsl(170_42%_20%)] text-white py-16"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              {t("quickLinks")}
            </h3>
            <nav aria-label="Quick links">
              <ul className="space-y-2.5">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="text-white/70 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-[var(--radius)]"
                    >
                      {tNav(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 2: Our Services */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              {t("ourServices")}
            </h3>
            <nav aria-label="Our services">
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/services"
                    className="text-white/70 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-[var(--radius)]"
                  >
                    {tServices("physiotherapy.name")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-white/70 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-[var(--radius)]"
                  >
                    {tServices("psychology.name")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-white/70 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-[var(--radius)]"
                  >
                    {tServices("pedicure.name")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-white/70 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-[var(--radius)]"
                  >
                    {tServices("other.name")}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              {t("contactInfo")}
            </h3>
            <address className="not-italic space-y-2.5 text-sm text-white/70">
              <p>{tContact("address")}</p>
              <p>
                <a
                  href={`tel:${tContact("phone").replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-[var(--radius)]"
                >
                  {tContact("phone")}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${tContact("email")}`}
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-[var(--radius)]"
                >
                  {tContact("email")}
                </a>
              </p>
              <div className="pt-2 space-y-1">
                <p className="text-white/90 font-medium">
                  {tContact("hours.title")}
                </p>
                <p>{tContact("hours.weekdays")}</p>
                <p>{tContact("hours.saturday")}</p>
                <p>{tContact("hours.sunday")}</p>
              </div>
            </address>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              {t("legal")}
            </h3>
            <nav aria-label="Legal links">
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/privacy"
                    className="text-white/70 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-[var(--radius)]"
                  >
                    {t("privacy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-white/70 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-[var(--radius)]"
                  >
                    {t("cookies")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-white/70 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-[var(--radius)]"
                  >
                    {t("terms")}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="font-heading text-lg font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-[var(--radius)]"
              aria-label="Assbane Therapy - Home"
            >
              Assbane Therapy
            </Link>
            <p className="text-sm text-white/50">
              {t("copyright", { year: currentYear })}
            </p>
          </div>
          <p className="mt-4 text-center text-sm text-white/40 sm:text-left">
            {t("description")}
          </p>
        </div>
      </div>
    </footer>
  );
}
