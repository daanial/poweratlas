"use client";

const QUESTIONS: { qFa: string; whyFa: string }[] = [
  {
    qFa: "چه کسی می‌تواند رئیس دولت را برکنار کند، و از چه مسیری؟",
    whyFa: "اگر پاسخ روشن و رسمی نباشد، برکناری در عمل با فشار یا زور اتفاق می‌افتد، نه با قاعده.",
  },
  {
    qFa: "چه کسی نتیجهٔ شمارش آرا را اعلام می‌کند، و آیا کسی می‌تواند آن را رد کند؟",
    whyFa: "کنترل شمارش، مهم‌تر از رقابتی بودن ظاهریِ انتخابات است.",
  },
  {
    qFa: "قاضی را چه کسی منصوب، ترفیع یا برکنار می‌کند؟",
    whyFa: "استقلال قضایی یک ویژگی متن قانون نیست؛ ویژگی مسیر شغلی قاضی است.",
  },
  {
    qFa: "اگر رهبر فعلی قدرت را از دست بدهد، برای او و خانواده‌اش چه پیش می‌آید؟",
    whyFa: "هرچه هزینهٔ باختن بیشتر باشد، احتمال واگذاری داوطلبانهٔ قدرت کمتر است.",
  },
  {
    qFa: "کدام نهاد هیچ نهاد بالادستی ندارد که بتواند به آن «نه» بگوید؟",
    whyFa: "همان نهاد، در عمل، جایی است که قدرت واقعی ساکن است.",
  },
  {
    qFa: "آیا نهاد موازی‌ای هست که همان کار نهاد رسمی را انجام دهد، اما پاسخگو نباشد؟",
    whyFa: "نهاد رسمی می‌تواند دقیقاً طبق قانون کار کند و در عین حال بی‌اثر باشد.",
  },
];

export function PowerInstrument() {
  return (
    <section
      className="result-card power-instrument mt-10"
      aria-labelledby="power-instrument-heading"
    >
      <p className="eyebrow">ابزار قابل‌حمل</p>
      <h3
        id="power-instrument-heading"
        className="font-display mt-1 text-2xl font-medium md:text-3xl"
      >
        شش پرسش برای خواندن هر نظام سیاسی
      </h3>
      <p className="mt-3 max-w-2xl text-[0.95rem] leading-8 text-[color:var(--ink-soft)]">
        این‌ها را روی هر کشور یا خبری که می‌خوانید امتحان کنید — نه فقط ایران.
        اگر جواب روشنی ندارند، خودِ نبودِ جواب هم یک یافته است.
      </p>

      <ol className="mt-6 space-y-4">
        {QUESTIONS.map((item, i) => (
          <li key={item.qFa} className="border-s-2 border-[color:var(--power)] ps-4">
            <p className="font-medium leading-7">
              <span className="me-1.5 text-[color:var(--power)]">{i + 1}.</span>
              {item.qFa}
            </p>
            <p className="mt-1 text-sm leading-7 text-[color:var(--muted)]">
              {item.whyFa}
            </p>
          </li>
        ))}
      </ol>

      <button
        type="button"
        className="cta-secondary power-instrument-print mt-6"
        onClick={() => window.print()}
      >
        چاپ یا ذخیره
      </button>
    </section>
  );
}
