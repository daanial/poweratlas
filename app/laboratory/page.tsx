import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { LaboratoryApp } from "@/components/laboratory/LaboratoryApp";

export const metadata: Metadata = {
  title: "آزمایشگاه | سازوکار قدرت",
  description:
    "قانون اساسی خودتان را بسازید، اثر انگشت قدرت آن را ببینید و در شش بحران نهادی تصمیم بگیرید.",
};

export default function LaboratoryPage() {
  return (
    <PageShell
      titleFa="آزمایشگاه"
      titleEn="Laboratory"
      subtitleFa="قواعد را انتخاب کنید، ببینید قدرت چگونه توزیع می‌شود، و بعد در دل بحران تصمیم بگیرید."
    >
      <LaboratoryApp />
    </PageShell>
  );
}
