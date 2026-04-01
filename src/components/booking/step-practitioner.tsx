"use client";

import { useTranslations } from "next-intl";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedElement } from "@/components/ui/animated-element";
import { teamMembers } from "@/lib/data/team";
import { cn } from "@/lib/utils";

interface StepPractitionerProps {
  selectedPractitioner: string;
  onSelect: (practitioner: string) => void;
}

export function StepPractitioner({
  selectedPractitioner,
  onSelect,
}: StepPractitionerProps) {
  const t = useTranslations("team");
  const tb = useTranslations("booking");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-semibold">
          {tb("selectPractitioner")}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* "Any available" option */}
        <AnimatedElement delay={0}>
          <Card
            role="radio"
            aria-checked={selectedPractitioner === "any"}
            tabIndex={0}
            onClick={() => onSelect("any")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect("any");
              }
            }}
            className={cn(
              "cursor-pointer transition-all hover:shadow-[var(--shadow-md)]",
              selectedPractitioner === "any"
                ? "border-primary ring-2 ring-primary/20"
                : "hover:border-primary/40"
            )}
            data-testid="practitioner-card-any"
          >
            <CardContent className="flex flex-col items-center gap-3 p-5 text-center">
              <div
                className={cn(
                  "flex size-16 items-center justify-center rounded-full",
                  selectedPractitioner === "any"
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary"
                )}
              >
                <UserCircle className="size-8" />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold">
                  {tb("any")}
                </h3>
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>

        {/* Team members */}
        {teamMembers.map((member, index) => {
          const isSelected = selectedPractitioner === member.key;

          return (
            <AnimatedElement key={member.key} delay={(index + 1) * 0.06}>
              <Card
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => onSelect(member.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(member.key);
                  }
                }}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-[var(--shadow-md)]",
                  isSelected
                    ? "border-primary ring-2 ring-primary/20"
                    : "hover:border-primary/40"
                )}
                data-testid={`practitioner-card-${member.key}`}
              >
                <CardContent className="flex flex-col items-center gap-3 p-5 text-center">
                  <div className="relative size-16 overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={t(`${member.key}.name`)}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold">
                      {t(`${member.key}.name`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`${member.key}.role`)}
                    </p>
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
