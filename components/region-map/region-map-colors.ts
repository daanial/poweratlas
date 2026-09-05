import { clamp, lerp } from "@/lib/visualization-utils";

/** cream-dim → law → institution → ink */
const STOPS: readonly (readonly [number, readonly [number, number, number]])[] =
  [
    [0, [229, 223, 210]],
    [0.33, [92, 83, 70]],
    [0.66, [74, 85, 96]],
    [1, [20, 18, 16]],
  ];

export function colorForNormalized(t: number): string {
  const x = clamp(t, 0, 1);
  let i = 0;
  while (i < STOPS.length - 2 && x > STOPS[i + 1][0]) i += 1;
  const [t0, a] = STOPS[i];
  const [t1, b] = STOPS[i + 1];
  const local = t1 === t0 ? 0 : (x - t0) / (t1 - t0);
  const r = Math.round(lerp(a[0], b[0], local));
  const g = Math.round(lerp(a[1], b[1], local));
  const bl = Math.round(lerp(a[2], b[2], local));
  return `rgb(${r} ${g} ${bl})`;
}

export function formatWgiEstimate(value: number): string {
  const abs = Math.abs(value).toFixed(2);
  return value < 0 ? `−${abs}` : value > 0 ? `+${abs}` : "0.00";
}
