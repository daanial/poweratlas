"use client";

import { useId, useState } from "react";
import { confusions } from "@/content/systems";
import { ConfusionDiagram } from "@/components/experience/ConfusionDiagram";
import { ModuleTerms } from "@/components/ui/GlossaryChip";
import { WhyThisMatters } from "@/components/ui/WhyThisMatters";

export function GreatConfusions() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const headingId = useId();

  const toggle = (id: string) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="great-confusions"
      className="section-block"
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="mt-2 font-display text-3xl font-medium leading-tight md:text-5xl"
      >
        اسم نظام کافی نیست
      </h2>
      <p className="mt-2 text-sm text-[color:var(--muted)]" lang="en" dir="ltr">
        Labels are not enough
      </p>
      <p className="mt-4 max-w-xl text-sm leading-7 text-[color:var(--ink-soft)]">
        روی هر کارت بزن تا تفکیک روشن شود.
      </p>
      <ModuleTerms termIds={["federalism", "referendum", "self-coup"]} />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {confusions.map((card) => {
          const open = Boolean(flipped[card.id]);
          return (
            <button
              key={card.id}
              type="button"
              className="relative min-h-[15rem] border border-[color:var(--line-strong)] rounded-xl bg-transparent p-0 text-start [perspective:900px]"
              aria-expanded={open}
              onClick={() => toggle(card.id)}
            >
              <span className="sr-only">
                {open ? "پنهان کردن توضیح" : "نمایش توضیح"}
              </span>
              <span
                className={`relative block h-full min-h-[15rem] w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none ${
                  open ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                <span className="absolute inset-0 flex flex-col justify-between p-5 [backface-visibility:hidden]">
                  <span className="font-display text-xl leading-8 md:text-2xl">
                    {card.statementFa}
                  </span>
                  <span className="text-xs text-[color:var(--muted)]">
                    ادامه مطلب
                  </span>
                </span>
                <span className="absolute inset-0 flex flex-col justify-between bg-[color-mix(in_srgb,var(--power)_8%,var(--paper))] p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <span className="text-sm leading-7 text-[color:var(--ink-soft)]">
                    {card.revealFa}
                  </span>
                  <span className="mt-2 block">
                    <ConfusionDiagram id={card.id} />
                    <span className="mt-1 block text-[0.7rem] leading-5 text-[color:var(--institution)]">
                      {card.visualHintFa}
                    </span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <WhyThisMatters bodyFa="این سردرگمی‌ها همان چیزی‌اند که باعث می‌شوند دو نفر دربارهٔ یک کشور واحد برداشت‌های کاملاً متضاد داشته باشند — چون یکی به برچسب نگاه می‌کند و دیگری به عملکرد واقعی." />
    </section>
  );
}
