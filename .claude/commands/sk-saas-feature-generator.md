---
description: Scaffold a complete HRMS SaaS feature end-to-end — Angular feature module + Node MVC backend with tenant scoping, RBAC, validation, and tests
argument-hint: <feature-name> [short description of what it does]
allowed-tools: Read, Grep, Glob, Edit, Write, Bash
---

# SaaS Feature Generator

Generate a complete, production-ready feature: **$ARGUMENTS**

If no feature name is given, ask for the feature name and a one-line description before proceeding.

## Step 1 — Define

Before writing any code, establish and confirm the spec with the user:

- **Entities & fields** — what data does this feature own? Types, required/optional, relations to existing entities (employee, department, etc.)
- **Operations** — which of list / detail / create / update / delete / approve-reject / export apply?
- **Roles & permissions** — who can do what? (e.g. employee: own records only; manager: team; HR/admin: all)
- **Tenant scoping** — confirm every entity carries `organizationId`; no exceptions
- **Workflow** — any states/transitions (draft → submitted → approved)? Notifications?
- **Existing code** — scan the repo for related features, shared components, naming conventions, and the established folder structure; reuse, never duplicate

Check `wiki/` for a PRD of this feature (e.g. `leaves-management-prd.md`) and use it as the source of truth if present.

Present the spec as a short summary table and wait for confirmation before generating.

## Step 2 — Plan the File Map

Present the full file list before creating anything:

### Backend (Node MVC)

```
src/
 ├─ routes/<feature>.routes.ts          # endpoints + auth & role middleware
 ├─ controllers/<feature>.controller.ts # validate → call service → respond
 ├─ services/<feature>.service.ts       # business logic, workflow rules
 ├─ repositories/<feature>.repository.ts# DB access, ALWAYS tenant-filtered
 ├─ models/<feature>.model.ts           # schema + types
 └─ validators/<feature>.schema.ts      # zod schemas: body, params, query
```

### Frontend (Angular)

```
src/app/features/<feature>/
 ├─ <feature>.routes.ts                 # lazy routes with role guards
 ├─ pages/<feature>-list/               # list page: table, filters, pagination
 ├─ pages/<feature>-detail/             # detail/view page
 ├─ pages/<feature>-form/               # create/edit with reactive form
 ├─ components/                         # feature-private presentational components
 ├─ services/<feature>-api.service.ts   # typed HTTP client
 ├─ services/<feature>.store.ts         # signal-based state
 └─ models/<feature>.model.ts           # interfaces shared across the feature
```

Plus spec files alongside services, the store, and the backend service.

## Step 3 — Generate

Generate in this order, verifying each layer compiles before the next:

### Backend

1. **Model & validation schemas** — strict types; zod schemas reject unknown fields (no mass assignment)
2. **Repository** — every query filtered by `organizationId` from the authenticated context, never from client input; pagination on all list queries
3. **Service** — business rules, workflow transitions, custom error classes; no HTTP concerns
4. **Controller** — validate input, call service, return the standard envelope `{ success, data, message }`; no business logic
5. **Routes** — RESTful paths, auth middleware on all, role middleware per spec, rate limiting on mutation endpoints

### Frontend

6. **Models & API service** — interfaces mirroring backend types; typed methods returning the response envelope
7. **Store** — signal-based: data, loading, error signals; `computed()` for derived state
8. **List page** — OnPush, `@for` with `track`, pagination, filters in query params (deep-linkable), loading/empty/error states
9. **Form page** — `NonNullableFormBuilder`, typed reactive form, blur-time validation messages, unsaved-changes guard, submit-disabled while pending
10. **Detail page + routes** — lazy `loadComponent`, role guards matching backend permissions

### Tests

11. Backend service tests (business rules, tenant isolation, role denial cases) with mocked repository
12. Frontend store and API service tests; form validation tests

## Step 4 — Verify

- `ng build` and backend build/typecheck — both must pass
- Run all new tests — must pass
- Lint — must pass
- Confirm checklist: every repository query tenant-scoped ✅ every route authenticated ✅ every role rule enforced server-side ✅ all list endpoints paginated ✅ loading/empty/error states present ✅ no `any` ✅
- Summarize: files created, endpoints exposed, roles enforced, and anything deferred

## Rules

- Follow existing repo conventions over this template when they conflict — consistency wins
- Tenant scoping and server-side role checks are non-negotiable in every generated layer
- No placeholder logic — every generated function must be fully implemented or explicitly listed as deferred with a TODO and reason
- Reuse shared components (table, dialog, toast, form controls) — never generate parallel ones
- Generated code must pass the same bar as hand-written: typed, tested, no dead code
