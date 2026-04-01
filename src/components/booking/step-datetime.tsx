"use client";

import { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { fr, nl, enUS } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { AnimatedElement } from "@/components/ui/animated-element";
import { timeSlots } from "@/lib/data/booking";
import { cn } from "@/lib/utils";

const localeMap: Record<string, typeof fr> = {
  fr,
  nl,
  en: enUS,
};

interface StepDateTimeProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  onDateSelect: (date: Date | undefined) => void;
  onTimeSelect: (time: string) => void;
}

function isSunday(date: Date) {
  return date.getDay() === 0;
}

function isSaturday(date: Date) {
  return date.getDay() === 6;
}

function isPast(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function isSlotUnavailable(index: number) {
  // Simulate every 3rd slot as unavailable
  return index % 3 === 2;
}

export function StepDateTime({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: StepDateTimeProps) {
  const t = useTranslations("booking");
  const locale = useLocale();
  const calendarLocale = localeMap[locale] ?? fr;

  const slots = useMemo(() => {
    if (!selectedDate) return [];
    return isSaturday(selectedDate) ? timeSlots.saturday : timeSlots.weekday;
  }, [selectedDate]);

  const morningSlots = useMemo(
    () => slots.filter((s) => parseInt(s.split(":")[0], 10) < 13),
    [slots]
  );

  const afternoonSlots = useMemo(
    () => slots.filter((s) => parseInt(s.split(":")[0], 10) >= 13),
    [slots]
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-semibold">
          {t("selectDate")}
        </h2>
      </div>

      <div className="flex flex-col items-start gap-8 lg:flex-row">
        {/* Calendar */}
        <AnimatedElement className="w-full shrink-0 lg:w-auto">
          <div className="flex justify-center rounded-[var(--radius)] border bg-card p-3 shadow-[var(--shadow-sm)]">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              locale={calendarLocale}
              disabled={(date) => isPast(date) || isSunday(date)}
              data-testid="booking-calendar"
            />
          </div>
        </AnimatedElement>

        {/* Time slots */}
        <div className="w-full flex-1">
          {selectedDate ? (
            <AnimatedElement>
              <div className="space-y-5">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {t("availableSlots")}
                </h3>

                {/* Morning */}
                {morningSlots.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("morning")}
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {morningSlots.map((slot, index) => {
                        const unavailable = isSlotUnavailable(index);
                        const isSelected = selectedTime === slot;

                        return (
                          <Button
                            key={slot}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            disabled={unavailable}
                            onClick={() => onTimeSelect(slot)}
                            className={cn(
                              "rounded-[var(--radius)] text-sm",
                              !isSelected &&
                                !unavailable &&
                                "hover:bg-primary/10 hover:text-primary hover:border-primary/40"
                            )}
                            data-testid={`time-slot-${slot}`}
                            aria-label={`${slot} ${unavailable ? "(unavailable)" : ""}`}
                          >
                            {slot}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Afternoon */}
                {afternoonSlots.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("afternoon")}
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {afternoonSlots.map((slot, index) => {
                        const unavailable = isSlotUnavailable(index);
                        const isSelected = selectedTime === slot;

                        return (
                          <Button
                            key={slot}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            disabled={unavailable}
                            onClick={() => onTimeSelect(slot)}
                            className={cn(
                              "rounded-[var(--radius)] text-sm",
                              !isSelected &&
                                !unavailable &&
                                "hover:bg-primary/10 hover:text-primary hover:border-primary/40"
                            )}
                            data-testid={`time-slot-${slot}`}
                            aria-label={`${slot} ${unavailable ? "(unavailable)" : ""}`}
                          >
                            {slot}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </AnimatedElement>
          ) : (
            <div className="flex h-full items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">
                {t("selectDate")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
