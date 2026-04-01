"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedElement } from "@/components/ui/animated-element";
import { teamMembers } from "@/lib/data/team";

export function TeamFull() {
  const t = useTranslations("team");

  return (
    <SectionWrapper id="team">
      <SectionHeading title={t("sectionTitle")} subtitle={t("sectionSubtitle")} />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {teamMembers.map((member, index) => (
          <AnimatedElement key={member.key} delay={index * 0.12}>
            <article className="flex flex-col items-center text-center">
              {/* Team photo */}
              <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-muted">
                <Image
                  src={member.image}
                  alt={t(`${member.key}.name`)}
                  width={400}
                  height={533}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="font-heading mt-6 text-xl font-semibold tracking-tight">
                {t(`${member.key}.name`)}
              </h3>

              {/* Role */}
              <Badge
                variant="secondary"
                className="mt-2"
              >
                {t(`${member.key}.role`)}
              </Badge>

              {/* Bio */}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t(`${member.key}.bio`)}
              </p>
            </article>
          </AnimatedElement>
        ))}
      </div>
    </SectionWrapper>
  );
}
