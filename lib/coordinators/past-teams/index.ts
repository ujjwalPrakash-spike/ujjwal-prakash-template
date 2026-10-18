import pastTeamsData from "./past-teams.json";

export interface PastTeamMember {
  name: string;
  email: string;
  phone: string;
  image?: string;
  role?: string;
  department?: string;
  linkedin?: string;
}

export const PAST_TEAMS: Record<string, PastTeamMember[]> = pastTeamsData as Record<
  string,
  PastTeamMember[]
>;
