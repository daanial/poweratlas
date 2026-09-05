import Link from "next/link";
import {
  politicalEras,
  politicalQuotes,
  politicalTraditions,
  traditionComparison,
} from "@/content/political-thought";

/** Long-form companion piece at the end of the atlas: where the "votes /
 * authority / accountability" wiring above actually comes from — the old
 * argument between politics-as-ethics and politics-as-power. */
export function PoliticalThoughtEssay() {
  return (
    <section className="mt-20 md:mt-28" aria-labelledby="political-thought-heading">
      <div className="max-w-2xl">
        <p className="eyebrow" data-tone="power">
          متن همراه
        </p>
        <h2
          id="political-thought-heading"
          className="font-display text-2xl font-medium leading-tight text-[color:var(--ink)] md:text-3xl"
        >
          خاستگاه و سیر اندیشهٔ سیاسی
        </h2>
        <p className="mt-1 text-sm tracking-wide text-[color:var(--muted)]" lang="en" dir="ltr">
          Foundations and Evolution of Political Thought
        </p>

        <div className="mt-6 space-y-5 text-sm leading-7 text-[color:var(--ink-soft)] md:text-base md:leading-8">
          <p>
            سیاست از یک محدودیت خام انسانی زاده می‌شود: تجربهٔ بشری هرگز همهٔ
            آنچه را می‌خواهیم در اختیارمان نمی‌گذارد. کمیابی، رقابت را ناگزیر
            می‌کند و رقابت به زبانی نیاز دارد که ادعاها را توجیه کند — این زبان
            همان سیاست است؛ سازوکاری که تعیین می‌کند چه کسی چه چیزی، کجا، کِی و
            چگونه به دست می‌آورد.
          </p>
          <p>
            یک سنت، سیاست را به همین پرسش توزیع فرو می‌کاهد. سنت دیگر، از
            ارسطو به این‌سو، آن را برترین فعالیت انسانی می‌داند: انسان
            «بالطبع حیوانی سیاسی» است، و جامعهٔ سیاسی نه برای همنشینی صرف، بلکه
            برای «کنش‌های نیک» و تعیین جمعی قواعد زندگی مشترک وجود دارد.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {politicalTraditions.map((tradition) => (
          <article key={tradition.id} className="result-card flex flex-col">
            <p className="eyebrow">{tradition.eyebrowFa}</p>
            <h3 className="font-display text-lg font-medium text-[color:var(--ink)]">
              {tradition.titleFa}
            </h3>
            <p className="text-xs opacity-55" lang="en" dir="ltr">
              {tradition.titleEn}
            </p>

            <div className="mt-4 space-y-3 text-[0.92rem] leading-7 text-[color:var(--ink-soft)]">
              {tradition.bodyFa.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {tradition.quote ? (
              <blockquote className="mt-4 border-s-2 border-[color:var(--line-strong)] ps-3">
                <p className="text-[0.92rem] font-medium leading-7">
                  «{tradition.quote.quoteFa}»
                </p>
                <footer className="mt-1 text-xs text-[color:var(--muted)]">
                  — {tradition.quote.personFa}
                  <span className="ms-1 opacity-70" lang="en" dir="ltr">
                    ({tradition.quote.personEn})
                  </span>
                </footer>
              </blockquote>
            ) : null}

            <div className="result-card mt-4" data-tone="power">
              <p className="eyebrow" data-tone="power">
                {tradition.riskLabelFa}
              </p>
              <p className="text-[0.88rem] leading-6 text-[color:var(--ink-soft)]">
                {tradition.riskFa}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 max-w-3xl">
        <p className="eyebrow">هفت دوره</p>
        <h3 className="font-display text-xl font-medium text-[color:var(--ink)]">
          سیر تاریخی اندیشهٔ سیاسی
        </h3>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[38rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[color:var(--line-strong)] text-start">
                <th className="py-2 pe-4 font-medium">دوره</th>
                <th className="py-2 pe-4 font-medium">درون‌مایه‌ها</th>
                <th className="py-2 font-medium">چهره‌ها</th>
              </tr>
            </thead>
            <tbody>
              {politicalEras.map((era) => (
                <tr key={era.id} className="border-b border-[color:var(--line)] align-top">
                  <td className="py-3 pe-4">
                    <p className="font-medium">{era.labelFa}</p>
                    <p className="text-xs text-[color:var(--muted)]">{era.periodFa}</p>
                  </td>
                  <td className="py-3 pe-4 leading-6 text-[color:var(--ink-soft)]">
                    {era.themesFa}
                  </td>
                  <td className="py-3 leading-6 text-[color:var(--ink-soft)]">
                    {era.figuresFa}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-14">
        <p className="eyebrow">مرجع گفتاوردها</p>
        <h3 className="font-display text-xl font-medium text-[color:var(--ink)]">
          صداهایی از دو هزار سال جدل
        </h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {politicalQuotes.map((q) => (
            <figure key={q.id} className="result-card">
              <blockquote className="text-[0.92rem] leading-7">«{q.quoteFa}»</blockquote>
              <figcaption className="mt-3 text-xs text-[color:var(--muted)]">
                {q.personFa}
                <span className="ms-1 opacity-70" lang="en" dir="ltr">
                  ({q.personEn})
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-14 max-w-3xl">
        <p className="eyebrow">مقایسه</p>
        <h3 className="font-display text-xl font-medium text-[color:var(--ink)]">
          آرمان‌گرایی در برابر واقع‌گرایی
        </h3>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[color:var(--line-strong)] text-start">
                <th className="py-2 pe-4 font-medium">ویژگی</th>
                <th className="py-2 pe-4 font-medium">آرمان‌گرایی</th>
                <th className="py-2 font-medium">واقع‌گرایی</th>
              </tr>
            </thead>
            <tbody>
              {traditionComparison.map((row) => (
                <tr key={row.id} className="border-b border-[color:var(--line)] align-top">
                  <td className="py-3 pe-4 font-medium">{row.featureFa}</td>
                  <td className="py-3 pe-4 leading-6 text-[color:var(--ink-soft)]">
                    {row.moralismFa}
                  </td>
                  <td className="py-3 leading-6 text-[color:var(--ink-soft)]">
                    {row.realismFa}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-14 max-w-2xl space-y-5 text-sm leading-7 text-[color:var(--ink-soft)] md:text-base md:leading-8">
        <p className="eyebrow" data-tone="power">
          جمع‌بندی
        </p>
        <p>
          هگل هشدار داد که فهم واقعی یک دورهٔ سیاسی تنها در بازپسین نگاه ممکن
          است — تصویری که او آن را به «جغد مینروا» تشبیه کرد که فقط در غروب به
          پرواز درمی‌آید. آنچه امروز عقل سلیم می‌نامیم — دموکراسی، حقوق بشر،
          اقتصاد باز — ممکن است برای نسل‌های بعدی بدوی به نظر برسد، چنان‌که
          دموکراسی برای افلاطون و برده‌داری تا همین دو سده پیش طبیعی می‌نمود.
        </p>
        <p>
          قدرت طیفی است میان لولهٔ تفنگِ مائو و ایمان به نافرمانی مدنیِ گاندی.
          هرچه شکل‌های تازه‌ای برای اعمال آن پدید آید — از حاکمیت کلاسیک دولت‌ها
          تا «حاکمیت اشتراکی» در نهادهایی مانند اتحادیهٔ اروپا — مطالبهٔ تازه‌ای
          برای مهار و پاسخ‌گویی آن نیز شکل می‌گیرد؛ به همین دلیل، به گفتهٔ شارل
          دوگل، «سیاست چیزی به‌مراتب جدی‌تر از آن است که به سیاست‌مداران واگذار
          شود.»
        </p>
        <p className="text-[color:var(--ink)]">
          نقشهٔ بالای همین صفحه، نسخهٔ کوچکی از همین کشمکش است. برای دیدن
          پیامد این جدل در یک بحران واقعی، به{" "}
          <Link
            href="/laboratory"
            className="underline-offset-2 hover:text-[color:var(--power)] hover:underline"
          >
            آزمایشگاه
          </Link>{" "}
          بروید، یا سازوکار چند کشور را در{" "}
          <Link
            href="/countries"
            className="underline-offset-2 hover:text-[color:var(--power)] hover:underline"
          >
            مقایسهٔ کشورها
          </Link>{" "}
          کنار هم بگذارید.
        </p>
      </div>
    </section>
  );
}
