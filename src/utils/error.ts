import { isAxiosError } from "axios";

/**
 * Extract an error message from the backend response body.
 */
export function extractMessageFromData(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataObj = data as Record<string, any>;

  // Check if there is a stringified ZodError
  const potentialZodMessage = (dataObj.error?.name === "ZodError" && typeof dataObj.error?.message === "string")
    ? dataObj.error.message
    : (dataObj.name === "ZodError" && typeof dataObj.message === "string" && dataObj.message.trim().startsWith("["))
      ? dataObj.message
      : null;

  if (potentialZodMessage) {
    try {
      const parsed = JSON.parse(potentialZodMessage);
      if (Array.isArray(parsed)) {
        const fieldMessages = parsed
          .map((detail: Record<string, unknown>) => {
            const field = Array.isArray(detail?.path) ? detail.path.join(".") : detail?.path;
            const message = detail?.message;
            return field && message ? `${field}: ${message}` : message;
          })
          .filter(Boolean)
          .join(" | ");

        if (fieldMessages) return fieldMessages;
      }
    } catch {
      // Ignore JSON parse errors
    }
  }

  // Extract cause message if error is an object
  const causeMessage =
    typeof dataObj.error === "object" && dataObj.error !== null
      ? dataObj.error.cause?.message || dataObj.error.cause?.originalMessage || dataObj.error.message
      : null;

  const rawMessage = dataObj.details?.message ?? dataObj.message;
  let baseMessage = rawMessage
    ? Array.isArray(rawMessage)
      ? rawMessage.join(", ")
      : rawMessage
    : typeof dataObj.error === "string"
    ? dataObj.error
    : causeMessage;

  if (baseMessage && baseMessage.toLowerCase().includes("internal server error") && causeMessage) {
    baseMessage = causeMessage;
  }

  return baseMessage;
}

export function extractErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const data = error.response?.data;
    if (!data) return error.message || "An unknown error occurred";
    return extractMessageFromData(data) || error.message || "An unknown error occurred";
  }

  if (error && typeof error === "object") {
    const extracted = extractMessageFromData(error);
    if (extracted) return extracted;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}
