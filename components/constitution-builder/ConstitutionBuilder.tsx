"use client";

import { useMemo, useState } from "react";
import type { ConstitutionConfig } from "@/content/builder";
import { CORE_STEP_COUNT, builderSteps, extraBuilderSteps } from "@/content/builder";
import type { Fingerprint } from "@/lib/political-model";

type ConstitutionBuilderProps = {
  config: ConstitutionConfig;
  onChange: (next: ConstitutionConfig) => void;
  fingerprint: Fingerprint;
  systemTitleFa: string;
  systemTitleEn: string;
  onSeeResult: () => void;
};

function MiniInstitutionDiagram({ config }: { config: ConstitutionConfig }) {
  const fused = config.headOfGovernment === "president";
  const hasMonarch = config.headOfState === "monarch";
  const bicameral = config.legislature.startsWith("bicameral");
  const strongLeg = config.legislature.includes("strong");
  const indepJud = config.judiciary === "independent";
  const indepMedia = config.media === "independent";

  const nodes = [
    { id: "people", x: 50, y: 10, label: "مردم", on: true, emphasis: false },
    {
      id: "hos",
      x: hasMonarch ? 18 : 50,
      y: 28,
      label: hasMonarch ? "پادشاه" : fused ? "رئیس‌جمهور" : "رئیس کشور",
      on: config.headOfState !== "none",
      emphasis: false,
    },
    { id: "hog", x: 78, y: 36, label: fused ? "اجرا" : "دولت", on: true, emphasis: false },
    {
      id: "leg",
      x: 22,
      y: 52,
      label: bicameral ? "دو مجلس" : "مجلس",
      on: true,
      emphasis: strongLeg,
    },
    { id: "jud", x: 50, y: 78, label: "دادگاه", on: true, emphasis: indepJud },
    { id: "media", x: 82, y: 72, label: "رسانه", on: true, emphasis: indepMedia },
  ];

  const edges: Array<[number, number, number, number, boolean]> = [
    [50, 10, 22, 52, config.elections !== "none"],
    [50, 10, 78, 36, config.selection === "direct"],
    [22, 52, 78, 36, true],
    [50, 78, 78, 36, indepJud],
    [82, 72, 78, 36, indepMedia],
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[14rem]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
        {edges.map(([x1, y1, x2, y2, lit], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={lit ? "var(--power)" : "var(--line)"}
            strokeWidth={lit ? 0.5 : 0.25}
            strokeOpacity={lit ? 0.7 : 0.25}
          />
        ))}
      </svg>
      {nodes
        .filter((n) => n.on)
        .map((n) => (
          <div
            key={n.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--line-strong)] bg-[color:color-mix(in_srgb,white_55%,var(--paper))] px-2 py-1 text-center text-[0.6rem] leading-tight"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              borderColor: n.emphasis ? "var(--power)" : undefined,
            }}
          >
            {n.label}
          </div>
        ))}
    </div>
  );
}

