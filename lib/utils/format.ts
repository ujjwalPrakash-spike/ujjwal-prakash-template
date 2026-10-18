// Pure formatting and normalisation functions for contact and insights data.

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const national = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  if (national.length === 10) {
    return `+91 ${national.slice(0, 5)} ${national.slice(5)}`;
  }
  return phone;
}

export function phoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const national = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  return `tel:+91${national}`;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function isPdf(href: string): boolean {
  if (!href) return false;
  return href.toLowerCase().endsWith(".pdf") || href.toLowerCase().includes(".pdf");
}

export function sourceTag(entry: { kind: "article" | "drive"; href?: string }): "Article" | "Drive" | "Link" {
  if (entry.kind === "article") return "Article";
  if (entry.href && entry.href.includes("drive.google.com")) return "Drive";
  return "Link";
}

export function calcReadTime(wordCount: number): string {
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
