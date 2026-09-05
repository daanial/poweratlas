import type { Metadata } from "next";
import { CountryComparison } from "@/components/comparison/CountryComparison";
import { PageShell } from "@/components/layout/PageShell";
import { JourneyContinue } from "@/components/layout/JourneyContinue";
import { RegionIndicesMap } from "@/components/region-map/RegionIndicesMap";

export const metadata: Metadata = {
  title: "مقایسه کشورها | سازوکار قدرت",
  description:
    "اثر انگشت نهادی کشورها را کنار هم ببینید؛ بدون نمرهٔ ساده‌انگارانهٔ دموکراسی.",
};

export default function CountriesPage() {
  return (
    <PageShell
      titleFa="حالا دنیا را ببین."
      titleEn="Country comparison"
      subtitleFa="همان پرسش‌ها برای همهٔ کشورها: رئیس کشور کیست، دولت چگونه شکل می‌گیرد، و چه نهادهایی قدرت را مهار می‌کنند."
    >
      <CountryComparison />
      <RegionIndicesMap />
      <JourneyContinue currentHref="/countries" />
    </PageShell>
  );
}
