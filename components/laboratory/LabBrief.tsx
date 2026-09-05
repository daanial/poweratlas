"use client";

import { useEffect, useState } from "react";
import { VISIT_KEYS, readVisitFlag, writeVisitFlag } from "@/lib/visit-flags";

const STEPS = [
  {
    n: "۱",
    titleFa: "بساز",
    bodyFa: "به پنج پرسش دربارهٔ قواعد پاسخ می‌دهید: رئیس کشور کیست، دولت چگونه انتخاب می‌شود، مجلس چقدر قدرت دارد.",
  },
  {
    n: "۲",
    titleFa: "نتیجه",
    bodyFa: "همان قواعد به یازده سنجهٔ توصیفی ترجمه می‌شود: اثر انگشت قدرتِ نظامی که ساخته‌اید.",
  },
  {
    n: "۳",
    titleFa: "بحران",
    bodyFa: "نظام شما در شش بحران واقعی آزمایش می‌شود. هر تصمیم، پیامد و درس نهادی خودش را دارد.",
  },
];

export function LabBrief({ onSeen }: { onSeen: () => void }) {
  const [open, setOpen] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const seen = readVisitFlag(VISIT_KEYS.labBrief) === "seen";
    setOpen(!seen);
    if (seen) onSeen();
    setHydrated(true);
  }, [onSeen]);

  function dismiss() {
    writeVisitFlag(VISIT_KEYS.labBrief, "seen");
    setOpen(false);
    onSeen();
  }

  if (!hydrated) return null;

  if (!open) {
    return (
      <button
        type="button"
        className="lab-phase-btn mb-5"
        onClick={() => setOpen(true)}
      >
        آزمایشگاه چیست؟
      </button>
    );
  }

  return (
    <section className="result-card mb-8" aria-label="راهنمای آزمایشگاه">
      <p className="eyebrow">پیش از شروع</p>
      <h2 className="font-display text-xl font-medium md:text-2xl">
        اینجا یک نظام سیاسی می‌سازید و آن را زیر فشار می‌گذارید.
      </h2>
      <p className="mt-3 max-w-2xl text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
        هیچ پاسخ درستی وجود ندارد. هر قاعده‌ای که انتخاب می‌کنید چیزی را آسان و
        چیز دیگری را سخت می‌کند؛ آزمایشگاه فقط همان معامله را نشان می‌دهد.
      </p>

      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {STEPS.map((s) => (
          <li key={s.n} className="border-t border-[color:var(--line)] pt-3">
            <p className="eyebrow" data-tone="power">
              {s.titleFa} · {s.n}
            </p>
            <p className="text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
              {s.bodyFa}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="button" className="cta-primary" onClick={dismiss}>
          شروع کنیم
        </button>
        <p className="text-[0.85rem] text-[color:var(--muted)]">
          حدود ۱۰ دقیقه · می‌توانید هر لحظه عقب برگردید و قاعده‌ای را عوض کنید.
        </p>
      </div>
    </section>
  );
}
