---
description: Security audit for the HRMS app — auth, tenant isolation, injection, XSS, PII exposure, dependencies
argument-hint: [feature | endpoint | folder | "full app"]
allowed-tools: Read, Grep, Glob, Bash
---

# Security Audit

Run a structured security audit for: **$ARGUMENTS**

If no argument is given, ask whether to audit a specific feature, the API, the frontend, or the full app before proceeding.

This is an HRMS SaaS handling sensitive employee data (salaries, documents, personal details) — audit with multi-tenancy and PII as first-class concerns.

## Step 1 — Audit

### Authentication & Session

- Endpoints missing auth middleware — every route must be protected unless explicitly public
- JWT issues: missing expiry, weak/hardcoded secret, no signature verification, tokens accepted from query params
- Tokens stored in `localStorage` instead of httpOnly cookies (XSS-readable)
- Missing refresh-token rotation; no revocation path on logout/password change
- Password handling: anything other than bcrypt/argon2 with proper cost; password in logs or responses
- Missing brute-force protection on login, password reset, OTP endpoints

### Authorization & Tenant Isolation (critical for SaaS)

- Queries missing tenant/organization scoping — any DB read/write not filtered by the authenticated tenant
- IDOR: object IDs from request used without ownership check (`/employees/:id` returning another tenant's employee)
- Role checks done only in the frontend — every permission must be enforced server-side
- Privilege escalation: users able to modify their own role, salary, or approval chains
- Mass assignment: spreading `req.body` into create/update without field allow-lists
- Admin endpoints distinguishable only by URL, not by server-side role check

### Input Validation & Injection

- Endpoints missing schema validation (zod/joi) on body, params, and query
- SQL/NoSQL injection: string-built queries, unparameterized input, `$where`/operator injection
- Path traversal in file upload/download endpoints
- File uploads: missing type/size validation, executable uploads, files served from app origin
- Unvalidated redirects and SSRF via user-supplied URLs

### Frontend (Angular)

- `bypassSecurityTrust*` calls — every one must be justified; flag all
- `[innerHTML]` bound to user or API content without sanitization
- Direct DOM manipulation (`nativeElement.innerHTML`, `document.write`)
- Sensitive data (tokens, PII) in `console.log`, URLs, or error messages
- Route guards as the only protection for sensitive screens (must be paired with API checks)
- Sensitive data cached in browser storage or surviving logout

### Data Exposure & PII

- API responses returning full objects (password hashes, salary fields, internal flags) where the UI needs three fields
- PII in logs, error traces, or third-party analytics
- Missing field-level authorization — e.g. all employees readable but salary visible only to HR/admin
- Stack traces or internal errors returned to clients in production
- Verbose 404/403 differences that leak resource existence across tenants

### Configuration & Dependencies

- Secrets in code, committed `.env` files, or frontend bundles (`environment.ts` is public!)
- Missing `helmet`, CORS misconfigured (`origin: *` with credentials), missing rate limiting
- Cookies missing `httpOnly`, `secure`, `sameSite`
- Missing CSP headers
- Run `npm audit --omit=dev` and flag high/critical advisories
- Debug endpoints, seed routes, or Swagger exposed in production config

## Step 2 — Report

Present findings as a prioritized table:

| Severity | Vulnerability | Location  | Exploit scenario    | Fix          |
| -------- | ------------- | --------- | ------------------- | ------------ |
| 🔴 Critical/ 🟠 High/ 🟡 Medium/ ⚪ Low | ... | file:line | one sentence |

- **🔴 Critical** — cross-tenant data access, auth bypass, injection, secret exposure — fix immediately
- **🟠 High** — privilege escalation, PII leak, missing validation on sensitive endpoints
- **🟡 Medium** — hardening gaps (headers, rate limits, verbose errors)
- **⚪ Low** — defense-in-depth improvements

For each finding, include a concrete exploit scenario — "a user from tenant A can read tenant B's salaries by changing the ID" — not abstract risk labels.

## Step 3 — Recommend

- This command audits and reports; it does not auto-fix. Propose fixes per finding and ask which to apply
- For Critical findings, provide the exact code change ready to apply on approval
- Group fixes into: immediate (this PR), short-term (this sprint), structural (needs design — e.g. adding tenant scoping middleware)

## Rules

- Never weaken a check to make something work — flag conflicts instead
- Assume every client-supplied value is hostile: IDs, headers, filenames, pagination params
- A missing tenant filter is always Critical, regardless of how unlikely exploitation seems
- Report secrets found in code verbatim locations but never echo the secret values themselves
- No findings ≠ secure — state explicitly what was and wasn't covered
