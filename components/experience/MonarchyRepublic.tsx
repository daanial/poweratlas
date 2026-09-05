"use client";

import { useId, useState } from "react";
import { monarchyModels, republicExamples } from "@/content/systems";
import { WhyThisMatters } from "@/components/ui/WhyThisMatters";

const GOLD = "#a67c2d";

const MONARCHY_LAYOUT: Record<string, { x: number; y: number }> = {
  monarch: { x: 50, y: 22 },
  constitution: { x: 22, y: 40 },
  parliament: { x: 50, y: 55 },
  government: { x: 50, y: 78 },
  legislature: { x: 78, y: 40 },
  executive: { x: 78, y: 62 },
  constrained: { x: 22, y: 62 },
  people: { x: 50, y: 18 },
  headOfState: { x: 78, y: 78 },
};

const NODE_FA: Record<string, string> = {
  monarch: "پادشاه",
  constitution: "قانون",
  parliament: "پارلمان",
  government: "دولت",
  legislature: "قانون‌گذاری",
  executive: "اجرا",
  constrained: "محدود",
  people: "مردم",
  headOfState: "رئیس کشور",
};

export function MonarchyRepublic() {
  const [modelId, setModelId] = useState<(typeof monarchyModels)[number]["id"]>(
    "constitutional",
  );
  const headingId = useId();
  const model =
    monarchyModels.find((m) => m.id === modelId) ?? monarchyModels[1]!;

  const nodes = new Set<string>();
  for (const f of model.flows) {
    nodes.add(f.from);
    nodes.add(f.to);
  }

  return (
    <section
      id="monarchy-republic"
      className="section-block"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="sr-only">
        پادشاهی و جمهوری
      </h2>

      <div className="space-y-16">
        <div>
          <h3 className="font-display text-3xl font-medium leading-tight md:text-4xl">
            پادشاهی یعنی چه؟
          </h3>
          <p
            className="mt-2 text-sm text-[color:var(--muted)]"
            lang="en"
            dir="ltr"
          >
            What monarchy means
          </p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--ink-soft)]">
            پادشاهی شکل تصدی است، نه اندازهٔ قدرت.
          </p>

          <div
            className="mt-6 flex flex-wrap gap-2"
            role="group"
            aria-label="مدل‌های پادشاهی"
          >
            {monarchyModels.map((m) => (
              <button
                key={m.id}
                type="button"
                className="opt-btn"
                aria-pressed={modelId === m.id}
                data-active={modelId === m.id ? "true" : "false"}
                onClick={() => setModelId(m.id)}
              >
                <span>{m.titleFa}</span>
                <span
                  className="ms-2 text-[0.65rem] opacity-55"
                  lang="en"
                  dir="ltr"
                >
                  {m.titleEn}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
            <svg
              viewBox="0 0 100 100"
              className="aspect-square w-full max-w-md border border-[color:var(--line)] rounded-xl bg-[color-mix(in_srgb,white_30%,var(--paper))]"
              role="img"
              aria-label={`نمودار ${model.titleFa}`}
            >
              <title>{model.titleFa}</title>
              {model.flows.map((f) => {
                const a = MONARCHY_LAYOUT[f.from];
                const b = MONARCHY_LAYOUT[f.to];
                if (!a || !b) return null;
                return (
                  <line
                    key={`${f.from}-${f.to}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={GOLD}
                    strokeWidth={0.4}
                    strokeOpacity={0.75}
                  />
                );
              })}
              {Array.from(nodes).map((id) => {
                const pos = MONARCHY_LAYOUT[id];
                if (!pos) return null;
                const isMonarch = id === "monarch";
                return (
                  <g key={id}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isMonarch ? 8 : 6.5}
                      fill="color-mix(in srgb, white 45%, var(--paper))"
                      stroke={isMonarch ? GOLD : "var(--line-strong)"}
                      strokeWidth={0.45}
                    />
                    <text
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={2.8}
                      fill="var(--ink)"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {NODE_FA[id] ?? id}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="text-sm leading-7 text-[color:var(--ink-soft)] md:text-base md:leading-8">
              {model.explanationFa}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-display text-3xl font-medium leading-tight md:text-4xl">
            جمهوری یعنی چه؟
          </h3>
          <p
            className="mt-2 text-sm text-[color:var(--muted)]"
            lang="en"
            dir="ltr"
          >
            What a republic means
          </p>
          <p className="mt-3 max-w-2xl font-display text-xl leading-8 text-[color:var(--power)] md:text-2xl">
            جمهوری ≠ دموکراسی
          </p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--ink-soft)]">
            جمهوری می‌گوید رئیس کشور موروثی نیست. میزان رقابت و محدودیت قدرت را
            به‌تنهایی مشخص نمی‌کند.
          </p>

          <ul className="mt-8 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {republicExamples.map((ex) => (
              <li
                key={ex.id}
                className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6"
              >
                <div>
                  <p className="font-medium">{ex.nameFa}</p>
                  <p
                    className="text-[0.7rem] tracking-wide opacity-55"
                    lang="en"
                    dir="ltr"
                  >
                    {ex.nameEn}
                  </p>
                </div>
                <p className="text-sm leading-7 text-[color:var(--ink-soft)]">
                  {ex.noteFa}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <WhyThisMatters bodyFa="این تمایز توضیح می‌دهد چرا سلطنت بریتانیا با پادشاهی عربستان یک‌جور مقایسه نمی‌شود، و چرا «جمهوری» به‌تنهایی هیچ تضمینی دربارهٔ آزادی نمی‌دهد." />
    </section>
  );
}
