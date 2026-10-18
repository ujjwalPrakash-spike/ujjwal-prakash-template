import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/features/navigation/Navbar";
import { Section } from "@/components/shared/layout/Section";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { PortraitGrid } from "@/components/directory/PortraitGrid";
import { RowList } from "@/components/directory/RowList";
import { ContactLinks } from "@/components/shared/ui/ContactLinks";
import { PAST_TEAMS } from "@/lib/coordinators/past-teams";

interface PageProps {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `Team ${year} | Students' Placement Office, IIT Kanpur`,
    description: `Placement Team of IIT Kanpur for the academic session ${year}.`,
  };
}

export function generateStaticParams() {
  return Object.keys(PAST_TEAMS).map((year) => ({ year }));
}

export default async function PastTeamPage({ params }: PageProps) {
  const { year } = await params;
  const members = PAST_TEAMS[year];

  if (!members) {
    notFound();
  }

  const withPhotos = members.filter((m) => Boolean(m.image && m.image.trim()));
  const withoutPhotos = members.filter((m) => !m.image || !m.image.trim());

  return (
    <main className="relative w-full bg-neutral-950 text-white selection:bg-[#93c5fd] selection:text-neutral-950">
      <Navbar tone="dark" variant="bar" />

      <Section surface="dark" className="pt-24 sm:pt-32">
        <div className="mb-6">
          <Link
            href="/placement-coordinators#previous-teams"
            className="text-[13px] uppercase tracking-wider text-white/50 hover:text-white transition-colors"
          >
            ← Back to Placement Coordinators
          </Link>
        </div>
        <ChapterHeader
          index={year}
          title={`Team ${year}`}
          count={`${members.length} members`}
          tone="dark"
        />

        {withPhotos.length > 0 ? (
          <div className="mb-20">
            <h3 className="text-[13px] uppercase tracking-[0.12em] text-white/50 mb-8">
              Core Leadership & Coordinators
            </h3>
            <PortraitGrid
              items={withPhotos}
              columns={4}
              tone="dark"
              getPortraitProps={(m) => ({
                name: m.name,
                photo: m.image,
                linkedin: m.linkedin,
                email: m.email,
                phone: m.phone,
              })}
            />
          </div>
        ) : null}

        {withoutPhotos.length > 0 ? (
          <div>
            <h3 className="text-[13px] uppercase tracking-[0.12em] text-white/50 mb-8">
              Team Members
            </h3>
            <RowList
              items={withoutPhotos}
              tone="dark"
              columns={[
                {
                  key: "index",
                  className: "md:col-span-1 font-mono text-sm text-white/40",
                  render: (_, idx) => String(idx + 1).padStart(2, "0"),
                },
                {
                  key: "name",
                  className: "md:col-span-4 font-medium text-lg text-white",
                  render: (m) => m.name,
                },
                {
                  key: "dept",
                  className: "md:col-span-3 text-[14px] text-white/50",
                  render: (m) => m.department || m.role || "Coordinator",
                },
                {
                  key: "contact",
                  className: "md:col-span-4",
                  render: (m) => (
                    <ContactLinks
                      name={m.name}
                      email={m.email}
                      phone={m.phone}
                      tone="dark"
                    />
                  ),
                },
              ]}
            />
          </div>
        ) : null}
      </Section>
    </main>
  );
}
