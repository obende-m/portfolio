# Obende Michael — Portfolio

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS 4 and Framer Motion.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the build
```

## Deploy

Import the folder into Vercel (framework preset: Vite). `vercel.json` rewrites deep links such as
`/work/ida-elections` to the app so case-study URLs work on refresh.

## Where things live

| Path | What |
|---|---|
| `src/data/site.ts` | Name, contact details, CV path, nav |
| `src/data/projects.ts` | Featured projects, case-study content, smaller website projects |
| `src/data/profile.ts` | Experience, stack groups, credentials and training |
| `src/components/` | Hero, system map, work bento, about, experience, stack, contact |
| `src/pages/CaseStudy.tsx` | Case-study template used by `/work/:slug` |
| `public/images/projects/` | Optimised WebP screenshots of the real projects |
| `public/cv/` | Downloadable CV |
| `scripts/process-shots.mjs` | Converts raw PNG screenshots into the WebP files above |

## Adding or replacing screenshots

1. Save full-size PNG captures (1440px wide for desktop, 390px phone captures at 2x) in a folder.
2. Add an entry to `jobs` in `scripts/process-shots.mjs`.
3. Run `node scripts/process-shots.mjs <folder>`.
4. Reference the new file in `src/data/projects.ts` (add it to a project's `gallery`).

## Adding a portrait

The About section uses a typographic profile card. To use a photo, place it in `public/images/`
and replace the `om` monogram block in `src/components/About.tsx` with an `<img>`.
