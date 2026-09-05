# Content Expansion Brief — سازوکار قدرت / The Machinery of Power

**Purpose:** ready-to-implement content spec covering Part 1 (beginner-facing depth) and Part 2 (expert-facing depth) from the earlier improvement review. Everything below is scoped to the existing content model (`content/*.ts`) with explicit schema additions called out. Hand this whole file to the dev/content agent.

**Status of the data below:** country "fingerprint" scores (0–1 per axis) are **illustrative relative placements**, written in the same spirit as the 15 already in `content/countries.ts` (which are themselves not footnoted to a precise per-score source today). They are grounded in the qualitative research cited in the Appendix, but a domain reviewer should sanity-check the numbers before shipping — treat them as first-draft placements, not measurements. All new Persian copy needs a native-speaker editorial pass; it was written for structural/factual correctness, not polished prose.

---

## 0. Schema changes required (`content/types.ts`)

Six additions, all backward-compatible (no existing field renamed or removed):

```ts
// 1. Citations need to be clickable — ContentSource currently has no URL.
export interface ContentSource {
  id: string;
  titleFa: string;
  titleEn: string;
  type: SourceType;
  noteFa?: string;
  url?: string; // NEW — external link, shown as a footnote/reference link
}

// 2. Journalistic/NGO/encyclopedic grounding (Freedom House, HRW, Wikipedia-level
//    factual sourcing for current events) doesn't fit "scholarly | primary | dataset".
export type SourceType = "scholarly" | "primary" | "dataset" | "reference"; // NEW variant

// 3. Let a country carry an optional "scholars disagree here" callout.
export interface CountrySystem {
  // ...existing fields unchanged...
  contestedNoteFa?: string; // NEW — one short paragraph, shown as a distinct callout in the UI
}

// 4. Historical time-slices — same shape as CountrySystem plus era metadata,
//    modeled as its own array so `countries.ts` (current-day) stays untouched.
export interface HistoricalCountrySystem extends Omit<CountrySystem, "id"> {
  id: string;
  parentCountryId: string; // links to the current-day CountrySystem.id it precedes
  eraLabelFa: string;      // e.g. "جمهوری وایمار"
  eraLabelEn: string;      // e.g. "Weimar Republic"
  yearRangeFa: string;     // e.g. "۱۹۱۹–۱۹۳۳"
  keyEventFa: string;      // one-line: the pivot moment this slice illustrates
}

// 5. Glossary — new standalone content type, not nested under PoliticalConcept.
export interface GlossaryTerm {
  id: string;
  termFa: string;
  termEn: string;
  shortDefFa: string;             // ~1 sentence, for inline tooltip/chip
  longDefFa?: string;             // optional 2–3 sentence expansion for a glossary page
  relatedConceptIds?: string[];   // optional links to PowerMapNode / RuleCategory ids etc.
}
```

New content files to create: `content/glossary.ts`, `content/countries-historical.ts`. Existing files to extend: `content/countries.ts`, `content/builder.ts` (confusions + deJureScenarios live here), `content/crises.ts`, `content/sources.ts`.

---

## PART 1 — Beginner-facing content (expanded)

### 1.1 Glossary — `content/glossary.ts` (new)

30 terms, ordered roughly by where a first-time reader will hit them in `/experience`. Ship as tap-to-reveal chips wherever the term first appears in body copy (glossary chip → `shortDefFa` in a tooltip/popover; full list also browsable as its own reference page).

| id | termFa | termEn | shortDefFa |
|---|---|---|---|
| separation-of-powers | تفکیک قوا | Separation of powers | تقسیم اختیار میان قوهٔ مقننه، مجریه و قضائیه برای جلوگیری از تمرکز قدرت در یک نهاد. |
| federalism | فدرالیسم | Federalism | تقسیم رسمی اختیار میان دولت مرکزی و واحدهای منطقه‌ای که هرکدام حوزهٔ مستقل تصمیم‌گیری دارند. |
| proportional-representation | نظام تناسبی | Proportional representation | سیستم انتخاباتی که کرسی‌های مجلس را متناسب با سهم آرای هر حزب تقسیم می‌کند. |
| fptp | نظام اکثریتی (اکثریت نسبی) | First-past-the-post | کاندیدای دارای بیشترین رأی در هر حوزه برنده می‌شود، حتی بدون اکثریت مطلق. |
| no-confidence-vote | رأی عدم اعتماد | Vote of no confidence | ابزار پارلمانی برای برکناری دولت با رأی اکثریت نمایندگان. |
| judicial-review | بازبینی قضایی | Judicial review | اختیار دادگاه برای باطل کردن قانون یا اقدام دولتی مغایر با قانون اساسی. |
| veto-player | بازیگر وتو | Veto player | هر نهاد یا فرد که می‌تواند مانع تغییر وضع موجود شود؛ افزایش شمار این بازیگران، تغییر سیاست را دشوارتر می‌کند. |
| executive-aggrandizement | تمرکزگرایی اجرایی | Executive aggrandizement | تضعیف تدریجی نظارت‌ها توسط قوهٔ مجریهٔ منتخب، بدون کودتا یا لغو رسمی انتخابات. |
| competitive-authoritarianism | اقتدارگرایی رقابتی | Competitive authoritarianism | نظامی با انتخابات چندحزبی واقعی که میدان رقابت به‌شدت به نفع حزب حاکم کج است. |
| democratic-backsliding | افول دموکراتیک | Democratic backsliding | کاهش تدریجی کیفیت دموکراسی از درون، معمولاً با حفظ ظاهر نهادهای انتخاباتی. |
| ceremonial-head-of-state | رئیس تشریفاتی | Ceremonial head of state | مقامی با کارکرد نمادین که اختیار اجرایی روزمره ندارد. |
| minority-government | دولت اقلیت | Minority government | دولتی که بدون اکثریت مطلق در پارلمان، با تحمل ضمنی احزاب دیگر ادامه می‌یابد. |
| governing-coalition | ائتلاف حاکم | Governing coalition | اتحاد چند حزب برای تشکیل اکثریت پارلمانی و دولت مشترک. |
| dissolution-of-parliament | انحلال مجلس | Dissolution of parliament | پایان زودهنگام دورهٔ مجلس و فراخوان انتخابات جدید. |
| impeachment | استیضاح | Impeachment | فرایند رسمی اتهام و برکناری یک مقام (اغلب رئیس‌جمهور) توسط مجلس یا نهاد ویژه. |
| executive-decree | حکم اجرایی | Executive order / decree | دستور رئیس کشور یا دولت که بدون تصویب مجلس اجرا می‌شود؛ حدودش نظام به نظام فرق دارد. |
| electoral-threshold | آستانهٔ انتخاباتی | Electoral threshold | حداقل درصد آرای لازم برای ورود حزب به مجلس در نظام تناسبی. |
| alternation-in-power | جابه‌جایی قدرت (گردش نخبگان) | Alternation in power | انتقال واقعی قدرت اجرایی از یک حزب/فرد به رقیب از طریق انتخابات. |
| independent-oversight-body | نهاد ناظر مستقل | Independent oversight body | سازمان تخصصی (کمیسیون انتخابات، دیوان محاسبات، نهاد ضدفساد) که باید فارغ از فشار سیاسی روزمره کار کند. |
| state-vs-public-media | رسانهٔ دولتی در برابر رسانهٔ عمومی | State media vs. public broadcaster | رسانهٔ دولتی مستقیماً زیر کنترل دولت است؛ رسانهٔ عمومی با تأمین مالی مستقل و هیئت نظارتی بی‌طرف اداره می‌شود. |
| civilian-control | کنترل غیرنظامی بر ارتش | Civilian control of the military | اصل اینکه تصمیم نهایی دربارهٔ کاربرد نیروی مسلح با مقام‌های منتخب غیرنظامی باشد. |
| self-coup | کودتای خزنده (خودکودتا) | Self-coup (autogolpe) | تصرف قدرت فوق‌قانونی توسط مقامی که خودش از مسیر قانونی به قدرت رسیده، مثلاً منحل‌کردن غیرقانونی مجلس. |
| legitimacy | مشروعیت | Legitimacy | پذیرش عمومی حق حکومت‌کردن یک نهاد یا فرد، فارغ از مسیر رسیدنش به قدرت. |
| rule-of-law | حاکمیت قانون | Rule of law | اصل اینکه هیچ فرد یا نهادی — از جمله حکومت — بالاتر از قانون نیست. |
| ethnic-federalism | فدرالیسم قومی | Ethnic federalism | تقسیم واحدهای فدرال بر اساس مرزهای قومی/زبانی به‌جای مرزهای اداری صرف. |
| bicameral | قوهٔ مقننهٔ دو مجلسی | Bicameral legislature | مجلسی متشکل از دو اتاق که معمولاً هرکدام اختیارات متفاوتی دارند. |
| parliamentary-immunity | مصونیت پارلمانی | Parliamentary immunity | حفاظت قانونی نمایندگان از پیگرد قضایی برای اقدامات مرتبط با وظیفهٔ نمایندگی. |
| referendum | رفراندوم | Referendum | رأی‌گیری مستقیم مردم روی یک پرسش سیاستی یا قانون اساسی مشخص، جدا از انتخاب نماینده. |
| intra-party-competition | رقابت درون‌حزبی | Intra-party competition | رقابت جناح‌ها یا کاندیداهای مختلف درون یک حزب واحد برای کسب مقام یا نامزدی. |
| institutional-capture | مصادرهٔ نهادی | Institutional capture | روندی که در آن نهاد ناظر (دادگاه، رسانه، کمیسیون انتخابات) عملاً کنترلش به دست بازیگری می‌افتد که باید نظارتش کند. |

