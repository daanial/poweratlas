import Link from "next/link";
import { continuationFor } from "@/content/journey";

export function JourneyContinue({ currentHref }: { currentHref: string }) {
  const { primary, secondaryHref, secondaryLabelFa } =
    continuationFor(currentHref);

  return (
    <section className="mt-16 border-t border-[color:var(--line)] pt-10">
      <p className="text-xs text-[color:var(--muted)]">بعد از این</p>
      <p className="mt-2 font-display text-2xl font-medium">{primary.labelFa}</p>
      <p className="mt-2 max-w-lg text-sm leading-7 text-[color:var(--ink-soft)]">
        {primary.descFa}
        {primary.minutesFa ? (
          <>
            <span className="mx-1.5 opacity-40">·</span>
            {primary.minutesFa}
          </>
        ) : null}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link href={primary.href} className="cta-primary">
          {primary.labelFa}
        </Link>
        <Link
          href={secondaryHref}
          className="text-xs text-[color:var(--muted)] underline-offset-2 hover:underline"
        >
          {secondaryLabelFa}
        </Link>
      </div>
    </section>
  );
}
