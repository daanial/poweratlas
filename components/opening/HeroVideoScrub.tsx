"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useSyncExternalStore } from "react";
import { openingCopy, site } from "@/content/opening";

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

const HERO_VIDEO_SRC = "/videos/hero.mp4";
const HERO_POSTER_SRC = "/videos/hero-poster.jpg";
const HERO_LOGO_SRC = "/brand/logo.png";

function HeroLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={HERO_LOGO_SRC}
      alt=""
      className="pointer-events-none absolute left-1/2 top-[30%] w-full max-w-[250px] -translate-x-1/2 -translate-y-1/2 select-none"
      aria-hidden="true"
    />
  );
}

export function HeroVideoScrub() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      const root = rootRef.current;
      const video = videoRef.current;
      if (!root || !video || reduced || !contextSafe) return;

      const unlock = () => {
        void video
          .play()
          .then(() => {
            video.pause();
          })
          .catch(() => {});
      };
      document.documentElement.addEventListener("touchstart", unlock, {
        once: true,
        passive: true,
      });

      const setup = contextSafe(() => {
        const duration = video.duration;
        if (!Number.isFinite(duration) || duration <= 0) return;

        video.pause();
        video.currentTime = 0;

        const overlay = root.querySelector<HTMLElement>("[data-overlay]");
        const hint = root.querySelector<HTMLElement>("[data-hint]");
        const progress = root.querySelector<HTMLElement>("[data-progress]");

        const playhead = { time: 0 };
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.45,
            invalidateOnRefresh: true,
            refreshPriority: -10,
          },
        });

        tl.to(
          playhead,
          {
            time: duration,
            duration: 1,
            onUpdate: () => {
              if (Math.abs(video.currentTime - playhead.time) > 0.01) {
                video.currentTime = playhead.time;
              }
            },
          },
          0,
        );

        if (progress) {
          gsap.set(progress, { scaleX: 0, transformOrigin: "right center" });
          tl.to(progress, { scaleX: 1, duration: 1 }, 0);
        }

        if (hint) {
          tl.to(hint, { autoAlpha: 0, duration: 0.1 }, 0.06);
        }

        if (overlay) {
          tl.to(overlay, { autoAlpha: 0.55, duration: 0.18 }, 0.22);
          tl.to(overlay, { autoAlpha: 0, duration: 0.22 }, 0.72);
        }

        ScrollTrigger.refresh();
      });

      if (video.readyState >= 1) {
        setup();
      } else {
        video.addEventListener("loadedmetadata", setup, { once: true });
      }

      return () => {
        document.documentElement.removeEventListener("touchstart", unlock);
        video.removeEventListener("loadedmetadata", setup);
      };
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  if (reduced) {
    return (
      <section
        ref={rootRef}
        className="relative min-h-[100dvh] overflow-hidden bg-black"
        aria-label={site.titleFa}
        data-reduced="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_POSTER_SRC}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/50" />
        <HeroLogo />
        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-between px-5 py-8 md:px-10 md:py-10">
          <header>
            <p className="text-sm font-medium tracking-tight md:text-base">
              {site.titleFa}
            </p>
            <p className="mt-0.5 text-[0.7rem] opacity-50" lang="en" dir="ltr">
              {site.titleEn}
            </p>
          </header>
          <p className="max-w-md font-display text-2xl font-medium leading-snug md:text-3xl">
            {site.subtitleFa}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className="hero-video-scrub relative h-[520vh] bg-black"
      aria-label={site.titleFa}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO_SRC}
          poster={HERO_POSTER_SRC}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/45"
          aria-hidden="true"
        />

        <div
          data-overlay
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-5 py-8 md:px-10 md:py-10"
        >
          <HeroLogo />
          <header data-brand>
            <p className="text-sm font-medium tracking-tight md:text-base">
              {site.titleFa}
            </p>
            <p className="mt-0.5 text-[0.7rem] opacity-50" lang="en" dir="ltr">
              {site.titleEn}
            </p>
          </header>

          <div>
            <p className="max-w-lg font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-medium leading-snug tracking-tight">
              {site.subtitleFa}
            </p>
            <p
              data-hint
              className="mt-8 text-xs text-[color:var(--muted)] md:mt-10"
            >
              {openingCopy.scrollHint}
            </p>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-[color:var(--line)]"
          aria-hidden="true"
        >
          <span
            data-progress
            className="block h-full w-full origin-right bg-[color:var(--cream)]"
          />
        </div>
      </div>
    </section>
  );
}
