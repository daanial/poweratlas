import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/opening";
import "./globals.css";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${site.titleFa} | ${site.titleEn}`,
  description: site.descriptionFa,
  openGraph: {
    title: site.titleFa,
    description: site.subtitleFa,
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${ibmPlexSansArabic.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
