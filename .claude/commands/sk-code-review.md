---
allowed-tools: Read(*), Glob(*), Grep(*)
argument-hint: [BUGS|SECURITY|PERFORMANCE — combinable, e.g. "BUGS,SECURITY"]
description: Perform a code-review
---

MODE: $ARGUMENTS

Match MODE case-insensitively. Combinations allowed ("BUGS,SECURITY"):

- BUGS: focus ONLY on logical or other bugs.
- SECURITY: focus ONLY on security issues.
- PERFORMANCE: focus ONLY on performance issues.

Anything else or empty: thorough general review.

Perform an in-depth review of the codebase:

1. Explore structure first (Glob), then read files. Understand architecture before judging.
2. Check code against project rules in CLAUDE.md and .claude/SPEC.MD (signals, OnPush, control flow, store patterns, a11y).
3. Report findings grouped by severity. Use exactly this format:

## 📋 Code Review Report

### 🔴 Critical

- `path/file.ts:42` — issue description
  - 💡 Fix: suggested fix

### 🟠 Major

(same format)

### 🟡 Minor

(same format)

### ✅ Good Practices Observed

- Brief notes on what is done well

### 📊 Summary

| Severity | Count |
| -------- | ----- |
| 🔴 Critical | n |
| 🟠 Major | n |
| 🟡 Minor | n |
