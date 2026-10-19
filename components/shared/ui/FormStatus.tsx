// Aria-live status alerts for network, offline, rate-limit, and provider errors.
import React from "react";
import { IconAlertCircle, IconClock, IconRefresh } from "@tabler/icons-react";

export type FormStatusCode = "idle" | "offline" | "rate_limit" | "provider" | "network" | "validation";

export interface FormStatusProps {
  status: FormStatusCode;
  message?: string;
  supportEmail?: string;
  retryAfterSeconds?: number;
  onRetry?: () => void;
  className?: string;
}

export function FormStatus({
  status,
  message,
  supportEmail,
  retryAfterSeconds,
  onRetry,
  className = "",
}: FormStatusProps) {
  if (status === "idle") return null;

  if (status === "offline") {
    return (
      <div
        role="status"
        aria-live="assertive"
        className={`w-full p-4 border border-white/15 bg-white/[0.02] flex items-center gap-3 text-white/80 text-[14px] ${className}`}
      >
        <IconAlertCircle size={18} className="text-[#93c5fd] shrink-0" />
        <p className="flex-1">
          You are currently offline. Check your network connection before dispatching.
        </p>
      </div>
    );
  }

  if (status === "rate_limit") {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className={`w-full p-4 border border-[var(--danger,#FF6B6B)]/40 bg-white/[0.02] flex items-start sm:items-center justify-between gap-4 text-[14px] ${className}`}
      >
        <div className="flex items-center gap-3 text-white/90">
          <IconClock size={18} className="text-[#93c5fd] shrink-0" />
          <p>
            {message || "Transmission rate limit reached."}{" "}
            {typeof retryAfterSeconds === "number" && (
              <span className="font-mono text-white/60">
                Please retry in {retryAfterSeconds}s.
              </span>
            )}
          </p>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="text-[13px] text-[#93c5fd] hover:underline underline-offset-4 shrink-0 cursor-pointer font-medium"
          >
            Retry Now
          </button>
        )}
      </div>
    );
  }

  if (status === "provider" || status === "network") {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className={`w-full p-4 border border-[var(--danger,#FF6B6B)]/40 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[14px] ${className}`}
      >
        <div className="flex items-start gap-3 text-white/90">
          <IconAlertCircle size={18} className="text-[var(--danger,#FF6B6B)] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            We couldn&apos;t send your message. Try again
            {supportEmail ? (
              <>
                , or email{" "}
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-[#93c5fd] underline underline-offset-4 hover:text-white"
                >
                  {supportEmail}
                </a>{" "}
                directly.
              </>
            ) : (
              "."
            )}
          </p>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 text-[13px] text-[#93c5fd] hover:underline underline-offset-4 self-end sm:self-auto shrink-0 cursor-pointer font-medium"
          >
            <IconRefresh size={14} />
            <span>Try again</span>
          </button>
        )}
      </div>
    );
  }

  if (status === "validation" && message) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className={`w-full p-4 border border-[var(--danger,#FF6B6B)]/40 bg-white/[0.02] flex items-center gap-3 text-[14px] text-[var(--danger,#FF6B6B)] ${className}`}
      >
        <IconAlertCircle size={18} className="shrink-0" />
        <p>{message}</p>
      </div>
    );
  }

  return null;
}
