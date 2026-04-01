"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatedElement } from "@/components/ui/animated-element";

const patientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  notes: z.string().optional(),
  isNewPatient: z.boolean(),
  acceptTerms: z.literal(true, { error: "required" }),
});

export type PatientFormData = z.infer<typeof patientSchema>;

interface StepInfoProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes: string;
    isNewPatient: boolean;
    acceptTerms: boolean;
  };
  onChange: (data: Partial<StepInfoProps["data"]>) => void;
  onValidated: (valid: boolean) => void;
  formRef: React.RefObject<{ submit: () => Promise<boolean> } | null>;
}

export function StepInfo({ data, onChange, formRef }: StepInfoProps) {
  const t = useTranslations("booking");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
      isNewPatient: data.isNewPatient,
      acceptTerms: data.acceptTerms as true | undefined,
    },
    mode: "onBlur",
  });

  // Expose a submit method to the parent wizard
  useEffect(() => {
    if (formRef) {
      formRef.current = {
        submit: async () => {
          const valid = await trigger();
          if (valid) {
            handleSubmit((formData) => {
              onChange({
                ...formData,
                acceptTerms: formData.acceptTerms === true,
              });
            })();
          }
          return valid;
        },
      };
    }
  }, [formRef, trigger, handleSubmit, onChange]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-semibold">
          {t("patientInfo")}
        </h2>
      </div>

      <AnimatedElement>
        <form
          className="mx-auto max-w-lg space-y-5"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          {/* First + Last name */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t("firstName")}</Label>
              <Input
                id="firstName"
                {...register("firstName", {
                  onChange: (e) => onChange({ firstName: e.target.value }),
                })}
                aria-invalid={!!errors.firstName}
                data-testid="input-firstName"
              />
              {errors.firstName && (
                <p className="text-xs text-destructive" role="alert">
                  {t("firstName")} — min. 2
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">{t("lastName")}</Label>
              <Input
                id="lastName"
                {...register("lastName", {
                  onChange: (e) => onChange({ lastName: e.target.value }),
                })}
                aria-invalid={!!errors.lastName}
                data-testid="input-lastName"
              />
              {errors.lastName && (
                <p className="text-xs text-destructive" role="alert">
                  {t("lastName")} — min. 2
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                onChange: (e) => onChange({ email: e.target.value }),
              })}
              aria-invalid={!!errors.email}
              data-testid="input-email"
            />
            {errors.email && (
              <p className="text-xs text-destructive" role="alert">
                {t("email")} — invalid
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+32 4XX XX XX XX"
              {...register("phone", {
                onChange: (e) => onChange({ phone: e.target.value }),
              })}
              aria-invalid={!!errors.phone}
              data-testid="input-phone"
            />
            {errors.phone && (
              <p className="text-xs text-destructive" role="alert">
                {t("phone")} — min. 9
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">{t("notes")}</Label>
            <Textarea
              id="notes"
              placeholder={t("notesPlaceholder")}
              rows={3}
              {...register("notes", {
                onChange: (e) => onChange({ notes: e.target.value }),
              })}
              data-testid="input-notes"
            />
          </div>

          {/* New patient checkbox */}
          <Controller
            control={control}
            name="isNewPatient"
            render={({ field }) => (
              <div className="flex items-center gap-3">
                <Checkbox
                  id="isNewPatient"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    onChange({ isNewPatient: checked === true });
                  }}
                  data-testid="checkbox-newPatient"
                />
                <Label htmlFor="isNewPatient" className="cursor-pointer text-sm font-normal">
                  {t("newPatient")}
                </Label>
              </div>
            )}
          />

          {/* Accept terms checkbox */}
          <Controller
            control={control}
            name="acceptTerms"
            render={({ field }) => (
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="acceptTerms"
                    checked={field.value === true}
                    onCheckedChange={(checked) => {
                      field.onChange(checked === true ? true : undefined);
                      onChange({ acceptTerms: checked === true });
                    }}
                    aria-invalid={!!errors.acceptTerms}
                    data-testid="checkbox-acceptTerms"
                  />
                  <Label htmlFor="acceptTerms" className="cursor-pointer text-sm font-normal">
                    {t("acceptTerms")}
                  </Label>
                </div>
                {errors.acceptTerms && (
                  <p className="pl-7 text-xs text-destructive" role="alert">
                    {t("acceptTerms")} *
                  </p>
                )}
              </div>
            )}
          />
        </form>
      </AnimatedElement>
    </div>
  );
}
