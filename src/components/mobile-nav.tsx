"use client";

import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { navItems } from "@/lib/data/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { MenuIcon } from "lucide-react";

/* ─── Desktop Nav Links (client, for active-state detection) ─── */

interface NavLinkItem {
  key: string;
  href: string;
  label: string;
}

export function DesktopNavLinks({ items }: { items: NavLinkItem[] }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-[var(--radius)] transition-colors",
              "hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "text-primary font-semibold bg-primary/5"
                : "text-foreground/80"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

/* ─── Mobile Navigation (Sheet) ─── */

export function MobileNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className="md:hidden"
          />
        }
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] sm:max-w-[300px]">
        <SheetHeader>
          <SheetTitle>Assbane Therapy</SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <SheetClose
                key={item.key}
                render={
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-[var(--radius)] px-3 py-2.5 text-base font-medium transition-colors",
                      "hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  />
                }
              >
                {t(item.key)}
              </SheetClose>
            );
          })}
        </nav>

        <Separator className="mx-4" />

        <div className="px-4">
          <LanguageSwitcher />
        </div>

        <div className="mt-auto p-4">
          <SheetClose
            render={
              <Link href="/book" className={cn(buttonVariants(), "w-full")}>
                {t("bookAppointment")}
              </Link>
            }
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
