"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ConstitutionBuilder } from "@/components/constitution-builder/ConstitutionBuilder";
import { CrisisSimulator } from "@/components/crisis-simulator/CrisisSimulator";
import { PowerFingerprint } from "@/components/power-fingerprint/PowerFingerprint";
import { LabBrief } from "@/components/laboratory/LabBrief";
import { SpotlightTour } from "@/components/ui/SpotlightTour";
import {
  defaultConfig,
  type ConstitutionConfig,
} from "@/content/builder";
import {
  classifySystem,
  computeFingerprint,
  computeTradeoffs,
} from "@/lib/political-model";
import { VISIT_KEYS } from "@/lib/visit-flags";

type Phase = "builder" | "result" | "crisis";

const PHASES: { id: Phase; labelFa: string; n: number }[] = [
  { id: "builder", labelFa: "بساز", n: 1 },
  { id: "result", labelFa: "نتیجه", n: 2 },
  { id: "crisis", labelFa: "بحران", n: 3 },
];

export function LaboratoryApp() {
  const [config, setConfig] = useState<ConstitutionConfig>(defaultConfig);
  const [phase, setPhase] = useState<Phase>("builder");
  const [reached, setReached] = useState<Phase[]>(["builder"]);
  const skipScroll = useRef(true);
  const [briefSeen, setBriefSeen] = useState(false);
  const markBriefSeen = useCallback(() => setBriefSeen(true), []);

  const fingerprint = useMemo(() => computeFingerprint(config), [config]);
  const system = useMemo(() => classifySystem(config), [config]);
  const tradeoffs = useMemo(() => computeTradeoffs(config), [config]);

  function goTo(next: Phase) {
    setReached((prev) => (prev.includes(next) ? prev : [...prev, next]));
    setPhase(next);
  }

  useLayoutEffect(() => {
    if (skipScroll.current) {
      skipScroll.current = false;
      return;
    }
    const scroll = () => {
      document.getElementById(`lab-${phase}`)?.scrollIntoView({
        block: "start",
        behavior: "instant",
      });
    };
    scroll();
    const frame = window.requestAnimationFrame(() => {
      scroll();
      window.requestAnimationFrame(scroll);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  return (
    <div>
      {briefSeen ? (
      <SpotlightTour
        storageKey={VISIT_KEYS.labTour}
        steps={[
          {
            target: '[data-tour="lab-options"]',
            titleFa: "یک قاعده را انتخاب کنید",
            bodyFa: "هر انتخاب، شکل دولت را تغییر می‌دهد. از رئیس کشور شروع کنید.",
          },
          {
            target: '[data-tour="lab-live"]',
            titleFa: "نمای زنده را ببینید",
            bodyFa: "کنار صفحه، نمودار و خلاصه با هر انتخاب شما به‌روز می‌شود.",
          },
          {
            target: '[data-tour="lab-result"]',
            titleFa: "سپس اثر انگشت و بحران",
            bodyFa: "وقتی قواعد را نهایی کردید، نتیجه را ببینید و در بحران تصمیم بگیرید.",
          },
        ]}
      />
      ) : null}

      {phase === "builder" ? <LabBrief onSeen={markBriefSeen} /> : null}

      <nav className="lab-phase-rail" aria-label="مراحل آزمایشگاه">
        {PHASES.map((item, i) => {
          const current = item.id === phase;
          const unlocked = reached.includes(item.id);
          return (
            <span key={item.id} className="flex items-center gap-2">
              {i > 0 ? <span className="opacity-30" aria-hidden>→</span> : null}
              {unlocked ? (
                <button
                  type="button"
                  className="lab-phase-btn"
                  data-current={current ? "true" : "false"}
                  onClick={() => goTo(item.id)}
                >
                  {item.labelFa} · {item.n}
                </button>
              ) : (
                <span className="lab-phase-btn" data-current="false" data-locked="true">
                  {item.labelFa} · {item.n}
                </span>
              )}
            </span>
          );
        })}
      </nav>

      <h2
        id={`lab-${phase}`}
        className="font-display mb-2 scroll-mt-24 text-2xl font-medium md:text-3xl"
      >
        {phase === "builder"
          ? "حالا نوبت شماست"
          : phase === "result"
            ? "نتیجه"
            : "بحران"}
      </h2>
      <p
        className="mb-8 text-sm tracking-wide text-[color:var(--muted)]"
        lang="en"
        dir="ltr"
      >
        {phase === "builder"
          ? "Now it is your turn"
          : phase === "result"
            ? "Result"
            : "Crisis"}
      </p>

      {phase === "builder" ? (
        <ConstitutionBuilder
          config={config}
          onChange={setConfig}
          fingerprint={fingerprint}
          systemTitleFa={system.titleFa}
          systemTitleEn={system.titleEn}
          onSeeResult={() => goTo("result")}
        />
      ) : null}

      {phase === "result" ? (
        <>
          <div className="space-y-10 pb-24">
            <div className="border-b border-[color:var(--line)] pb-4">
              <p className="eyebrow">طبقه‌بندی توصیفی</p>
              <p className="font-display text-2xl font-medium">
                {system.titleFa}
                <span
                  className="ms-2 text-sm font-normal opacity-55"
                  lang="en"
                  dir="ltr"
                >
                  {system.titleEn}
                </span>
              </p>
            </div>

            <PowerFingerprint
              fingerprint={fingerprint}
              variant="bars"
              titleFa="اثر انگشت قدرت"
            />

            <div className="grid gap-6 md:grid-cols-3">
              <TradeBlock title="نقاط قوت ممکن" items={tradeoffs.strengthsFa} />
              <TradeBlock title="آسیب‌پذیری‌ها" items={tradeoffs.vulnerabilitiesFa} />
              <TradeBlock title="پرسش‌های باز" items={tradeoffs.openQuestionsFa} />
            </div>
          </div>

          <div className="lab-sticky-bar">
            <button
              type="button"
              className="cta-secondary"
              onClick={() => goTo("builder")}
            >
              بازگشت به ساخت
            </button>
            <button
              type="button"
              className="cta-primary"
              onClick={() => goTo("crisis")}
            >
              حالا شما تصمیم بگیرید
            </button>
          </div>
        </>
      ) : null}

      {phase === "crisis" ? (
        <div className="min-h-[90dvh]">
          <button
            type="button"
            className="lab-phase-btn mb-6"
            onClick={() => goTo("result")}
          >
            بازگشت به اثر انگشت
          </button>
          <CrisisSimulator config={config} />
        </div>
      ) : null}
    </div>
  );
}

function TradeBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="result-card">
      <h4 className="eyebrow">{title}</h4>
      <ul className="space-y-2.5 text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
        {items.map((item, i) => (
          <li key={`${title}-${i}`} className="border-s border-[color:var(--line-strong)] ps-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
