"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedElement } from "@/components/ui/animated-element";
import { services } from "@/lib/data/services";
import { CheckCircle2 } from "lucide-react";

export function ServicesAlternating() {
  const t = useTranslations("services");

  return (
    <SectionWrapper id="services">
      <SectionHeading title={t("sectionTitle")} subtitle={t("sectionSubtitle")} />

      <div className="space-y-20 sm:space-y-28">
        {services.map((service, index) => {
          const isEven = index % 2 === 1;
          const benefits = t.raw(`${service.key}.benefits`) as string[];

          return (
            <AnimatedElement key={service.key} delay={index * 0.1}>
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                {/* Image placeholder */}
                <div className={isEven ? "lg:order-last" : ""}>
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={service.image}
                      alt={t(`${service.key}.name`)}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Text content */}
                <div>
                  <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                    {t(`${service.key}.name`)}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {t(`${service.key}.longDesc`)}
                  </p>

                  {/* Benefits list */}
                  <ul className="mt-6 space-y-3" role="list">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link href="/book" className={cn(buttonVariants())}>
                      {t("bookService")}
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
