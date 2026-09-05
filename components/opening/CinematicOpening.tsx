"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useSyncExternalStore } from "react";
import { InstitutionalDiagram } from "@/components/institutional-diagram/InstitutionalDiagram";
import { openingCopy, openingStages, site } from "@/content/opening";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

type Phase = "void" | "chain" | "question" | "system";

function phaseFromProgress(p: number): Phase {
  if (p < 0.1) return "void";
  if (p < 0.52) return "chain";
  if (p < 0.7) return "question";
  return "system";
}

export function CinematicOpening() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("void");
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      const stage = stageRef.current;
      if (!root || !stage || reduced) return;

      const hero = root.querySelector<HTMLElement>("[data-hero]");
      const heroEn = root.querySelector<HTMLElement>("[data-hero-en]");
      const stages = gsap.utils.toArray<HTMLElement>("[data-stage]");
      const connectors = gsap.utils.toArray<HTMLElement>("[data-connector]");
      const token = root.querySelector<HTMLElement>("[data-token]");
      const question = root.querySelector<HTMLElement>("[data-question]");
      const chainBlock = root.querySelector<HTMLElement>("[data-chain]");
      const systemBlock = root.querySelector<HTMLElement>("[data-system]");
      const hint = root.querySelector<HTMLElement>("[data-hint]");
      const brand = root.querySelector<HTMLElement>("[data-brand]");

      const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

      gsap.set(hero, { autoAlpha: 1, scale: 1, y: 0 });
      gsap.set(heroEn, { autoAlpha: 0.4 });
      gsap.set(stages, { autoAlpha: 0, y: 28 });
      gsap.set(connectors, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(token, { autoAlpha: 0, scale: 0.4, y: 0 });
      gsap.set(question, { autoAlpha: 0, y: 20 });
      gsap.set(systemBlock, { autoAlpha: 0, y: 36 });
      gsap.set(hint, { autoAlpha: 0.55 });
      gsap.set(brand, { autoAlpha: 0.75 });

      const applyPhase = (p: number) => {
        const next = phaseFromProgress(p);
        setPhase(next);
        root.setAttribute("data-phase", next === "system" ? "system" : "void");
        document.body.style.background =
          next === "system" ? "var(--paper)" : "";
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => applyPhase(self.progress),
          onRefresh: (self) => applyPhase(self.progress),
        },
      });

      // 0.00–0.10: hold isolated hero
      tl.to(hint, { autoAlpha: 0, duration: 0.06 }, 0.05);

      // 0.10–0.18: hero recedes
      tl.to(
        hero,
        {
          scale: 0.5,
          y: () => (isMobile() ? -110 : -150),
          autoAlpha: 0.22,
          duration: 0.08,
        },
        0.1,
      );
      tl.to(heroEn, { autoAlpha: 0, duration: 0.05 }, 0.1);

      // 0.18–0.50: construct chain + move power token
      stages.forEach((el, i) => {
        const at = 0.16 + i * 0.06;
        tl.to(el, { autoAlpha: 1, y: 0, duration: 0.045 }, at);
        if (connectors[i]) {
          tl.to(connectors[i], { scaleY: 1, duration: 0.035 }, at + 0.025);
        }
      });

      tl.to(token, { autoAlpha: 1, scale: 1, duration: 0.04 }, 0.2);

      stages.forEach((el, i) => {
        tl.to(
          token,
          {
            y: () => {
              const chainRect = chainBlock!.getBoundingClientRect();
              const stageRect = el.getBoundingClientRect();
              return (
                stageRect.top -
                chainRect.top +
                stageRect.height / 2 -
                token!.offsetHeight / 2
              );
            },
            duration: 0.05,
          },
          0.22 + i * 0.06,
        );
      });

      // 0.52–0.68: the question
      tl.to(chainBlock, { autoAlpha: 0.22, duration: 0.06 }, 0.52);
      tl.to(hero, { autoAlpha: 0, duration: 0.05 }, 0.52);
      tl.to(brand, { autoAlpha: 0, duration: 0.05 }, 0.54);
      tl.to(question, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.55);

      // 0.70–1.00: morph into institutional system
      tl.to(question, { autoAlpha: 0, y: -18, duration: 0.08 }, 0.7);
      tl.to(chainBlock, { autoAlpha: 0, duration: 0.08 }, 0.7);
      tl.to(token, { autoAlpha: 0, scale: 0.55, duration: 0.06 }, 0.72);
      tl.to(systemBlock, { autoAlpha: 1, y: 0, duration: 0.16 }, 0.76);
      // Keep timeline length = 1 so scrub maps cleanly across the runway
      tl.to({}, { duration: 0.08 }, 0.92);

      const refresh = () => ScrollTrigger.refresh();
      if (document.fonts?.ready) {
        void document.fonts.ready.then(refresh);
      }
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        document.body.style.background = "";
      };
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  const systemActive = phase === "system" || reduced;

  if (reduced) {
    return (
      <section
        ref={rootRef}
        className="scene-canvas relative"
        data-phase="system"
        data-reduced="true"
        aria-label={site.titleFa}
      >
        <div
          ref={stageRef}
          className="mx-auto flex max-w-3xl flex-col gap-16 px-5 py-12 md:px-10 md:py-16"
        >
          <header data-brand>
            <p className="text-sm font-medium md:text-base">{site.titleFa}</p>
            <p className="mt-0.5 text-[0.7rem] opacity-50" lang="en" dir="ltr">
              {site.titleEn}
            </p>
          </header>

          <div className="text-center">
            <h1
              data-hero
              className="font-display text-[clamp(3.5rem,14vw,6rem)] font-semibold leading-[0.95]"
            >
              {openingCopy.heroWord}
            </h1>
            <p className="mt-4 text-sm text-[color:var(--muted)]">
              {openingCopy.reducedMotionNote}
            </p>
          </div>

          <div data-chain className="flex flex-col items-center">
            <div data-token className="power-token mb-4" aria-hidden="true" />
            <ol className="flex flex-col items-center">
              {openingStages.map((stage, index) => (
                <li key={stage.id} className="flex flex-col items-center">
                  <span
                    data-stage
                    className="font-display text-2xl font-medium md:text-3xl"
                  >
                    {stage.labelFa}
                  </span>
                  {index < openingStages.length - 1 ? (
                    <span
                      data-connector
                      className="chain-connector my-1"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          <p
            data-question
            className="text-center font-display text-2xl font-medium leading-snug md:text-3xl"
          >
            {openingCopy.question}
          </p>

          <div data-system>
            <p className="mb-2 text-center text-xs opacity-50 md:text-sm">
              {site.subtitleFa}
            </p>
            <p className="mb-8 text-center font-display text-xl font-medium leading-relaxed md:text-2xl">
              {openingCopy.diagramIntro}
            </p>
            <InstitutionalDiagram interactive />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className="scene-canvas relative h-[140vh] md:h-[155vh]"
      data-phase="void"
      aria-label={site.titleFa}
    >
      <div
        ref={stageRef}
        className="sticky top-0 flex min-h-[100dvh] flex-col overflow-hidden px-5 py-8 md:px-10 md:py-10"
      >
        <header
          data-brand
          className="pointer-events-none absolute inset-x-5 top-6 z-20 md:inset-x-10 md:top-8"
        >
          <p className="text-sm font-medium tracking-tight md:text-base">
            {site.titleFa}
          </p>
          <p className="mt-0.5 text-[0.7rem] opacity-50" lang="en" dir="ltr">
            {site.titleEn}
          </p>
        </header>
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
          <h1
            data-hero
            className="font-display text-[clamp(4.5rem,18vw,9.5rem)] font-semibold leading-[0.95] tracking-tight"
          >
            {openingCopy.heroWord}
          </h1>
          <p
            data-hero-en
            className="mt-3 text-xs tracking-[0.2em] opacity-40"
            lang="en"
            dir="ltr"
          >
            {openingCopy.heroWordEn.toUpperCase()}
          </p>

          <p
            data-hint
            className="absolute bottom-4 text-xs text-[color:var(--muted)] md:bottom-8"
          >
            {openingCopy.scrollHint}
          </p>

          <div
            data-chain
            className="absolute inset-x-0 top-1/2 flex -translate-y-[42%] flex-col items-center md:-translate-y-[40%]"
            aria-hidden={phase === "system"}
          >
            <div
              data-token
              className="power-token absolute start-1/2 top-0 z-10 -translate-x-1/2"
              aria-hidden="true"
            />
            <ol className="flex flex-col items-center">
              {openingStages.map((stage, index) => (
                <li key={stage.id} className="flex flex-col items-center">
                  <span
                    data-stage
                    className="font-display text-2xl font-medium tracking-tight md:text-3xl"
                  >
                    {stage.labelFa}
                  </span>
                  {index < openingStages.length - 1 ? (
                    <span
                      data-connector
                      className="chain-connector my-1"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          <p
            data-question
            className="absolute inset-x-5 top-1/2 z-10 -translate-y-1/2 text-center font-display text-[clamp(1.6rem,5vw,2.75rem)] font-medium leading-snug tracking-tight md:inset-x-16"
          >
            {openingCopy.question}
          </p>
        </div>

        <div
          data-system
          className={`absolute inset-0 z-20 flex flex-col justify-center overflow-y-auto px-5 py-10 md:px-12 ${
            systemActive ? "pointer-events-auto" : "pointer-events-none"
          }`}
          aria-hidden={!systemActive}
          {...(!systemActive ? { inert: true } : {})}
        >
          <div className="mx-auto w-full max-w-4xl py-6">
            <p className="mb-2 text-center text-xs opacity-50 md:text-sm">
              {site.subtitleFa}
            </p>
            <p className="mb-8 text-center font-display text-xl font-medium leading-relaxed md:text-2xl">
              {openingCopy.diagramIntro}
            </p>
            <InstitutionalDiagram interactive={systemActive} />
          </div>
        </div>
      </div>
    </section>
  );
}
