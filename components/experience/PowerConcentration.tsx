"use client";

import { useId, useMemo, useState } from "react";
import { computeConcentrationWeights } from "@/lib/political-model";
import { ModuleTerms } from "@/components/ui/GlossaryChip";
import { WhyThisMatters } from "@/components/ui/WhyThisMatters";

const SPHERES = [
  { id: "people", labelFa: "مردم", cx: 22, cy: 48, fill: "var(--power)" },
  {
    id: "parliament",
    labelFa: "پارلمان",
    cx: 42,
    cy: 28,
    fill: "var(--institution)",
  },
  {
    id: "government",
    labelFa: "دولت",
    cx: 62,
    cy: 42,
    fill: "var(--ink-soft)",
  },
  { id: "president", labelFa: "ریاست", cx: 78, cy: 28, fill: "var(--power)" },
  { id: "courts", labelFa: "دادگاه", cx: 48, cy: 72, fill: "var(--law)" },
  {
    id: "media",
    labelFa: "رسانه",
    cx: 28,
    cy: 78,
    fill: "var(--institution-soft)",
  },
] as const;

export function PowerConcentration() {
  const [concentration, setConcentration] = useState(0.45);
  const headingId = useId();
  const sliderId = useId();
  const weights = useMemo(
    () => computeConcentrationWeights(concentration),
    [concentration],
  );

  const closing =
    concentration >= 0.65
      ? "قدرت متمرکز است: تصمیم سریع‌تر، هزینهٔ اشتباه در رأس بالاتر."
      : concentration <= 0.35
        ? "قدرت مقید است: چند نقطه می‌توانند مسیر را کُند یا متوقف کنند."
        : "قدرت در تعادل شکننده میان تمرکز و محدودیت ایستاده است.";

  return (
    <section
      id="power-concentration"
      className="section-block"
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="font-display text-3xl font-medium leading-tight md:text-5xl"
      >
        قدرت را جابه‌جا کن.
      </h2>
      <p className="mt-2 text-sm text-[color:var(--muted)]" lang="en" dir="ltr">
        Move the power.
      </p>
      <ModuleTerms
        termIds={[
          "veto-player",
          "executive-aggrandizement",
          "executive-decree",
          "alternation-in-power",
          "electoral-threshold",
          "fptp",
          "proportional-representation",
          "ethnic-federalism",
        ]}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <label
            htmlFor={sliderId}
            className="font-display text-xl md:text-2xl"
          >
            تمرکز قدرت
          </label>
          <p
            className="mt-1 text-xs tracking-wide text-[color:var(--muted)]"
            lang="en"
            dir="ltr"
          >
            Concentration
          </p>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={concentration}
            onChange={(e) => setConcentration(Number(e.target.value))}
            className="mt-6 w-full accent-[color:var(--power)]"
            aria-valuetext={`${Math.round(concentration * 100)} درصد تمرکز`}
          />
          <div className="mt-2 flex justify-between text-xs text-[color:var(--muted)]">
            <span>مقید</span>
            <span>متمرکز</span>
          </div>
          <p className="mt-8 max-w-md font-display text-lg leading-8 text-[color:var(--ink-soft)] md:text-xl">
            {closing}
          </p>
        </div>

        <svg
          viewBox="0 0 100 100"
          className="aspect-square w-full max-w-md border border-[color:var(--line)] rounded-xl bg-[color-mix(in_srgb,white_25%,var(--paper))]"
          role="img"
          aria-label="کُره‌های قدرت که با تمرکز بزرگ و کوچک می‌شوند"
        >
          <title>تمرکز قدرت</title>
          {SPHERES.map((s) => {
            const w = weights[s.id] ?? 1;
            const r = 5.2 * w;
            return (
              <g key={s.id}>
                <circle
                  cx={s.cx}
                  cy={s.cy}
                  r={r}
                  fill={s.fill}
                  fillOpacity={0.55 + concentration * 0.2}
                  className="transition-[r] duration-200 ease-out motion-reduce:transition-none"
                />
                <text
                  x={s.cx}
                  y={s.cy + r + 4}
                  textAnchor="middle"
                  fontSize={2.8}
                  fill="var(--ink)"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.labelFa}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <WhyThisMatters bodyFa="طیف تمرکز قدرت کمک می‌کند بفهمید چرا برخی رهبران با وجود «قانونی بودن» انتخاب‌شان، عملاً هیچ‌کس نمی‌تواند تصمیم‌شان را متوقف کند." />
    </section>
  );
}
