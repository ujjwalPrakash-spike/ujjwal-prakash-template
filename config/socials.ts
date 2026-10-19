// Typed social platforms, handles, URLs, and Tabler icons.
import {
  IconBrandInstagram,
  IconBrandX,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandTiktok,
  IconBrandLinkedin,
  IconBrandThreads,
  IconBrandDiscord,
  IconBrandWhatsapp,
  IconBrandTwitch,
  IconBrandPinterest,
  IconBrandSpotify,
  type TablerIcon,
} from "@tabler/icons-react";

export type SocialPlatform =
  | "instagram"
  | "x"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "linkedin"
  | "threads"
  | "discord"
  | "whatsapp"
  | "twitch"
  | "pinterest"
  | "spotify";

export interface SocialItem {
  platform: SocialPlatform;
  label: string;
  handle: string;
  href: string; // Empty href hides the entry
  icon?: TablerIcon;
}

export const SOCIAL_LINKS: SocialItem[] = [
  {
    platform: "instagram",
    label: "Instagram",
    handle: "@apex.works",
    href: "https://instagram.com/apexworks",
    icon: IconBrandInstagram,
  },
  {
    platform: "x",
    label: "X (Twitter)",
    handle: "@apexworks",
    href: "https://x.com/apexworks",
    icon: IconBrandX,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    handle: "apex-works",
    href: "https://linkedin.com/company/apex-works",
    icon: IconBrandLinkedin,
  },
  {
    platform: "youtube",
    label: "YouTube",
    handle: "@apexworks-atelier",
    href: "https://youtube.com/@apexworks",
    icon: IconBrandYoutube,
  },
  {
    platform: "threads",
    label: "Threads",
    handle: "@apex.works",
    href: "https://threads.net/@apex.works",
    icon: IconBrandThreads,
  },
  {
    platform: "discord",
    label: "Discord Community",
    handle: "discord.gg/apexworks",
    href: "https://discord.gg/apexworks",
    icon: IconBrandDiscord,
  },
  {
    platform: "tiktok",
    label: "TikTok",
    handle: "@apexworks",
    href: "", // Hidden when href is empty
    icon: IconBrandTiktok,
  },
  {
    platform: "facebook",
    label: "Facebook",
    handle: "apexworks",
    href: "", // Hidden when href is empty
    icon: IconBrandFacebook,
  },
  {
    platform: "whatsapp",
    label: "WhatsApp Concierge",
    handle: "+44 20 7946 0912",
    href: "", // Hidden when href is empty
    icon: IconBrandWhatsapp,
  },
  {
    platform: "twitch",
    label: "Twitch",
    handle: "apexworks",
    href: "", // Hidden when href is empty
    icon: IconBrandTwitch,
  },
  {
    platform: "pinterest",
    label: "Pinterest",
    handle: "apexworks",
    href: "", // Hidden when href is empty
    icon: IconBrandPinterest,
  },
  {
    platform: "spotify",
    label: "Spotify Radio",
    handle: "apex-frequencies",
    href: "", // Hidden when href is empty
    icon: IconBrandSpotify,
  },
];
