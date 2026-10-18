export interface Person {
  name: string;
  email: string;
  phone: string;
  department?: string;
  role?: string;
  photo?: string;
  linkedin?: string;
}

export function getPersonSearchText(p: Person): string {
  return `${p.name} ${p.email} ${p.department || ""} ${p.role || ""}`;
}
