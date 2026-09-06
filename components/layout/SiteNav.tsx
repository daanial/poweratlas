"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { journeyStepFor, navLinks } from "@/content/journey";
import { site } from "@/content/opening";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const crumb = journeyStepFor(pathname);
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav">
      <nav
        className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 md:px-6"
        aria-label="ناوبری اصلی"
      >
        <Link
          href="/"
          className="shrink-0 no-underline"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/wordmark.png"
            alt={site.titleFa}
            className="block h-auto w-auto max-w-[180px] md:max-w-[250px]"
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

        <ul className="hidden min-w-0 flex-1 items-center gap-x-1 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] md:flex md:overflow-visible [&::-webkit-scrollbar]:hidden sm:gap-x-2">
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

        <button
          type="button"
          className="nav-burger ms-auto flex shrink-0 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-burger-bar" data-open={open ? "true" : "false"} />
        </button>
      </nav>

      {open ? (
        <div id="mobile-nav-panel" className="mobile-nav-panel md:hidden">
          <ul>
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="mobile-nav-link"
                    aria-current={active ? "page" : undefined}
                    data-active={active ? "true" : "false"}
                    onClick={() => setOpen(false)}
                  >
                    <span className="flex items-baseline justify-between gap-2">
                      <span>{link.labelFa}</span>
                      {link.minutesFa ? (
                        <span className="text-[0.7rem] opacity-55">
                          {link.minutesFa}
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block text-[0.75rem] leading-5 opacity-60">
                      {link.descFa}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
