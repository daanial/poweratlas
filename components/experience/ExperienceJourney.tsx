"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import { WhoRules } from "@/components/experience/WhoRules";
import { ExecutiveMachine } from "@/components/experience/ExecutiveMachine";
import { MonarchyRepublic } from "@/components/experience/MonarchyRepublic";
import { GreatConfusions } from "@/components/experience/GreatConfusions";
import { DeJureDeFacto } from "@/components/experience/DeJureDeFacto";
import { PowerConcentration } from "@/components/experience/PowerConcentration";
import {
  type ExperiencePath,
  VISIT_KEYS,
  readVisitFlag,
  writeVisitFlag,
} from "@/lib/visit-flags";

type Chapter = {
  id: string;
  titleFa: string;
  questionFa: string;
  takeawayFa: string;
  dense?: boolean;
  Component: ComponentType;
};

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶"];

const CHAPTERS: Chapter[] = [
  {
    id: "who-rules",
    titleFa: "برچسب‌ها و لایه‌ها",
    questionFa:
      "وقتی می‌گوییم یک کشور «جمهوری» یا «پادشاهی» است، واقعاً چه چیزی را گفته‌ایم؟",
    takeawayFa:
      "«چه کسی حکومت می‌کند» یک برچسب نیست؛ چند لایه است که هم‌زمان کار می‌کنند.",
    Component: WhoRules,
  },
  {
    id: "executive-machine",
    titleFa: "ماشین اجرا",
    questionFa: "اگر اسم نظام را بدانی، آیا می‌دانی چه کسی تصمیم می‌گیرد؟",
    takeawayFa:
      "تفاوت اصلی نظام‌ها این است که دولت به چه کسی پاسخ می‌دهد و چه کسی می‌تواند برکنارش کند.",
    Component: ExecutiveMachine,
  },
  {
    id: "monarchy-republic",
    titleFa: "پادشاهی و جمهوری",
    questionFa: "پادشاهی و جمهوری چه چیزی را روشن می‌کنند و چه چیزی را نه؟",
    takeawayFa:
      "این دو فقط می‌گویند رئیس کشور چگونه انتخاب می‌شود؛ دربارهٔ اندازهٔ قدرت او چیزی نمی‌گویند.",
    Component: MonarchyRepublic,
  },
  {
    id: "great-confusions",
    titleFa: "سردرگمی‌های بزرگ",
    questionFa: "کدام برچسب‌ها بیشتر از همه گمراه‌کننده‌اند؟",
    takeawayFa:
      "برچسب‌های آشنا بیشتر از آنکه توضیح دهند پنهان می‌کنند؛ باید پرسید چه کسی می‌تواند «نه» بگوید.",
    Component: GreatConfusions,
  },
  {
    id: "de-jure-de-facto",
    titleFa: "کاغذ و عمل",
    questionFa: "قانون چه می‌گوید، و زندگی سیاسی چه می‌کند؟",
    takeawayFa:
      "متن قانون و رفتار واقعی دو چیزند؛ استقلال روی کاغذ، تضمین استقلال در عمل نیست.",
    dense: true,
    Component: DeJureDeFacto,
  },
  {
    id: "power-concentration",
    titleFa: "طیف تمرکز",
    questionFa: "اگر تمرکز قدرت را جابه‌جا کنی، چه چیزی بزرگ می‌شود؟",
    takeawayFa:
      "هر جابه‌جایی تمرکز قدرت، چیزی را سریع‌تر و چیز دیگری را شکننده‌تر می‌کند.",
    dense: true,
    Component: PowerConcentration,
  },
];

