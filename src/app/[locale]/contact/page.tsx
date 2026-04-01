import { setRequestLocale } from "next-intl/server";
import { HeroCentered } from "@/components/sections/hero-centered";
import { ContactFormMap } from "@/components/sections/contact-form-map";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroCentered namespace="hero.contact" headlineKey="headline" subtitleKey="subtitle" />
      <ContactFormMap />
    </>
  );
}
