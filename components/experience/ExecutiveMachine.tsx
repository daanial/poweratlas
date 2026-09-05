"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { executiveSystems } from "@/content/systems";
import type { ExecutiveSystemType } from "@/content/types";
import { prefersReducedMotion } from "@/lib/visualization-utils";
import { WhatIf } from "@/components/ui/WhatIf";
import { ModuleTerms } from "@/components/ui/GlossaryChip";
import { WhyThisMatters } from "@/components/ui/WhyThisMatters";

const NODE_LABELS: Record<string, { fa: string; en: string }> = {
  people: { fa: "مردم", en: "People" },
  president: { fa: "رئیس‌جمهور", en: "President" },
  parliament: { fa: "پارلمان", en: "Parliament" },
  government: { fa: "دولت", en: "Government" },
  courts: { fa: "دادگاه‌ها", en: "Courts" },
  primeMinister: { fa: "نخست‌وزیر", en: "Prime Minister" },
};

const LAYOUTS: Record<
  ExecutiveSystemType,
  Record<string, { x: number; y: number }>
> = {
  presidential: {
    people: { x: 50, y: 12 },
    president: { x: 50, y: 38 },
    government: { x: 72, y: 62 },
    parliament: { x: 28, y: 62 },
    courts: { x: 50, y: 86 },
  },
  parliamentary: {
    people: { x: 50, y: 12 },
    parliament: { x: 50, y: 38 },
    primeMinister: { x: 50, y: 58 },
    government: { x: 50, y: 78 },
  },
  "semi-presidential": {
    people: { x: 50, y: 10 },
    president: { x: 28, y: 36 },
    parliament: { x: 72, y: 36 },
    primeMinister: { x: 50, y: 58 },
    government: { x: 50, y: 80 },
  },
};

