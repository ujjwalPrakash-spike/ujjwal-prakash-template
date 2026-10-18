"use client";

import React, { useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";

interface CopyButtonProps {
  value: string;
  label: string;
  className?: string;
}

export function CopyButton({ value, label, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={label}
        className={`p-2 rounded-md hover:bg-neutral-200/50 dark:hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-current ${className}`}
      >
        {copied ? (
          <IconCheck size={16} className="text-emerald-500" />
        ) : (
          <IconCopy size={16} className="opacity-60 hover:opacity-100" />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </>
  );
}
