import { setRequestLocale } from "next-intl/server";
import { HeroSplit } from "@/components/sections/hero-split";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TeamPreview } from "@/components/sections/team-preview";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ContactInfo } from "@/components/sections/contact-info";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSplit
        namespace="hero.home"
        headlineKey="headline"
        subtitleKey="subtitle"
        ctaKey="cta"
        ctaSecondaryKey="ctaSecondary"
        ctaHref="/book"
      />
      <ServicesGrid />
      <TeamPreview />
      <TestimonialsCarousel />
      <FaqAccordion />
      <CtaBanner />
      <ContactInfo />
    </>
  );
}
