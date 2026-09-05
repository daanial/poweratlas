import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import PowerMap from "@/components/power-map/PowerMap";
import { PoliticalThoughtEssay } from "@/components/power-map/PoliticalThoughtEssay";
import { JourneyContinue } from "@/components/layout/JourneyContinue";

export const metadata: Metadata = {
  title: "اطلس قدرت | سازوکار قدرت",
  description:
    "نقشهٔ تعاملی نهادها و جریان‌های قدرت: رأی، اختیار، پاسخ‌گویی، اطلاعات و اجبار.",
};

export default function AtlasPage() {
  return (
    <PageShell
      titleFa="اطلس قدرت"
      titleEn="Power Atlas"
      subtitleFa="نهادها را انتخاب کنید تا ببینید قدرت از کجا می‌آید، به کجا می‌رود، و چه کسی می‌تواند آن را محدود کند."
    >
      <PowerMap />
      <PoliticalThoughtEssay />
      <JourneyContinue currentHref="/atlas" />
    </PageShell>
  );
}
