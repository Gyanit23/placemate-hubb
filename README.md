# PlaceMate Hub

A combined frontend for Dkoder (dkoder.co.in) and TechHike (tech-hike.in): the Placement LMS for Engineering Colleges.
Frontend only. No backend.

## Stack

- React 18 with Vite
- Modern JavaScript (ES6+)
- Tailwind CSS 3
- Framer Motion, Lucide React, React Icons

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production files are written to `dist/`. The Vite `base` is `./`, so the build works on a sub-path (GitHub Pages) as well as a root domain.

## Deploy

**Vercel**
1. Push this folder to a GitHub repository.
2. Import the repository on vercel.com. It detects Vite automatically.
3. Build command `npm run build`, output directory `dist`.

**Netlify**
1. Push to GitHub and choose "Import an existing project", or drag the `dist/` folder into Netlify Drop.
2. Build command `npm run build`, publish directory `dist`.

**GitHub Pages**
1. Run `npm run build`.
2. Publish the `dist/` folder, for example with the `gh-pages` package: `npx gh-pages -d dist`.

## What is real and what is sample

Taken from the public descriptions of the two sites: 12,500+ questions, 500+ companies, live coding lab,
salary filters, TCS NQT and InfyTQ prep, ₹1,000 for 4 years per student, built for engineering colleges.

Sample content (labelled as sample on the page): the example questions, the MCQ quiz, the mock test, the dashboard
numbers, the leaderboard names, the college (TPO) view and the roadmap. Replace them in `src/data.js`.
The contact form does not send anything. Connect it to your own form service when you add a backend.

## Level up (games and XP)

`Playground.jsx` holds the XP level card and badges, `Readiness.jsx` is the 8-question readiness check with a 4-week plan,
and `Simulator.jsx` is the four-round campus drive game. XP and badges are handled in `src/progress.jsx` and saved in the
browser's localStorage. Each action pays XP once. All scores are demo logic, not official scores.
Questions, scenarios and plans live at the bottom of `src/data.js`.

## Languages

The page switches between English and Hindi with the button in the navbar. Add or edit Hindi text in
`src/i18n.jsx` (the English sentence is the key). Question text, code and names stay in English on purpose.

## Project layout

```
src/
  data.js            all text, numbers and sample data
  App.jsx            page order and dark mode
  components/        one file per section
```
