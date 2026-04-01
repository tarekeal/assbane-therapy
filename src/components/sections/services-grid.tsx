"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedElement } from "@/components/ui/animated-element";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { services } from "@/lib/data/services";

function ServiceIcon({ icon }: { icon: string }) {
  const iconPaths: Record<string, React.ReactNode> = {
    Activity: (
      <path
        d="M22 12h-4l-3 9L9 3l-3 9H2"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
    Brain: (
      <>
        <path
          d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M9 21h6M10 17v4M14 17v4"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </>
    ),
    Footprints: (
      <>
        <path
          d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5 10 7.93 8 10 8 12v4"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 2.43 2 4.5 2 6.5v4"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </>
    ),
    Heart: (
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-6"
    >
      {iconPaths[icon] ?? iconPaths.Heart}
    </svg>
  );
}

export function ServicesGrid() {
  const t = useTranslations("services");

  return (
    <SectionWrapper id="services">
      <SectionHeading title={t("sectionTitle")} subtitle={t("sectionSubtitle")} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <AnimatedElement key={service.key} delay={index * 0.08}>
            <Card
              className="group h-full transition-transform transition-shadow hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
              style={{
                transitionDuration: "var(--duration-micro)",
                transitionTimingFunction: "var(--ease)",
              }}
            >
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ServiceIcon icon={service.icon} />
                </div>
                <CardTitle>
                  <h3 className="text-lg font-semibold">{t(`${service.key}.name`)}</h3>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  {t(`${service.key}.shortDesc`)}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  style={{
                    transitionDuration: "var(--duration-micro)",
                    transitionTimingFunction: "var(--ease)",
                  }}
                >
                  {t("learnMore")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="ml-1 transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          </AnimatedElement>
        ))}
      </div>
    </SectionWrapper>
  );
}