### 1.2 Confusion cards — 6 new (double `content/builder.ts` → `confusions`, currently 6 → 12)

```ts
{
  id: "federal-not-weak",
  statementFa: "فدرال ≠ حکومت مرکزی ضعیف",
  revealFa:
    "فدرالیسم یعنی تقسیم رسمی اختیار میان مرکز و واحدهای منطقه‌ای، نه لزوماً ضعف دولت مرکزی. آلمان و ایالات متحده فدرال‌اند و دولت مرکزی‌شان در حوزه‌های تعیین‌شده کاملاً قدرتمند عمل می‌کند.",
  visualHintFa: "دایرهٔ اختیار مشترک در برابر دایرهٔ اختیار منحصر به مرکز یا واحدها.",
},
{
  id: "referendum-not-direct-democracy",
  statementFa: "رفراندوم ≠ دموکراسی مستقیم پایدار",
  revealFa:
    "رفراندوم رأی‌گیری روی یک پرسش مشخص است، نه جایگزین دائمی نمایندگی. چه کسی پرسش را طرح می‌کند و زمان‌بندی را تعیین می‌کند، خودش یک تصمیم قدرت است.",
  visualHintFa: "یک پرسش منزوی در برابر ساختار دائمی نمایندگی.",
},
{
  id: "ruling-party-not-one-party-state",
  statementFa: "حزب حاکم قوی ≠ نظام تک‌حزبی",
  revealFa:
    "یک حزب می‌تواند سال‌ها با اکثریت قوی حکومت کند در حالی که رقابت رسمی و امکان قانونی شکست هنوز وجود دارد. تفاوت اصلی این است که آیا مسیر قانونی جایگزینی در عمل بسته شده یا نه.",
  visualHintFa: "طیف از تک‌حزبی رسمی تا حزب حاکم مسلط در نظامی رقابتی.",
},
{
  id: "coup-not-only-military",
  statementFa: "کودتا ≠ فقط تصرف نظامی کاخ",
  revealFa:
    "برخی کودتاها را رئیس‌جمهور منتخب علیه نهادهای خودش انجام می‌دهد؛ مثلاً با منحل‌کردن غیرقانونی مجلس یا دادگاه قانون اساسی. به این «خودکودتا» می‌گویند.",
  visualHintFa: "پیکان کودتا از بیرون نظام در برابر پیکانی که از داخل رأس اجرایی می‌آید.",
},
{
  id: "lobbying-not-corruption",
  statementFa: "لابی‌گری ≠ فساد",
  revealFa:
    "لابی‌گری یعنی تلاش سازمان‌یافته برای اثرگذاری بر تصمیم‌گیرندگان؛ در بسیاری نظام‌ها قانونی و ثبت‌شده است. فساد وقتی شروع می‌شود که این اثرگذاری با رشوه، تهدید یا نقض قانون همراه شود.",
  visualHintFa: "کانال شفاف ثبت‌شده در برابر کانال پنهان و غیرقانونی.",
},
{
  id: "boycott-not-apathy",
  statementFa: "تحریم انتخابات ≠ بی‌تفاوتی مردم",
  revealFa:
    "تحریم می‌تواند یک استراتژی آگاهانهٔ سیاسی برای رد مشروعیت یک رقابت نابرابر باشد، نه نشانهٔ بی‌علاقگی به سیاست. باید پرسید چرا گروهی تصمیم به تحریم گرفته‌اند.",
  visualHintFa: "صندوق خالی از روی انتخاب آگاهانه در برابر خالی از روی بی‌تفاوتی.",
},
```

### 1.3 "Why this matters" bridges — one per `/components/experience/*` module

Insert as a closing card in each module, after the institutional lesson, before the "next" control. Keeps the abstract point tethered to something a newcomer already half-recognizes from the news.

