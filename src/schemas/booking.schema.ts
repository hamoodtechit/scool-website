import { z } from "zod";
import { emailSchema } from "./common.schema";

export const createBookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  timeSlot: z.string().datetime("Must be a valid ISO DateTime string"),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
