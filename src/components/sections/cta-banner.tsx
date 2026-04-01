"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedElement } from "@/components/ui/animated-element";
import { cn } from "@/lib/utils";

interface CtaBannerProps {
  namespace?: string;
}

export function CtaBanner({ namespace }: CtaBannerProps) {
  const t = useTranslations(namespace || "cta");

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[var(--radius)] bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12 sm:py-20">
          <AnimatedElement>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("headline")}
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              {t("subtitle")}
            </p>
          </AnimatedElement>
          <AnimatedElement delay={0.2}>
            <div className="mt-8">
              <Link href="/book" className={cn(buttonVariants({ size: "lg" }), "bg-white text-primary hover:bg-white/90")}>
                {t("button")}
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
