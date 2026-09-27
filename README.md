# Daily planner (web)

Self-contained Next.js app for Vercel. Schedule data lives in [`schedule/`](schedule/) inside this repo.

Rigid weekly schedule viewer for **Africa/Lagos (WAT)**.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel

Deploy **this directory** (`daily-planner/web`) as the project root. No parent-folder dependencies.

`npm run build` runs `generate:ics` first and writes `public/Valentine_Weekly_Schedule.ics`.

## Routes

- **/** — Today: current block, timeline, study summary
- **/week** — Seven-day 24h grid
- **Download .ics** — Google Calendar import

## Regenerate calendar

```bash
npm run generate:ics
```

## Tests

```bash
npm run test:schedule
```
