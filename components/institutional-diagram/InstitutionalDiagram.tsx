"use client";

import { useCallback, useId, useMemo, useState } from "react";
import {
  diagramNodes,
  diagramRelations,
  nodeFocusEdges,
  type DiagramNode,
} from "@/content/opening";

function edgeKey(from: string, to: string) {
  return `${from}->${to}`;
}

function isHighlighted(
  activeId: string | null,
  from: string,
  to: string,
): boolean {
  if (!activeId) return false;
  const pairs = nodeFocusEdges[activeId] ?? [];
  return pairs.some(([a, b]) => a === from && b === to);
}

function relatedNodeIds(activeId: string | null): Set<string> {
  if (!activeId) return new Set();
  const related = new Set<string>([activeId]);
  for (const [a, b] of nodeFocusEdges[activeId] ?? []) {
    related.add(a);
    related.add(b);
  }
  return related;
}

type InstitutionalDiagramProps = {
  interactive?: boolean;
  className?: string;
  /** Called when the user focuses a node; useful for parent choreography. */
  onActiveChange?: (id: string | null) => void;
};

export function InstitutionalDiagram({
  interactive = true,
  className = "",
  onActiveChange,
}: InstitutionalDiagramProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const titleId = useId();
  const related = useMemo(() => relatedNodeIds(activeId), [activeId]);
  const activeNode = diagramNodes.find((n) => n.id === activeId) ?? null;

  const setActive = useCallback(
    (id: string | null) => {
      setActiveId(id);
      onActiveChange?.(id);
    },
    [onActiveChange],
  );

  const handleActivate = (id: string) => {
    if (!interactive) return;
    setActive(activeId === id ? null : id);
  };

  return (
    <div
      className={`relative w-full ${className}`}
      role="region"
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="sr-only">
        نقشهٔ نهادی قدرت
      </h2>

      {/* Mobile: vertical stack */}
      <div className="flex flex-col gap-3 md:hidden" data-diagram-mode="stack">
        {diagramNodes.map((node, index) => (
          <div key={node.id} className="flex flex-col items-center gap-2">
            <NodeButton
              node={node}
              active={activeId === node.id}
              dimmed={Boolean(activeId && !related.has(node.id))}
              interactive={interactive}
              onActivate={() => handleActivate(node.id)}
            />
            {index < diagramNodes.length - 1 ? (
              <span className="chain-connector h-6" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>

      {/* Desktop: spatial map */}
      <div
        className="relative mx-auto hidden aspect-[5/4] w-full max-w-3xl md:block"
        data-diagram-mode="spatial"
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          role="img"
          aria-label="روابط میان نهادهای سیاسی"
        >
          <title>روابط نهادی</title>
          {diagramRelations.map((rel) => {
            const from = diagramNodes.find((n) => n.id === rel.from);
            const to = diagramNodes.find((n) => n.id === rel.to);
            if (!from || !to) return null;
            const lit = isHighlighted(activeId, rel.from, rel.to);
            const dimmed = Boolean(activeId && !lit);
            return (
              <g key={edgeKey(rel.from, rel.to)}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={lit ? "var(--power)" : "var(--line-strong)"}
                  strokeWidth={lit ? 0.55 : 0.28}
                  strokeOpacity={dimmed ? 0.2 : lit ? 0.95 : 0.55}
                  strokeLinecap="round"
                />
                <title>{`${from.labelFa} ← ${rel.labelFa} → ${to.labelFa}`}</title>
              </g>
            );
          })}
        </svg>

        {diagramNodes.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <NodeButton
              node={node}
              active={activeId === node.id}
              dimmed={Boolean(activeId && !related.has(node.id))}
              interactive={interactive}
              onActivate={() => handleActivate(node.id)}
            />
          </div>
        ))}
      </div>

      <div
        className="mx-auto mt-6 min-h-[4.5rem] max-w-xl px-1 text-center"
        aria-live="polite"
      >
        {activeNode ? (
          <p className="text-sm leading-7 text-[color:var(--muted)] md:text-base md:leading-8">
            <span className="mb-1 block font-medium text-[color:var(--foreground)]">
              {activeNode.labelFa}
              <span
                className="ms-2 text-xs font-normal tracking-wide opacity-60"
                lang="en"
                dir="ltr"
              >
                {activeNode.labelEn}
              </span>
            </span>
            {activeNode.explanationFa}
          </p>
        ) : (
          <p className="text-sm leading-7 text-[color:var(--muted)] md:text-base">
            روی هر نهاد بزنید تا ببینید قدرت از کجا می‌آید و چه کسی می‌تواند آن
            را محدود کند.
          </p>
        )}
      </div>
    </div>
  );
}

function NodeButton({
  node,
  active,
  dimmed,
  interactive,
  onActivate,
}: {
  node: DiagramNode;
  active: boolean;
  dimmed: boolean;
  interactive: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      className="diagram-node min-w-[7.5rem] px-3 py-2.5 text-center"
      data-role={node.role}
      data-active={active ? "true" : "false"}
      data-dimmed={dimmed ? "true" : "false"}
      data-node-id={node.id}
      aria-pressed={active}
      disabled={!interactive}
      onClick={onActivate}
    >
      <span className="block text-sm font-medium leading-none md:text-base">
        {node.labelFa}
      </span>
      <span
        className="mt-1 block text-[0.65rem] tracking-wide opacity-55"
        lang="en"
        dir="ltr"
      >
        {node.labelEn}
      </span>
    </button>
  );
}