- **WhoRules.tsx** — «وقتی می‌پرسید "واقعاً چه کسی حکومت می‌کند؟"، همان سؤالی است که در بحث دربارهٔ اینکه آیا فلان کشور را رئیس‌جمهورش اداره می‌کند یا حلقهٔ نزدیکان و مشاورانش، هرروز در اخبار تکرار می‌شود.»
- **ExecutiveMachine.tsx** — «تفاوت نظام ریاستی و پارلمانی همان چیزی است که توضیح می‌دهد چرا در برخی کشورها تغییر نخست‌وزیر بدون انتخابات جدید ممکن است، ولی در برخی دیگر رئیس‌جمهور تا پایان دوره‌اش سرکار می‌ماند حتی با پارلمانی مخالف.»
- **GreatConfusions.tsx** — «این سردرگمی‌ها همان چیزی‌اند که باعث می‌شوند دو نفر دربارهٔ یک کشور واحد برداشت‌های کاملاً متضاد داشته باشند — چون یکی به برچسب نگاه می‌کند و دیگری به عملکرد واقعی.»
- **DeJureDeFacto.tsx** — «فاصلهٔ میان متن قانون و عملکرد واقعی همان چیزی است که توضیح می‌دهد چرا کشوری با قانون اساسیِ "آزادی بیان تضمین‌شده" می‌تواند در عمل رسانهٔ منتقد نداشته باشد.»
- **PowerConcentration.tsx** — «طیف تمرکز قدرت کمک می‌کند بفهمید چرا برخی رهبران با وجود "قانونی بودن" انتخاب‌شان، عملاً هیچ‌کس نمی‌تواند تصمیم‌شان را متوقف کند.»
- **MonarchyRepublic.tsx** — «این تمایز توضیح می‌دهد چرا سلطنت بریتانیا با پادشاهی عربستان یک‌جور مقایسه نمی‌شود، و چرا "جمهوری" به‌تنهایی هیچ تضمینی دربارهٔ آزادی نمی‌دهد.»

### 1.4 Guided-path / onboarding spec (no new content strings needed, structural only)

- **`/experience` entry:** offer a 2-way choice before the journey starts — «مسیر ۱۰ دقیقه‌ای» (skips `PowerConcentration` and `DeJureDeFacto`, the two densest modules) vs «مسیر کامل ۳۰ دقیقه‌ای» (all 7). Store the choice in `localStorage`; show a thin progress bar across modules either way.
- **`/atlas` and `/laboratory` first visit:** reuse the `discloseLevel` progressive-disclosure pattern already built in `PowerMap.tsx` — a 3-step spotlight (pick any node → see it light up its edges → open the questions panel) shown once, dismissible, gated on a `localStorage` flag so it never nags a returning user.

---

## PART 2 — Expert-facing content (expanded)

### 2.1 Ten new countries — append to `content/countries.ts`

Chosen to cover institutional variety the current 15 don't: an EU state that backslid (Hungary), one that backslid then partially reversed via the ballot box (Poland), a Latin American competitive-authoritarian case (Venezuela), two large federal presidential democracies with different rule-of-law trajectories (Brazil, Nigeria), a post-coup military junta (Myanmar), a constitutionally-enshrined one-party state (Vietnam), a small high-trust consensus democracy (Uruguay), a non-constitutional theocratic militant government (Afghanistan under the Taliban) — this also normalizes Iran's category by giving it company rather than leaving Iran as the only theocratic-adjacent case — and a parliamentary democracy that famously has no single written constitution (Israel).

