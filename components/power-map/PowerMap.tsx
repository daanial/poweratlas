"use client";

import {
  useCallback,
  useId,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  powerMapEdges,
  powerMapNodes,
  powerMapNodesById,
} from "@/content/power-map";
import type { PowerMapEdgeKind, PowerMapNode } from "@/content/types";
import Link from "next/link";
import { SpotlightTour } from "@/components/ui/SpotlightTour";
import { VISIT_KEYS } from "@/lib/visit-flags";

const KIND_LABEL: Record<PowerMapEdgeKind, string> = {
  votes: "رأی",
  authority: "اختیار",
  accountability: "پاسخ‌گویی",
  information: "اطلاعات",
  coercion: "اجبار",
};

/** Which builder rule in the laboratory actually moves this node. */
const LAB_RULE: Record<string, string> = {
  elections: "قاعدهٔ «انتخابات» را عوض کنید",
  parliament: "قاعدهٔ «قوهٔ مقننه» را عوض کنید",
  government: "قاعدهٔ «رئیس دولت» را عوض کنید",
  president: "قاعدهٔ «رئیس کشور» را عوض کنید",
  primeMinister: "قاعدهٔ «رئیس دولت» را عوض کنید",
  monarch: "قاعدهٔ «رئیس کشور» را عوض کنید",
  courts: "قاعدهٔ «قوهٔ قضائیه» را عوض کنید",
  constitution: "قاعدهٔ «قانون اساسی» را عوض کنید",
  media: "قاعدهٔ «رسانه» را عوض کنید",
  military: "قاعدهٔ «اختیارات اضطراری» را عوض کنید",
};

const KIND_STROKE: Record<PowerMapEdgeKind, string> = {
  authority: "var(--institution)",
  votes: "var(--power)",
  information: "var(--law)",
  accountability: "var(--ink-soft)",
  coercion: "var(--power)",
};

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function relatedIds(activeId: string | null): Set<string> {
  if (!activeId) return new Set();
  const related = new Set<string>([activeId]);
  for (const edge of powerMapEdges) {
    if (edge.from === activeId || edge.to === activeId) {
      related.add(edge.from);
      related.add(edge.to);
    }
  }
  return related;
}

function edgeLit(activeId: string | null, from: string, to: string): boolean {
  if (!activeId) return false;
  return from === activeId || to === activeId;
}

function PowerMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [kind, setKind] = useState<PowerMapEdgeKind | null>(null);
  const titleId = useId();
  const reduced = usePrefersReducedMotion();
  const related = useMemo(() => relatedIds(activeId), [activeId]);
  const activeNode = activeId ? (powerMapNodesById[activeId] ?? null) : null;

  const handleActivate = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const animateFlows = !reduced && !activeId;

  return (
    <div className="power-map" role="region" aria-labelledby={titleId}>
      <SpotlightTour
        storageKey={VISIT_KEYS.atlasTour}
        steps={[
          {
            target: '[data-tour="atlas-nodes"]',
            titleFa: "یک نهاد را انتخاب کن",
            bodyFa: "روی هر گره بزن. همین کافی است تا ببینی قدرت از کجا می‌آید و به کجا می‌رود.",
          },
          {
            target: '[data-tour="atlas-edges"]',
            titleFa: "یال‌های مرتبط روشن می‌شوند",
            bodyFa: "وقتی نهادی انتخاب شود، فقط جریان‌های وصل به آن باقی می‌مانند؛ بقیه کم‌نور می‌شوند.",
          },
          {
            target: '[data-tour="atlas-questions"]',
            titleFa: "پرسش‌های قدرت همین‌جا می‌آیند",
            bodyFa:
              "با انتخاب نهاد، پرسش‌ها و توضیح کوتاه زیر نقشه ظاهر می‌شوند.",
          },
        ]}
      />
      <h2 id={titleId} className="sr-only">
        نقشهٔ تعاملی جریان قدرت
      </h2>

      <div className="relative mx-auto hidden aspect-square w-full max-w-3xl md:block lg:aspect-[5/4]" data-tour="atlas-nodes">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          role="img"
          aria-label="یال‌های جریان قدرت میان نهادها"
          data-tour="atlas-edges"
        >
          <title>جریان قدرت</title>
          {powerMapEdges.map((edge) => {
            const from = powerMapNodesById[edge.from];
            const to = powerMapNodesById[edge.to];
            if (!from || !to) return null;
            if (kind && edge.kind !== kind) return null;
            const lit = edgeLit(activeId, edge.from, edge.to);
            const dimmed = Boolean(activeId && !lit);
            const stroke = KIND_STROKE[edge.kind];
            return (
              <g key={edge.id}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={lit ? "var(--power)" : stroke}
                  strokeWidth={lit ? 0.55 : 0.28}
                  strokeOpacity={dimmed ? 0.12 : lit ? 0.95 : 0.4}
                  strokeLinecap="round"
                  strokeDasharray={
                    edge.kind === "information" ? "0.8 0.6" : undefined
                  }
                />
                {animateFlows ? (
                  <circle
                    r={0.45}
                    fill={stroke}
                    className="flow-dot"
                    style={{
                      offsetPath: `path('M ${from.x} ${from.y} L ${to.x} ${to.y}')`,
                      animationDelay: `${(edge.id.length % 5) * 0.35}s`,
                      animationDuration:
                        edge.kind === "coercion" ? "3s" : "5s",
                    }}
                  />
                ) : null}
                <title>
                  {`${from.labelFa}${edge.labelFa ? ` · ${edge.labelFa} · ` : " → "}${to.labelFa}`}
                </title>
              </g>
            );
          })}
        </svg>

        {powerMapNodes.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <MapNodeButton
              node={node}
              active={activeId === node.id}
              dimmed={Boolean(activeId && !related.has(node.id))}
              onActivate={() => handleActivate(node.id)}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 md:hidden" data-map-mode="list">
        {powerMapNodes.map((node) => (
          <MapNodeButton
            key={node.id}
            node={node}
            active={activeId === node.id}
            dimmed={Boolean(activeId && !related.has(node.id))}
            onActivate={() => handleActivate(node.id)}
            fullWidth
          />
        ))}
      </div>

      <div
        className="mx-auto mt-8 min-h-[7rem] max-w-2xl border-t border-[color:var(--line)] pt-6"
        aria-live="polite"
        data-tour="atlas-questions"
      >
        {activeNode ? (
          <NodeDetail
            node={activeNode}
            onClear={() => setActiveId(null)}
          />
        ) : (
          <p className="text-center text-sm leading-7 text-[color:var(--muted)] md:text-base">
            روی هر نهاد بزنید تا روابط مرتبط روشن شود و پرسش‌های قدرت آشکار گردد.
            <span
              className="mt-1 block text-xs tracking-wide opacity-55"
              lang="en"
              dir="ltr"
            >
              Select a node to focus related flows.
            </span>
          </p>
        )}
      </div>

      <div className="mt-8 border-t border-[color:var(--line)] pt-5">
        <p className="eyebrow">یک لایه از قدرت را جدا ببینید</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="lab-phase-btn"
            data-current={kind === null ? "true" : "false"}
            onClick={() => setKind(null)}
          >
            همهٔ جریان‌ها
          </button>
          {(
            [
              "votes",
              "authority",
              "accountability",
              "information",
              "coercion",
            ] as const
          ).map((k) => (
            <button
              key={k}
              type="button"
              className="lab-phase-btn inline-flex items-center gap-2"
              data-current={kind === k ? "true" : "false"}
              onClick={() => setKind((prev) => (prev === k ? null : k))}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: KIND_STROKE[k] }}
                aria-hidden
              />
              {KIND_LABEL[k]}
            </button>
          ))}
        </div>
        {kind ? (
          <p className="mt-3 text-[0.9rem] leading-7 text-[color:var(--muted)]">
            فقط جریان‌های «{KIND_LABEL[kind]}» نشان داده می‌شود
            {" · "}
            {powerMapEdges.filter((e) => e.kind === kind).length} مسیر در این نقشه
          </p>
        ) : null}
      </div>
    </div>
  );
}

