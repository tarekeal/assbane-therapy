"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedElement } from "@/components/ui/animated-element";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/lib/data/team";

export function TeamPreview() {
  const t = useTranslations("team");

  return (
    <SectionWrapper id="team" className="bg-muted/40">
      <SectionHeading title={t("sectionTitle")} subtitle={t("sectionSubtitle")} />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <AnimatedElement key={member.key} delay={index * 0.1}>
            <div className="flex flex-col items-center text-center">
              {/* Circular team photo */}
              <div className="mb-5 size-32 overflow-hidden rounded-full ring-4 ring-background shadow-[var(--shadow-md)]">
                <Image
                  src={member.image}
                  alt={t(`${member.key}.name`)}
                  width={256}
                  height={256}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="font-heading text-lg font-semibold">
                {t(`${member.key}.name`)}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                {t(`${member.key}.role`)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t(`${member.key}.bio`)}
              </p>
            </div>
          </AnimatedElement>
        ))}
      </div>

      <AnimatedElement delay={0.4} className="mt-12 text-center">
        <Button
          variant="outline"
          render={<Link href="/about" />}
        >
          {t("meetTeam")}
        </Button>
      </AnimatedElement>
    </SectionWrapper>
  );
}
