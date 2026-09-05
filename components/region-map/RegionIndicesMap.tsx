"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { geoCentroid, geoMercator, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { SourceCitations } from "@/components/ui/SourceCitations";
import {
  REGION_INDEX_SOURCE_IDS,
  fhStatusLabelFa,
  regionIndexCountries,
  regionIndexCountriesByIso3,
  regionIndexLayers,
  regionIndexNormalized,
  regionMapCopy,
} from "@/content/region-indices";
import type { RegionIndexCountry, RegionIndexLayerId } from "@/content/types";
import { clamp } from "@/lib/visualization-utils";
import {
  colorForNormalized,
  formatWgiEstimate,
} from "./region-map-colors";

type NeighborhoodFeature = Feature<Geometry, { iso3: string }>;
type NeighborhoodCollection = FeatureCollection<Geometry, { iso3: string }>;

const MAP_W = 900;
const MAP_H = 560;
const LABEL_ISO3 = new Set(["BHR", "QAT", "KWT", "ARE", "ARM"]);
const HIT_ISO3 = new Set(["BHR", "QAT", "KWT", "ARE"]);

function formatLayerValue(
  country: RegionIndexCountry,
  layer: RegionIndexLayerId,
): string {
  if (layer === "politicalFreedom") {
    return `${country.fhScore} / 100 · ${fhStatusLabelFa[country.fhStatus]}`;
  }
  if (layer === "politicalStability") {
    return formatWgiEstimate(country.wgiStability);
  }
  return formatWgiEstimate(country.wgiRegulatoryQuality);
}

