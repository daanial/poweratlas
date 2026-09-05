"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ruleCategories } from "@/content/systems";
import type { RuleCategoryId } from "@/content/types";
import { WhatIf } from "@/components/ui/WhatIf";
import { ModuleTerms } from "@/components/ui/GlossaryChip";
import { WhyThisMatters } from "@/components/ui/WhyThisMatters";

export function WhoRules() {
  const [selected, setSelected] = useState<RuleCategoryId | null>(null);
  const [cols, setCols] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const active = ruleCategories.find((c) => c.id === selected) ?? null;
  const activeIndex = ruleCategories.findIndex((c) => c.id === selected);

  /* Column count comes from the resolved grid, so the breakpoints stay in one place. */
  const measureCols = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    setCols(
      getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean)
        .length || 1,
    );
  }, []);

  useEffect(() => {
    measureCols();
    window.addEventListener("resize", measureCols);
    return () => window.removeEventListener("resize", measureCols);
  }, [measureCols]);

  /* Panel opens under the clicked row; nudge it into view only if it is cut off. */
  const openPanel = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({
      block: "nearest",
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  useEffect(() => {
    if (active) openPanel();
  }, [active, openPanel]);

  // Panel sits between the last card of the clicked row and the first of the next.
  const panelOrder =
    activeIndex >= 0 ? (Math.floor(activeIndex / cols) + 1) * cols * 2 - 1 : 0;

  return (
    <section
      id="who-rules"
      className="section-block"
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="mt-2 font-display text-3xl font-medium leading-tight md:text-5xl"
      >
        چه کسی حکومت می‌کند؟
      </h2>
      <p className="mt-2 text-sm text-[color:var(--muted)]" lang="en" dir="ltr">
        Who rules?
      </p>
      <p className="mt-4 max-w-xl text-sm leading-7 text-[color:var(--ink-soft)] md:text-base">
        دسته‌ها رقیب نیستند. در یک کشور واقعی اغلب چند لایه هم‌زمان دیده می‌شود.
      </p>
      <ModuleTerms
        termIds={[
          "legitimacy",
          "intra-party-competition",
          "civilian-control",
          "competitive-authoritarianism",
          "democratic-backsliding",
        ]}
      />

      <div
        ref={gridRef}
        className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        role="listbox"
        aria-label="دسته‌های حکومت"
      >
        {ruleCategories.map((cat, i) => {
          const isOn = selected === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="option"
              aria-selected={isOn}
              data-active={isOn ? "true" : "false"}
              className="opt-btn group flex-col items-center text-center"
              style={{ order: i * 2 }}
              onClick={() => {
                measureCols();
                setSelected(isOn ? null : cat.id);
              }}
            >
              <Image
                src={`/icons/rule-categories/${cat.id}.png`}
                alt=""
                width={240}
                height={240}
                sizes="240px"
                className="mx-auto block h-auto w-full max-w-[240px]"
              />
              <span className="mt-2 block font-display text-2xl font-medium leading-none md:text-3xl">
                {cat.titleFa}
              </span>
              <span
                className="mt-2 block text-[0.7rem] tracking-wide opacity-55"
                lang="en"
                dir="ltr"
              >
                {cat.titleEn}
              </span>
            </button>
          );
        })}

        {active ? (
          <div
            ref={panelRef}
            className="category-detail col-span-full"
            style={{ order: panelOrder }}
            role="region"
            aria-label={`توضیح دستهٔ ${active.titleFa}`}
          >
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-xl font-medium md:text-2xl">
                {active.titleFa}
                <span
                  className="ms-2 text-xs font-normal tracking-wide opacity-55"
                  lang="en"
                  dir="ltr"
                >
                  {active.titleEn}
                </span>
              </p>
              <button
                type="button"
                className="text-xs text-[color:var(--muted)] underline-offset-2 hover:underline"
                onClick={() => setSelected(null)}
              >
                بستن
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-[color:var(--power)]">
                  این انتخاب به این سوال پاسخ می‌دهد که:
                </p>
                <p className="mt-2 font-display text-lg leading-8 md:text-xl">
                  {active.questionAnsweredFa}
                </p>
                <p className="mt-3 text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
                  {active.shortFa}
                </p>
              </div>
              <div className="border-t border-[color:var(--line)] pt-6 md:border-t-0 md:border-s md:ps-6 md:pt-0">
                <p className="text-xs font-medium text-[color:var(--institution)]">
                  اما به این سوال پاسخ نمی‌دهد که:
                </p>
                <p className="mt-2 font-display text-lg leading-8 md:text-xl">
                  {active.questionNotAnsweredFa}
                </p>
                <p className="mt-3 text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
                  {active.combineNoteFa}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {active ? null : (
        <p className="mt-6 text-[0.95rem] text-[color:var(--muted)]">
          روی یک دسته بزنید تا ببینید چه چیزی روشن می‌شود و چه چیزی هنوز مبهم
          می‌ماند.
        </p>
      )}

      <WhatIf
        className="mt-8"
        titleFa="اگر چند دسته با هم باشند؟"
        bodyFa="ترکیب عادی است: انتخابات مردمی کنار نفوذ نظامی، یا پادشاهی کنار حزب غالب. سؤال درست «کدام یکی؟» نیست؛ «چگونه هم‌زیستی می‌کنند؟» است."
      />
      <WhyThisMatters bodyFa="وقتی می‌پرسید «واقعاً چه کسی حکومت می‌کند؟»، همان سؤالی است که در بحث دربارهٔ اینکه آیا فلان کشور را رئیس‌جمهورش اداره می‌کند یا حلقهٔ نزدیکان و مشاورانش، هرروز در اخبار تکرار می‌شود." />
    </section>
  );
}
