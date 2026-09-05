"use client";

import { fingerprintAxes } from "@/content/builder";
import type { Fingerprint } from "@/lib/political-model";

type PowerFingerprintProps = {
  fingerprint: Fingerprint;
  variant?: "bars" | "radial";
  className?: string;
  titleFa?: string;
};

export function PowerFingerprint({
  fingerprint,
  variant = "bars",
  className = "",
  titleFa,
}: PowerFingerprintProps) {
  if (variant === "radial") {
    return (
      <div className={className}>
        {titleFa ? (
          <h3 className="font-display mb-4 text-lg font-medium">{titleFa}</h3>
        ) : null}
        <RadialFingerprint fingerprint={fingerprint} />
      </div>
    );
  }

  return (
    <div className={className}>
      {titleFa ? (
        <h3 className="font-display mb-4 text-lg font-medium">{titleFa}</h3>
      ) : null}
      <ul className="space-y-3">
        {fingerprintAxes.map((axis) => {
          const value = fingerprint[axis.id] ?? 0;
          const pct = Math.round(value * 100);
          return (
            <li key={axis.id}>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span>
                  {axis.labelFa}
                  <span
                    className="ms-2 text-[0.65rem] tracking-wide opacity-50"
                    lang="en"
                    dir="ltr"
                  >
                    {axis.labelEn}
                  </span>
                </span>
                <span className="tabular-nums text-xs text-[color:var(--muted)]">
                  {pct}
                </span>
              </div>
              <div className="fingerprint-bar" aria-hidden>
                <span style={{ width: `${pct}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-xs leading-6 text-[color:var(--muted)]">
        هر محور توصیف توزیع قدرت است. هیچ امتیاز واحد یا رتبه‌بندی اخلاقی وجود ندارد.
      </p>
    </div>
  );
}

function RadialFingerprint({ fingerprint }: { fingerprint: Fingerprint }) {
  const cx = 50;
  const cy = 50;
  const r = 36;
  const n = fingerprintAxes.length;
  const points = fingerprintAxes.map((axis, i) => {
    const value = fingerprint[axis.id] ?? 0;
    const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const rr = r * value;
    return {
      axis,
      value,
      x: cx + Math.cos(angle) * rr,
      y: cy + Math.sin(angle) * rr,
      lx: cx + Math.cos(angle) * (r + 8),
      ly: cy + Math.sin(angle) * (r + 8),
      ox: cx + Math.cos(angle) * r,
      oy: cy + Math.sin(angle) * r,
    };
  });
  const poly = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="mx-auto w-full max-w-md">
      <svg viewBox="0 0 100 100" className="h-auto w-full" role="img" aria-label="اثر انگشت چندبُعدی قدرت">
        <title>اثر انگشت قدرت</title>
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <circle
            key={t}
            cx={cx}
            cy={cy}
            r={r * t}
            fill="none"
            stroke="var(--line)"
            strokeWidth={0.2}
          />
        ))}
        {points.map((p) => (
          <line
            key={p.axis.id}
            x1={cx}
            y1={cy}
            x2={p.ox}
            y2={p.oy}
            stroke="var(--line)"
            strokeWidth={0.2}
          />
        ))}
        <polygon
          points={poly}
          fill="color-mix(in srgb, var(--power) 18%, transparent)"
          stroke="var(--power)"
          strokeWidth={0.45}
        />
      </svg>
      <ul className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
        {fingerprintAxes.map((axis) => (
          <li key={axis.id} className="text-[0.65rem] text-[color:var(--muted)]">
            {axis.labelFa}
            <span className="ms-1 tabular-nums opacity-70">
              {Math.round((fingerprint[axis.id] ?? 0) * 100)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
