import { setRequestLocale } from "next-intl/server";
import { HeroSplit } from "@/components/sections/hero-split";
import { TeamFull } from "@/components/sections/team-full";
import { HowItWorks } from "@/components/sections/how-it-works";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSplit
        namespace="hero.about"
        headlineKey="headline"
        subtitleKey="subtitle"
        imageDefault="/images/hero-about.jpg"
        reverse
      />
      <TeamFull />
      <HowItWorks />
    </>
  );
}
