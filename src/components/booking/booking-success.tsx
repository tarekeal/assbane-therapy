"use client";

import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { AnimatedElement } from "@/components/ui/animated-element";
import { teamMembers } from "@/lib/data/team";

interface BookingSuccessProps {
  reference: string;
  data: {
    service: string;
    practitioner: string;
    date: Date | undefined;
    time: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  onBookAnother: () => void;
}

export function BookingSuccess({
  reference,
  data,
  onBookAnother,
}: BookingSuccessProps) {
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

  return (
    <AnimatedElement className="mx-auto max-w-lg text-center">
      <div className="space-y-6">
        {/* Checkmark icon */}
        <div className="flex justify-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="size-10 text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="font-heading text-2xl font-semibold">
            {t("success.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("success.message", { email: data.email })}
          </p>
        </div>

        {/* Reference */}
        <div className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          {t("success.reference")}: {reference}
        </div>

        {/* Summary card */}
        <Card className="text-left shadow-[var(--shadow-sm)]">
          <CardContent className="p-5">
            <div className="space-y-0">
              {[
                { label: t("summaryService"), value: ts(`${data.service}.name`) },
                { label: t("summaryPractitioner"), value: practitionerName },
                { label: t("summaryDate"), value: formattedDate },
                { label: t("summaryTime"), value: data.time },
              ].map((row, index, arr) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-sm text-muted-foreground">
                      {row.label}
                    </span>
                    <span className="text-sm font-medium">{row.value}</span>
                  </div>
                  {index < arr.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button variant="outline">{t("success.backHome")}</Button>
          </Link>
          <Button onClick={onBookAnother}>
            {t("success.bookAnother")}
          </Button>
        </div>
      </div>
    </AnimatedElement>
  );
}
