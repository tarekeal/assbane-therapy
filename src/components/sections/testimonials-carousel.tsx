"use client";

import { useTranslations, useMessages } from "next-intl";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedElement } from "@/components/ui/animated-element";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TestimonialItem {
  quote: string;
  author: string;
  location: string;
  service: string;
}

export function TestimonialsCarousel() {
  const t = useTranslations("testimonials");
  const messages = useMessages();
  const items = (messages.testimonials as Record<string, unknown>)
    .items as TestimonialItem[];

  return (
    <SectionWrapper id="testimonials">
      <SectionHeading
        title={t("sectionTitle")}
        subtitle={t("sectionSubtitle")}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <AnimatedElement key={index} delay={index * 0.1}>
            <Card className="h-full">
              <CardContent className="flex flex-col gap-4">
                {/* Quote icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="shrink-0 text-primary/20"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>

                <blockquote className="flex-1">
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {item.quote}
                  </p>
                </blockquote>

                <footer className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <cite className="block text-sm font-semibold not-italic">
                      {item.author}
                    </cite>
                    <span className="text-xs text-muted-foreground">
                      {item.location}
                    </span>
                  </div>
                  <Badge variant="secondary">{item.service}</Badge>
                </footer>
              </CardContent>
            </Card>
          </AnimatedElement>
        ))}
      </div>
    </SectionWrapper>
  );
}
