import { z } from "zod";
import { emailSchema, phoneSchema } from "./common.schema";

export const createLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  phone: phoneSchema.optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
