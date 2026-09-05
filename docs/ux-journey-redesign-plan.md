# UX / Journey Redesign Plan — سازوکار قدرت

Date: 2026-09-04. Supersedes `docs/ux-journey-audit.md` (that one was a
code-read; this one is measured against the running app).

**Method.** Every number below was measured live on `http://localhost:3456`
at desktop **1440×900** and mobile **375×812**, by reading element geometry in
the page — not estimated from source.

---

## 0. Already shipped since the last audit — do not redo

These were recommendations 1–5 of the previous audit and are now in the code:

- `content/journey.ts` — ordered `journeySteps`, `referenceLinks`, `journeyStepFor()`.
- `SiteNav` — per-link `descFa` + `minutesFa`, hover tooltip (`.nav-tip`), Glossary + About added.
- `PageShell` — optional `stepIndex` / `stepTotal` → renders "گام X از Y".
- Home — 5 `.journey-tile` cards + "رد شدن از مقدمه" skip link.
- `/countries` — now has a first-visit `SpotlightTour`.

The problems below are **new findings**, several of them side effects of the
above landing without a pass over the whole flow.

---

## 1. Laboratory — the reported bug, fully characterised

The user's complaint ("the CTA is not visible, you don't understand where the
next step is") reproduces exactly. Six separate causes:

### 1.1 The primary CTA is below the fold on every viewport

| Viewport | `دیدن نتیجه` position | Verdict |
|---|---|---|
| 1440×900 | top = 1179px (viewport 900) | **279px below the fold** |
| 375×812 | top = 1590px | **1.96 screens down** |

Cause: `LaboratoryApp.tsx:71` renders the CTA as `mt-10 flex justify-end`
*after* the whole builder grid. The live-preview `<aside>` is taller than the
options column (desktop: aside bottom 1139px vs options bottom 793px; mobile:
aside is **730px tall** and stacks *between* the options and the CTA). The
button is pushed below whichever column is longest.

**Fix.** Make the next action permanently reachable, not a thing you scroll to:
- Add a sticky action bar at the bottom of the builder phase (`position: sticky; bottom: 0`) holding the step counter on one side and the primary CTA on the other. It stays in view while the user works through the 10 options.
- On mobile, collapse the live-preview aside into a compact summary strip (system name + one line) that expands on tap, so it stops being a 730px wall between the options and the button.

### 1.2 Ten pre-filled steps with no sense of completion

`content/builder.ts` has **10 steps**, and `defaultConfig` pre-answers all ten.
Consequences:
- The user cannot tell which choices are theirs and which are defaults.
- At **step 10 of 10**, clicking an option does nothing visible — measured:
  step label before click `گام 10 از 10`, after click `گام 10 از 10`, and
  `anythingSignalsCompletion: false`. `ConstitutionBuilder.tsx:100-105` only
  advances when `current < length - 1`, so the last step is a dead end.

**Fix.**
- Mark each step as `default` vs `chosen`; show "۳ از ۱۰ انتخاب شما" so progress means something.
- On the last step, selecting an option must produce a completion state: the sticky bar switches to an emphasised "دیدن نتیجه" with a short line ("همهٔ قواعد انتخاب شد").
- Consider cutting the required path to ~5 core steps and moving the remaining 5 behind an optional "قواعد بیشتر" group. Ten sequential choices is a lot before any payoff.

### 1.3 Three different progress counters on one screen

On first load of `/laboratory` the user sees simultaneously:

| Source | Renders | Means |
|---|---|---|
| `PageShell.tsx:37` | `گام ۳ از ۴` | position in the site journey |
| `ConstitutionBuilder.tsx:117` | `گام ۱ از ۱۰` | position in the builder wizard |
| `SpotlightTour.tsx:96` | `۱ از ۳` | position in the intro tour |

Two of them use the identical word گام with different meanings, and the
journey counter (3 of 4) is numerically confusable with the tour counter.

**Fix — one progress vocabulary, one per altitude:**
- Site journey → move out of the page body into the nav as a passive breadcrumb ("آزمایشگاه · ۳ از ۴ در مسیر"), not a "گام".
- Builder → keep "گام X از ۱۰" — it is the only true step counter on the page.
- Tour → drop the counter entirely, or use dots. A 3-step coach mark does not need numbers competing with the wizard.

### 1.4 Two "بعدی" buttons at once

Measured button list on first load:
`["بعدی", "رد کردن", "قبلی", "بعدی", "پادشاه / ملکه", …, "دیدن نتیجه"]`

The first `بعدی` advances the **tour**; the second advances the **builder**.
Identical label, adjacent on screen, different systems.

**Fix.** Tour buttons become "ادامهٔ راهنما" / "فهمیدم"; builder keeps "بعدی".

### 1.5 The tour highlights things the user cannot see

`SpotlightTour` positions its cut-out from `getBoundingClientRect()`
(`SpotlightTour.tsx:14-20, 42-48`) and never calls `scrollIntoView`. Tour step 3
targets `[data-tour="lab-result"]` — the CTA measured at 279px below the fold.
So the tour dims the screen and describes an element that is off-screen.

**Fix.** Before each step, scroll the target into view (centred), then measure.
If a target cannot be resolved, skip that step rather than showing a dimmed
screen with a floating panel.

### 1.6 Phase changes swap the page under the user

Measured: scrolled to the CTA at `scrollY = 395`, clicked `دیدن نتیجه` →
`scrollY` stayed **395**. The builder unmounts and the result phase mounts
beneath the same scroll offset, so the top of the viewport lands on
"طبقه‌بندی توصیفی" — the user never sees the result heading. The next CTA
(`حالا تو تصمیم بگیر`) is then itself at top = 979px, **below the fold again**.

