"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { journeyCopy, journeySteps } from "@/content/journey";
import { openingCopy, site } from "@/content/opening";
import {
  type ExperiencePath,
  VISIT_KEYS,
  readVisitFlag,
} from "@/lib/visit-flags";

export function OpeningContinue() {
  const [path, setPath] = useState<ExperiencePath | null>(null);

  useEffect(() => {
    const stored = readVisitFlag(VISIT_KEYS.experiencePath);
    if (stored === "short" || stored === "full") setPath(stored);
  }, []);

  const returning = path !== null;

  return (
    <section
      id="journey"
      className="theme-paper scroll-mt-0 border-t border-[color:var(--line)] px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-display text-xl font-medium md:text-2xl">
          {journeyCopy.overviewTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-7 text-[color:var(--ink-soft)]">
          {journeyCopy.overviewLead}
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {journeySteps.map((step, index) => (
            <li key={step.href}>
              <Link
                href={step.href}
                className="journey-tile block h-full no-underline"
              >
                <p className="text-[0.65rem] text-[color:var(--muted)]">
                  {index + 1} از {journeySteps.length}
                  {step.minutesFa ? (
                    <>
                      <span className="mx-1.5 opacity-40">·</span>
                      {step.minutesFa}
                    </>
                  ) : null}
                </p>
                <p className="mt-2 font-display text-lg font-medium">
                  {step.labelFa}
                </p>
                <p
                  className="mt-0.5 text-[0.65rem] tracking-wide opacity-55"
                  lang="en"
                  dir="ltr"
                >
                  {step.labelEn}
                </p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--ink-soft)]">
                  {step.descFa}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-center font-display text-2xl font-medium leading-relaxed md:text-3xl">
          بیایید ببینیم.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-7 text-[color:var(--muted)] md:text-base">
          قدرت وقتی خطرناک می‌شود که هیچ‌کس نتواند آن را متوقف کند. اما چه کسی
          باید بتواند آن را متوقف کند؟
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link href="/experience" className="cta-primary text-center">
            {returning ? journeyCopy.continueCta : journeyCopy.startCta}
          </Link>
          <Link href="/atlas" className="cta-secondary text-center">
            {journeyCopy.atlasCta}
          </Link>
        </div>
        {returning ? (
          <p className="mt-3 text-center text-xs text-[color:var(--muted)]">
            {path === "full"
              ? journeyCopy.continueHintFull
              : journeyCopy.continueHintShort}
          </p>
        ) : null}

        <div className="mt-12">
          <div className="journey-tile">
            <p className="text-[0.65rem] text-[color:var(--muted)]">مرجع</p>
            <p className="mt-2 font-display text-lg font-medium">
              {journeyCopy.referenceTitle}
            </p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--ink-soft)]">
              {journeyCopy.referenceDesc}
            </p>
            <p className="mt-4 flex flex-wrap gap-4 text-sm">
              <Link href="/about" className="underline-offset-2 hover:underline">
                درباره
              </Link>
              <Link
                href="/glossary"
                className="underline-offset-2 hover:underline"
              >
                واژه‌نامه
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-[color:var(--muted)]">
          {site.titleFa}
          <span className="mx-2 opacity-40">·</span>
          <span lang="en" dir="ltr">
            {site.titleEn}
          </span>
        </p>
        <p className="mt-2 text-center text-xs text-[color:var(--muted)]">
          {openingCopy.diagramIntro}
        </p>
      </div>
    </section>
  );
}
