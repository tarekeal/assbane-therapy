"use client";

import { useTranslations } from "next-intl";
import { AnimatedElement } from "@/components/ui/animated-element";

interface HeroCenteredProps {
  headlineKey: string;
  subtitleKey: string;
  namespace: string;
}

export function HeroCentered({
  headlineKey,
  subtitleKey,
  namespace,
}: HeroCenteredProps) {
  const t = useTranslations(namespace);

  return (
    <section className="relative py-20 sm:py-28">
      {/* Subtle gradient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/50 to-background"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedElement>
            <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              {t(headlineKey)}
            </h1>
          </AnimatedElement>
          <AnimatedElement delay={0.1}>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              {t(subtitleKey)}
            </p>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
