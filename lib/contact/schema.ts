// Pure zero-dependency validation schema and types for contact submission.

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  subject: string;
  message: string;
  consent: boolean;
  company?: string; // Honeypot field (must stay empty)
}

export type ContactFieldKey = keyof ContactInput;

export type ContactErrors = Partial<Record<ContactFieldKey, string>>;

export interface ValidationResult {
  isValid: boolean;
  errors: ContactErrors;
  sanitized: ContactInput;
}

const PHONE_REGEX = /^[+()\d\s.-]{6,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Normalizes single-line string fields:
 * Trims leading/trailing whitespace and collapses internal multiple spaces into one.
 */
export function sanitizeSingleLine(value: string | undefined): string {
  if (!value) return "";
  return value.trim().replace(/\s+/g, " ");
}

/**
 * Checks whether a single-line string contains carriage returns or newlines.
 */
export function hasLineBreaks(value: string): boolean {
  return /[\r\n]/.test(value);
}

/**
 * Validates a single contact input field for inline blur validation.
 */
export function validateField(
  key: ContactFieldKey,
  value: unknown,
  allowedTopics?: string[]
): string | undefined {
  if (key === "company") {
    // Honeypot field: if filled, mark as spam/invalid
    if (typeof value === "string" && value.trim().length > 0) {
      return "Bot submission detected.";
    }
    return undefined;
  }

  if (key === "name") {
    const raw = typeof value === "string" ? value : "";
    if (hasLineBreaks(raw)) return "Name must not contain line breaks.";
    const clean = sanitizeSingleLine(raw);
    if (!clean) return "Name is required.";
    if (clean.length < 2) return "Name must be at least 2 characters.";
    if (clean.length > 80) return "Name must be at most 80 characters.";
    return undefined;
  }

  if (key === "email") {
    const raw = typeof value === "string" ? value : "";
    if (hasLineBreaks(raw)) return "Email must not contain line breaks.";
    const clean = sanitizeSingleLine(raw);
    if (!clean) return "Email address is required.";
    if (clean.length > 120) return "Email must be at most 120 characters.";
    if (!EMAIL_REGEX.test(clean)) return "Please enter a valid email address.";
    return undefined;
  }

  if (key === "phone") {
    const raw = typeof value === "string" ? value : "";
    if (!raw.trim()) return undefined; // Optional field
    if (hasLineBreaks(raw)) return "Phone number must not contain line breaks.";
    const clean = sanitizeSingleLine(raw);
    if (!PHONE_REGEX.test(clean)) {
      return "Please enter a valid phone number (6 to 20 digits, spaces, hyphens).";
    }
    return undefined;
  }

  if (key === "topic") {
    const raw = typeof value === "string" ? value : "";
    if (hasLineBreaks(raw)) return "Topic must not contain line breaks.";
    const clean = sanitizeSingleLine(raw);
    if (!clean) return "Please select an inquiry topic.";
    if (allowedTopics && allowedTopics.length > 0 && !allowedTopics.includes(clean)) {
      return "Selected topic is not in the recognized topics list.";
    }
    return undefined;
  }

  if (key === "subject") {
    const raw = typeof value === "string" ? value : "";
    if (hasLineBreaks(raw)) return "Subject must not contain line breaks.";
    const clean = sanitizeSingleLine(raw);
    if (!clean) return "Subject is required.";
    if (clean.length < 3) return "Subject must be at least 3 characters.";
    if (clean.length > 120) return "Subject must be at most 120 characters.";
    return undefined;
  }

  if (key === "message") {
    const raw = typeof value === "string" ? value : "";
    const clean = raw.trim();
    if (!clean) return "Message is required.";
    if (clean.length < 10) return "Message must be at least 10 characters.";
    if (clean.length > 4000) return "Message must not exceed 4,000 characters.";
    return undefined;
  }

  if (key === "consent") {
    if (value !== true) {
      return "You must accept the atelier contact policy to proceed.";
    }
    return undefined;
  }

  return undefined;
}

/**
 * Validates the full contact form payload.
 * Pure and zero-dependency, safe to execute on client or Next.js server route.
 */
export function validateContact(
  input: Partial<ContactInput>,
  allowedTopics?: string[]
): ValidationResult {
  const errors: ContactErrors = {};

  const sanitized: ContactInput = {
    name: sanitizeSingleLine(input.name),
    email: sanitizeSingleLine(input.email),
    phone: input.phone ? sanitizeSingleLine(input.phone) : "",
    topic: sanitizeSingleLine(input.topic),
    subject: sanitizeSingleLine(input.subject),
    message: (input.message || "").trim(),
    consent: input.consent === true,
    company: sanitizeSingleLine(input.company),
  };

  const fieldsToCheck: ContactFieldKey[] = [
    "name",
    "email",
    "phone",
    "topic",
    "subject",
    "message",
    "consent",
    "company",
  ];

  for (const field of fieldsToCheck) {
    const err = validateField(field, input[field], allowedTopics);
    if (err) {
      errors[field] = err;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}