export function ExecutiveMachine() {
  const [mode, setMode] = useState<ExecutiveSystemType>("presidential");
  const headingId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const system = useMemo(
    () => executiveSystems.find((s) => s.id === mode)!,
    [mode],
  );
  const layout = LAYOUTS[mode];
  const nodeIds = Object.keys(layout);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const nodes = svg.querySelectorAll<SVGGElement>("[data-node]");
    const reduced = prefersReducedMotion();

    nodes.forEach((g) => {
      const id = g.dataset.node;
      if (!id) return;
      const pos = layout[id];
      const present = Boolean(pos);

      if (reduced) {
        if (present) {
          gsap.set(g, {
            opacity: 1,
            attr: { transform: `translate(${pos.x} ${pos.y})` },
          });
        } else {
          gsap.set(g, { opacity: 0 });
        }
        return;
      }

      if (present) {
        gsap.to(g, {
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          attr: { transform: `translate(${pos.x} ${pos.y})` },
        });
      } else {
        gsap.to(g, { opacity: 0, duration: 0.3, ease: "power1.in" });
      }
    });

    const edges = svg.querySelectorAll<SVGLineElement>("[data-edge]");
    edges.forEach((line) => {
      const from = line.dataset.from!;
      const to = line.dataset.to!;
      const fromPos = layout[from];
      const toPos = layout[to];
      const active = Boolean(fromPos && toPos);
      if (reduced) {
        if (active) {
          gsap.set(line, {
            opacity: 0.7,
            attr: {
              x1: fromPos.x,
              y1: fromPos.y,
              x2: toPos.x,
              y2: toPos.y,
            },
          });
        } else {
          gsap.set(line, { opacity: 0 });
        }
        return;
      }
      if (active) {
        gsap.to(line, {
          opacity: 0.7,
          duration: 0.4,
          attr: {
            x1: fromPos.x,
            y1: fromPos.y,
            x2: toPos.x,
            y2: toPos.y,
          },
        });
      } else {
        gsap.to(line, { opacity: 0, duration: 0.25 });
      }
    });
  }, [layout, mode]);

  const allNodeIds = useMemo(() => {
    const set = new Set<string>();
    for (const sys of executiveSystems) {
      for (const flow of sys.flows) {
        set.add(flow.from);
        set.add(flow.to);
      }
    }
    return Array.from(set);
  }, []);

  const allEdges = useMemo(() => {
    const map = new Map<
      string,
      { from: string; to: string; bidirectional?: boolean }
    >();
    for (const sys of executiveSystems) {
      for (const flow of sys.flows) {
        map.set(`${flow.from}->${flow.to}`, flow);
      }
    }
    return Array.from(map.values());
  }, []);

  return (
    <section
      id="executive-machine"
      className="section-block"
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="mt-2 font-display text-3xl font-medium leading-tight md:text-5xl"
      >
        چه کسی کشور را اداره می‌کند؟
      </h2>
      <p className="mt-2 text-sm text-[color:var(--muted)]" lang="en" dir="ltr">
        Who runs the state?
      </p>
      <ModuleTerms
        termIds={[
          "separation-of-powers",
          "no-confidence-vote",
          "minority-government",
          "governing-coalition",
          "dissolution-of-parliament",
          "bicameral",
          "ceremonial-head-of-state",
          "impeachment",
        ]}
      />

      <div
        className="mt-8 flex flex-wrap gap-2"
        role="group"
        aria-label="نوع نظام اجرایی"
      >
        {executiveSystems.map((sys) => (
          <button
            key={sys.id}
            type="button"
            className="opt-btn"
            aria-pressed={mode === sys.id}
            data-active={mode === sys.id ? "true" : "false"}
            onClick={() => setMode(sys.id)}
          >
            <span>{sys.titleFa}</span>
            <span
              className="ms-2 text-[0.65rem] opacity-55"
              lang="en"
              dir="ltr"
            >
              {sys.titleEn}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="aspect-square w-full max-w-lg border border-[color:var(--line)] rounded-xl bg-[color-mix(in_srgb,white_30%,var(--paper))]"
          role="img"
          aria-label={`نمودار جریان قدرت: ${system.titleFa}`}
        >
          <title>{`جریان ${system.titleFa}`}</title>
          {allEdges.map((edge) => (
            <line
              key={`${edge.from}-${edge.to}`}
              data-edge
              data-from={edge.from}
              data-to={edge.to}
              x1={0}
              y1={0}
              x2={0}
              y2={0}
              stroke="var(--institution)"
              strokeWidth={0.35}
              opacity={0}
            />
          ))}
          {allNodeIds.map((id) => {
            const label = NODE_LABELS[id] ?? { fa: id, en: id };
            const initial = LAYOUTS.presidential[id] ?? { x: 50, y: 50 };
            return (
              <g
                key={id}
                data-node={id}
                transform={`translate(${initial.x} ${initial.y})`}
                opacity={nodeIds.includes(id) ? 1 : 0}
              >
                <circle
                  r={7.5}
                  fill="color-mix(in srgb, white 50%, var(--paper))"
                  stroke={
                    id === "people" ? "var(--power)" : "var(--line-strong)"
                  }
                  strokeWidth={0.4}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={3.2}
                  fill="var(--ink)"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {label.fa}
                </text>
              </g>
            );
          })}
        </svg>

        <div>
          <p className="font-display text-xl md:text-2xl">{system.titleFa}</p>
          <p
            className="mt-1 text-xs tracking-wide text-[color:var(--muted)]"
            lang="en"
            dir="ltr"
          >
            {system.titleEn}
          </p>
          <p className="mt-4 text-sm leading-7 text-[color:var(--ink-soft)]">
            {system.explanationFa}
          </p>
          <ul className="mt-6 space-y-4">
            {system.tradeoffs.map((t) => (
              <li
                key={t.id}
                className="border-t border-[color:var(--line)] pt-3"
              >
                <p className="text-sm font-medium">{t.choiceFa}</p>
                <p className="mt-1 text-xs leading-6 text-[color:var(--power)]">
                  قوت: {t.strengthFa}
                </p>
                <p className="mt-1 text-xs leading-6 text-[color:var(--institution)]">
                  آسیب‌پذیری: {t.vulnerabilityFa}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <WhatIf
        className="mt-8"
        titleFa="اگر اکثریت پارلمان با رئیس‌جمهور مخالف باشد؟"
        bodyFa="در نظام نیمه‌ریاستی، هم‌زیستی دشوار می‌شود. در ریاستی، بن‌بست قوا محتمل است. در پارلمانی، دولت معمولاً باید حمایت مجلس را حفظ کند."
      />
      <WhyThisMatters bodyFa="تفاوت نظام ریاستی و پارلمانی همان چیزی است که توضیح می‌دهد چرا در برخی کشورها تغییر نخست‌وزیر بدون انتخابات جدید ممکن است، ولی در برخی دیگر رئیس‌جمهور تا پایان دوره‌اش سرکار می‌ماند حتی با پارلمانی مخالف." />
    </section>
  );
}
