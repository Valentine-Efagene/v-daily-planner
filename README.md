# Daily planner (web)

Rigid weekly schedule viewer for **Africa/Lagos (WAT)**.

## Setup

```bash
cd daily-planner/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- **/** — Today: current block, timeline, study summary
- **/week** — Seven-day 24h grid
- **Download .ics** — `Valentine_Weekly_Schedule.ics` for Google Calendar

## Data

Schedule blocks live in [`../schedule/`](../schedule/). Regenerate the calendar:

```bash
cd daily-planner
npm run generate:ics
```

The web app runs `sync:ics` before `dev` and `build` to refresh `public/Valentine_Weekly_Schedule.ics`.

## Tests

```bash
cd daily-planner/web
npm run test:schedule
```
