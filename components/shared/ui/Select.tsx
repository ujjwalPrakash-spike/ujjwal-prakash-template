// Styled native select dropdown primitive with underline styling and accessible error states.
import React, { forwardRef } from "react";
import { IconChevronDown } from "@tabler/icons-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    id,
    options,
    error,
    required,
    placeholder = "Select an option",
    className = "",
    ...props
  },
  ref
) {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;

  return (
    <div className="w-full flex flex-col group">
      <div className="flex items-baseline justify-between mb-2">
        <label
          htmlFor={id}
          className={`text-[13px] uppercase tracking-[0.12em] font-medium transition-colors ${
            hasError
              ? "text-[var(--danger,#FF6B6B)]"
              : "text-white/55 group-focus-within:text-white"
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
        <select
          ref={ref}
          id={id}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={`w-full bg-transparent text-[17px] text-white py-3 pr-10 border-b transition-all duration-200 outline-none appearance-none rounded-none cursor-pointer ${
            hasError
              ? "border-b-2 border-[var(--danger,#FF6B6B)]"
              : "border-white/20 focus:border-b-2 focus:border-[#93c5fd]"
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-neutral-900 text-white/40">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-neutral-900 text-white py-2"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-[#93c5fd]">
          <IconChevronDown size={18} stroke={1.5} />
        </div>
      </div>

      {/* Reserved error space */}
      <div className="min-h-[22px] pt-1.5" aria-live="polite">
        {hasError && (
          <p id={errorId} className="text-[14px] text-[var(--danger,#FF6B6B)] leading-tight">
            {error}
          </p>
        )}
      </div>
    </div>
  );
});
