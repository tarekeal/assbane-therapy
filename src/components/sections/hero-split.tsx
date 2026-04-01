"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedElement } from "@/components/ui/animated-element";
import { cn } from "@/lib/utils";

interface HeroSplitProps {
  headlineKey: string;
  subtitleKey: string;
  ctaKey?: string;
  ctaSecondaryKey?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageDefault?: string;
  reverse?: boolean;
  namespace: string;
}

export function HeroSplit({
  headlineKey,
  subtitleKey,
  ctaKey,
  ctaSecondaryKey,
  ctaHref = "/book",
  imageSrc,
  imageAlt,
  imageDefault = "/images/hero-therapy.jpg",
  reverse = false,
  namespace,
}: HeroSplitProps) {
  const t = useTranslations(namespace);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2`}
        >
          {/* Text column */}
          <div className={reverse ? "lg:order-2" : ""}>
            <AnimatedElement>
              <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {t(headlineKey)}
              </h1>
            </AnimatedElement>
            <AnimatedElement delay={0.1}>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                {t(subtitleKey)}
              </p>
            </AnimatedElement>
            {(ctaKey || ctaSecondaryKey) && (
              <AnimatedElement delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-4">
                  {ctaKey && (
                    <Link href={ctaHref} className={cn(buttonVariants({ size: "lg" }))}>
                      {t(ctaKey)}
                    </Link>
                  )}
                  {ctaSecondaryKey && (
                    <Link href="/services" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                      {t(ctaSecondaryKey)}
                    </Link>
                  )}
                </div>
              </AnimatedElement>
            )}
          </div>

          {/* Image column */}
          <div className={reverse ? "lg:order-1" : ""}>
            <AnimatedElement delay={0.15}>
              <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-muted">
                <Image
                  src={imageSrc ?? imageDefault}
                  alt={imageAlt ?? t(headlineKey)}
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
}
