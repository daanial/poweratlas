export function WhyThisMatters({ bodyFa }: { bodyFa: string }) {
  return (
    <aside className="why-matters mt-10">
      <p className="text-xs tracking-wide text-[color:var(--institution)]">
        چرا این مهم است
      </p>
      <p className="mt-3 max-w-2xl font-display text-lg leading-9 text-[color:var(--ink-soft)] md:text-xl md:leading-10">
        {bodyFa}
      </p>
    </aside>
  );
}
