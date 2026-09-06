"use client";

import { useMemo, useState } from "react";
import { JourneyContinue } from "@/components/layout/JourneyContinue";
import { PageShell } from "@/components/layout/PageShell";
import { GlossaryChip } from "@/components/ui/GlossaryChip";
import { ideologyTerms, mechanismTerms } from "@/content/glossary";
import type { GlossaryTerm } from "@/content/types";

function matches(term: GlossaryTerm, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    term.termFa.includes(query.trim()) ||
    term.termEn.toLowerCase().includes(q) ||
    term.shortDefFa.includes(query.trim())
  );
}

function TermList({ terms }: { terms: GlossaryTerm[] }) {
  if (terms.length === 0) {
    return (
      <p className="py-6 text-sm text-[color:var(--muted)]">موردی پیدا نشد.</p>
    );
  }
  return (
    <ul className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
      {terms.map((term) => (
        <li
          key={term.id}
          className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8"
        >
          <div>
            <GlossaryChip id={term.id} />
            <p
              className="mt-1 text-[0.7rem] tracking-wide opacity-55"
              lang="en"
              dir="ltr"
            >
              {term.termEn}
            </p>
          </div>
          <p className="text-sm leading-7 text-[color:var(--ink-soft)]">
            {term.shortDefFa}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function GlossaryPageClient() {
  const [query, setQuery] = useState("");
  const [showIdeology, setShowIdeology] = useState(false);

  const filteredMechanism = useMemo(
    () => mechanismTerms.filter((t) => matches(t, query)),
    [query],
  );
  const filteredIdeology = useMemo(
    () => ideologyTerms.filter((t) => matches(t, query)),
    [query],
  );

  const searching = query.trim().length > 0;

  return (
    <PageShell
      titleFa="واژه‌نامه"
      titleEn="Glossary"
      subtitleFa="اصطلاح‌هایی که در مسیر تجربه ظاهر می‌شوند؛ روی هر کدام بزن تا تعریف کوتاه باز شود."
    >
      <div className="max-w-md">
        <label htmlFor="glossary-search" className="sr-only">
          جست‌وجو در واژه‌نامه
        </label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جست‌وجو…"
          className="w-full border border-[color:var(--line-strong)] bg-transparent px-4 py-2.5 text-sm outline-none focus-visible:border-[color:var(--power)]"
          style={{ borderRadius: "var(--radius-md)" }}
        />
      </div>

      <section className="mt-8">
        <h2 className="font-display text-lg font-medium text-[color:var(--ink)]">
          اصطلاح‌های سازوکار
        </h2>
        <p className="mt-1 text-sm text-[color:var(--muted)]">
          همان‌هایی که در تجربه، اطلس و آزمایشگاه به کار می‌روند.
        </p>
        <div className="mt-4">
          <TermList terms={filteredMechanism} />
        </div>
      </section>

      <section className="mt-12">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 border-y border-[color:var(--line)] py-3 text-start"
          onClick={() => setShowIdeology((v) => !v)}
          aria-expanded={showIdeology || searching}
        >
          <span>
            <span className="font-display block text-lg font-medium text-[color:var(--ink)]">
              واژه‌نامهٔ اندیشهٔ سیاسی
            </span>
            <span className="mt-1 block text-sm text-[color:var(--muted)]">
              {ideologyTerms.length} مکتب و اصطلاح فکری، برای مرجع — نه بخشی از مسیر اصلی
            </span>
          </span>
          <span className="shrink-0 text-xs text-[color:var(--muted)]">
            {showIdeology || searching ? "بستن" : "نمایش"}
          </span>
        </button>
        {showIdeology || searching ? (
          <div className="mt-4">
            <TermList terms={filteredIdeology} />
          </div>
        ) : null}
      </section>

      <JourneyContinue currentHref="/glossary" />
    </PageShell>
  );
}
