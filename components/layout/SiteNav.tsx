"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { journeyStepFor, navLinks } from "@/content/journey";
import { site } from "@/content/opening";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const crumb = journeyStepFor(pathname);

  return (
    <header className="site-nav">
      <nav
        className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 md:px-6"
        aria-label="ناوبری اصلی"
      >
        <Link
          href="/"
          className="shrink-0 no-underline"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/wordmark.png"
            alt={site.titleFa}
            className="block h-auto w-auto max-w-[250px]"
          />
          <span className="sr-only" lang="en" dir="ltr">
            {site.titleEn}
          </span>
          {crumb ? (
            <span className="mt-0.5 block text-[0.65rem] font-normal text-[color:var(--muted)]">
              {crumb.labelFa} · {crumb.stepIndex} از {crumb.stepTotal} در مسیر
            </span>
          ) : null}
        </Link>

        <ul className="flex min-w-0 flex-1 items-center gap-x-1 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-visible [&::-webkit-scrollbar]:hidden sm:gap-x-2">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            const tip = [link.descFa, link.minutesFa]
              .filter(Boolean)
              .join(" · ");
            return (
              <li key={link.href} className="relative shrink-0">
                <Link
                  href={link.href}
                  className="inline-flex flex-col items-center px-2 py-1 text-xs no-underline sm:text-sm"
                  aria-current={active ? "page" : undefined}
                  data-active={active ? "true" : "false"}
                  title={tip}
                  style={{
                    color: active ? "var(--power)" : "var(--ink-soft)",
                    opacity: active ? 1 : 0.75,
                  }}
                >
                  <span>{link.labelFa}</span>
                  <span
                    className="text-[0.6rem] tracking-wide opacity-55"
                    lang="en"
                    dir="ltr"
                  >
                    {link.labelEn}
                  </span>
                  {link.minutesFa ? (
                    <span className="mt-0.5 text-[0.55rem] leading-none opacity-50 md:hidden">
                      {link.minutesFa}
                    </span>
                  ) : null}
                  <span className="nav-tip" role="tooltip" aria-hidden="true">
                    {link.descFa}
                    {link.minutesFa ? (
                      <span className="mt-1 block opacity-70">
                        {link.minutesFa}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
