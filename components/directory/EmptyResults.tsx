import React from "react";

interface EmptyResultsProps {
  message?: string;
  query?: string;
  onClear?: () => void;
  className?: string;
}

export function EmptyResults({
  message,
  query,
  onClear,
  className = "",
}: EmptyResultsProps) {
  const displayMessage =
    message ?? (query ? `No matches found for "${query}".` : "No matches found.");

  return (
    <div className={`py-12 text-center flex flex-col items-center gap-3 ${className}`}>
      <p className="text-white/60 dark:text-white/60 text-neutral-950/60 text-[15px]">
        {displayMessage}
      </p>
      {onClear ? (
        <button
          type="button"
          onClick={onClear}
          className="text-xs uppercase tracking-wider font-semibold text-[#93c5fd] hover:underline"
        >
          Clear search
        </button>
      ) : null}
    </div>
  );
}