```ts
{
  id: "hungary",
  nameFa: "مجارستان",
  nameEn: "Hungary",
  headOfState: "رئیس‌جمهور (عمدتاً تشریفاتی)",
  headOfGovernment: "نخست‌وزیر",
  executiveType: "پارلمانی با اکثریت مسلط بلندمدت یک حزب",
  legislature: "تک‌مجلسی",
  electoralSystem: "مختلط، با آستانه و مرزبندی حوزه‌ای مورد مناقشه",
  territorialStructure: "واحد",
  judicialIndependence: "محدود (دادگاه قانون اساسی بازآرایی‌شده از ۲۰۱۱)",
  politicalCompetition: "رقابتی روی کاغذ، به‌شدت نامتوازن در عمل",
  contestedNoteFa:
    "V-Dem از سال‌های اخیر مجارستان را «اقتدارگرایی انتخاباتی» طبقه‌بندی کرده؛ اتحادیهٔ اروپا همچنان آن را عضو دموکراتیک می‌شمارد. اختلاف نظر بر سر خط دقیق میان «دموکراسی آسیب‌دیده» و «اقتدارگرایی رقابتی» ادامه دارد.",
  fingerprint: fp({
    executiveConcentration: 0.72,
    legislativeStrength: 0.35,
    judicialIndependence: 0.30,
    electoralCompetition: 0.55,
    decentralization: 0.35,
    constitutionalConstraints: 0.30,
    mediaIndependence: 0.25,
    leadershipTurnover: 0.25,
    partyCompetition: 0.45,
    civilianControl: 0.85,
    accountability: 0.30,
  }),
  sourceIds: ["v-dem-codebook", "bermeo-democratic-backsliding"],
},
{
  id: "poland",
  nameFa: "لهستان",
  nameEn: "Poland",
  headOfState: "رئیس‌جمهور",
  headOfGovernment: "نخست‌وزیر",
  executiveType: "پارلمانی",
  legislature: "دو مجلسی",
  electoralSystem: "تناسبی",
  territorialStructure: "واحد با خودگردانی محلی",
  judicialIndependence: "متوسط، در حال بازسازی پس از منازعهٔ نهادی ۲۰۱۵–۲۰۲۳",
  politicalCompetition: "رقابتی؛ جابه‌جایی واقعی قدرت در انتخابات ۲۰۲۳ رخ داد",
  contestedNoteFa:
    "میان ۲۰۱۵ و ۲۰۲۳ لهستان در گزارش‌های حاکمیت قانون اتحادیهٔ اروپا به‌عنوان مورد نگران‌کننده ذکر می‌شد؛ شکست انتخاباتی حزب حاکم در ۲۰۲۳ نمونهٔ کمیابی از بازگشت از افول دموکراتیک از طریق صندوق رأی است، هرچند بازسازی نهادها (به‌ویژه دستگاه قضا) هنوز کامل نشده.",
  fingerprint: fp({
    executiveConcentration: 0.55,
    legislativeStrength: 0.58,
    judicialIndependence: 0.42,
    electoralCompetition: 0.72,
    decentralization: 0.5,
    constitutionalConstraints: 0.48,
    mediaIndependence: 0.52,
    leadershipTurnover: 0.6,
    partyCompetition: 0.68,
    civilianControl: 0.88,
    accountability: 0.52,
  }),
  sourceIds: ["v-dem-codebook", "bermeo-democratic-backsliding"],
},
{
  id: "venezuela",
  nameFa: "ونزوئلا",
  nameEn: "Venezuela",
  headOfState: "رئیس‌جمهور",
  headOfGovernment: "رئیس‌جمهور",
  executiveType: "ریاستی",
  legislature: "تک‌مجلسی (مجلس ملی)؛ اختیاراتش عملاً به دیوان عالی منتقل شده",
  electoralSystem: "اسمی رقابتی؛ ثبت‌نام و صلاحیت نامزدها به‌شدت محدود",
  territorialStructure: "فدرال روی کاغذ، متمرکز در عمل",
  judicialIndependence: "بسیار وابسته",
  politicalCompetition: "بسیار محدود",
  contestedNoteFa:
    "در ۲۰۱۷ دیوان عالی (TSJ) اختیارات مجلس ملیِ تحت کنترل مخالفان را موقتاً به خود منتقل کرد؛ اعتراض‌های گسترده باعث عقب‌نشینی جزئی شد، اما مجلس عملاً کارکرد نظارتی خود را در ادامه از دست داد.",
  fingerprint: fp({
    executiveConcentration: 0.9,
    legislativeStrength: 0.15,
    judicialIndependence: 0.1,
    electoralCompetition: 0.2,
    decentralization: 0.2,
    constitutionalConstraints: 0.15,
    mediaIndependence: 0.15,
    leadershipTurnover: 0.15,
    partyCompetition: 0.2,
    civilianControl: 0.35,
    accountability: 0.12,
  }),
  sourceIds: ["v-dem-codebook", "levitsky-way-competitive-authoritarianism"],
},
{
  id: "brazil",
  nameFa: "برزیل",
  nameEn: "Brazil",
  headOfState: "رئیس‌جمهور",
  headOfGovernment: "رئیس‌جمهور",
  executiveType: "ریاستی فدرال",
  legislature: "دو مجلسی",
  electoralSystem: "تناسبی (مجلس نمایندگان) و اکثریتی (سنا)",
  territorialStructure: "فدرال",
  judicialIndependence: "بالا؛ دیوان عالی فدرال (STF) فعال و رأی‌ساز",
  politicalCompetition: "رقابتی، بسیار چندحزبی",
  fingerprint: fp({
    executiveConcentration: 0.6,
    legislativeStrength: 0.68,
    judicialIndependence: 0.72,
    electoralCompetition: 0.78,
    decentralization: 0.78,
    constitutionalConstraints: 0.68,
    mediaIndependence: 0.68,
    leadershipTurnover: 0.7,
    partyCompetition: 0.65,
    civilianControl: 0.75,
    accountability: 0.62,
  }),
  sourceIds: ["v-dem-codebook"],
},
{
  id: "nigeria",
  nameFa: "نیجریه",
  nameEn: "Nigeria",
  headOfState: "رئیس‌جمهور",
  headOfGovernment: "رئیس‌جمهور",
  executiveType: "ریاستی فدرال",
  legislature: "دو مجلسی",
  electoralSystem: "اکثریتی",
  territorialStructure: "فدرال (۳۶ ایالت) با استانداران قدرتمند",
  judicialIndependence: "متوسط",
  politicalCompetition: "رقابتی با نگرانی‌های جدی دربارهٔ صحت اجرای انتخابات",
  fingerprint: fp({
    executiveConcentration: 0.62,
    legislativeStrength: 0.45,
    judicialIndependence: 0.4,
    electoralCompetition: 0.5,
    decentralization: 0.65,
    constitutionalConstraints: 0.45,
    mediaIndependence: 0.5,
    leadershipTurnover: 0.55,
    partyCompetition: 0.55,
    civilianControl: 0.65,
    accountability: 0.42,
  }),
  sourceIds: ["v-dem-codebook"],
},
{
  id: "myanmar",
  nameFa: "میانمار",
  nameEn: "Myanmar",
  headOfState: "رئیس شورای اداری دولت (نظامی)",
  headOfGovernment: "همان رئیس شورا (فرماندهٔ ارشد ارتش)",
  executiveType: "حکومت نظامی پس از کودتا (۲۰۲۱)",
  legislature: "منحل / معلق",
  electoralSystem: "بدون انتخابات رقابتی از ۲۰۲۱",
  territorialStructure: "واحد با درگیری‌های مسلح منطقه‌ای گسترده",
  judicialIndependence: "زیر کنترل نظامی",
  politicalCompetition: "سرکوب‌شده",
  fingerprint: fp({
    executiveConcentration: 0.92,
    legislativeStrength: 0.05,
    judicialIndependence: 0.1,
    electoralCompetition: 0.05,
    decentralization: 0.15,
    constitutionalConstraints: 0.1,
    mediaIndependence: 0.08,
    leadershipTurnover: 0.1,
    partyCompetition: 0.05,
    civilianControl: 0.02,
    accountability: 0.08,
  }),
  sourceIds: ["v-dem-codebook"],
},
{
  id: "vietnam",
  nameFa: "ویتنام",
  nameEn: "Vietnam",
  headOfState: "رئیس‌جمهور (نقش تا حدی تشریفاتی)",
  headOfGovernment: "نخست‌وزیر؛ مرکز واقعی قدرت دبیرکل حزب کمونیست است",
  executiveType: "حزب‌محور، تک‌حزبی بر اساس اصل ۴ قانون اساسی",
  legislature: "تک‌مجلسی (مجمع ملی)؛ کاندیداها با تأیید جبههٔ میهنی غربال می‌شوند",
  electoralSystem: "بدون رقابت حزبی",
  territorialStructure: "واحد با استان‌ها",
  judicialIndependence: "وابسته به حزب",
  politicalCompetition: "تک‌حزبی",
  fingerprint: fp({
    executiveConcentration: 0.85,
    legislativeStrength: 0.2,
    judicialIndependence: 0.15,
    electoralCompetition: 0.05,
    decentralization: 0.3,
    constitutionalConstraints: 0.2,
    mediaIndependence: 0.08,
    leadershipTurnover: 0.3,
    partyCompetition: 0.03,
    civilianControl: 0.8,
    accountability: 0.18,
  }),
  sourceIds: ["v-dem-codebook"],
},
{
  id: "uruguay",
  nameFa: "اروگوئه",
  nameEn: "Uruguay",
  headOfState: "رئیس‌جمهور",
  headOfGovernment: "رئیس‌جمهور",
  executiveType: "ریاستی",
  legislature: "دو مجلسی",
  electoralSystem: "تناسبی",
  territorialStructure: "واحد با دولت‌های محلی (دپارتمان)",
  judicialIndependence: "بالا",
  politicalCompetition: "رقابتی، چندحزبی و پایدار",
  contestedNoteFa:
    "اروگوئه در رتبه‌بندی آزادی مطبوعات گزارشگران بدون مرز بین ۲۰۱۹ تا ۲۰۲۴ از جایگاه ۱۹ به ۵۱ سقوط کرد؛ نمونه‌ای که نشان می‌دهد حتی دموکراسی‌های باثبات هم می‌توانند در یک محور خاص افت کنند بدون آنکه نظام کلی به خطر بیفتد.",
  fingerprint: fp({
    executiveConcentration: 0.35,
    legislativeStrength: 0.72,
    judicialIndependence: 0.75,
    electoralCompetition: 0.88,
    decentralization: 0.5,
    constitutionalConstraints: 0.72,
    mediaIndependence: 0.72,
    leadershipTurnover: 0.8,
    partyCompetition: 0.82,
    civilianControl: 0.92,
    accountability: 0.78,
  }),
  sourceIds: ["v-dem-codebook"],
},
{
  id: "afghanistan",
  nameFa: "افغانستان",
  nameEn: "Afghanistan",
  headOfState: "امیر (رهبر طالبان)",
  headOfGovernment: "امیر / معاونانش",
  executiveType: "امارت اسلامی؛ بدون قانون اساسی مدون، حکمرانی از طریق فرمان و فتوا",
  legislature: "بدون مجلس منتخب؛ شوراهای علما و مقامات منصوب",
  electoralSystem: "بدون انتخابات",
  territorialStructure: "واحد؛ کنترل عملی از طریق ولایات و قوماندان‌های محلی",
  judicialIndependence: "دادگاه‌های شرعی زیر نظر مستقیم امارت",
  politicalCompetition: "غیرموجود",
  fingerprint: fp({
    executiveConcentration: 0.97,
    legislativeStrength: 0.02,
    judicialIndependence: 0.1,
    electoralCompetition: 0.0,
    decentralization: 0.15,
    constitutionalConstraints: 0.05,
    mediaIndependence: 0.05,
    leadershipTurnover: 0.05,
    partyCompetition: 0.0,
    civilianControl: 0.1,
    accountability: 0.05,
  }),
  sourceIds: ["v-dem-codebook"],
},
{
  id: "israel",
  nameFa: "اسرائیل",
  nameEn: "Israel",
  headOfState: "رئیس‌جمهور (تشریفاتی)",
  headOfGovernment: "نخست‌وزیر",
  executiveType: "پارلمانی",
  legislature: "تک‌مجلسی (کنست)",
  electoralSystem: "تناسبی سراسری با آستانهٔ پایین → ائتلاف‌های چندحزبی مزمن",
  territorialStructure: "واحد",
  judicialIndependence: "تاریخاً بالا؛ محل منازعهٔ سیاسی شدید از ۲۰۲۳",
  politicalCompetition: "بسیار رقابتی و پراکنده",
  contestedNoteFa:
    "اسرائیل قانون اساسی واحد و مدون ندارد؛ به‌جای آن مجموعه‌ای از «قوانین اساسی» را دارد که با اکثریت عادی کنست قابل تغییرند — نمونهٔ درسی از تمایز میان «قانون اساسی سخت» و «قانون اساسی انعطاف‌پذیر». تلاش اصلاح قضایی ۲۰۲۳ دقیقاً بر سر همین انعطاف‌پذیری بود.",
  fingerprint: fp({
    executiveConcentration: 0.55,
    legislativeStrength: 0.6,
    judicialIndependence: 0.6,
    electoralCompetition: 0.82,
    decentralization: 0.25,
    constitutionalConstraints: 0.45,
    mediaIndependence: 0.68,
    leadershipTurnover: 0.6,
    partyCompetition: 0.85,
    civilianControl: 0.85,
    accountability: 0.62,
  }),
  sourceIds: ["v-dem-codebook"],
},
```

