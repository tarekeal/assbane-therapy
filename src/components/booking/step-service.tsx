"use client";

import { useTranslations } from "next-intl";
import { Activity, Brain, Footprints, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedElement } from "@/components/ui/animated-element";
import { services } from "@/lib/data/services";
import { serviceDurations, servicePrices } from "@/lib/data/booking";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  Brain,
  Footprints,
  Heart,
};

interface StepServiceProps {
  selectedService: string;
  onSelect: (service: string) => void;
}

export function StepService({ selectedService, onSelect }: StepServiceProps) {
  const t = useTranslations("services");
  const tb = useTranslations("booking");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-semibold">
          {tb("selectService")}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon];
          const isSelected = selectedService === service.key;
          const duration = serviceDurations[service.key];
          const price = servicePrices[service.key];

          return (
            <AnimatedElement key={service.key} delay={index * 0.06}>
              <Card
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => onSelect(service.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(service.key);
                  }
                }}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-[var(--shadow-md)]",
                  isSelected
                    ? "border-primary ring-2 ring-primary/20"
                    : "hover:border-primary/40"
                )}
                data-testid={`service-card-${service.key}`}
              >
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        "flex size-11 items-center justify-center rounded-[var(--radius)]",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {Icon && <Icon className="size-5" />}
                    </div>
                    {isSelected && (
                      <Badge variant="default" className="text-xs">
                        {tb("steps.service")}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-semibold">
                      {t(`${service.key}.name`)}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {t(`${service.key}.shortDesc`)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                    <span>{duration} min</span>
                    <span aria-hidden="true" className="text-border">|</span>
                    <span>{price}</span>
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          );
        })}
      </div>
    </div>
  );
}