export function ConstitutionBuilder({
  config,
  onChange,
  fingerprint,
  systemTitleFa,
  systemTitleEn,
  onSeeResult,
}: ConstitutionBuilderProps) {
  const [current, setCurrent] = useState(0);
  const [showExtra, setShowExtra] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [chosen, setChosen] = useState<Set<string>>(() => new Set());
  const [lastStepPicked, setLastStepPicked] = useState(false);

  const steps = showExtra ? builderSteps : builderSteps.slice(0, CORE_STEP_COUNT);
  const step = steps[current] ?? steps[0];
  const stepCount = steps.length;

  const coreComplete = useMemo(() => {
    return builderSteps
      .slice(0, CORE_STEP_COUNT)
      .every((s) => chosen.has(s.key));
  }, [chosen]);

  const complete = showExtra
    ? lastStepPicked
    : lastStepPicked || coreComplete;

  function select(optionId: string) {
    if (!step) return;
    onChange({ ...config, [step.key]: optionId });
    setChosen((prev) => {
      const next = new Set(prev);
      next.add(step.key);
      return next;
    });
    if (current >= stepCount - 1) {
      setLastStepPicked(true);
    } else {
      setCurrent((c) => Math.min(stepCount - 1, c + 1));
      setLastStepPicked(false);
    }
  }

  const summary = builderSteps.map((s) => {
    const opt = s.options.find((o) => o.id === config[s.key]);
    return {
      key: s.key,
      titleFa: s.titleFa,
      labelFa: opt?.labelFa ?? "—",
      isChosen: chosen.has(s.key),
      extra: builderSteps.indexOf(s) >= CORE_STEP_COUNT,
    };
  });

  const visibleSummary = showExtra
    ? summary
    : summary.filter((row) => !row.extra);
  const chosenCount = chosen.size;
  const requiredTotal = showExtra ? builderSteps.length : CORE_STEP_COUNT;

  if (!step) return null;

  return (
    <div>
    <div className="grid gap-8 pb-24 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="eyebrow mb-0">
            {chosenCount} از {requiredTotal} انتخاب شما
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="opt-btn px-3 py-1.5 text-xs"
              disabled={current === 0}
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            >
              قبلی
            </button>
            <button
              type="button"
              className="opt-btn px-3 py-1.5 text-xs"
              disabled={current >= stepCount - 1}
              onClick={() =>
                setCurrent((c) => Math.min(stepCount - 1, c + 1))
              }
            >
              بعدی
            </button>
          </div>
        </div>

        <h3 className="font-display mb-1 text-2xl font-medium">{step.titleFa}</h3>
        <p
          className={`text-xs tracking-wide opacity-55 ${step.leadFa ? "" : "mb-4"}`}
          lang="en"
          dir="ltr"
        >
          {step.titleEn}
        </p>
        {step.leadFa ? (
          <p className="mt-3 mb-4 max-w-lg text-sm leading-7 text-[color:var(--ink-soft)]">
            {step.leadFa}
          </p>
        ) : null}

        <div className="flex flex-col gap-2" data-tour="lab-options">
          {step.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className="opt-btn"
              data-active={config[step.key] === opt.id ? "true" : "false"}
              aria-pressed={config[step.key] === opt.id}
              onClick={() => select(opt.id)}
            >
              <span className="block text-sm">{opt.labelFa}</span>
              <span className="mt-0.5 block text-[0.65rem] opacity-55" lang="en" dir="ltr">
                {opt.labelEn}
              </span>
              {opt.descFa ? (
                <span className="mt-2 block text-xs leading-6 text-[color:var(--ink-soft)]">
                  {opt.descFa}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {!showExtra ? (
          <div className="mt-8 border-t border-[color:var(--line)] pt-5">
            <p className="eyebrow">اختیاری</p>
            <p className="max-w-lg text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
              با پنج قاعدهٔ اصلی، نظام شما کامل است و می‌توانید نتیجه را ببینید.
              اگر بخواهید دقیق‌تر شوید، {extraBuilderSteps.length} قاعدهٔ دیگر هم
              هست — {extraBuilderSteps.map((s) => s.titleFa).join("، ")} — که
              اثرشان در اثر انگشت قدرت دیده می‌شود.
            </p>
            <button
              type="button"
              className="cta-secondary mt-4"
              onClick={() => {
                setShowExtra(true);
                setCurrent(CORE_STEP_COUNT);
                setLastStepPicked(false);
              }}
            >
              افزودن {extraBuilderSteps.length} قاعدهٔ اختیاری
            </button>
          </div>
        ) : (
          <p className="mt-8 border-t border-[color:var(--line)] pt-5 text-[0.9rem] text-[color:var(--muted)]">
            قواعد اختیاری اضافه شد؛ حالا {builderSteps.length} قاعده دارید.
          </p>
        )}
      </div>

      <aside className="result-card" data-tour="lab-live">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 text-start lg:hidden"
          onClick={() => setPreviewOpen((o) => !o)}
          aria-expanded={previewOpen}
        >
          <span>
            <span className="block text-xs text-[color:var(--muted)]">نمای زنده</span>
            <span className="font-display text-base font-medium">{systemTitleFa}</span>
          </span>
          <span className="text-xs text-[color:var(--muted)]">
            {previewOpen ? "بستن" : "باز کردن"}
          </span>
        </button>

        <div className={previewOpen ? "mt-4 lg:mt-0" : "hidden lg:block"}>
          <p className="mb-1 hidden text-xs text-[color:var(--muted)] lg:block">
            نمای زنده
          </p>
          <p className="font-display mb-3 hidden text-base font-medium lg:block">
            {systemTitleFa}
            <span className="ms-2 text-[0.65rem] font-normal opacity-55" lang="en" dir="ltr">
              {systemTitleEn}
            </span>
          </p>

          <MiniInstitutionDiagram config={config} />

          <ul className="mt-4 space-y-1.5 text-xs leading-6 text-[color:var(--ink-soft)]">
            {visibleSummary.map((row) => (
              <li
                key={row.key}
                className="flex justify-between gap-2 border-b border-[color:var(--line)] pb-1"
              >
                <span className="opacity-60">{row.titleFa}</span>
                <span>
                  {row.labelFa}
                  {row.isChosen ? null : (
                    <span className="ms-1 opacity-50">پیش‌فرض</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-3 text-[0.65rem] leading-5 text-[color:var(--muted)]">
            تمرکز اجرایی تقریبی: {Math.round(fingerprint.executiveConcentration * 100)}٪ ·
            قدرت مجلس: {Math.round(fingerprint.legislativeStrength * 100)}٪
            <span className="mt-1 block opacity-70">این اعداد توصیف‌اند، نه امتیاز اخلاقی.</span>
          </p>
        </div>
      </aside>
    </div>

      <div className="lab-sticky-bar" data-tour="lab-result">
        <p className="min-w-0 text-xs leading-5 text-[color:var(--muted)]">
          {complete ? (
            "همهٔ قواعد انتخاب شد"
          ) : (
            <>
              گام {current + 1} از {stepCount}
              {" · "}
              {chosenCount} از {requiredTotal} انتخاب شما
            </>
          )}
        </p>
        <button
          type="button"
          className={complete ? "cta-primary" : "cta-secondary"}
          onClick={onSeeResult}
        >
          دیدن نتیجه
        </button>
      </div>
    </div>
  );
}