function ChapterHead({
  n,
  total,
  chapter,
}: {
  n: number;
  total: number;
  chapter: Chapter;
}) {
  return (
    <header
      id={chapter.id}
      className="chapter-head section-block scroll-mt-24 pb-0"
    >
      <p className="eyebrow" data-tone="power">
        فصل {FA_DIGITS[n]} از {FA_DIGITS[total]} · {chapter.titleFa}
      </p>
      <p className="max-w-2xl font-display text-2xl leading-10 text-[color:var(--ink)] md:text-3xl md:leading-[1.5]">
        {chapter.questionFa}
      </p>
    </header>
  );
}

function ChapterTakeaway({ n, text }: { n: number; text: string }) {
  return (
    <aside className="section-block pt-0">
      <div className="result-card" data-tone="power">
        <p className="eyebrow" data-tone="power">
          از فصل {FA_DIGITS[n]} چه چیزی می‌ماند
        </p>
        <p className="text-[1.02rem] leading-9 text-[color:var(--ink)]">{text}</p>
      </div>
    </aside>
  );
}

function JourneyMap({
  chapters,
  activeIndex,
}: {
  chapters: Chapter[];
  activeIndex: number;
}) {
  return (
    <nav
      className="result-card mx-[clamp(1.25rem,4vw,2.5rem)] mt-6"
      aria-label="نقشهٔ مسیر"
    >
      <p className="eyebrow">نقشهٔ مسیر</p>
      <p className="mb-4 max-w-2xl text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
        {chapters.length} فصل، هر کدام یک پرسش. در پایان، در آزمایشگاه خودتان یک
        نظام می‌سازید و همین پرسش‌ها را روی ساختهٔ خودتان آزمایش می‌کنید.
      </p>
      <ol className="grid gap-2 md:grid-cols-2">
        {chapters.map((c, i) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className="journey-tile flex gap-3 no-underline"
              data-current={i === activeIndex ? "true" : "false"}
            >
              <span className="font-display text-lg text-[color:var(--power)]">
                {FA_DIGITS[i + 1]}
              </span>
              <span>
                <span className="block font-medium">{c.titleFa}</span>
                <span className="mt-1 block text-[0.9rem] leading-7 text-[color:var(--muted)]">
                  {c.questionFa}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ExperienceJourney() {
  const [path, setPath] = useState<ExperiencePath | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const stored = readVisitFlag(VISIT_KEYS.experiencePath);
    if (stored === "short" || stored === "full") setPath(stored);
    setHydrated(true);
  }, []);

  const chapters = useMemo(
    () => (path === "full" ? CHAPTERS : CHAPTERS.filter((c) => !c.dense)),
    [path],
  );

  useEffect(() => {
    if (!path) return;
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = chapters.findIndex((c) => c.id === entry.target.id);
          if (idx >= 0) setActiveIndex(idx);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    for (const el of sections) observer.observe(el);
    return () => observer.disconnect();
  }, [chapters, path]);

  function choose(next: ExperiencePath) {
    writeVisitFlag(VISIT_KEYS.experiencePath, next);
    setPath(next);
    setActiveIndex(0);
  }

  if (!hydrated) {
    return <div className="experience-journey min-h-[40vh]" />;
  }

  if (!path) {
    return (
      <section className="section-block" aria-labelledby="path-choice">
        <h2
          id="path-choice"
          className="font-display text-3xl font-medium md:text-5xl"
        >
          مسیر را انتخاب کن.
        </h2>
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
          این مسیر شما را قدم‌به‌قدم از برچسب نظام‌ها به جریان واقعی قدرت می‌برد.
          هر فصل با یک پرسش شروع می‌شود و با یک نتیجهٔ یک‌خطی تمام می‌شود. هر دو
          مسیر همان پرسش‌ها را می‌پرسند؛ مسیر کوتاه دو فصل فشرده‌تر را کنار
          می‌گذارد.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="result-card">
            <p className="font-display text-2xl md:text-3xl">مسیر ۱۰ دقیقه‌ای</p>
            <p className="mt-3 text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
              چهار فصل: برچسب‌ها و لایه‌ها، ماشین اجرا، پادشاهی و جمهوری،
              سردرگمی‌های بزرگ.
            </p>
            <button
              type="button"
              className="cta-primary mt-6"
              onClick={() => choose("short")}
            >
              شروع مسیر کوتاه
            </button>
          </div>
          <div className="result-card">
            <p className="font-display text-2xl md:text-3xl">
              مسیر کامل ۳۰ دقیقه‌ای
            </p>
            <p className="mt-3 text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
              همان چهار فصل، به‌علاوهٔ فاصلهٔ کاغذ و عمل، و طیف تمرکز قدرت.
            </p>
            <button
              type="button"
              className="cta-secondary mt-6"
              onClick={() => choose("full")}
            >
              شروع مسیر کامل
            </button>
          </div>
        </div>
        <p className="mt-10 text-[0.9rem] text-[color:var(--muted)]">
          واژه‌های تخصصی را روی خط‌چین بزن.{" "}
          <Link href="/glossary" className="underline-offset-2 hover:underline">
            واژه‌نامه
          </Link>
        </p>
      </section>
    );
  }

  const total = chapters.length;
  const activeChapter = chapters[activeIndex];

  return (
    <div className="experience-journey">
      <div className="chapter-bar">
        <p className="min-w-0 truncate">
          <span className="text-[color:var(--power)]">
            فصل {FA_DIGITS[activeIndex + 1]} از {FA_DIGITS[total]}
          </span>
          <span className="mx-2 opacity-30">·</span>
          {activeChapter?.titleFa}
        </p>
        <button
          type="button"
          className="lab-phase-btn shrink-0"
          onClick={() => setPath(null)}
        >
          {path === "short" ? "مسیر ۱۰ دقیقه‌ای" : "مسیر ۳۰ دقیقه‌ای"} · تغییر
        </button>
      </div>
      <div className="experience-progress" aria-hidden>
        <span style={{ transform: `scaleX(${(activeIndex + 1) / total})` }} />
      </div>

      <JourneyMap chapters={chapters} activeIndex={activeIndex} />

      {chapters.map((c, i) => {
        const Module = c.Component;
        return (
          <div key={c.id}>
            <ChapterHead n={i + 1} total={total} chapter={c} />
            <Module />
            <ChapterTakeaway n={i + 1} text={c.takeawayFa} />
          </div>
        );
      })}

      <section
        id="lab-cta"
        className="section-block border-t border-[color:var(--line)]"
      >
        <p className="eyebrow">پایان مسیر</p>
        <p className="font-display text-3xl font-medium md:text-4xl">
          حالا نوبت شماست.
        </p>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
          تا اینجا دیدید که برچسب‌ها کم می‌گویند و آنچه اهمیت دارد این است که چه
          کسی می‌تواند «نه» بگوید. در آزمایشگاه، همین را روی نظام ساختهٔ خودتان
          آزمایش می‌کنید: پنج قاعده را می‌چینید، اثر انگشت قدرتش را می‌بینید، و
          بعد در شش بحران تصمیم می‌گیرید.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/laboratory" className="cta-primary">
            رفتن به آزمایشگاه
          </Link>
          <span className="text-[0.9rem] text-[color:var(--muted)]">
            حدود ۱۰ دقیقه
          </span>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-2">
          <Link href="/atlas" className="journey-tile">
            <span className="block font-medium">اطلس قدرت</span>
            <span className="mt-1 block text-[0.9rem] leading-7 text-[color:var(--muted)]">
              همین نهادها را روی یک نقشه ببینید و لایه‌های رأی، اختیار و
              پاسخ‌گویی را جدا کنید.
            </span>
          </Link>
          <Link href="/countries" className="journey-tile">
            <span className="block font-medium">مقایسهٔ کشورها</span>
            <span className="mt-1 block text-[0.9rem] leading-7 text-[color:var(--muted)]">
              اثر انگشت نهادی کشورهای واقعی را کنار هم بگذارید.
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
