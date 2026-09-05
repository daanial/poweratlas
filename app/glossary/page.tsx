import type { Metadata } from "next";
import { JourneyContinue } from "@/components/layout/JourneyContinue";
import { PageShell } from "@/components/layout/PageShell";
import { glossary } from "@/content/glossary";
import { GlossaryChip } from "@/components/ui/GlossaryChip";

export const metadata: Metadata = {
  title: "واژه‌نامه | سازوکار قدرت",
  description: "سی اصطلاح برای خواندن نقشهٔ قدرت، بدون پیش‌فرض تخصصی.",
};

export default function GlossaryPage() {
  return (
    <PageShell
      titleFa="واژه‌نامه"
      titleEn="Glossary"
      subtitleFa="اصطلاح‌هایی که در مسیر تجربه ظاهر می‌شوند؛ روی هر کدام بزن تا تعریف کوتاه باز شود."
    >
      <ul className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
        {glossary.map((term) => (
          <li
            key={term.id}
            className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8"
          >
            <div>
              <GlossaryChip id={term.id} />
              <p
                className="mt-1 text-[0.7rem] tracking-wide opacity-55"
                lang="en"
                dir="ltr"
              >
                {term.termEn}
              </p>
            </div>
            <p className="text-sm leading-7 text-[color:var(--ink-soft)]">
              {term.shortDefFa}
            </p>
          </li>
        ))}
      </ul>
      <JourneyContinue currentHref="/glossary" />
    </PageShell>
  );
}
