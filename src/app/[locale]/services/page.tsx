import { setRequestLocale } from "next-intl/server";
import { HeroCentered } from "@/components/sections/hero-centered";
import { ServicesAlternating } from "@/components/sections/services-alternating";
import { CtaBanner } from "@/components/sections/cta-banner";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroCentered namespace="hero.services" headlineKey="headline" subtitleKey="subtitle" />
      <ServicesAlternating />
      <CtaBanner />
    </>
  );
}