### 2.2 Four historical time-slices — new `content/countries-historical.ts`

Each pairs with an existing `countries.ts` entry via `parentCountryId`, letting the UI render "same country, different era" side-by-side using the existing `PowerFingerprint` component unchanged. This is the single highest-value expert addition: it turns the atlas from a static snapshot into a visible mechanism of institutional drift.

```ts
import type { HistoricalCountrySystem } from "./types";

export const historicalCountries: HistoricalCountrySystem[] = [
  {
    id: "germany-weimar",
    parentCountryId: "germany",
    nameFa: "آلمان",
    nameEn: "Germany",
    eraLabelFa: "جمهوری وایمار",
    eraLabelEn: "Weimar Republic",
    yearRangeFa: "۱۹۱۹–۱۹۳۳",
    keyEventFa:
      "اصل ۴۸ قانون اساسی وایمار به رئیس‌جمهور اجازهٔ حکمرانی با فرمان اضطراری می‌داد؛ در سال‌های پایانی جمهوری این ابزار از «اقدام استثنائی» به روش عادی حکمرانی تبدیل شد و راه را برای تصرف کامل قدرت باز کرد — در حالی که انتخابات رقابتی و تناسبی همچنان برگزار می‌شد.",
    headOfState: "رئیس‌جمهور",
    headOfGovernment: "صدراعظم",
    executiveType: "نیمه‌ریاستی با اختیارات اضطراری گسترده برای رئیس‌جمهور",
    legislature: "تک‌مجلسی (رایشستاگ)، تناسبی و به‌شدت چندحزبی",
    judicialIndependence: "رسمی مستقل؛ در عمل با اغماض نسبت به خشونت راست‌گرا",
    politicalCompetition: "بسیار رقابتی تا واپسین ماه‌ها",
    fingerprint: fp({
      executiveConcentration: 0.55,
      legislativeStrength: 0.4,
      judicialIndependence: 0.5,
      electoralCompetition: 0.75,
      decentralization: 0.55,
      constitutionalConstraints: 0.3,
      mediaIndependence: 0.55,
      leadershipTurnover: 0.35,
      partyCompetition: 0.7,
      civilianControl: 0.45,
      accountability: 0.35,
    }),
    sourceIds: ["german-gg"],
  },
  {
    id: "france-fourth-republic",
    parentCountryId: "france",
    nameFa: "فرانسه",
    nameEn: "France",
    eraLabelFa: "جمهوری چهارم",
    eraLabelEn: "Fourth Republic",
    yearRangeFa: "۱۹۴۶–۱۹۵۸",
    keyEventFa:
      "قوهٔ مجریه چنان ضعیف بود که در ۱۲ سال ۲۴ دولت روی کار آمد و سقوط کرد؛ بحران استقلال الجزایر و شورش نظامیان در ۱۹۵۸ نهایتاً حکومت را ساقط کرد و راه بازگشت دوگل و نگارش قانون اساسی جدید (جمهوری پنجم، نیمه‌ریاستی) را باز کرد.",
    headOfState: "رئیس‌جمهور (عمدتاً تشریفاتی)",
    headOfGovernment: "رئیس‌الوزرا",
    executiveType: "پارلمانی؛ دولت‌ها به‌شدت ناپایدار",
    legislature: "مجلس ملی قدرتمند اما به‌شدت چندپاره",
    judicialIndependence: "متوسط",
    politicalCompetition: "رقابتی و چندحزبی",
    fingerprint: fp({
      executiveConcentration: 0.25,
      legislativeStrength: 0.68,
      judicialIndependence: 0.55,
      electoralCompetition: 0.78,
      decentralization: 0.35,
      constitutionalConstraints: 0.5,
      mediaIndependence: 0.65,
      leadershipTurnover: 0.92,
      partyCompetition: 0.75,
      civilianControl: 0.55,
      accountability: 0.5,
    }),
  },
  {
    id: "turkey-pre-2017",
    parentCountryId: "turkey",
    nameFa: "ترکیه",
    nameEn: "Turkey",
    eraLabelFa: "پیش از اصلاح قانون اساسی",
    eraLabelEn: "Pre-2017 (parliamentary system)",
    yearRangeFa: "پیش از ۲۰۱۷",
    keyEventFa:
      "رفراندوم آوریل ۲۰۱۷ با اکثریتی باریک (۵۱.۴٪) نظام را از پارلمانی به ریاستی تغییر داد: پست نخست‌وزیری حذف شد، حق طرح استیضاح از مجلس گرفته شد و رئیس‌جمهور اختیار انتصاب مستقیم کابینه و وابستگی حزبی یافت.",
    headOfState: "رئیس‌جمهور (عمدتاً تشریفاتی پیش از ۲۰۱۴)",
    headOfGovernment: "نخست‌وزیر",
    executiveType: "پارلمانی",
    legislature: "تک‌مجلسی؛ اختیار استیضاح دولت داشت",
    judicialIndependence: "متوسط",
    politicalCompetition: "رقابتی",
    fingerprint: fp({
      executiveConcentration: 0.55,
      legislativeStrength: 0.55,
      judicialIndependence: 0.55,
      electoralCompetition: 0.72,
      decentralization: 0.3,
      constitutionalConstraints: 0.5,
      mediaIndependence: 0.45,
      leadershipTurnover: 0.5,
      partyCompetition: 0.65,
      civilianControl: 0.6,
      accountability: 0.5,
    }),
  },
  {
    id: "south-korea-military-era",
    parentCountryId: "south-korea",
    nameFa: "کره جنوبی",
    nameEn: "South Korea",
    eraLabelFa: "دورهٔ حکومت نظامی",
    eraLabelEn: "Military-backed rule",
    yearRangeFa: "۱۹۶۱–۱۹۸۷",
    keyEventFa:
      "پس از کودتای ۱۹۶۱، قانون اساسی یوشین (۱۹۷۲) انتخاب مستقیم رئیس‌جمهور را لغو کرد و محدودیت دورهٔ ریاست را برداشت. حکومت نظامی تا خیزش دموکراتیک ژوئن ۱۹۸۷ و بازگرداندن انتخابات مستقیم ادامه یافت.",
    headOfState: "رئیس‌جمهور (با پیشینهٔ کودتای نظامی)",
    headOfGovernment: "رئیس‌جمهور",
    executiveType: "ریاستی با پشتوانهٔ مستقیم نظامی",
    legislature: "ضعیف و عمدتاً تأییدکننده",
    judicialIndependence: "محدود",
    politicalCompetition: "به‌شدت محدود؛ انتخابات مدیریت‌شده",
    fingerprint: fp({
      executiveConcentration: 0.85,
      legislativeStrength: 0.2,
      judicialIndependence: 0.25,
      electoralCompetition: 0.25,
      decentralization: 0.2,
      constitutionalConstraints: 0.2,
      mediaIndependence: 0.2,
      leadershipTurnover: 0.15,
      partyCompetition: 0.3,
      civilianControl: 0.1,
      accountability: 0.2,
    }),
  },
];
```