**Fix.** On every `setPhase`, scroll the new phase's heading to the top
(`scrollIntoView` or `window.scrollTo(0,0)`), and animate the transition so it
reads as "moving forward", not as content teleporting.

### 1.7 The three phases are invisible as a structure

`builder → result → crisis` exists only in state. Nothing tells the user the
Laboratory has three acts or which one they're in.

**Fix.** A 3-part header rail at the top of the Laboratory:
`بساز · ۱` → `نتیجه · ۲` → `بحران · ۳`, current one marked, past ones
clickable. This is the single highest-value change on the page: it answers
"where am I and what comes next" before the user touches anything.

---

## 2. Homepage — the story is told twice before the site explains itself

Measured: total height **10,663px = 11.85 screens**.

Duplicated chrome, because `HeroVideoScrub` **and** `CinematicOpening` are two
independent full-screen scroll sequences stacked in `app/page.tsx`, and each
renders its own brand, subtitle, scroll hint and skip link:

| Element | Occurrences | At |
|---|---|---|
| Brand "سازوکار قدرت" | 2 | 40px, 4712px |
| "رد شدن از مقدمه" (skip) | 2 | 40px, 4712px |
| "به پایین بروید" (scroll hint) | 2 | 844px, 5492px |

And the payload — the 5 journey tiles that actually answer "what is this site,
where do I click" — starts at **10,018px, i.e. screen 11.1 of 11.85**.

**Fix.**
- Collapse to **one** opening sequence. Either the video scrub or the cinematic chain earns the space; running both makes the visitor watch the same idea twice. Recommend keeping `CinematicOpening` (it carries the chain → question → institutional-diagram argument) and reducing `HeroVideoScrub` to a short title card, or removing it.
- Target total homepage height ≈ **4–5 screens**.
- Move the journey tiles to roughly **screen 1.5–2** — right after the first idea lands, not after the whole film.
- Keep exactly one persistent skip-intro affordance, pinned, that jumps to `#journey`.
- The tiles already read well ("۱ از ۴ · ۱۰ تا ۳۰ دقیقه · تجربه"); they just need to be found.

---

## 3. Atlas, Countries, Glossary are dead ends

Measured in-content links (excluding the nav):

| Page | Height | Internal next-step links in content |
|---|---|---|
| `/atlas` | 1.30 screens | **none** — only the nav bar |
| `/countries` | 2.21 screens | **none** — only 3 external source links |
| `/glossary` | 3.25 screens | **none** |

Only `/experience` was designed with continuations (`PowerMapPreview`,
`CountryCompareTeaser`, the Laboratory CTA). Every other page ends and leaves
the user to rediscover the nav.

**Fix.** A shared end-of-page continuation block, driven by the ordering
already in `content/journey.ts`:

> **بعد از این** → [next journey step, its one-line description, its time]
> plus a secondary "بازگشت به مسیر" link.

Because `journeyStepFor(href)` already exists, this is one small component fed
by existing data. Reference pages (Glossary, About) should point back to the
step the reader most likely came from.

---

## 4. Cross-cutting rules to apply everywhere

1. **The next action is always visible.** No primary CTA below the fold on a
   1440×900 or 375×812 viewport. Sticky action bars where content is long.
2. **One counter per altitude, distinct wording.** "گام" is reserved for
   in-page wizards. Journey position is a breadcrumb. Tours use dots.
3. **Never swap content without moving the viewport.** Any phase/step change
   scrolls its new heading into view.
4. **Coach marks only after orientation.** Do not open a modal tour on mount,
   over a page the user has not read. Trigger on first interaction or after a
   short delay, always scrolling the target into view first.
5. **Every page ends by naming the next step.** No terminal pages.
6. **Defaults must be legible as defaults.** Anywhere state is pre-filled, show
   what the user chose vs what was assumed.

---

## 5. Build order

**P0 — the reported breakage**
1. Laboratory 3-phase header rail (§1.7)
2. Sticky builder action bar; CTA never below fold, desktop + mobile (§1.1)
3. Scroll-to-heading on every phase change (§1.6)
4. Last-step completion state (§1.2)

**P1 — stop the confusion**
5. Resolve the three counters and the duplicate "بعدی" (§1.3, §1.4)
6. Tour scrolls targets into view; defer from mount (§1.5, rule 4)
7. Mobile: collapse the live-preview aside (§1.1)

**P2 — the journey**
8. De-duplicate the homepage opening; hoist journey tiles to ~screen 1.5–2 (§2)
9. Shared end-of-page continuation block on Atlas / Countries / Glossary / About (§3)
10. Mark chosen vs default in the builder summary (§1.2)

**P3**
11. Reconsider 10 builder steps → 5 core + 5 optional (§1.2)

---

## 6. Acceptance checks

Re-measure on the running app; each must hold at **1440×900 and 375×812**:

- [ ] On `/laboratory` at `scrollY = 0`, the primary next action is within the viewport.
- [ ] Only one element matching `/گام \d+ از \d+/` is visible at a time.
- [ ] Only one button labelled `بعدی` exists on screen at a time.
- [ ] Selecting an option on builder step 10 produces a visible completion state.
- [ ] After any phase change, the new phase's heading is within the top 200px.
- [ ] Every spotlight target is inside the viewport when its step is shown.
- [ ] Homepage total height ≤ 5 screens; journey tiles begin before screen 2.5.
- [ ] `/atlas`, `/countries`, `/glossary` each contain an internal next-step link in content.

---

## 7. Explicitly out of scope

No new design system, no animation library, no router-level transition
framework, no analytics. Everything above is composition, ordering, scroll
handling, and labelling of components that already exist.
