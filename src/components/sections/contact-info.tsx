"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedElement } from "@/components/ui/animated-element";
import { contactInfo } from "@/lib/data/contact";

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-primary"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx={12} cy={10} r={3} />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-primary"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-primary"
    >
      <rect width={20} height={16} x={2} y={4} rx={2} />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-primary"
    >
      <circle cx={12} cy={12} r={10} />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function ContactInfo() {
  const t = useTranslations("contact");

  return (
    <SectionWrapper id="contact">
      <SectionHeading title={t("sectionTitle")} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Contact details */}
        <AnimatedElement>
          <div className="space-y-8">
            {/* Address */}
            <address className="not-italic">
              <div className="flex items-start gap-3">
                <MapPinIcon />
                <p className="text-sm leading-relaxed">{t("address")}</p>
              </div>
            </address>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <PhoneIcon />
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="text-sm transition-colors hover:text-primary"
                style={{
                  transitionDuration: "var(--duration-micro)",
                  transitionTimingFunction: "var(--ease)",
                }}
              >
                {t("phone")}
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <MailIcon />
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-sm transition-colors hover:text-primary"
                style={{
                  transitionDuration: "var(--duration-micro)",
                  transitionTimingFunction: "var(--ease)",
                }}
              >
                {t("email")}
              </a>
            </div>

            {/* Opening hours */}
            <div className="flex items-start gap-3">
              <ClockIcon />
              <div>
                <h3 className="font-heading text-sm font-semibold">
                  {t("hours.title")}
                </h3>
                <dl className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <div>
                    <dt className="sr-only">{t("hours.weekdaysLabel")}</dt>
                    <dd>{t("hours.weekdays")}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">{t("hours.saturdayLabel")}</dt>
                    <dd>{t("hours.saturday")}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">{t("hours.sundayLabel")}</dt>
                    <dd>{t("hours.sunday")}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* Google Maps embed */}
        <AnimatedElement delay={0.15}>
          <div className="overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-md)]">
            <iframe
              src={contactInfo.mapEmbedUrl}
              title="Assbane Therapy - Google Maps"
              width="100%"
              height={400}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </AnimatedElement>
      </div>
    </SectionWrapper>
  );
}
