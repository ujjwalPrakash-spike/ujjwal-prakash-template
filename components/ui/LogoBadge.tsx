// Official SPO brand logo badge component with transparent floating styling.

import Link from "next/link";
import Image from "next/image";

interface LogoBadgeProps {
  className?: string;
  onClick?: () => void;
  imageClassName?: string;
  size?: "default" | "hero" | "footer" | "bar" | "bar-scrolled";
}

export function LogoBadge({
  className = "",
  onClick,
  imageClassName,
  size = "default",
}: LogoBadgeProps) {
  const imgClass =
    imageClassName ??
    (size === "bar"
      ? "h-8 w-auto object-contain brightness-0 invert"
      : size === "bar-scrolled"
      ? "h-7 w-auto object-contain brightness-0 invert"
      : size === "hero"
      ? "h-[clamp(52px,8.5vh,88px)] w-auto object-contain drop-shadow-xl"
      : size === "footer"
      ? "h-8 max-h-[32px] w-auto object-contain brightness-0 invert"
      : "h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain drop-shadow-xl");

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`inline-flex items-center justify-center bg-transparent p-0 hover:opacity-85 transition-opacity ${className}`}
      aria-label="SPO Home"
    >
      <Image
        src="/images/logo.png"
        alt="SPO IIT Kanpur Logo"
        width={500}
        height={500}
        priority
        className={imgClass}
      />
    </Link>
  );
}

export default LogoBadge;