**UI note for the dev agent:** on `/countries`, add a small "era" selector next to Germany, France, Turkey, and South Korea in the country picker (e.g. a toggle chip reading the `eraLabelFa`) rather than listing historical slices as separate top-level countries — keeps the picker from doubling in length for everyone who doesn't care about history.

### 2.3 Four new de jure / de facto scenarios — append to `content/builder.ts` → `deJureScenarios` (6 → 10)

```ts
{
  id: "centralBank",
  titleFa: "بانک مرکزی",
  paperClaimFa: "بانک مرکزی مستقل از دولت سیاست پولی تعیین می‌کند.",
  practiceFactsFa: [
    "رئیس بانک مرکزی با میل دولت منصوب و پیش از پایان دوره برکنار می‌شود.",
    "دولت آشکارا برای کاهش نرخ بهره پیش از انتخابات فشار می‌آورد.",
    "ذخایر ارزی و سیاست پولی برای تأمین هزینه‌های بودجه‌ای دولت به کار می‌رود.",
  ],
  independenceAtPractice: 0.3,
},
{
  id: "auditBody",
  titleFa: "دیوان محاسبات / نهاد ضدفساد",
  paperClaimFa: "نهاد نظارت مالی می‌تواند هزینه‌کرد دولت را بازرسی و افشا کند.",
  practiceFactsFa: [
    "گزارش‌های حسابرسی با تأخیر طولانی یا هرگز منتشر نمی‌شوند.",
    "رئیس نهاد از میان وفاداران سیاسی انتخاب می‌شود.",
    "پروندهٔ فساد علیه مقام‌های نزدیک به دولت به‌ندرت به دادگاه می‌رسد.",
  ],
  independenceAtPractice: 0.25,
},
{
  id: "electionCommission",
  titleFa: "کمیسیون برگزاری انتخابات",
  paperClaimFa: "نهاد مستقل برگزاری و شمارش انتخابات را تضمین می‌کند.",
  practiceFactsFa: [
    "اعضای کمیسیون با پیشنهاد مستقیم قوهٔ اجرایی منصوب می‌شوند.",
    "مرزبندی حوزه‌های انتخاباتی به‌طور دوره‌ای به نفع حزب حاکم تغییر می‌کند.",
    "شکایت دربارهٔ تخلف در شمارش آرا مسیر رسیدگی مؤثر ندارد.",
  ],
  independenceAtPractice: 0.32,
},
{
  id: "localGovernment",
  titleFa: "دولت‌های محلی",
  paperClaimFa: "شهرداری‌ها و استان‌ها در حوزهٔ خود اختیار تصمیم‌گیری دارند.",
  practiceFactsFa: [
    "بودجهٔ محلی مشروط به تأیید سالانهٔ مرکز است.",
    "شهردار یا استاندار منتخب را مرکز می‌تواند بدون رأی محلی برکنار کند.",
    "مناطق مخالف دولت مرکزی در تخصیص بودجه از اولویت آخر برخوردارند.",
  ],
  independenceAtPractice: 0.35,
},
```

### 2.4 Three new crisis scenarios — append to `content/crises.ts` (3 → 6)

