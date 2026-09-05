import type { Metadata } from "next";
import { JourneyContinue } from "@/components/layout/JourneyContinue";
import { PageShell } from "@/components/layout/PageShell";
import { sources } from "@/content/sources";

export const metadata: Metadata = {
  title: "درباره | سازوکار قدرت",
  description:
    "تجربه‌ای تعاملی برای دیدن سازوکار قدرت سیاسی؛ بدون تبلیغ ایدئولوژیک.",
};

export default function AboutPage() {
  return (
    <PageShell
      titleFa="درباره"
      titleEn="About"
      subtitleFa="سازوکار قدرت یک شیء فکری است، نه خبر، نه دانشنامه، نه پروپاگاندا."
    >
      <div className="max-w-2xl space-y-8 text-sm leading-7 md:text-base md:leading-8">
        <p>
          هدف این تجربه این نیست که به بازدیدکننده بگوید چه فکری دربارهٔ سیاست
          داشته باشد. هدف این است که نشان دهد قدرت چگونه میان افراد و نهادها
          حرکت می‌کند، محدود می‌شود، یا متمرکز می‌ماند.
        </p>
        <p>
          اصل بی‌طرفی: به‌جای قضاوت اخلاقی روی اسم نظام‌ها، سازوکار نهادی را
          نشان می‌دهیم. مثلاً به‌جای «دموکراسی خوب است»، می‌گوییم انتخابات رقابتی
          مسیری برای کنار گذاشتن حاکمان می‌سازد. ایران در همان چارچوب مقایسه‌ای
          کنار افغانستان، ویتنام، میانمار، ونزوئلا و مجارستان بررسی می‌شود — نه
          به‌عنوان استثنا، بلکه به‌عنوان یک مورد از مجموعهٔ نهادها.
        </p>
        <p>
          روش آموزشی در هر بخش: سؤال، تصویر شهودی، توضیح کوتاه، نمونه، بده‌بستان،
          و یک آزمایش کوچک.
        </p>

        <div className="text-[color:var(--ink-soft)]">
          <p>
            کاری داوطلبانه از{" "}
            <a
              href="https://danialkeshani.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:text-[color:var(--power)] hover:underline"
            >
              دانیال کشانی
            </a>{" "}
            و{" "}
            <a
              href="https://cubexic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:text-[color:var(--power)] hover:underline"
            >
              کیوبکس
            </a>
          </p>
          <p className="mt-3">
            تقدیم به زن ناشناس ۱۲۷۶۰ که نمی‌گذاریم در قلبمان ناشناس بماند. و به
            سارینا اسماعیل‌زاده.
          </p>
        </div>
      </div>

      <section
        className="mt-16 max-w-2xl rounded-[var(--radius-md)] bg-[color-mix(in_srgb,white_52%,var(--paper))] px-5 py-8 md:mt-20 md:px-7 md:py-10"
        aria-labelledby="about-sources"
      >
        <h2
          id="about-sources"
          className="font-display text-xl font-medium text-[color:var(--ink)]"
        >
          منابع مفهومی
        </h2>
        <ul className="mt-6 space-y-3 text-sm leading-7">
            {sources.map((s) => (
              <li
                key={s.id}
                className="border-t border-[color:var(--line)] pt-3"
              >
                <p className="font-medium">{s.titleFa}</p>
                <p className="text-xs opacity-60" lang="en" dir="ltr">
                  {s.titleEn}
                </p>
                {s.noteFa ? (
                  <p className="mt-1 text-[color:var(--muted)]">{s.noteFa}</p>
                ) : null}
                {s.url ? (
                  <p className="mt-1">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline-offset-2 hover:text-[color:var(--power)] hover:underline"
                    >
                      منبع
                    </a>
                  </p>
                ) : null}
              </li>
            ))}
        </ul>
      </section>
      <JourneyContinue currentHref="/about" />
    </PageShell>
  );
}
