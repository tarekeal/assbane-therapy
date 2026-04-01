import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { BookingWizard } from "@/components/booking/booking-wizard";

export default function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <BookPageContent params={params} />;
}

async function BookPageContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BookPageClient />;
}

function BookPageClient() {
  const t = useTranslations("booking");

  return (
    <SectionWrapper>
      <div className="mb-10 text-center">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">
          {t("pageTitle")}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t("pageSubtitle")}
        </p>
      </div>

      <BookingWizard />
    </SectionWrapper>
  );
}
