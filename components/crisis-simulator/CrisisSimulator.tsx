"use client";

import { useMemo, useState } from "react";
import type { ConstitutionConfig } from "@/content/builder";
import { crises, historicalCasesByCrisis } from "@/content/crises";
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
          <HistoricalCases crisisId={crisis.id} choiceId={choiceId} />
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

function HistoricalCases({
  crisisId,
  choiceId,
}: {
  crisisId: string;
  choiceId: string | null;
}) {
  const cases = historicalCasesByCrisis[crisisId];
  if (!cases?.length) return null;

  // Cases matching the path the user took come first.
  const ordered = [
    ...cases.filter((c) => c.choiceId === choiceId),
    ...cases.filter((c) => c.choiceId !== choiceId),
  ];

  return (
    <details className="result-card" open>
      <summary className="cursor-pointer list-none">
        <span className="eyebrow">در تاریخ چه گذشت؟</span>
        <span className="ms-2 text-sm text-[color:var(--muted)]">
          {ordered.length} نمونهٔ مستند از سدهٔ نوزدهم تا امروز
        </span>
      </summary>

      <div className="mt-5 space-y-5">
        {ordered.map((item) => (
          <div
            key={item.id}
            className="border-s border-[color:var(--line-strong)] ps-4"
          >
            <p className="font-display text-base font-medium">
              {item.flag ? (
                <span className="me-1.5" aria-hidden>
                  {item.flag}
                </span>
              ) : null}
              {item.placeFa}
              <span className="ms-2 text-sm font-normal opacity-55" lang="en" dir="ltr">
                {item.placeEn}
              </span>
              <span className="ms-2 text-sm font-normal text-[color:var(--muted)]">
                · {item.yearsFa}
              </span>
              {item.choiceId === choiceId ? (
                <span className="ms-2 text-xs text-[color:var(--muted)]">
                  (نزدیک به انتخاب شما)
                </span>
              ) : null}
            </p>
            <p className="mt-2 text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
              {item.summaryFa}
            </p>
            <p className="mt-2 text-[0.95rem] leading-8">{item.takeawayFa}</p>
          </div>
        ))}

        <p className="border-t border-[color:var(--line)] pt-4 text-sm leading-7 text-[color:var(--muted)]">
          این نمونه‌ها برای نشان دادن سازوکار نهادها آمده‌اند، نه داوری دربارهٔ
          کشورها. انتخاب موردها بر پایهٔ مستند بودن و روشنی سازوکار است.
        </p>
      </div>
    </details>
  );
}
