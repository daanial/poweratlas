import Link from "next/link";
import { homeLink, journeySteps, referenceLinks } from "@/content/journey";
import { site } from "@/content/opening";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block no-underline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/wordmark.png"
                alt={site.titleFa}
                className="h-auto w-auto max-w-[170px]"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-7 text-[color:var(--ink-soft)]">
              {site.subtitleFa}
            </p>
          </div>

          <nav aria-label="مسیر">
            <p className="footer-col-title">مسیر</p>
            <ul className="mt-3 space-y-2">
              {journeySteps.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.labelFa}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="مرجع">
            <p className="footer-col-title">مرجع</p>
            <ul className="mt-3 space-y-2">
              {[homeLink, ...referenceLinks].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.labelFa}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[color:var(--line)] pt-6 text-xs leading-6 text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {site.titleFa} · کاری داوطلبانه از{" "}
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
          <p>بدون تبلیغ ایدئولوژیک؛ سازوکار را نشان می‌دهیم، نه قضاوت را.</p>
        </div>
      </div>
    </footer>
  );
}
