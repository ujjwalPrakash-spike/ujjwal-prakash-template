/**
 * THE ONLY SUBMISSION SEAM FOR CONTACT FORMS
 * ==========================================
 * REAL IMPLEMENTATION INSTRUCTIONS:
 * When replacing this mock stub with a real delivery backend:
 * 1. Create a server action or API route (e.g. POST /api/contact) that calls your email provider
 *    (Resend, Postmark, SendGrid, AWS SES) or webhook (Slack, CRM, Linear).
 * 2. Re-use `validateContact` from `./schema` on the server before dispatching.
 * 3. Verify honeypot field `input.company` is empty. If filled, return { ok: true, id: "SPAM-BLOCKED" }
 *    silently without sending any email or notifying the bot.
 * 4. Apply rate limiting (e.g. Upstash Redis, token bucket by IP or subnet). If exceeded,
 *    return { ok: false, code: "rate_limit", message: "Too many messages.", retryAfterSeconds: 60 }.
 * 5. Return `{ ok: true, id: generatedUUID }` on success, or appropriate error codes on failure.
 *
 * Current mode: MOCK PREVIEW ONLY. Controlled by CONTACT_CONFIG.mockSubmit.
 * Does not send emails or communicate with third-party providers.
 */

import { CONTACT_CONFIG } from "@/config/contact";
import {
  type ContactInput,
  validateContact,
} from "./schema";

export type { ContactInput };

export type SubmitResult =
  | {
      ok: true;
      id: string;
      devMode?: boolean;
    }
  | {
      ok: false;
      code: "validation" | "rate_limit" | "provider" | "network" | "unknown";
      message: string;
      fieldErrors?: Partial<Record<keyof ContactInput, string>>;
      retryAfterSeconds?: number;
    };

/**
 * Generates an uppercase reference identifier (e.g. "MSG-4F2A9C").
 */
function generateReferenceId(): string {
  const chars = "ABCDEF0123456789";
  let hash = "";
  for (let i = 0; i < 6; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `MSG-${hash}`;
}

/**
 * Submits the contact message.
 * In development/mock mode, simulates network latency and schema validation.
 */
export async function submitContact(input: ContactInput): Promise<SubmitResult> {
  // Check if offline
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return {
      ok: false,
      code: "network",
      message: "You appear to be offline. Check your network connection and try again.",
    };
  }

  // Enforce honeypot silently: bots get a fake successful ID
  if (input.company && input.company.trim().length > 0) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      ok: true,
      id: "MSG-TRIPWIRE-BOT",
      devMode: CONTACT_CONFIG.mockSubmit,
    };
  }

  // Validate using pure shared schema
  const allowedTopicValues = CONTACT_CONFIG.topics.map((t) => t.value);
  const validation = validateContact(input, allowedTopicValues);

  if (!validation.isValid) {
    return {
      ok: false,
      code: "validation",
      message: "Please correct the highlighted fields before submitting.",
      fieldErrors: validation.errors,
    };
  }

  // Simulate mock delivery delay
  if (CONTACT_CONFIG.mockSubmit) {
    await new Promise((resolve) => setTimeout(resolve, 900));

    return {
      ok: true,
      id: generateReferenceId(),
      devMode: true,
    };
  }

  // Real production fallback stub (not reached while mockSubmit is true)
  return {
    ok: false,
    code: "provider",
    message: "Production delivery provider is not configured yet.",
  };
}
