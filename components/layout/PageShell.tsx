import type { ReactNode } from "react";
import { SiteNav } from "@/components/layout/SiteNav";

type PageShellProps = {
  children: ReactNode;
  titleFa?: string;
  titleEn?: string;
  subtitleFa?: string;
  className?: string;
};

export function PageShell({
  children,
  titleFa,
  titleEn,
  subtitleFa,
  className = "",
}: PageShellProps) {
  const showHeader = Boolean(titleFa || titleEn || subtitleFa);

  return (
    <div className={`theme-paper min-h-dvh bg-[var(--paper)] text-[var(--ink)] ${className}`}>
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6 md:pt-12">
        {showHeader ? (
          <header className="mb-8 border-b border-[color:var(--line)] pb-6 md:mb-10">
            {titleFa ? (
              <h1 className="font-display text-3xl font-medium leading-tight text-[color:var(--ink)] md:text-4xl">
                {titleFa}
              </h1>
            ) : null}
            {titleEn ? (
              <p
                className="mt-1 text-sm tracking-wide text-[color:var(--muted)]"
                lang="en"
                dir="ltr"
              >
                {titleEn}
              </p>
            ) : null}
            {subtitleFa ? (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--muted)] md:text-base md:leading-8">
                {subtitleFa}
              </p>
            ) : null}
          </header>
        ) : null}
        {children}
      </main>
    </div>
  );
}
