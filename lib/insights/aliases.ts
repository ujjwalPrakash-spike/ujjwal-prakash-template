// Optional company alias map (canonical, aliases[]).
// Ships empty by default per design specification.

export interface CompanyAlias {
  canonical: string;
  aliases: string[];
}

export const COMPANY_ALIASES: CompanyAlias[] = [];

export function getCanonicalCompanyName(name: string): string {
  const match = COMPANY_ALIASES.find(
    (a) =>
      a.canonical.toLowerCase() === name.toLowerCase() ||
      a.aliases.some((alias) => alias.toLowerCase() === name.toLowerCase())
  );
  return match ? match.canonical : name;
}
