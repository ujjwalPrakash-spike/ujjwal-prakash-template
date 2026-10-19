// Underline auto-growing textarea primitive with character counter and reserved error state.
import React, { forwardRef, useEffect, useRef, useImperativeHandle, useCallback } from "react";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  charCount?: number;
  maxChars?: number;
  minRows?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      id,
      error,
      required,
      charCount,
      maxChars = 4000,
      minRows = 5,
      className = "",
      onChange,
      ...props
    },
    ref
  ) {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement);

    const hasError = Boolean(error);
    const errorId = `${id}-error`;

    // Auto-grow textarea on content modification
    const autoGrow = useCallback(() => {
      const el = internalRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${Math.max(el.scrollHeight, minRows * 24)}px`;
    }, [minRows]);

    useEffect(() => {
      autoGrow();
    }, [props.value, autoGrow]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      autoGrow();
      onChange?.(e);
    };

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
          <div className="flex items-center gap-3">
            {typeof charCount === "number" && (
              <span className="font-mono text-[12px] text-white/40 tracking-wider">
                {charCount}/{maxChars}
              </span>
            )}
            {required && (
              <span className="text-[13px] text-white/40 tracking-wider">
                Required
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <textarea
            ref={internalRef}
            id={id}
            rows={minRows}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            onChange={handleChange}
            className={`w-full bg-transparent text-[17px] text-white py-3 border-b transition-all duration-200 outline-none resize-none rounded-none placeholder:text-white/25 leading-relaxed ${
              hasError
                ? "border-b-2 border-[var(--danger,#FF6B6B)]"
                : "border-white/20 focus:border-b-2 focus:border-[#93c5fd]"
            } ${className}`}
            {...props}
          />
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
  }
);
