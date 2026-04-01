"use client";

import { useTranslations, useMessages } from "next-intl";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedElement } from "@/components/ui/animated-element";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion() {
  const t = useTranslations("faq");
  const messages = useMessages();
  const items = (messages.faq as Record<string, unknown>).items as FaqItem[];

  return (
    <SectionWrapper id="faq" className="bg-muted/40">
      <SectionHeading title={t("sectionTitle")} subtitle={t("sectionSubtitle")} />

      <AnimatedElement className="mx-auto max-w-3xl">
        <Accordion>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AnimatedElement>
    </SectionWrapper>
  );
}
