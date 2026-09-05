export function ContestedNote({ noteFa }: { noteFa: string }) {
  return (
    <aside className="contested-note mt-5" aria-label="اختلاف نظر">
      <p className="text-xs font-medium tracking-wide text-[color:var(--institution)]">
        اختلاف نظر
      </p>
      <p className="mt-2 text-sm leading-7 text-[color:var(--ink-soft)]">
        {noteFa}
      </p>
    </aside>
  );
}