```ts
{
  id: "contested-referendum",
  titleFa: "بحران چهارم: رفراندوم مورد مناقشه",
  setupFa:
    "دولت رفراندومی برای تغییر قانون اساسی برگزار کرده که نتیجه‌اش با اختلاف کم به نفع دولت تمام شده. مخالفان می‌گویند سؤال رفراندوم گمراه‌کننده طرح شده و دسترسی رسانه‌ای نابرابر بوده است.",
  choices: [
    {
      id: "independent-audit",
      labelFa: "ارجاع به بازرسی مستقل نتایج",
      consequenceFa:
        "اگر نهاد بازرسی واقعاً مستقل باشد، نتیجه می‌تواند تثبیت یا باطل شود بر اساس شواهد. اگر بازرسی زیر نفوذ دولت باشد، تأیید نتیجه از پیش تضمین‌شده است.",
    },
    {
      id: "accept-narrow-result",
      labelFa: "پذیرش نتیجهٔ باریک بدون بازبینی",
      consequenceFa:
        "پذیرش سریع، بحران را کوتاه می‌کند اما اگر رسانه و رقابت واقعاً نابرابر بوده باشند، مشروعیت تغییر قانون اساسی برای بخش بزرگی از جامعه زیر سؤال می‌ماند.",
    },
    {
      id: "annul-and-repeat",
      labelFa: "ابطال و برگزاری دوبارهٔ رفراندوم",
      consequenceFa:
        "تکرار رفراندوم فقط وقتی اعتماد بازمی‌گرداند که شرایط رقابت واقعاً اصلاح شود؛ در غیر این صورت تکرار به ابزار فرسایش مخالفان تبدیل می‌شود.",
    },
  ],
  institutionalLessonFa:
    "رفراندوم به‌تنهایی خنثی نیست؛ کیفیت مشروعیتش به شکل طرح پرسش، دسترسی برابر به رسانه و استقلال نهاد بازرسی‌کنندهٔ نتیجه وابسته است.",
},
{
  id: "secession-crisis",
  titleFa: "بحران پنجم: مطالبهٔ جدایی یا خودمختاری منطقه‌ای",
  setupFa:
    "یک منطقه با هویت قومی یا زبانی متمایز، رفراندوم خودمختاری یا استقلال برگزار کرده که دولت مرکزی آن را غیرقانونی می‌داند.",
  choices: [
    {
      id: "negotiate-autonomy",
      labelFa: "مذاکره برای خودمختاری گسترده‌تر",
      consequenceFa:
        "در نظام‌های با فدرالیسم واقعی و دادگاه قانون اساسی معتبر، مذاکره می‌تواند به فرمول پایدار برسد. در نظام‌های شدیداً متمرکز، مذاکره اغلب فقط زمان می‌خرد.",
    },
    {
      id: "central-crackdown",
      labelFa: "سرکوب مستقیم و لغو رفراندوم از مرکز",
      consequenceFa:
        "سرکوب هزینهٔ سیاسی و بین‌المللی دارد که اندازه‌اش به استقلال رسانه و نهادهای بین‌المللی ناظر بستگی دارد؛ در نبود این نظارت، سرکوب کم‌هزینه‌تر می‌شود.",
    },
    {
      id: "constitutional-court-rules",
      labelFa: "ارجاع به دادگاه قانون اساسی برای تعیین مسیر قانونی",
      consequenceFa:
        "دادگاه مستقل می‌تواند چارچوب حقوقی روشنی برای رفراندوم آینده تعیین کند. دادگاه وابسته معمولاً حکمی هم‌راستا با ترجیح مرکز صادر می‌کند.",
    },
  ],
  institutionalLessonFa:
    "بحران جدایی‌طلبی آزمایش می‌کند که آیا فدرالیسم یک نظام واقعی توزیع اختیار است یا فقط نامی روی نقشهٔ اداری.",
},
{
  id: "leader-prosecution",
  titleFa: "بحران ششم: پیگرد قضایی رهبر در قدرت",
  setupFa:
    "دادستانی مستقل رئیس دولت را به فساد یا سوءاستفاده از قدرت متهم کرده. حامیان رهبر می‌گویند این پرونده انگیزهٔ سیاسی دارد.",
  choices: [
    {
      id: "let-trial-proceed",
      labelFa: "اجازهٔ ادامهٔ روند قضایی در حین تصدی مقام",
      consequenceFa:
        "این مسیر وقتی معتبر می‌ماند که دادگاه از فشار اجرایی مصون باشد. در غیر این صورت، یا پرونده بی‌سروصدا بسته می‌شود یا به‌عنوان تسویه‌حساب سیاسی به رقبا معرفی می‌شود.",
    },
    {
      id: "immunity-law",
      labelFa: "تصویب یا گسترش مصونیت رهبر در قدرت",
      consequenceFa:
        "مصونیت گسترده‌تر می‌تواند بی‌ثباتی کوتاه‌مدت را کاهش دهد، اما اصل پاسخ‌گویی برابر در برابر قانون را برای هر رهبر بعدی هم تضعیف می‌کند.",
    },
    {
      id: "resign-under-pressure",
      labelFa: "استعفا پیش از حکم نهایی",
      consequenceFa:
        "استعفا زمانی محتمل است که حزب یا ائتلاف حاکم هزینهٔ ادامهٔ حمایت را بالاتر از هزینهٔ جایگزینی رهبر ببیند؛ در نظام‌های شخص‌محور این حساب به‌ندرت به ضرر رهبر تمام می‌شود.",
    },
  ],
  institutionalLessonFa:
    "پیگرد قضایی یک رهبر در قدرت، آزمون مستقیم این است که آیا حاکمیت قانون واقعاً بی‌طرفانه اجرا می‌شود یا فقط برای مخالفان اعمال می‌شود.",
},
```

### 2.5 New sources — append to `content/sources.ts`

```ts
{
  id: "tsebelis-veto-players",
  titleFa: "بازیگران وتو",
  titleEn: "Veto Players: How Political Institutions Work (Tsebelis)",
  type: "scholarly",
  noteFa: "چارچوب تحلیل نهادها بر اساس شمار و فاصلهٔ ایدئولوژیک بازیگرانی که می‌توانند مانع تغییر وضع موجود شوند.",
  url: "https://press.princeton.edu/books/paperback/9780691099897/veto-players",
},
{
  id: "levitsky-way-competitive-authoritarianism",
  titleFa: "اقتدارگرایی رقابتی",
  titleEn: "Competitive Authoritarianism: Hybrid Regimes after the Cold War (Levitsky & Way)",
  type: "scholarly",
  noteFa: "چارچوب تمایز نظام‌های ترکیبی که انتخابات رقابتی واقعی برگزار می‌کنند اما اساساً اقتدارگرا می‌مانند.",
  url: "https://www.cambridge.org/core/books/competitive-authoritarianism/",
},
{
  id: "bermeo-democratic-backsliding",
  titleFa: "افول دموکراتیک",
  titleEn: "On Democratic Backsliding (Bermeo)",
  type: "scholarly",
  noteFa: "مفهوم «تمرکزگرایی اجرایی» به‌عنوان شکل غالب افول دموکراتیک معاصر، در تمایز با کودتای کلاسیک.",
  url: "https://www.journalofdemocracy.org/articles/on-democratic-backsliding/",
},
{
  id: "freedom-house-country-reports",
  titleFa: "گزارش‌های سالانهٔ کشوری فریدم‌هاوس",
  titleEn: "Freedom in the World — Country Reports (Freedom House)",
  type: "dataset",
  noteFa: "ارزیابی سالانهٔ حقوق سیاسی و آزادی‌های مدنی به تفکیک کشور؛ منبع تکمیلی برای V-Dem.",
  url: "https://freedomhouse.org/countries/freedom-world/scores",
},
```

Also: retroactively populate `sourceIds` on the **existing** 15 countries and concepts where a clear match exists (e.g. `turkey` and `iran` → `v-dem-codebook`; `germany` → `german-gg`; `united-states` → `us-constitution`) — currently the field is typed but empty everywhere, so no citation actually renders anywhere in the app yet.

---

## 3. Cross-cutting implementation notes

