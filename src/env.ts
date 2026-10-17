import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url("Must be a valid Postgres URL").optional(),
  NEXT_PUBLIC_API_URL: z.string().url("Must be a valid API URL").optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

/**
 * Validate environment variables on boot.
 * If validation fails, it throws a highly readable error and crashes the app.
 */
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    parsedEnv.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
