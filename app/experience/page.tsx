import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ExperienceJourney } from "@/components/experience/ExperienceJourney";

export const metadata: Metadata = {
  title: "تجربه | سازوکار قدرت",
  description:
    "مسیری تعاملی برای فهمیدن اینکه قدرت سیاسی چگونه میان مردم، نهادها و قواعد حرکت می‌کند.",
  openGraph: {
    title: "تجربه · سازوکار قدرت",
    description:
      "چه کسی حکومت می‌کند، چه کسی اداره می‌کند، و قدرت کجا متمرکز می‌شود؟",
    locale: "fa_IR",
    type: "website",
  },
};

export default function ExperiencePage() {
  return (
    <PageShell
      titleFa="تجربه"
      titleEn="Experience"
      subtitleFa="از برچسب نظام تا جریان واقعی قدرت؛ قدم‌به‌قدم و تعاملی."
    >
      <ExperienceJourney />
    </PageShell>
  );
}
