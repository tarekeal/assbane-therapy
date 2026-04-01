"use client";

import { useTranslations, useMessages } from "next-intl";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedElement } from "@/components/ui/animated-element";
import { steps } from "@/lib/data/steps";
import {
  Calendar,
  UserCheck,
  ClipboardList,
  TrendingUp,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  UserCheck,
  ClipboardList,
  TrendingUp,
};

export function HowItWorks() {
  const t = useTranslations("steps");
  const messages = useMessages();
  const stepsItems = (messages.steps as Record<string, unknown>).items as Array<{
    title: string;
    description: string;
  }>;

  return (
    <SectionWrapper id="how-it-works">
      <SectionHeading
        title={t("sectionTitle")}
        subtitle={t("sectionSubtitle")}
      />

      <div className="relative">
        {/* Connecting dashed line (desktop only) */}
        <div
          className="absolute top-6 right-0 left-0 hidden h-0.5 border-t-2 border-dashed border-primary/20 lg:block"
          aria-hidden="true"
          style={{
            left: "calc(12.5% + 24px)",
            right: "calc(12.5% + 24px)",
          }}
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon];
            const item = stepsItems[index];

            return (
              <AnimatedElement key={step.key} delay={index * 0.12}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Number circle */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-[var(--shadow-md)]">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  {Icon && (
                    <div className="mt-4">
                      <Icon
                        className="h-6 w-6 text-primary/60"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-heading mt-3 text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
