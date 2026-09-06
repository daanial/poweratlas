"use client";

import { useId, useMemo, useState } from "react";
import { deJureScenarios, democraticSafeguardsByScenario } from "@/content/systems";
import { lerp } from "@/lib/visualization-utils";
import { ModuleTerms } from "@/components/ui/GlossaryChip";
import { WhyThisMatters } from "@/components/ui/WhyThisMatters";

export function DeJureDeFacto() {
  const [scenarioId, setScenarioId] = useState(deJureScenarios[0]!.id);
  const [practice, setPractice] = useState(0);
  const headingId = useId();
  const sliderId = useId();

  const scenario =
    deJureScenarios.find((s) => s.id === scenarioId) ?? deJureScenarios[0]!;

  const independence = useMemo(
    () => lerp(1, scenario.independenceAtPractice, practice),
    [practice, scenario.independenceAtPractice],
  );

  return (
    <section
      id="de-jure-de-facto"
      className="section-block"
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="mt-2 font-display text-3xl font-medium leading-tight md:text-5xl"
      >
        روی کاغذ و در عمل
      </h2>
      <p className="mt-2 text-sm text-[color:var(--muted)]" lang="en" dir="ltr">
        De jure vs de facto
      </p>
      <ModuleTerms
        termIds={[
          "judicial-review",
          "independent-oversight-body",
          "institutional-capture",
          "state-vs-public-media",
          "rule-of-law",
          "parliamentary-immunity",
        ]}
      />

      <div
        className="mt-8 flex flex-wrap gap-2"
        role="group"
        aria-label="سناریو"
      >
        {deJureScenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            className="opt-btn"
            aria-pressed={scenarioId === s.id}
            data-active={scenarioId === s.id ? "true" : "false"}
            onClick={() => {
              setScenarioId(s.id);
              setPractice(0);
            }}
          >
            {s.titleFa}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="border border-[color:var(--line)] rounded-xl bg-[rgba(255,255,255,0.4)] p-5">
          <p className="text-xs font-medium text-[color:var(--institution)]">
            روی کاغذ
          </p>
          <p className="mt-3 font-display text-xl leading-8">
            {scenario.paperClaimFa}
          </p>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-[color:var(--muted)]">
              <span>استقلال نهادی</span>
              <span lang="en" dir="ltr">
                {Math.round(independence * 100)}%
              </span>
            </div>
            <div
              className="h-3 w-full bg-[color:var(--line)]"
              role="img"
              aria-label={`استقلال ${Math.round(independence * 100)} درصد`}
            >
              <div
                className="h-full bg-[color:var(--institution)] transition-[width] duration-200 ease-out motion-reduce:transition-none"
                style={{ width: `${independence * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="border border-[color:var(--line)] rounded-xl border-s-[3px] border-s-[color:var(--power)] bg-[rgba(255,255,255,0.4)] p-5">
          <p className="text-xs font-medium text-[color:var(--power)]">
            در عمل
          </p>
          <ul className="mt-3 space-y-2">
            {scenario.practiceFactsFa.map((fact) => (
              <li
                key={fact}
                className="text-sm leading-7 text-[color:var(--ink-soft)]"
                style={{ opacity: 0.35 + practice * 0.65 }}
              >
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {democraticSafeguardsByScenario[scenario.id]?.length ? (
        <div className="result-card mt-8" data-tone="power">
          <span className="eyebrow">این را چگونه مهار می‌کنند؟</span>
          <span className="ms-2 text-sm text-[color:var(--muted)]">
            نمونهٔ مستند از دموکراسی‌های کارکرد
          </span>

          <div className="mt-5 space-y-5">
            {democraticSafeguardsByScenario[scenario.id]!.map((s) => (
              <div
                key={s.id}
                className="border-s border-[color:var(--line-strong)] ps-4"
              >
                <p className="font-display text-base font-medium">
                  <span className="me-1.5" aria-hidden>
                    {s.flag}
                  </span>
                  {s.countryFa}
                  <span
                    className="ms-2 text-sm font-normal opacity-55"
                    lang="en"
                    dir="ltr"
                  >
                    {s.countryEn}
                  </span>
                  <span className="ms-2 text-sm font-normal text-[color:var(--muted)]">
                    · {s.mechanismFa}
                  </span>
                </p>
                <p className="mt-2 text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
                  {s.detailFa}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-10 max-w-xl">
        <label
          htmlFor={sliderId}
          className="flex items-center justify-between text-sm"
        >
          <span>از کاغذ به عمل</span>
          <span className="text-xs text-[color:var(--muted)]" lang="en" dir="ltr">
            paper → practice
          </span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={practice}
          onChange={(e) => setPractice(Number(e.target.value))}
          className="mt-3 w-full accent-[color:var(--power)]"
        />
        <div className="mt-2 flex justify-between text-xs text-[color:var(--muted)]">
          <span>کاغذ</span>
          <span>عمل</span>
        </div>
      </div>

      <WhyThisMatters bodyFa="فاصلهٔ میان متن قانون و عملکرد واقعی همان چیزی است که توضیح می‌دهد چرا کشوری با قانون اساسیِ «آزادی بیان تضمین‌شده» می‌تواند در عمل رسانهٔ منتقد نداشته باشد." />
    </section>
  );
}
