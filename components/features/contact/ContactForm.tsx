// Interactive client contact form managing draft persistence, inline validation, and submission states.
"use client";

import React, { useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { IconArrowRight, IconLoader2, IconCheck } from "@tabler/icons-react";
import { CONTACT_CONFIG } from "@/config/contact";
import { validateField, type ContactInput, type ContactErrors } from "@/lib/contact/schema";
import { submitContact, type SubmitResult } from "@/lib/contact/submit";
import { Field, TextArea, Select, Checkbox, FormStatus, type FormStatusCode } from "@/components/shared/ui";
import { TOKENS } from "@/lib/tokens";

const STORAGE_KEY = "apex_contact_draft_v1";

const INITIAL_FORM: ContactInput = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  subject: "",
  message: "",
  consent: false,
  company: "",
};

export function ContactForm() {
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  // Initialize draft state from sessionStorage
  const [form, setForm] = useState<ContactInput>(() => {
    if (typeof window === "undefined") return INITIAL_FORM;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_FORM, ...parsed, company: "" };
      }
    } catch {}
    return INITIAL_FORM;
  });

  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dev preview states initialize from ?state= query parameter
  const [status, setStatus] = useState<FormStatusCode>(() => {
    if (process.env.NODE_ENV !== "production") {
      const devState = searchParams.get("state");
      if (devState === "error") return "provider";
      if (devState === "ratelimit") return "rate_limit";
      if (devState === "offline") return "offline";
    }
    return "idle";
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [retryAfter, setRetryAfter] = useState<number | undefined>(() => {
    if (process.env.NODE_ENV !== "production" && searchParams.get("state") === "ratelimit") {
      return 45;
    }
    return undefined;
  });

  const [successResult, setSuccessResult] = useState<{ id: string; devMode?: boolean } | null>(() => {
    if (process.env.NODE_ENV !== "production" && searchParams.get("state") === "success") {
      return { id: "MSG-DEVPREVIEW", devMode: true };
    }
    return null;
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const topicRef = useRef<HTMLSelectElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Persist draft to sessionStorage
  const updateField = (key: keyof ContactInput, value: unknown) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      try {
        const toStore = { ...next, company: undefined };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      } catch {}
      return next;
    });

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleBlur = (key: keyof ContactInput) => {
    const allowed = CONTACT_CONFIG.topics.map((t) => t.value);
    const err = validateField(key, form[key], allowed);
    if (err) {
      setErrors((prev) => ({ ...prev, [key]: err }));
    }
  };

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (isSubmitting) return;

      setStatus("idle");
      const allowed = CONTACT_CONFIG.topics.map((t) => t.value);
      const newErrors: ContactErrors = {};
      const keys: (keyof ContactInput)[] = ["name", "email", "phone", "topic", "subject", "message", "consent"];

      for (const key of keys) {
        const err = validateField(key, form[key], allowed);
        if (err) newErrors[key] = err;
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        // Focus first invalid field
        if (newErrors.name) nameRef.current?.focus();
        else if (newErrors.email) emailRef.current?.focus();
        else if (newErrors.topic) topicRef.current?.focus();
        else if (newErrors.subject) subjectRef.current?.focus();
        else if (newErrors.message) messageRef.current?.focus();
        else if (newErrors.consent) consentRef.current?.focus();
        return;
      }

      setIsSubmitting(true);
      try {
        const result: SubmitResult = await submitContact(form);
        if (result.ok) {
          try {
            sessionStorage.removeItem(STORAGE_KEY);
          } catch {}
          setSuccessResult({ id: result.id, devMode: result.devMode });
          setTimeout(() => successHeadingRef.current?.focus(), 100);
        } else {
          if (result.code === "validation" && result.fieldErrors) {
            setErrors(result.fieldErrors);
            setStatus("validation");
            setStatusMessage(result.message);
          } else if (result.code === "rate_limit") {
            setStatus("rate_limit");
            setRetryAfter(result.retryAfterSeconds ?? 60);
          } else {
            setStatus("provider");
          }
        }
      } catch {
        setStatus("provider");
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, isSubmitting]
  );

  const handleReset = () => {
    setSuccessResult(null);
    setForm(INITIAL_FORM);
    setErrors({});
    setStatus("idle");
  };

  // Render Confirmation block when submission succeeds
  if (successResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: TOKENS.ease }}
        className="w-full py-8 text-left"
        role="region"
        aria-label="Submission Confirmation"
      >
        <div className="w-12 h-12 rounded-full border border-[#93c5fd] text-[#93c5fd] flex items-center justify-center mb-6">
          <IconCheck size={24} stroke={2} />
        </div>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4 outline-none"
        >
          Message sent
        </h2>
        <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-[50ch]">
          Thank you for reaching out. We have logged your project brief and will follow up within{" "}
          <span className="text-white">{CONTACT_CONFIG.quickFacts.responseTime.toLowerCase()}</span>.
        </p>

        <div className="border border-white/10 bg-white/[0.02] p-6 mb-8 max-w-md">
          <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 mb-1.5">
            Transmission Reference ID
          </span>
          <span className="font-mono text-xl sm:text-2xl text-[#93c5fd] tracking-wider">
            {successResult.id}
          </span>
        </div>

        {successResult.devMode && (
          <p className="text-[13px] text-white/55 mb-6">
            Preview mode: messages are not sent yet.
          </p>
        )}

        <button
          type="button"
          onClick={handleReset}
          className="text-[15px] font-medium text-white hover:text-[#93c5fd] underline underline-offset-4 cursor-pointer"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full space-y-6 sm:space-y-8">
      {/* Honeypot field (hidden from assistive tech and visual layout) */}
      <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => updateField("company", e.target.value)}
        />
      </div>

      {/* Global Form Status message */}
      <FormStatus
        status={status}
        message={statusMessage}
        supportEmail={CONTACT_CONFIG.quickFacts.email}
        retryAfterSeconds={retryAfter}
        onRetry={() => handleSubmit()}
      />

      {/* Fields with motion stagger */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <Field
          ref={nameRef}
          id="contact-name"
          label="Your Name"
          required
          autoComplete="name"
          value={form.name}
          error={errors.name}
          onChange={(e) => updateField("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          placeholder="e.g. Elena Rostova"
        />

        <Field
          ref={emailRef}
          id="contact-email"
          label="Email Address"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          error={errors.email}
          onChange={(e) => updateField("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="elena@atelier.ch"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <Field
          ref={phoneRef}
          id="contact-phone"
          label="Phone Number (Optional)"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          error={errors.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
          placeholder="+41 44 000 00 00"
        />

        <Select
          ref={topicRef}
          id="contact-topic"
          label="Inquiry Topic"
          required
          value={form.topic}
          options={CONTACT_CONFIG.topics}
          error={errors.topic}
          onChange={(e) => updateField("topic", e.target.value)}
          onBlur={() => handleBlur("topic")}
        />
      </div>

      <Field
        ref={subjectRef}
        id="contact-subject"
        label="Project Subject"
        required
        value={form.subject}
        error={errors.subject}
        onChange={(e) => updateField("subject", e.target.value)}
        onBlur={() => handleBlur("subject")}
        placeholder="Bespoke chassis telemetry architecture"
      />

      <TextArea
        ref={messageRef}
        id="contact-message"
        label="Project Specifications & Brief"
        required
        minRows={5}
        value={form.message}
        charCount={form.message.length}
        maxChars={4000}
        error={errors.message}
        onChange={(e) => updateField("message", e.target.value)}
        onBlur={() => handleBlur("message")}
        placeholder="Detail your program schedule, fabrication requirements, and desired delivery timeframe..."
      />

      <Checkbox
        ref={consentRef}
        id="contact-consent"
        required
        checked={form.consent}
        error={errors.consent}
        onChange={(e) => updateField("consent", e.target.checked)}
        label={
          <span>
            {CONTACT_CONFIG.consentLabel}{" "}
            <a
              href={CONTACT_CONFIG.termsLink.href}
              className="underline underline-offset-4 text-white hover:text-[#93c5fd]"
            >
              {CONTACT_CONFIG.termsLink.label}
            </a>{" "}
            and{" "}
            <a
              href={CONTACT_CONFIG.privacyLink.href}
              className="underline underline-offset-4 text-white hover:text-[#93c5fd]"
            >
              {CONTACT_CONFIG.privacyLink.label}
            </a>
            .
          </span>
        }
      />

      {/* Submit Bar */}
      <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-neutral-950 font-medium text-[15px] rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto shrink-0"
        >
          {isSubmitting ? (
            <>
              <IconLoader2 size={18} className="animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <span>Dispatch Brief</span>
              <IconArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>

        <p className="text-[13px] text-white/50 text-left sm:text-right">
          Required fields are marked.
        </p>
      </div>

      {CONTACT_CONFIG.mockSubmit && (
        <p className="text-[13px] text-white/55 pt-1">
          Preview mode: messages are not sent yet.
        </p>
      )}
    </form>
  );
}
