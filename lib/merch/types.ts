// Type definitions for the /merch editorial lookbook and catalogue.

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: "apparel" | "gear" | "limited";
  image?: string;
  hoverImage?: string;
  colors?: ProductColor[];
  sizes?: string[];
  description: string;
  details: string[];
  badge?: string;
  available: boolean;
  href?: string;
  specs?: ProductSpec[];
  shipping?: string;
  care?: string;
  featured?: boolean;
}

export interface MerchConfig {
  eyebrow: string;
  title: string;
  lead: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  contactLink: string;
  closingHeading: string;
  closingActionText: string;
}

export interface MerchDetailColumn {
  index: string;
  title: string;
  body: string;
}
