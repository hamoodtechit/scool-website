import { z } from "zod";

/**
 * Common, highly reusable Zod validation blocks.
 * Prevents duplicating regexes across the application.
 */

// A standard email validation
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please provide a valid email address");

// A basic phone number validation (adjust regex as needed for specific countries/formats)
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const phoneSchema = z
  .string()
  .regex(phoneRegex, "Please provide a valid phone number")
  .min(10, "Phone number must be at least 10 characters");

// A standard strong password validation (if you add Auth later)
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");
