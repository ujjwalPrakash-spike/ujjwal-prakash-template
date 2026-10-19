// Accessible checkbox input primitive with consent link integration and reserved error space.
import React, { forwardRef } from "react";
import { IconCheck } from "@tabler/icons-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  label: React.ReactNode;
  error?: string;
  required?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { id, label, error, required, className = "", checked, onChange, ...props },
    ref
  ) {
    const hasError = Boolean(error);
    const errorId = `${id}-error`;

    return (
      <div className={`w-full flex flex-col group ${className}`}>
        <label
          htmlFor={id}
          className="flex items-start gap-3.5 cursor-pointer select-none text-left"
        >
          <div className="relative mt-1 shrink-0">
            <input
              ref={ref}
              type="checkbox"
              id={id}
              checked={checked}
              onChange={onChange}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
              className="peer sr-only"
              {...props}
            />
            {/* Custom box border */}
            <div
              className={`w-5 h-5 rounded-[4px] border flex items-center justify-center transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-[#93c5fd] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-neutral-950 ${
                hasError
                  ? "border-[var(--danger,#FF6B6B)] bg-transparent"
                  : checked
                  ? "border-white bg-white text-neutral-950"
                  : "border-white/30 bg-transparent group-hover:border-white/60"
              }`}
            >
              {checked && <IconCheck size={14} stroke={2.5} />}
            </div>
          </div>

          <div className="text-[14px] leading-relaxed text-white/70 group-hover:text-white/90 transition-colors">
            {label}
            {required && (
              <span className="text-[12px] text-white/40 ml-2 tracking-wider">
                (Required)
              </span>
            )}
          </div>
        </label>

        {/* Reserved error space */}
        <div className="min-h-[22px] pt-1 pl-8" aria-live="polite">
          {hasError && (
            <p id={errorId} className="text-[14px] text-[var(--danger,#FF6B6B)] leading-tight">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);
