"use client";

import React from "react";
import { DirectoryProvider, useDirectory } from "@/components/directory/DirectoryProvider";
import { SearchInput } from "@/components/shared/ui/SearchInput";
import { StickyIndexBar } from "@/components/shared/layout/StickyIndexBar";
import { Section } from "@/components/shared/layout/Section";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { PortraitGrid } from "@/components/directory/PortraitGrid";
import { RowList } from "@/components/directory/RowList";
import { GroupedList } from "@/components/directory/GroupedList";
import { IndexList } from "@/components/directory/IndexList";
import { EmptyResults } from "@/components/directory/EmptyResults";
import { ContactLinks } from "@/components/shared/ui/ContactLinks";
import { formatPhone, phoneHref } from "@/lib/utils/format";
import { COORDINATOR_SECTIONS } from "@/lib/coordinators/sections";
import { OVERALL_COORDINATORS } from "@/lib/coordinators/overall";
import { ASSISTANT_COORDINATORS } from "@/lib/coordinators/assistants";
import { DEPARTMENT_COORDINATORS } from "@/lib/coordinators/departments";
import { WEB_LEADS, WEB_EXECUTIVES } from "@/lib/coordinators/web-team";
import { PREVIOUS_TEAMS } from "@/lib/coordinators/previous-teams";
import { getPersonSearchText, type Person } from "@/lib/coordinators/types";

const ALL_PEOPLE: Person[] = [
  ...OVERALL_COORDINATORS,
  ...ASSISTANT_COORDINATORS,
  ...DEPARTMENT_COORDINATORS,
  ...WEB_LEADS,
  ...WEB_EXECUTIVES,
];

function CoordinatorsSections() {
  const { query, setQuery, filterList, resultCount, isSearching } = useDirectory<Person>();

  const overall = filterList(OVERALL_COORDINATORS);
  const assistants = filterList(ASSISTANT_COORDINATORS);
  const departments = filterList(DEPARTMENT_COORDINATORS);
  const webLeads = filterList(WEB_LEADS);
  const webExecs = filterList(WEB_EXECUTIVES);

  const indexItems = COORDINATOR_SECTIONS.map((sec) => ({
    id: sec.id,
    label: sec.title.replace(" Placement Coordinators", "").replace(" Coordinators", ""),
  }));

  const hasAnyMatches =
    overall.length > 0 ||
    assistants.length > 0 ||
    departments.length > 0 ||
    webLeads.length > 0 ||
    webExecs.length > 0;

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

      <div id="directory-results">
        {isSearching && !hasAnyMatches ? (
          <Section surface="dark">
            <EmptyResults
              message={`No coordinators matching "${query}"`}
              onClear={() => setQuery("")}
            />
          </Section>
        ) : null}

        {/* 01. Overall Placement Coordinators */}
        <Section id="overall" surface="light">
          <ChapterHeader
            index="01"
            title="Overall Placement Coordinators"
            count={`${overall.length} people`}
            tone="light"
          />
          {overall.length > 0 ? (
            <PortraitGrid
              items={overall}
              columns={4}
              tone="light"
              getPortraitProps={(p) => ({
                name: p.name,
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

        {/* 02. Assistant Coordinators */}
        <Section id="assistants" surface="dark">
          <ChapterHeader
            index="02"
            title="Assistant Coordinators"
            count={`${assistants.length} people`}
            tone="dark"
          />
          {assistants.length > 0 ? (
            <RowList
              items={assistants}
              tone="dark"
              columns={[
                {
                  key: "index",
                  className: "md:col-span-1 font-mono text-sm text-white/40",
                  render: (_, idx) => String(idx + 1).padStart(2, "0"),
                },
                {
                  key: "name",
                  className: "md:col-span-4 font-medium text-lg text-white group-hover:translate-x-2 transition-transform duration-200",
                  render: (p) => p.name,
                },
                {
                  key: "email",
                  className: "md:col-span-4 text-[15px] text-white/70",
                  render: (p) => (
                    <ContactLinks name={p.name} email={p.email} tone="dark" />
                  ),
                },
                {
                  key: "phone",
                  className: "md:col-span-3 text-[15px] text-white/70",
                  render: (p) => (
                    <a href={phoneHref(p.phone)} className="hover:underline">
                      {formatPhone(p.phone)}
                    </a>
                  ),
                },
              ]}
            />
          ) : (
            <EmptyResults message="No match in this section." />
          )}
        </Section>

        {/* 03. Department Placement Coordinators */}
        <Section id="departments" surface="light">
          <ChapterHeader
            index="03"
            title="Department Placement Coordinators"
            count={`${departments.length} people`}
            tone="light"
          />
          {departments.length > 0 ? (
            <GroupedList
              items={departments}
              getGroup={(p) => p.department || "Other"}
              tone="light"
              renderItem={(p) => (
                <div className="flex flex-col gap-1.5 py-2">
                  <h4 className="font-medium text-lg text-neutral-950 tracking-tight">
                    {p.name}
                  </h4>
                  <ContactLinks
                    name={p.name}
                    email={p.email}
                    phone={p.phone}
                    tone="light"
                  />
                </div>
              )}
            />
          ) : (
            <EmptyResults message="No match in this section." />
          )}
        </Section>

        {/* 04. Web Team */}
        <Section id="web-team" surface="dark">
          <ChapterHeader
            index="04"
            title="Web Team"
            count={`${webLeads.length + webExecs.length} people`}
            tone="dark"
          />
          {webLeads.length > 0 ? (
            <div className="mb-16">
              <PortraitGrid
                items={webLeads}
                columns={2}
                tone="dark"
                getPortraitProps={(p) => ({
                  name: p.name,
                  photo: p.photo,
                  linkedin: p.linkedin,
                  email: p.email,
                  phone: p.phone,
                })}
              />
            </div>
          ) : null}

          {webExecs.length > 0 ? (
            <div>
              <h3 className="text-[13px] uppercase tracking-[0.12em] text-white/50 mb-6">
                Web Executives
              </h3>
              <RowList
                items={webExecs}
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
                    render: (p) => p.name,
                  },
                  {
                    key: "role",
                    className: "md:col-span-3 text-[14px] text-white/50 uppercase tracking-wider",
                    render: (p) => p.role || "Web Executive",
                  },
                  {
                    key: "contact",
                    className: "md:col-span-4",
                    render: (p) => (
                      <ContactLinks
                        name={p.name}
                        email={p.email}
                        phone={p.phone}
                        tone="dark"
                      />
                    ),
                  },
                ]}
              />
            </div>
          ) : null}
          {webLeads.length === 0 && webExecs.length === 0 ? (
            <EmptyResults message="No match in this section." />
          ) : null}
        </Section>

        {/* 05. Previous Teams */}
        <Section id="previous-teams" surface="light">
          <ChapterHeader
            index="05"
            title="Previous Teams"
            count={`${PREVIOUS_TEAMS.length} editions`}
            tone="light"
          />
          <IndexList items={PREVIOUS_TEAMS} tone="light" />
        </Section>
      </div>
    </>
  );
}

export function CoordinatorsPage() {
  return (
    <DirectoryProvider items={ALL_PEOPLE} getSearchText={getPersonSearchText}>
      <CoordinatorsSections />
    </DirectoryProvider>
  );
}
