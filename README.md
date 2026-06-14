# 🌅 Golden Horizon

A photographer's golden hour tracker. Know exactly when the light is perfect — today and for the week ahead — and log your shoots.

## ✨ Features

- 📍 **Today** — Sunrise/sunset times, morning & evening golden hour windows, live countdown, and a sun-position arc for your location.
- 📅 **Upcoming** — 7-day golden hour forecast at a glance.
- 📸 **Sessions** — Log shoots with notes and star ratings.
- 🔔 **Reminders** — Local notifications before golden hour starts.
- ⚙️ **Settings** — Set your location (geolocation or manual) and reminder preferences.
- 📴 Works offline — all data lives in your browser's `localStorage` (no backend).

## 🛠️ Tech Stack

- React 19 + TypeScript
- Vite 7
- TailwindCSS v4 + Shadcn UI
- [SunCalc](https://github.com/mourner/suncalc) — client-side sun calculations
- date-fns — date formatting
- framer-motion — animations
- react-router-dom — client-side routing

## 🚀 Getting Started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open the printed local URL (default http://localhost:5173).

## ⚡ Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

## 📁 Project Structure

```
src/
├── lib/          # Types, constants, utilities (sun-calculations, format-time, storage, notification-scheduler)
├── hooks/        # Custom hooks (useGeolocation, useSunCalc, useGoldenHour, useCountdown, useSessions, useReminders, …)
├── context/      # LocationContext (lat/lng/settings app-wide)
└── components/
    ├── ui/       # Shadcn UI primitives
    ├── layout/   # AppShell, Header, BottomNav, PageTransition
    ├── shared/   # CountdownTimer, GoldenHourBadge, StarRating, GradientBackground, EmptyState
    ├── today/    # SunTimesCard, GoldenHourCard, CountdownSection, SunPositionArc
    ├── upcoming/ # DayCard (7-day view)
    ├── sessions/ # SessionForm, SessionCard
    └── settings/ # LocationSettings, ReminderSettings
```

`@/*` maps to `src/*` (configured in `tsconfig.app.json` + `vite.config.ts`).

## 📝 Notes

- Golden hour windows: morning = sunrise → goldenHourEnd, evening = goldenHour → sunset.
- Polar edge cases handled (NaN check on sunrise).
- Warm `oklch` color theme (gold, amber, sunset CSS variables).
