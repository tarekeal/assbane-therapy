"use client";

import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatedElement } from "@/components/ui/animated-element";
import { teamMembers } from "@/lib/data/team";

interface StepConfirmProps {
  data: {
    service: string;
    practitioner: string;
    date: Date | undefined;
    time: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export function StepConfirm({ data }: StepConfirmProps) {
  const t = useTranslations("booking");
  const ts = useTranslations("services");
  const tt = useTranslations("team");
  const locale = useLocale();

  const formattedDate = data.date
    ? data.date.toLocaleDateString(locale === "en" ? "en-GB" : locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const practitionerName =
    data.practitioner === "any"
      ? t("any")
      : teamMembers.find((m) => m.key === data.practitioner)
        ? tt(`${data.practitioner}.name`)
        : data.practitioner;

  const rows = [
    { label: t("summaryService"), value: ts(`${data.service}.name`) },
    { label: t("summaryPractitioner"), value: practitionerName },
    { label: t("summaryDate"), value: formattedDate },
    { label: t("summaryTime"), value: data.time },
    {
      label: t("summaryPatient"),
      value: `${data.firstName} ${data.lastName}`,
    },
    { label: t("email"), value: data.email },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-semibold">
          {t("summary")}
        </h2>
      </div>

      <AnimatedElement>
        <Card className="mx-auto max-w-lg shadow-[var(--shadow-md)]">
          <CardContent className="p-6">
            <div className="space-y-0">
              {rows.map((row, index) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-muted-foreground">
                      {row.label}
                    </span>
                    <span className="text-sm font-medium text-right max-w-[60%]">
                      {row.value}
                    </span>
                  </div>
                  {index < rows.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimatedElement>
    </div>
  );
}
