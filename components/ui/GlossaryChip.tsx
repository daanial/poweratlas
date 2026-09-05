"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { glossary, glossaryById } from "@/content/glossary";

export function GlossaryChip({
  id,
  label,
}: {
  id: string;
  label?: string;
}) {
  const term = glossaryById[id];
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const panelId = useId();
  const buttonId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [close, open]);

  if (!term) return <>{label ?? id}</>;

  return (
    <span ref={wrapRef} className="relative inline">
      <button
        id={buttonId}
        type="button"
        className="glossary-chip"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {label ?? term.termFa}
      </button>
      {open ? (
        <span
          id={panelId}
          role="tooltip"
          aria-labelledby={buttonId}
          className="glossary-pop"
        >
          <span className="block font-display text-sm text-[color:var(--ink)]">
            {term.termFa}
          </span>
          <span
            className="mt-0.5 block text-[0.65rem] tracking-wide opacity-55"
            lang="en"
            dir="ltr"
          >
            {term.termEn}
          </span>
          <span className="mt-2 block text-xs leading-6 text-[color:var(--ink-soft)]">
            {term.shortDefFa}
          </span>
        </span>
      ) : null}
    </span>
  );
}

/** Wrap the first occurrence of each listed term in `text`. */
export function GlossedText({
  text,
  termIds,
}: {
  text: string;
  termIds: string[];
}) {
  const nodes: ReactNode[] = [];
  let remaining = text;
  const used = new Set<string>();
  let guard = 0;

  while (guard < termIds.length) {
    guard += 1;
    let best: { id: string; idx: number; len: number } | null = null;
    for (const id of termIds) {
      if (used.has(id)) continue;
      const term = glossaryById[id];
      if (!term) continue;
      const idx = remaining.indexOf(term.termFa);
      if (idx === -1) continue;
      if (!best || idx < best.idx) {
        best = { id, idx, len: term.termFa.length };
      }
    }
    if (!best) break;
    if (best.idx > 0) nodes.push(remaining.slice(0, best.idx));
    nodes.push(<GlossaryChip key={best.id} id={best.id} />);
    remaining = remaining.slice(best.idx + best.len);
    used.add(best.id);
  }
  if (remaining) nodes.push(remaining);
  return <>{nodes}</>;
}

export function ModuleTerms({ termIds }: { termIds: string[] }) {
  const terms = termIds
    .map((id) => glossaryById[id] ?? glossary.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  if (terms.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {terms.map((t) => (
        <GlossaryChip key={t.id} id={t.id} />
      ))}
    </div>
  );
}
