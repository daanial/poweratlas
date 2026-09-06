import type { Metadata } from "next";
import { GlossaryPageClient } from "@/components/glossary/GlossaryPageClient";

export const metadata: Metadata = {
  title: "واژه‌نامه | سازوکار قدرت",
  description:
    "اصطلاح‌های سازوکار قدرت که در مسیر تجربه ظاهر می‌شوند، به‌علاوهٔ واژه‌نامهٔ اندیشهٔ سیاسی برای مرجع.",
};

export default function GlossaryPage() {
  return <GlossaryPageClient />;
}