1. **Neutrality check, explicitly requested:** adding Afghanistan (Taliban) as a second theocratic-adjacent case alongside Iran, and Vietnam/Myanmar/Venezuela/Hungary alongside China/Saudi Arabia/Turkey, keeps the "same institutional framework applied to everyone" principle in `app/about/page.tsx` intact rather than reading as singling any one country out. Keep this framing explicit in any announcement copy.
2. **`contestedNoteFa` is new UI surface, not just new data** — render it as a visually distinct callout (different border/icon than the regular country card) so it reads as "here's where informed people disagree" rather than blending into the descriptive fields.
3. **Fingerprint numbers need a review pass.** Flag in the PR description that the 10 new countries + 4 historical slices are first-draft illustrative placements per the note at the top of this document — get a second pass from whoever on the team is most comfortable with V-Dem/Freedom House before calling this "done."
4. **Country picker growth:** 15 → 25 countries plus 4 historical variants means the `<select>` dropdowns in `CountryComparison.tsx` should probably get grouped `<optgroup>`s (e.g. "دموکراسی‌های تثبیت‌شده", "نظام‌های ترکیبی", "نظام‌های اقتدارگرا", "دوره‌های تاریخی") rather than one flat 25+ item list.
5. **Glossary chips are additive UI, not a new page requirement** — ship the inline tooltip behavior first; a standalone `/glossary` browsable page is optional and can follow.

---

## 4. Implementation checklist (suggested order)

- [ ] Extend `content/types.ts` with the 6 schema additions in §0
- [ ] Create `content/glossary.ts` (§1.1) and wire tooltip/chip rendering wherever a glossary term first appears in `/experience` copy
- [ ] Append 6 confusion cards to `content/builder.ts` (§1.2)
- [ ] Add "why this matters" closing card to each of the 6 experience modules (§1.3)
- [ ] Add 10-min/30-min path split + progress bar to `/experience`; add first-visit spotlight tour to `/atlas` and `/laboratory` (§1.4)
- [ ] Append 10 countries to `content/countries.ts`, add `optgroup` grouping to the comparison pickers (§2.1, §3.4)
- [ ] Create `content/countries-historical.ts`, add era-selector UI on `/countries` for Germany/France/Turkey/South Korea (§2.2)
- [ ] Append 4 de jure/de facto scenarios and 3 crisis scenarios (§2.3, §2.4)
- [ ] Append 4 sources to `content/sources.ts`; backfill `sourceIds` on existing countries/concepts; render `ContentSource.url` as a real link wherever sources are shown (§2.5)
- [ ] Style pass for `contestedNoteFa` callout (§3.2)
- [ ] Native Persian-speaker editorial review of all new copy before ship
- [ ] Domain-knowledge review of all new/historical fingerprint scores before ship

---

## Appendix — research sources used for this brief

- Hungary: [Verfassungsblog — Fixing the Hungarian Bench](https://verfassungsblog.de/fixing-the-hungarian-bench/), [NPR — Orbán chips away at the judiciary](https://www.npr.org/2025/05/30/nx-s1-5407320/hungarys-viktor-orban-chips-away-at-the-countrys-judiciary), [Democratic Erosion — Hungary's Illiberal Turn](https://democratic-erosion.org/2025/04/18/how-to-erode-a-democracy-hungarys-illiberal-turn-under-orban/)
- Venezuela: [Wikipedia — 2017 Venezuelan constitutional crisis](https://en.wikipedia.org/wiki/2017_Venezuelan_constitutional_crisis), [Caracas Chronicles — the Supreme Tribunal and the obedient parliament](https://www.caracaschronicles.com/2019/05/14/the-supreme-tribunal-gives-maduro-what-venezuelans-took-from-him-an-obedient-parliament/)
- Myanmar: [Wikipedia — 2021 Myanmar coup d'état](https://en.wikipedia.org/wiki/2021_Myanmar_coup_d%27%C3%A9tat), [Wikipedia — State Administration Council](https://en.wikipedia.org/wiki/State_Administration_Council)
- Vietnam: [Wikipedia — Politics of Vietnam](https://en.wikipedia.org/wiki/Politics_of_Vietnam), [BMZ — Vietnam political situation](https://www.bmz.de/en/countries/viet-nam/political-situation-119756)
- Uruguay: [Freedom House — Uruguay country profile](https://freedomhouse.org/country/uruguay), [Freedom House — Uruguay 2024 report](https://freedomhouse.org/country/uruguay/freedom-world/2024)
- Afghanistan/Taliban: [RFE/RL — Who is Haibatullah Akhundzada](https://www.rferl.org/a/akhundzada-taliban-supreme-leader/31448314.html), [Combating Terrorism Center — Taliban Rule at 2.5 Years](https://ctc.westpoint.edu/taliban-rule-at-2-5-years/), [Brookings — The Taliban's three years in power](https://www.brookings.edu/articles/the-talibans-three-years-in-power-and-what-lies-ahead/)
- Weimar Germany: [USHMM — Article 48](https://encyclopedia.ushmm.org/content/en/article/article-48), [Wikipedia — Article 48 of the Weimar Constitution](https://en.wikipedia.org/wiki/Article_48_of_the_Weimar_Constitution), [Brewminate — How Weimar Germany Lost Democracy While Elections Continued](https://brewminate.com/emergency-powers-and-the-collapse-of-federal-democracy-in-weimar-germany/)
- Turkey 2017 referendum: [Human Rights Watch — Q&A on Turkey's constitutional referendum](https://www.hrw.org/news/2017/04/04/questions-and-answers-turkeys-constitutional-referendum), [Wikipedia — 2017 Turkish constitutional referendum](https://en.wikipedia.org/wiki/2017_Turkish_constitutional_referendum)
- France 1958: [The Conversation — the fall of France's Fourth Republic](https://theconversation.com/amp/i-understood-you-may-1958-the-return-of-de-gaulle-and-the-fall-of-frances-fourth-republic-93510), [GlobalSecurity — Fifth Republic 1958](https://www.globalsecurity.org/military/world/europe/fr-fifth-republic.htm)
- Veto players theory: [Tsebelis — Veto Players and Institutional Analysis (PDF)](https://sites.lsa.umich.edu/tsebelis/wp-content/uploads/sites/246/2015/03/veto_players_and_institutional_2000_governance.pdf), [Adam Brown — summary of Tsebelis](https://adambrown.info/p/notes/tsebelis_veto_players)
- Competitive authoritarianism: [Levitsky & Way — Harvard scholars page](https://levitsky.scholars.harvard.edu/publications/competitive-authoritarianism-hybrid-regimes-after-cold-war)
- Democratic backsliding / executive aggrandizement: [Journal of Democracy — On Democratic Backsliding (Bermeo)](https://www.journalofdemocracy.org/articles/on-democratic-backsliding/), [V-Dem — Beyond Democratic Backsliding (PDF)](https://www.v-dem.net/media/publications/UWP_54.pdf)

South Korea's 1961–1987 military-era facts (1961 coup, 1972 Yushin constitution removing direct presidential election, 1987 June Democratic Struggle restoring direct elections) are well-documented standard political-history record; not separately re-verified via search this session — flag for a quick confirmation pass alongside the other domain review.
