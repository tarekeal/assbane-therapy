"use server";

import { z } from "zod";

const bookingSchema = z.object({
  service: z.string(),
  practitioner: z.string(),
  date: z.string(),
  time: z.string(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  notes: z.string().optional(),
  isNewPatient: z.boolean(),
});

export type BookingData = z.infer<typeof bookingSchema>;

export async function createBooking(data: BookingData) {
  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false as const, error: "Invalid booking data" };
  }

  const reference = `AT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  // In production, save to database here
  console.log("New booking:", { ...parsed.data, reference });

  return { success: true as const, reference };
}
