# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Golden Horizon — A photographer's golden hour tracker web app.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- TailwindCSS v4 + Shadcn UI
- SunCalc (client-side sun calculations)
- date-fns (date formatting)
- framer-motion (animations)
- react-router-dom (client-side routing)

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Type-check + production build
- `npm run lint` — ESLint
- `npm run preview` — Preview production build

## Project Structure

- `src/lib/` — Types, constants, utilities (sun-calculations, format-time, storage, notification-scheduler)
- `src/hooks/` — Custom React hooks (useGeolocation, useLocalStorage, useSunCalc, useGoldenHour, useCountdown, useSessions, useReminders, useNotificationPermission)
- `src/context/` — LocationContext (provides lat/lng/settings app-wide)
- `src/components/ui/` — Shadcn UI primitives
- `src/components/layout/` — AppShell, Header, BottomNav, PageTransition
- `src/components/shared/` — Reusable components (CountdownTimer, GoldenHourBadge, StarRating, GradientBackground, EmptyState)
- `src/components/today/` — Today view (SunTimesCard, GoldenHourCard, CountdownSection, SunPositionArc)
- `src/components/upcoming/` — 7-day view (DayCard)
- `src/components/sessions/` — Session log (SessionForm, SessionCard)
- `src/components/settings/` — Settings (LocationSettings, ReminderSettings)

## Path Alias

`@/*` maps to `src/*` (configured in tsconfig.app.json + vite.config.ts)

## Key Notes

- All data is stored in localStorage (no backend)
- SunCalc golden hour: morning = sunrise → goldenHourEnd, evening = goldenHour → sunset
- Polar edge cases handled (NaN check on sunrise)
- Warm color theme using oklch (gold, amber, sunset custom CSS variables)
