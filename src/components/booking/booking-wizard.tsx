"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./step-indicator";
import { StepService } from "./step-service";
import { StepPractitioner } from "./step-practitioner";
import { StepDateTime } from "./step-datetime";
import { StepInfo } from "./step-info";
import { StepConfirm } from "./step-confirm";
import { BookingSuccess } from "./booking-success";
import { createBooking } from "@/app/actions/booking";

interface BookingState {
  service: string;
  practitioner: string;
  date: Date | undefined;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  isNewPatient: boolean;
  acceptTerms: boolean;
}

const initialState: BookingState = {
  service: "",
  practitioner: "",
  date: undefined,
  time: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
  isNewPatient: false,
  acceptTerms: false,
};

const stepAnimation = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const },
};

export function BookingWizard() {
  const t = useTranslations("booking");
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const formRef = useRef<{ submit: () => Promise<boolean> } | null>(null);

  const updateData = useCallback(
    (partial: Partial<BookingState>) =>
      setData((prev) => ({ ...prev, ...partial })),
    []
  );

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return data.service !== "";
      case 2:
        return data.practitioner !== "";
      case 3:
        return data.date !== undefined && data.time !== "";
      case 4:
        return (
          data.firstName.length >= 2 &&
          data.lastName.length >= 2 &&
          data.email.includes("@") &&
          data.phone.length >= 9 &&
          data.acceptTerms
        );
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (step === 4 && formRef.current) {
      const valid = await formRef.current.submit();
      if (!valid) return;
    }
    if (step < 5) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const result = await createBooking({
        service: data.service,
        practitioner: data.practitioner,
        date: data.date?.toISOString() ?? "",
        time: data.time,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        notes: data.notes || undefined,
        isNewPatient: data.isNewPatient,
      });

      if (result.success) {
        setReference(result.reference);
        setShowSuccess(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookAnother = () => {
    setData(initialState);
    setStep(1);
    setShowSuccess(false);
    setReference("");
  };

  if (showSuccess) {
    return (
      <BookingSuccess
        reference={reference}
        data={data}
        onBookAnother={handleBookAnother}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Step indicator */}
      <StepIndicator currentStep={step} />

      {/* Step content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={stepAnimation.initial}
            animate={stepAnimation.animate}
            exit={stepAnimation.exit}
            transition={stepAnimation.transition}
          >
            {step === 1 && (
              <StepService
                selectedService={data.service}
                onSelect={(service) => updateData({ service })}
              />
            )}
            {step === 2 && (
              <StepPractitioner
                selectedPractitioner={data.practitioner}
                onSelect={(practitioner) => updateData({ practitioner })}
              />
            )}
            {step === 3 && (
              <StepDateTime
                selectedDate={data.date}
                selectedTime={data.time}
                onDateSelect={(date) => updateData({ date, time: "" })}
                onTimeSelect={(time) => updateData({ time })}
              />
            )}
            {step === 4 && (
              <StepInfo
                data={data}
                onChange={updateData}
                onValidated={() => {}}
                formRef={formRef}
              />
            )}
            {step === 5 && <StepConfirm data={data} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between border-t pt-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 1}
          data-testid="btn-back"
        >
          {t("back")}
        </Button>

        {step < 5 ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            data-testid="btn-next"
          >
            {t("next")}
          </Button>
        ) : (
          <Button
            onClick={handleConfirm}
            disabled={isSubmitting}
            data-testid="btn-confirm"
          >
            {isSubmitting ? "..." : t("bookNow")}
          </Button>
        )}
      </div>
    </div>
  );
}
