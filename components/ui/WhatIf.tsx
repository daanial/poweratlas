type WhatIfProps = {
  titleFa: string;
  bodyFa: string;
  className?: string;
};

export function WhatIf({ titleFa, bodyFa, className = "" }: WhatIfProps) {
  return (
    <aside
      className={`border border-[color:var(--line)] rounded-xl bg-[color-mix(in_srgb,white_40%,var(--paper))] p-4 ${className}`}
    >
      <p className="font-display text-base font-medium text-[color:var(--ink)]">
        {titleFa}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]">
        {bodyFa}
      </p>
    </aside>
  );
}
