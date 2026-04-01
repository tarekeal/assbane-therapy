"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEP_KEYS = ["service", "practitioner", "datetime", "info", "confirm"] as const;

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const t = useTranslations("booking");

  return (
    <nav aria-label="Booking progress" className="w-full">
      <ol className="flex items-center justify-between">
        {STEP_KEYS.map((key, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <li
              key={key}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-2",
                index < STEP_KEYS.length - 1 &&
                  "after:absolute after:left-[calc(50%+1rem)] after:right-[calc(-50%+1rem)] after:top-4 after:h-0.5 after:content-['']",
                isCompleted
                  ? "after:bg-primary"
                  : "after:bg-border"
              )}
            >
              <div
                className={cn(
                  "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                  isCompleted &&
                    "border-primary bg-primary text-primary-foreground",
                  isCurrent &&
                    "border-primary bg-background text-primary shadow-[var(--shadow-sm)]",
                  !isCompleted &&
                    !isCurrent &&
                    "border-muted-foreground/30 bg-background text-muted-foreground"
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:block",
                  isCurrent
                    ? "text-primary"
                    : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground"
                )}
              >
                {t(`steps.${key}`)}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