function MapNodeButton({
  node,
  active,
  dimmed,
  onActivate,
  fullWidth = false,
}: {
  node: PowerMapNode;
  active: boolean;
  dimmed: boolean;
  onActivate: () => void;
  fullWidth?: boolean;
}) {
  return (
    <button
      type="button"
      className={`diagram-node px-2.5 py-2 text-center ${fullWidth ? "w-full min-w-0" : "min-w-[5.5rem] max-w-[7.5rem]"}`}
      data-active={active ? "true" : "false"}
      data-dimmed={dimmed ? "true" : "false"}
      data-node-id={node.id}
      aria-pressed={active}
      onClick={onActivate}
    >
      <span className="block text-xs font-medium leading-tight md:text-sm">
        {node.labelFa}
      </span>
      <span
        className="mt-0.5 block text-[0.55rem] tracking-wide opacity-55"
        lang="en"
        dir="ltr"
      >
        {node.labelEn}
      </span>
    </button>
  );
}

function NodeDetail({
  node,
  onClear,
}: {
  node: PowerMapNode;
  onClear: () => void;
}) {
  const incoming = powerMapEdges
    .filter((e) => e.to === node.id)
    .map((e) => ({
      id: e.id,
      kind: e.kind,
      labelFa: e.labelFa,
      otherFa: powerMapNodesById[e.from]?.labelFa ?? e.from,
    }));
  const outgoing = powerMapEdges
    .filter((e) => e.from === node.id)
    .map((e) => ({
      id: e.id,
      kind: e.kind,
      labelFa: e.labelFa,
      otherFa: powerMapNodesById[e.to]?.labelFa ?? e.to,
    }));

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-medium text-[color:var(--ink)]">
          {node.labelFa}
          <span
            className="ms-2 text-xs font-normal tracking-wide opacity-55"
            lang="en"
            dir="ltr"
          >
            {node.labelEn}
          </span>
        </h3>
        <button
          type="button"
          className="text-xs text-[color:var(--muted)] underline-offset-2 hover:underline"
          onClick={onClear}
        >
          پاک کردن تمرکز
        </button>
      </div>

      <p className="text-[0.95rem] leading-8 text-[color:var(--ink-soft)] md:text-base">
        {node.explanationFa}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <FlowList
          titleFa="قدرت از اینجا می‌آید"
          rows={incoming}
          direction="in"
        />
        <FlowList
          titleFa="قدرت به اینجا می‌رود"
          rows={outgoing}
          direction="out"
        />
      </div>

      {node.questionsFa.length > 0 ? (
        <div className="mt-5">
          <p className="eyebrow">پرسش‌هایی که باید بپرسید</p>
          <ul className="space-y-2 text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
            {node.questionsFa.map((q) => (
              <li key={q} className="border-s-2 border-[color:var(--power)] ps-3">
                {q}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {LAB_RULE[node.id] ? (
        <p className="mt-5 border-t border-[color:var(--line)] pt-4 text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
          می‌خواهید ببینید اگر این گره ضعیف یا قوی شود چه می‌شود؟ در آزمایشگاه{" "}
          {LAB_RULE[node.id]}.{" "}
          <Link href="/laboratory" className="text-[color:var(--power)] underline-offset-4 hover:underline">
            رفتن به آزمایشگاه
          </Link>
        </p>
      ) : null}
    </div>
  );
}

function FlowList({
  titleFa,
  rows,
  direction,
}: {
  titleFa: string;
  rows: { id: string; kind: PowerMapEdgeKind; labelFa?: string; otherFa: string }[];
  direction: "in" | "out";
}) {
  return (
    <div className="result-card">
      <p className="eyebrow">{titleFa}</p>
      {rows.length === 0 ? (
        <p className="text-[0.9rem] text-[color:var(--muted)]">
          در این نقشه مسیری ثبت نشده است.
        </p>
      ) : (
        <ul className="space-y-2 text-[0.95rem] leading-7">
          {rows.map((row) => (
            <li key={row.id} className="flex flex-wrap items-baseline gap-x-2">
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ background: KIND_STROKE[row.kind] }}
                aria-hidden
              />
              <span className="font-medium">{row.otherFa}</span>
              <span className="text-[0.85rem] text-[color:var(--muted)]">
                {direction === "in" ? "→" : "←"} {row.labelFa ?? KIND_LABEL[row.kind]}
                <span className="mx-1 opacity-40">·</span>
                {KIND_LABEL[row.kind]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PowerMap;
