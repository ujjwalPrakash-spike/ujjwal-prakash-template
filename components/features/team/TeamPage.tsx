"use client";

import React from "react";
import { DirectoryProvider, useDirectory } from "@/components/directory/DirectoryProvider";
import { SearchInput } from "@/components/shared/ui/SearchInput";
import { StickyIndexBar } from "@/components/shared/layout/StickyIndexBar";
import { Section } from "@/components/shared/layout/Section";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { PortraitGrid } from "@/components/directory/PortraitGrid";
import { RowList } from "@/components/directory/RowList";
import { EmptyResults } from "@/components/directory/EmptyResults";
import { ContactLinks } from "@/components/shared/ui/ContactLinks";
import {
  PRINCIPALS,
  RACE_ENGINEERS,
  CREATIVE_ATELIER,
  ALL_TEAM_MEMBERS,
  getTeamSearchText,
  type TeamMember,
} from "@/lib/team/members";
import { TEAM_SECTIONS } from "@/lib/team/sections";

function TeamDirectorySections() {
  const { query, setQuery, filterList, resultCount, isSearching } = useDirectory<TeamMember>();

  const principals = filterList(PRINCIPALS);
  const engineers = filterList(RACE_ENGINEERS);
  const creative = filterList(CREATIVE_ATELIER);

  const indexItems = TEAM_SECTIONS.map((sec) => ({
    id: sec.id,
    label: sec.title,
  }));

  const hasAnyMatches = principals.length > 0 || engineers.length > 0 || creative.length > 0;

  return (
    <>
      <StickyIndexBar
        items={indexItems}
        trailing={
          <SearchInput
            value={query}
            onChange={setQuery}
            resultCount={resultCount}
          />
        }
      />

      <div id="team-directory-results">
        {isSearching && !hasAnyMatches ? (
          <Section surface="dark">
            <EmptyResults
              message={`No team members matching "${query}"`}
              onClear={() => setQuery("")}
            />
          </Section>
        ) : null}

        {/* 01. Principals & Directors */}
        <Section id="principals" surface="light">
          <ChapterHeader
            index="01"
            title="Principals & Directorate"
            count={`${principals.length} directors`}
            tone="light"
          />
          {principals.length > 0 ? (
            <PortraitGrid
              items={principals}
              columns={4}
              tone="light"
              getPortraitProps={(p) => ({
                name: p.name,
                role: p.role,
                department: p.department,
                photo: p.photo,
                linkedin: p.linkedin,
                email: p.email,
                phone: p.phone,
              })}
            />
          ) : (
            <EmptyResults message="No match in this section." />
          )}
        </Section>

        {/* 02. Engineering & Aerodynamics */}
        <Section id="engineering" surface="dark">
          <ChapterHeader
            index="02"
            title="Engineering & Aerodynamics"
            count={`${engineers.length} specialists`}
            tone="dark"
          />
          {engineers.length > 0 ? (
            <RowList
              items={engineers}
              tone="dark"
              columns={[
                {
                  key: "index",
                  className: "md:col-span-1 font-mono text-sm text-white/40",
                  render: (_, idx) => String(idx + 1).padStart(2, "0"),
                },
                {
                  key: "name",
                  className: "md:col-span-3 font-medium text-white",
                  render: (m) => (
                    <div>
                      <span className="block text-base">{m.name}</span>
                      <span className="block text-xs font-mono text-white/50">{m.role}</span>
                    </div>
                  ),
                },
                {
                  key: "department",
                  className: "md:col-span-4 text-sm text-white/70",
                  render: (m) => m.department ?? "Engineering",
                },
                {
                  key: "contacts",
                  className: "md:col-span-4 flex justify-end",
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
          ) : (
            <EmptyResults message="No match in this section." />
          )}
        </Section>

        {/* 03. Creative & Brand Atelier */}
        <Section id="creative" surface="light">
          <ChapterHeader
            index="03"
            title="Creative & Brand Atelier"
            count={`${creative.length} designers`}
            tone="light"
          />
          {creative.length > 0 ? (
            <RowList
              items={creative}
              tone="light"
              columns={[
                {
                  key: "index",
                  className: "md:col-span-1 font-mono text-sm text-neutral-400",
                  render: (_, idx) => String(idx + 1).padStart(2, "0"),
                },
                {
                  key: "name",
                  className: "md:col-span-3 font-medium text-neutral-950",
                  render: (m) => (
                    <div>
                      <span className="block text-base">{m.name}</span>
                      <span className="block text-xs font-mono text-neutral-500">{m.role}</span>
                    </div>
                  ),
                },
                {
                  key: "department",
                  className: "md:col-span-4 text-sm text-neutral-600",
                  render: (m) => m.department ?? "Design",
                },
                {
                  key: "contacts",
                  className: "md:col-span-4 flex justify-end",
                  render: (m) => (
                    <ContactLinks
                      name={m.name}
                      email={m.email}
                      phone={m.phone}
                      tone="light"
                    />
                  ),
                },
              ]}
            />
          ) : (
            <EmptyResults message="No match in this section." />
          )}
        </Section>
      </div>
    </>
  );
}

export function TeamPage() {
  return (
    <DirectoryProvider items={ALL_TEAM_MEMBERS} getSearchText={getTeamSearchText}>
      <TeamDirectorySections />
    </DirectoryProvider>
  );
}

export default TeamPage;
