"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { readVisitFlag, writeVisitFlag } from "@/lib/visit-flags";

export type SpotlightStep = {
  target: string;
  titleFa: string;
  bodyFa: string;
};

type Rect = { top: number; left: number; width: number; height: number };

function measure(selector: string): Rect | null {
  const el = document.querySelector(selector);
  if (!(el instanceof HTMLElement)) return null;
  const r = el.getBoundingClientRect();
  if (r.width < 2 && r.height < 2) return null;
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

function targetEl(selector: string): HTMLElement | null {
  const el = document.querySelector(selector);
  return el instanceof HTMLElement ? el : null;
}

export function SpotlightTour({
  steps,
  storageKey,
}: {
  steps: SpotlightStep[];
  storageKey: string;
}) {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [hole, setHole] = useState<Rect | null>(null);

  useEffect(() => {
    if (readVisitFlag(storageKey) === "done") return;
    const timer = window.setTimeout(() => {
      setReady(true);
      setActive(true);
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [storageKey]);

  const step = steps[index];

  const refreshHole = useCallback(() => {
    if (!step) {
      setHole(null);
      return;
    }
    setHole(measure(step.target));
  }, [step]);

  useLayoutEffect(() => {
    if (!active || !step) return;

    const el = targetEl(step.target);
    if (!el) {
      if (index >= steps.length - 1) {
        writeVisitFlag(storageKey, "done");
        setActive(false);
      } else {
        setIndex((i) => i + 1);
      }
      return;
    }

    el.scrollIntoView({ block: "center", behavior: "smooth" });
    const settle = window.setTimeout(refreshHole, 380);
    const onResize = () => refreshHole();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [active, index, refreshHole, step, steps.length, storageKey]);

  function finish() {
    writeVisitFlag(storageKey, "done");
    setActive(false);
  }

  function next() {
    if (index >= steps.length - 1) {
      finish();
      return;
    }
    setIndex((i) => i + 1);
  }

  if (!ready || !active || !step) return null;

  const last = index >= steps.length - 1;
  const pad = 8;
  const holeStyle = hole
    ? {
        top: hole.top - pad,
        left: hole.left - pad,
        width: hole.width + pad * 2,
        height: hole.height + pad * 2,
      }
    : null;

  return (
    <div className="spotlight-tour" role="dialog" aria-modal="true" aria-label="راهنمای کوتاه">
      {holeStyle ? (
        <div className="spotlight-hole" style={holeStyle} aria-hidden />
      ) : (
        <div className="spotlight-dim" aria-hidden />
      )}
      <div className="spotlight-panel">
        <div className="tour-dots" aria-hidden>
          {steps.map((_, i) => (
            <span
              key={i}
              className="tour-dot"
              data-active={i === index ? "true" : "false"}
            />
          ))}
        </div>
        <p className="mt-2 font-display text-xl leading-8">{step.titleFa}</p>
        <p className="mt-2 text-sm leading-7 text-[color:var(--ink-soft)]">
          {step.bodyFa}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="button" className="cta-primary" onClick={next}>
            {last ? "فهمیدم" : "ادامهٔ راهنما"}
          </button>
          <button
            type="button"
            className="text-xs text-[color:var(--muted)] underline-offset-2 hover:underline"
            onClick={finish}
          >
            رد کردن
          </button>
        </div>
      </div>
    </div>
  );
}