export function RegionIndicesMap() {
  const titleId = useId();
  const [layer, setLayer] = useState<RegionIndexLayerId>("politicalFreedom");
  const [selectedId, setSelectedId] = useState("iran");
  const [geo, setGeo] = useState<NeighborhoodCollection | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/geo/iran-neighborhood.json")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<NeighborhoodCollection>;
      })
      .then((data) => {
        if (!cancelled) setGeo(data);
      })
      .catch(() => {
        if (!cancelled) setGeo(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selected =
    regionIndexCountries.find((c) => c.id === selectedId) ??
    regionIndexCountries[0];

  const projection = useMemo(() => {
    if (!geo) return null;
    return geoMercator().fitExtent(
      [
        [28, 24],
        [MAP_W - 28, MAP_H - 36],
      ],
      geo,
    );
  }, [geo]);

  const pathGen = useMemo(() => {
    if (!projection) return null;
    return geoPath(projection);
  }, [projection]);

  const features = geo?.features ?? [];

  const selectIso3 = useCallback((iso3: string) => {
    const country = regionIndexCountriesByIso3[iso3];
    if (country) setSelectedId(country.id);
  }, []);

  const sortedRows = useMemo(
    () =>
      [...regionIndexCountries].sort((a, b) =>
        a.nameFa.localeCompare(b.nameFa, "fa"),
      ),
    [],
  );

  return (
    <section
      className="mt-16 border-t border-[color:var(--line)] pt-12 md:mt-20 md:pt-16"
      aria-labelledby={titleId}
    >
      <p className="eyebrow" data-tone="power">
        {regionMapCopy.eyebrowFa}
      </p>
      <h2
        id={titleId}
        className="font-display text-2xl font-medium leading-tight md:text-3xl"
      >
        {regionMapCopy.titleFa}
      </h2>
      <p
        className="mt-1 text-sm tracking-wide text-[color:var(--muted)]"
        lang="en"
        dir="ltr"
      >
        {regionMapCopy.titleEn}
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-7 md:text-base md:leading-8">
        {regionMapCopy.introFa}
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--ink-soft)]">
        {regionMapCopy.layersExplainerFa}
      </p>

      <div
        className="mt-6 flex flex-wrap gap-2 scroll-mt-28"
        role="tablist"
        aria-label="لایهٔ نقشه"
      >
        {regionIndexLayers.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            className="opt-btn px-3 py-2 text-sm"
            aria-selected={layer === item.id}
            data-active={layer === item.id}
            onClick={() => setLayer(item.id)}
          >
            <span className="block">{item.labelFa}</span>
            <span className="block text-[0.7rem] opacity-55" lang="en" dir="ltr">
              {item.labelEn}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-[color:var(--muted)]">
        {regionIndexLayers.find((item) => item.id === layer)?.shortFa} ·{" "}
        {regionIndexLayers.find((item) => item.id === layer)?.unitFa}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
        <div>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--line)] bg-[color-mix(in_srgb,white_42%,var(--paper))]">
            {pathGen && projection ? (
              <svg
                className="block h-auto w-full"
                viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                role="group"
                aria-label="نقشهٔ رنگی همسایگان ایران"
              >
                {features.map((feature) => {
                  const iso3 = feature.properties.iso3;
                  const country = regionIndexCountriesByIso3[iso3];
                  if (!country) return null;
                  const d = pathGen(feature as NeighborhoodFeature);
                  if (!d) return null;
                  const isSelected = country.id === selected.id;
                  const t = clamp(regionIndexNormalized(country, layer), 0, 1);
                  return (
                    <path
                      key={iso3}
                      d={d}
                      className="region-map-land cursor-pointer"
                      fill={colorForNormalized(t)}
                      stroke={
                        isSelected ? "var(--power)" : "var(--paper)"
                      }
                      strokeWidth={isSelected ? 2.4 : HIT_ISO3.has(iso3) ? 1.8 : 1}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isSelected}
                      aria-label={`${country.nameFa}: ${formatLayerValue(country, layer)}`}
                      onClick={() => selectIso3(iso3)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          selectIso3(iso3);
                        }
                      }}
                    />
                  );
                })}
                {features.map((feature) => {
                  const iso3 = feature.properties.iso3;
                  if (!HIT_ISO3.has(iso3)) return null;
                  const country = regionIndexCountriesByIso3[iso3];
                  if (!country || !projection) return null;
                  const [x, y] = projection(
                    geoCentroid(feature as NeighborhoodFeature),
                  ) ?? [0, 0];
                  const isSelected = country.id === selected.id;
                  return (
                    <circle
                      key={`${iso3}-hit`}
                      cx={x}
                      cy={y}
                      r={9}
                      fill="transparent"
                      stroke={isSelected ? "var(--power)" : "var(--ink)"}
                      strokeOpacity={0.35}
                      strokeWidth={1.2}
                      className="cursor-pointer"
                      onClick={() => selectIso3(iso3)}
                    />
                  );
                })}
                {features.map((feature) => {
                  const iso3 = feature.properties.iso3;
                  if (!LABEL_ISO3.has(iso3)) return null;
                  const country = regionIndexCountriesByIso3[iso3];
                  if (!country || !projection) return null;
                  const [x, y] = projection(
                    geoCentroid(feature as NeighborhoodFeature),
                  ) ?? [0, 0];
                  const offset = labelOffset(iso3);
                  return (
                    <g key={`${iso3}-label`} pointerEvents="none">
                      <line
                        x1={x}
                        y1={y}
                        x2={x + offset[0]}
                        y2={y + offset[1]}
                        stroke="var(--ink)"
                        strokeOpacity={0.35}
                        strokeWidth={1}
                      />
                      <text
                        x={x + offset[0] + (offset[0] >= 0 ? 4 : -4)}
                        y={y + offset[1] + 3}
                        textAnchor={offset[0] >= 0 ? "start" : "end"}
                        fill="var(--ink)"
                        fontSize={11}
                        fontFamily="var(--font-body)"
                      >
                        {country.mapLabelFa ?? country.nameFa}
                      </text>
                    </g>
                  );
                })}
              </svg>
            ) : (
              <div className="flex aspect-[900/560] items-center justify-center text-sm text-[color:var(--muted)]">
                در حال بارگذاری نقشه…
              </div>
            )}
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs text-[color:var(--muted)]">
            <span>{regionMapCopy.legendLowFa}</span>
            <span
              className="h-2.5 min-w-[8rem] flex-1 rounded-full"
              style={{
                background:
                  "linear-gradient(to inline-end, var(--cream-dim), var(--law), var(--institution), var(--ink))",
              }}
              aria-hidden
            />
            <span>{regionMapCopy.legendHighFa}</span>
          </div>
        </div>

        <aside className="result-card h-fit">
          <p className="eyebrow">{selected.nameFa}</p>
          <p className="text-xs opacity-55" lang="en" dir="ltr">
            {selected.nameEn}
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {regionIndexLayers.map((item) => {
              const active = item.id === layer;
              return (
                <li
                  key={item.id}
                  className={
                    active
                      ? "rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--power)_35%,var(--line))] bg-[color-mix(in_srgb,var(--power)_7%,transparent)] px-3 py-2"
                      : "px-3 py-1"
                  }
                >
                  <p className="text-xs text-[color:var(--muted)]">
                    {item.labelFa}
                  </p>
                  <p
                    className="mt-0.5 tabular-nums"
                    lang={item.id === "politicalFreedom" ? "fa" : "en"}
                    dir={item.id === "politicalFreedom" ? "rtl" : "ltr"}
                  >
                    {formatLayerValue(selected, item.id)}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm leading-7">{selected.noteFa}</p>
        </aside>
      </div>

      <div className="mt-10 overflow-x-auto">
        <p className="eyebrow">{regionMapCopy.tableCaptionFa}</p>
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[color:var(--line-strong)] text-start">
              <th className="py-2 font-medium">کشور</th>
              {regionIndexLayers.map((item) => (
                <th key={item.id} className="py-2 font-medium">
                  {item.labelFa}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((country) => {
              const isSelected = country.id === selected.id;
              return (
                <tr
                  key={country.id}
                  className="cursor-pointer border-b border-[color:var(--line)] hover:bg-[color-mix(in_srgb,var(--power)_6%,transparent)]"
                  data-active={isSelected}
                  onClick={() => setSelectedId(country.id)}
                >
                  <td className="py-2">
                    <span className={isSelected ? "text-[color:var(--power)]" : ""}>
                      {country.nameFa}
                    </span>
                    <span
                      className="ms-2 text-xs opacity-50"
                      lang="en"
                      dir="ltr"
                    >
                      {country.nameEn}
                    </span>
                  </td>
                  {regionIndexLayers.map((item) => (
                    <td
                      key={item.id}
                      className="py-2 tabular-nums"
                      lang={item.id === "politicalFreedom" ? "fa" : "en"}
                      dir={item.id === "politicalFreedom" ? "rtl" : "ltr"}
                    >
                      {formatLayerValue(country, item.id)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 max-w-3xl text-xs leading-6 text-[color:var(--muted)]">
        {regionMapCopy.caveatFa}
      </p>
      <SourceCitations sourceIds={[...REGION_INDEX_SOURCE_IDS]} />
    </section>
  );
}

function labelOffset(iso3: string): [number, number] {
  switch (iso3) {
    case "BHR":
      return [18, 22];
    case "QAT":
      return [28, 8];
    case "KWT":
      return [-36, -10];
    case "ARE":
      return [36, 16];
    case "ARM":
      return [-28, -16];
    default:
      return [16, 0];
  }
}
