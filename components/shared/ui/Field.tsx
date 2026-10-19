// Underline text/email/tel input field with floating label, error reservation, and focus transitions.
import React, { forwardRef } from "react";

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, id, error, required, helperText, className = "", ...props },
  ref
) {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className="w-full flex flex-col group">
      <div className="flex items-baseline justify-between mb-2">
        <label
          htmlFor={id}
          className={`text-[13px] uppercase tracking-[0.12em] font-medium transition-colors ${
            hasError ? "text-[var(--danger,#FF6B6B)]" : "text-white/55 group-focus-within:text-white"
          }`}
        >
          {label}
        </label>
        {required && (
          <span className="text-[13px] text-white/40 tracking-wider">
            Required
          </span>
        )}
      </div>

      <div className="relative">
        <input
          ref={ref}
          id={id}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
          className={`w-full bg-transparent text-[17px] text-white py-3 border-b transition-all duration-200 outline-none rounded-none placeholder:text-white/25 ${
            hasError
              ? "border-b-2 border-[var(--danger,#FF6B6B)]"
              : "border-white/20 focus:border-b-2 focus:border-[#93c5fd]"
          } ${className}`}
          {...props}
        />
      </div>

      {/* Reserved space for error or helper messages prevents layout jumping */}
      <div className="min-h-[22px] pt-1.5" aria-live="polite">
        {hasError ? (
          <p id={errorId} className="text-[14px] text-[var(--danger,#FF6B6B)] leading-tight">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-[13px] text-white/40 leading-tight">
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
});
