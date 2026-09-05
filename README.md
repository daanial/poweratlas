# سازوکار قدرت / The Machinery of Power

Persian-first interactive experience that teaches how political power moves through institutions.

## MVP routes

| Route | Purpose |
|-------|---------|
| `/` | Cinematic opening |
| `/experience` | 15-minute narrative (who rules, executive systems, confusions, de jure/de facto, concentration, monarchy/republic) |
| `/atlas` | Interactive Power Map |
| `/laboratory` | Constitution builder, power fingerprint, 3 crises |
| `/countries` | Side-by-side institutional comparison |
| `/about` | Neutrality principle + conceptual sources |

## Stack

- Next.js App Router + TypeScript + Tailwind v4
- GSAP / ScrollTrigger
- D3 (available for richer viz)
- Vazirmatn via `next/font`
- RTL (`lang="fa"` / `dir="rtl"`)

## Develop

```bash
npm install --ignore-scripts
npm run dev
```

## Notes

- No single “democracy score”; fingerprints are multidimensional.
- Iran is compared with the same institutional framework as other countries.
- Content lives under `content/`; engines under `lib/`.
