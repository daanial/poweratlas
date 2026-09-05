"use client";

import { useMemo, useState } from "react";
import { ContestedNote } from "@/components/ui/ContestedNote";
import { SourceCitations } from "@/components/ui/SourceCitations";
import { SpotlightTour } from "@/components/ui/SpotlightTour";
import { PowerFingerprint } from "@/components/power-fingerprint/PowerFingerprint";
import { fingerprintAxes } from "@/content/builder";
import { countries } from "@/content/countries";
import { historicalByParentId } from "@/content/countries-historical";
import type { CountrySystem } from "@/content/types";
import { VISIT_KEYS } from "@/lib/visit-flags";

type DisplayCountry = CountrySystem & {
  eraLabelFa?: string;
  yearRangeFa?: string;
  keyEventFa?: string;
};

function resolveCountry(
  countryId: string,
  eraId: string | null,
): DisplayCountry | undefined {
  if (eraId) {
    const eras = historicalByParentId[countryId];
    const era = eras?.find((e) => e.id === eraId);
    if (era) return era;
  }
  return countries.find((c) => c.id === countryId);
}

const countriesAz = [...countries].sort((a, b) =>
  a.nameFa.localeCompare(b.nameFa, "fa"),
);

function CountrySelect({
  labelFa,
  countryId,
  eraId,
  onCountry,
  onEra,
}: {
  labelFa: string;
  countryId: string;
  eraId: string | null;
  onCountry: (id: string) => void;
  onEra: (id: string | null) => void;
}) {
  const eras = historicalByParentId[countryId] ?? [];

  return (
    <div>
      <label className="block text-sm">
        <span className="text-[color:var(--muted)]">{labelFa}</span>
        <select
          className="opt-btn mt-2 w-full bg-transparent"
          value={countryId}
          onChange={(e) => {
            onCountry(e.target.value);
            onEra(null);
          }}
        >
          {countriesAz.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nameFa}
            </option>
          ))}
        </select>
      </label>
      {eras.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="دوره">
          <button
            type="button"
            className="opt-btn px-2 py-1 text-xs"
            data-active={eraId === null ? "true" : "false"}
            aria-pressed={eraId === null}
            onClick={() => onEra(null)}
          >
            امروز
          </button>
          {eras.map((era) => (
            <button
              key={era.id}
              type="button"
              className="opt-btn px-2 py-1 text-xs"
              data-active={eraId === era.id ? "true" : "false"}
              aria-pressed={eraId === era.id}
              onClick={() => onEra(era.id)}
            >
              {era.eraLabelFa}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CountryComparison() {
  const [leftId, setLeftId] = useState("netherlands");
  const [rightId, setRightId] = useState("united-states");
  const [leftEra, setLeftEra] = useState<string | null>(null);
  const [rightEra, setRightEra] = useState<string | null>(null);

  const left = useMemo(
    (): DisplayCountry | undefined =>
      resolveCountry(leftId, leftEra) ?? countries[0],
    [leftEra, leftId],
  );
  const right = useMemo(
    (): DisplayCountry | undefined =>
      resolveCountry(rightId, rightEra) ?? countries[1],
    [rightEra, rightId],
  );

  if (!left || !right) return null;

  return (
    <div>
      <SpotlightTour
        storageKey={VISIT_KEYS.countriesTour}
        steps={[
          {
            target: '[data-tour="countries-pick"]',
            titleFa: "دو کشور را انتخاب کن",
            bodyFa: "از فهرست‌ها دو مورد را کنار هم بگذار. اگر دورهٔ تاریخی دارد، می‌توانی «امروز» را با یک مقطع عوض کنی.",
          },
          {
            target: '[data-tour="countries-cards"]',
            titleFa: "سازوکار هر کدام را بخوان",
            bodyFa: "رئیس کشور، رئیس دولت، نوع مجریه و رقابت سیاسی همان پرسش‌هایی‌اند که در تجربه پرسیدیم.",
          },
          {
            target: '[data-tour="countries-compare"]',
            titleFa: "اثر انگشت را مقایسه کن",
            bodyFa: "اعداد مقیاس نسبی‌اند، نه نمرهٔ اخلاقی. ببین قدرت کجا متمرکز است و کجا مهار می‌شود.",
          },
        ]}
      />
      <div className="grid gap-4 md:grid-cols-2" data-tour="countries-pick">
        <CountrySelect
          labelFa="کشور اول"
          countryId={leftId}
          eraId={leftEra}
          onCountry={setLeftId}
          onEra={setLeftEra}
        />
        <CountrySelect
          labelFa="کشور دوم"
          countryId={rightId}
          eraId={rightEra}
          onCountry={setRightId}
          onEra={setRightEra}
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2" data-tour="countries-cards">
        <CountryCard country={left} />
        <CountryCard country={right} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2" data-tour="countries-compare">
        <div>
          <p className="mb-4 font-medium">
            {left.nameFa}
            {left.eraLabelFa ? ` · ${left.eraLabelFa}` : ""}
          </p>
          <PowerFingerprint fingerprint={left.fingerprint} />
        </div>
        <div>
          <p className="mb-4 font-medium">
            {right.nameFa}
            {right.eraLabelFa ? ` · ${right.eraLabelFa}` : ""}
          </p>
          <PowerFingerprint fingerprint={right.fingerprint} />
        </div>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[color:var(--line-strong)] text-start">
              <th className="py-2 font-medium">محور</th>
              <th className="py-2 font-medium">{left.nameFa}</th>
              <th className="py-2 font-medium">{right.nameFa}</th>
            </tr>
          </thead>
          <tbody>
            {fingerprintAxes.map((axis) => (
              <tr key={axis.id} className="border-b border-[color:var(--line)]">
                <td className="py-2">{axis.labelFa}</td>
                <td className="py-2 tabular-nums">
                  {Math.round(left.fingerprint[axis.id] * 100)}
                </td>
                <td className="py-2 tabular-nums">
                  {Math.round(right.fingerprint[axis.id] * 100)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-[color:var(--muted)]">
          اعداد مقیاس نسبی برای مقایسهٔ نهادی‌اند، نه امتیاز اخلاقی یا «نمرهٔ
          دموکراسی». اثر انگشت دوره‌های تاریخی پیش‌نویس اولیه است و نیاز به بازبینی
          تخصصی دارد.
        </p>
      </div>
    </div>
  );
}

function CountryCard({ country }: { country: DisplayCountry }) {
  const historical = Boolean(country.keyEventFa);

  return (
    <article className="border border-[color:var(--line-strong)] rounded-xl p-5">
      <h3 className="font-display text-xl">{country.nameFa}</h3>
      <p className="text-xs opacity-55" lang="en" dir="ltr">
        {country.nameEn}
        {country.eraLabelFa ? ` · ${country.yearRangeFa}` : ""}
      </p>
      {country.eraLabelFa ? (
        <p className="mt-2 text-sm text-[color:var(--institution)]">
          {country.eraLabelFa}
          {country.yearRangeFa ? ` · ${country.yearRangeFa}` : ""}
        </p>
      ) : null}
      <dl className="mt-4 space-y-2 text-sm leading-7">
        <div className="flex justify-between gap-4 border-b border-[color:var(--line)] pb-2">
          <dt className="text-[color:var(--muted)]">رئیس کشور</dt>
          <dd>{country.headOfState}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-[color:var(--line)] pb-2">
          <dt className="text-[color:var(--muted)]">رئیس دولت</dt>
          <dd>{country.headOfGovernment}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-[color:var(--line)] pb-2">
          <dt className="text-[color:var(--muted)]">نوع مجریه</dt>
          <dd>{country.executiveType}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-[color:var(--line)] pb-2">
          <dt className="text-[color:var(--muted)]">قوهٔ مقننه</dt>
          <dd>{country.legislature}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-[color:var(--muted)]">رقابت سیاسی</dt>
          <dd>{country.politicalCompetition}</dd>
        </div>
      </dl>
      {historical && country.keyEventFa ? (
        <p className="mt-4 text-sm leading-7 text-[color:var(--ink-soft)]">
          {country.keyEventFa}
        </p>
      ) : null}
      {country.contestedNoteFa ? (
        <ContestedNote noteFa={country.contestedNoteFa} />
      ) : null}
      <SourceCitations sourceIds={country.sourceIds} />
    </article>
  );
}
