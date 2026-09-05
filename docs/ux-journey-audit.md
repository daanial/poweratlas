# UX / Journey Audit — سازوکار قدرت (Power Atlas)

Date: 2026-09-04. Scope: information architecture, wayfinding, and journey
pacing across the whole site (not content depth — see `content-expansion-brief.md`
for that).

## TL;DR

The building blocks for a clear journey already exist in code — a 10/30-min
path chooser, first-visit spotlight tours, localStorage visit tracking — but
they're all hidden one click too deep. A first-time visitor sees a cryptic
6-item nav and a long cinematic scroll before any of that orientation
appears. Fix = surface what exists, earlier and in plain language. Nothing
here requires new infrastructure.

## Current site map (as-built)

| Route | What it actually is | Time | Orientation today |
|---|---|---|---|
| `/` | Cinematic scroll-jacked opening (460–540vh) → 2 CTAs | — | None until the very end |
| `/experience` | 10-min or 30-min guided narrative, 4–6 modules | 10–30 min | Path chooser shown, but only after arriving here |
| `/atlas` | Freeform interactive power map | ~5 min | First-visit `SpotlightTour` |
| `/laboratory` | Constitution builder + power fingerprint + crisis sim | ~10 min | First-visit `SpotlightTour` |
| `/countries` | Side-by-side institutional comparison | ~5 min | None |
| `/about` | Neutrality principle + sources | ~2 min | None (doesn't need one) |
| `/glossary` | 30 terms | reference | Not in nav at all |

## Findings

### P0 — the entry point gives no orientation
- [`app/page.tsx`](../app/page.tsx) → [`CinematicOpening.tsx`](../components/opening/CinematicOpening.tsx):
  a 460vh (mobile) / 540vh (desktop) scrollytelling sequence with a single
  fading hint (`openingCopy.scrollHint`, `content/opening.ts:45`)
  and no skip link. A visitor who wants to know "what is this site" has to
  scroll ~5 screen-heights first.
- [`OpeningContinue.tsx`](../components/opening/OpeningContinue.tsx) ends the
  homepage with exactly two buttons — "شروع تجربه" and "مستقیم وارد اطلس شو" —
  no framing of what's behind either, no time estimate, no mention that
  Laboratory/Countries/Glossary exist at all.
- The 10-min/30-min path choice (`ExperienceJourney.tsx:157-193`)
  is real and well-written, but it's invisible until *after* a visitor has
  already clicked into `/experience`.

### P1 — the nav doesn't explain itself
- `SiteNav.tsx:7-14`: six links, each just
  a Fa/En label pair (خانه / تجربه / اطلس / آزمایشگاه / مقایسه کشورها / درباره).
  "اطلس" (Atlas) and "آزمایشگاه" (Laboratory) are metaphors — nothing tells a
  first-timer that Atlas = freeform map exploration and Laboratory = build a
  constitution and run crises. No time estimates, no recommended order.
- Glossary (`app/glossary/page.tsx`) is a
  full page with 30 terms and is not in `SiteNav` at all — only reachable via
  inline `GlossaryChip` links inside Experience content.
- Only `/experience` shows a progress bar (`experience-progress`,
  `ExperienceJourney.tsx:198-200`).
  Atlas, Laboratory, and Countries give no sense of "how much is here" or
  "where am I in the overall site."

### P1 — inconsistent per-page onboarding
- Atlas (`PowerMap.tsx:78`) and
  Laboratory (`LaboratoryApp.tsx:31`)
  each wire up a `SpotlightTour` on first visit via `VISIT_KEYS.atlasTour` /
  `labTour` (`lib/visit-flags.ts`).
- Countries has no equivalent tour despite being just as unguided on first
  load.

### P2 — known state isn't reused
- `visit-flags.ts` already persists the chosen Experience path and whether
  each tour has been seen. Nothing on the homepage reads this back — a
  returning visitor gets the identical cold-start experience as a first-timer.

## Recommendations (smallest diff first)

1. **Homepage journey-overview block** (replaces/augments `OpeningContinue`):
   5 cards — Experience (۱۰–۳۰ دقیقه), Atlas (~۵ دقیقه · کاوش آزاد), Laboratory
   (~۱۰ دقیقه · بساز و آزمایش کن), Countries (~۵ دقیقه · مقایسه), About/Glossary
   (مرجع) — one line each on what happens there. No new component system
   needed, just content + a grid, same pattern as `PowerMapPreview` /
   `CountryCompareTeaser` already in `ExperienceJourney.tsx`.
2. **Visible skip-intro link** on the cinematic opening, present from scroll
   position 0 (not just the fading hint).
3. **Nav descriptions + time chips**: extend the `links` array in
   `SiteNav.tsx` with `descFa` and `minutes`, render under the label (or as a
   tooltip on desktop, always-visible on mobile since space is tighter there
   anyway — check both).
4. **Add Glossary to `SiteNav`** (7th link) or a small footer utility nav if
   the top bar is too crowded at 7 items.
5. **Step indicator in `PageShell`**: optional `stepIndex` / `stepTotal` props
   rendered next to the title, driven by a single static order array
   (`[experience, atlas, laboratory, countries]`) — About/Glossary excluded as
   reference pages.
6. **Countries `SpotlightTour`**: reuse the existing component, add
   `VISIT_KEYS.countriesTour`, mirror the Atlas/Lab wiring.
7. **"Continue where you left off"** on the homepage: read
   `VISIT_KEYS.experiencePath` on mount; if set, show a "ادامه بده" CTA instead
   of (or alongside) "شروع تجربه."

## Explicitly out of scope (YAGNI)

No new onboarding framework, no analytics/telemetry buildout, no i18n
language switcher, no multi-step wizard library. `localStorage` visit flags,
`SpotlightTour`, and the path chooser already do the job — this audit is
about *surfacing* them sooner, not inventing new mechanisms.
