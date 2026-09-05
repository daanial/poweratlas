"use client";

import { useMemo, useState } from "react";
import type { ConstitutionConfig } from "@/content/builder";
import { crises } from "@/content/crises";
import { resolveCrisis } from "@/lib/simulation-engine";

const ORDINAL = [
  "بحران اول",
  "بحران دوم",
  "بحران سوم",
  "بحران چهارم",
  "بحران پنجم",
  "بحران ششم",
] as const;

type CrisisSimulatorProps = {
  config: ConstitutionConfig;
};

export function CrisisSimulator({ config }: CrisisSimulatorProps) {
  const [index, setIndex] = useState(0);
  const [choiceId, setChoiceId] = useState<string | null>(null);
  const [resolved, setResolved] = useState(false);

  const crisis = crises[index];
  const resolution = useMemo(() => {
    if (!crisis || !choiceId || !resolved) return null;
    return resolveCrisis(config, crisis.id, choiceId);
  }, [choiceId, config, crisis, resolved]);

  if (!crisis) {
    return (
      <div className="result-card p-8 text-center">
        <p className="font-display text-xl">شش بحران به پایان رسید.</p>
        <p className="mt-3 text-base leading-8 text-[color:var(--muted)]">
          درس نهادی این است: قواعد روی کاغذ کافی نیستند؛ مهم این است چه کسی می‌تواند «نه» بگوید و آن «نه» اجرا شود.
        </p>
        <button
          type="button"
          className="cta-secondary mt-6"
          onClick={() => {
            setIndex(0);
            setChoiceId(null);
            setResolved(false);
          }}
        >
          از نو
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow" data-tone="power">
        {ORDINAL[index] ?? `بحران ${index + 1}`}
        <span className="ms-2 opacity-55" lang="en" dir="ltr">
          Crisis {index + 1} of {crises.length}
        </span>
      </p>
      <h3 className="font-display mb-3 text-2xl font-medium md:text-[1.7rem]">{crisis.titleFa}</h3>
      <p className="mb-7 text-base leading-8 text-[color:var(--ink-soft)] md:text-lg md:leading-9">
        {crisis.setupFa}
      </p>

      {!resolved ? (
        <div className="flex flex-col gap-2">
          {crisis.choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className="opt-btn"
              data-active={choiceId === choice.id ? "true" : "false"}
              aria-pressed={choiceId === choice.id}
              onClick={() => setChoiceId(choice.id)}
            >
              {choice.labelFa}
            </button>
          ))}
          <button
            type="button"
            className="cta-primary mt-4 self-start"
            disabled={!choiceId}
            onClick={() => setResolved(true)}
          >
            اجرا
          </button>
        </div>
      ) : resolution ? (
        <div className="space-y-4 border-t border-[color:var(--line)] pt-6">
          <div className="result-card">
            <p className="eyebrow">پیامد</p>
            <p className="text-base leading-8 text-[color:var(--ink-soft)]">
              {resolution.consequenceFa}
            </p>
          </div>
          <div className="result-card" data-tone="power">
            <p className="eyebrow" data-tone="power">درس نهادی</p>
            <p className="text-base leading-8">{resolution.lessonFa}</p>
          </div>
          <button
            type="button"
            className="cta-primary"
            onClick={() => {
              setIndex((i) => i + 1);
              setChoiceId(null);
              setResolved(false);
            }}
          >
            {index < crises.length - 1 ? "بحران بعدی" : "پایان"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
