---
description: Analyze and optimize Angular performance — change detection, bundle size, rendering, signals
argument-hint: [component | feature | route | "full app"]
allowed-tools: Read, Grep, Glob, Edit, Bash
---

# Optimize Angular Performance

Run a structured Angular performance audit and apply optimizations for: **$ARGUMENTS**

If no argument is given, ask whether to audit a specific component, feature, or the full app before proceeding.

## Step 1 — Profile & Identify

Analyze the target code and identify performance issues:

### Change Detection

- Components missing `changeDetection: ChangeDetectionStrategy.OnPush`
- Manual `ChangeDetectorRef.detectChanges()` calls that signals would eliminate
- State held in plain class fields instead of signals — prefer `signal()`, `computed()`, `linkedSignal()`
- Zone-polluting callbacks (timers, third-party libs) not wrapped or moved to zoneless-friendly patterns

### Templates & Rendering

- `@for` loops missing `track` expression
- Function calls or getters in templates — replace with `computed()` signals
- Missing `@defer` for below-the-fold or heavy components (charts, editors, tables)
- Long lists without CDK virtual scroll (`cdk-virtual-scroll-viewport`)
- Pipes that are impure without need
- Heavy DOM in `@if` branches that could be deferred

### Lazy Loading & Bundle Size

- Routes using eager component imports instead of `loadComponent` / `loadChildren`
- Full-library imports instead of tree-shakeable ones (lodash, date libraries, chart libs)
- Heavy dependencies imported at startup that only one feature needs
- Missing route-level code splitting per feature
- Check with: `npx ng build --stats-json` + bundle analysis

### Images & Assets

- `<img>` without `NgOptimizedImage` (`ngSrc`)
- Missing `priority` on LCP image; missing lazy loading on the rest
- Unsized images causing layout shift

### RxJS & Subscriptions

- Subscriptions missing `takeUntilDestroyed()`
- Nested `.subscribe()` calls — flatten with `switchMap`/`exhaustMap`
- Manual subscriptions where `toSignal()` is cleaner
- Unnecessary `Subject`s where a signal suffices
- Missing `debounceTime`/`distinctUntilChanged` on user-input streams

### Data & HTTP

- Duplicate HTTP calls — missing `shareReplay` or signal-based caching in services
- Missing pagination/virtualization for large API responses
- Sequential requests that could run in parallel (`forkJoin`)
- Re-fetching on every navigation where a cached store/resource would do

## Step 2 — Report

Before changing anything, present findings as a prioritized table:

| Priority | Issue | Location  | Impact                 | Fix |
| -------- | ----- | --------- | ---------------------- | --- |
| P0/P1/P2 | ...   | file:line | 🔴 High/🟠 Med/🟡 Low | ... |

- **P0** — user-visible slowness (LCP, jank, blocking) — fix now
- **P1** — measurable waste (re-renders, bundle bloat, leaks) — fix in this pass
- **P2** — minor — note for tech-debt backlog

Wait for confirmation before applying fixes unless the user said "fix everything".

## Step 3 — Apply Fixes

- Fix issues one at a time, highest priority first
- Keep each change minimal and behavior-preserving — no refactors beyond the optimization
- Use modern Angular APIs only: standalone components, `inject()`, signals, `input()`/`output()`, `@if`/`@for`/`@defer`
- Follow project standards: typed code, no dead code, no console.logs

## Step 4 — Verify

- Run `ng build` and existing tests; confirm both pass
- Compare bundle sizes before/after (`ng build` output)
- Where measurable, note expected impact (fewer change-detection cycles, smaller initial chunk, eliminated leak)
- Summarize: issues found, issues fixed, expected impact, and any P2 items deferred

## Rules

- Never optimize speculatively — every fix must map to an identified issue
- Never trade correctness or readability for micro-optimizations
- Prefer framework primitives (signals, `@defer`, `NgOptimizedImage`, virtual scroll) over custom solutions
- Do not introduce `any` types or disable strict mode to make a fix easier
