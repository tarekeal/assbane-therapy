"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedElement } from "@/components/ui/animated-element";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.enum(["appointment", "general", "other"]),
  message: z.string().min(10),
});

type ContactFormData = z.infer<typeof contactSchema>;

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.0!2d4.33!3d50.86!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMolenbeek-Saint-Jean!5e0!3m2!1sfr!2sbe!4v1";

export function ContactFormMap() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(data: ContactFormData) {
    // eslint-disable-next-line no-console
    console.log("Contact form data:", data);
    setSubmitted(true);
    reset();
  }

  return (
    <SectionWrapper id="contact">
      <SectionHeading title={t("sectionTitle")} />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Contact form */}
        <AnimatedElement>
          <div className="rounded-xl bg-card p-6 shadow-[var(--shadow-md)] sm:p-8">
            <h3 className="font-heading text-xl font-semibold tracking-tight">
              {t("form.title")}
            </h3>

            {submitted ? (
              <div
                className="mt-6 flex items-start gap-3 rounded-[var(--radius)] bg-primary/10 p-4"
                role="status"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p className="text-sm text-foreground">{t("form.success")}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-5"
                noValidate
              >
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="contact-name">{t("form.name")}</Label>
                  <Input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                    aria-invalid={!!errors.name}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="contact-email">{t("form.email")}</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">{t("form.phone")}</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    {...register("phone")}
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="contact-subject">{t("form.subject")}</Label>
                  <select
                    id="contact-subject"
                    className="flex h-9 w-full rounded-[var(--radius)] border border-input bg-transparent px-3 py-1 text-sm shadow-[var(--shadow-sm)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    aria-describedby={
                      errors.subject ? "contact-subject-error" : undefined
                    }
                    aria-invalid={!!errors.subject}
                    defaultValue=""
                    {...register("subject")}
                  >
                    <option value="" disabled>
                      {t("form.subject")}
                    </option>
                    <option value="appointment">
                      {t("form.subjects.appointment")}
                    </option>
                    <option value="general">
                      {t("form.subjects.general")}
                    </option>
                    <option value="other">
                      {t("form.subjects.other")}
                    </option>
                  </select>
                  {errors.subject && (
                    <p
                      id="contact-subject-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="contact-message">{t("form.message")}</Label>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    aria-invalid={!!errors.message}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {t("form.submit")}
                </Button>
              </form>
            )}
          </div>
        </AnimatedElement>

        {/* Map + contact info */}
        <AnimatedElement delay={0.15}>
          <div className="flex flex-col gap-8">
            {/* Google Maps embed */}
            <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-[var(--shadow-md)]">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                title="Assbane Therapy - Molenbeek"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-sm text-muted-foreground">
                  {t("address")}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${t("phone").replace(/\s/g, "")}`}
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {t("phone")}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${t("email")}`}
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {t("email")}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {t("hours.title")}
                  </p>
                  <p>{t("hours.weekdays")}</p>
                  <p>{t("hours.saturday")}</p>
                  <p>{t("hours.sunday")}</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </SectionWrapper>
  );
}
