# AusPropertyCalc Completion Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every published calculator truthful, fully wired, and aligned with Australian rules in force on 27 June 2026.

**Architecture:** Keep the existing Next.js Pages Router and calculator routes. Put deterministic financial rules in the existing `lib/` functions, pass all user-selectable assumptions from `components/CalculatorForms.jsx`, and keep official-source metadata in `config/` so the methodology and calculator UI disclose effective dates and limits.

**Tech Stack:** Next.js 16, React 18, Tailwind CSS, Vitest, Playwright/browser verification.

---

### Task 1: Correct current transfer-duty rules

**Files:**
- Modify: `config/stamp-duty.json`
- Modify: `lib/calculateStampDuty.js`
- Modify: `components/CalculatorForms.jsx`
- Modify: `pages/methodology.js`
- Test: `__tests__/calculators.test.js`

- [ ] Add tests proving the Revenue NSW 2025/26 general and premium schedules, Victorian PPR duty below $550,000, Queensland home-concession duty, ACT HBC duty, and Tasmania's 30 June 2026 settlement cutoff.
- [ ] Run `npm test -- __tests__/calculators.test.js` and confirm the new assertions fail against the unsupported NSW 2026/27 table and missing concessions.
- [ ] Replace NSW configuration with the official 1 July 2025 to 30 June 2026 schedule and expose the rule period in calculator results.
- [ ] Route owner-occupied home selections through VIC and QLD home rates, and apply ACT/TAS first-home relief only when the form has enough eligibility and date context.
- [ ] Re-run `npm test -- __tests__/calculators.test.js` and confirm all transfer-duty assertions pass.

### Task 2: Wire CGT ownership and tax assumptions

**Files:**
- Modify: `lib/calculateCgt.js`
- Modify: `components/CalculatorForms.jsx`
- Modify: `config/cgt.json`
- Modify: `pages/methodology.js`
- Test: `__tests__/calculators.test.js`

- [ ] Add failing tests showing that companies receive no 50% CGT discount and that a user-entered marginal tax rate controls the estimate.
- [ ] Extend `calculateCgt` with an ownership type while preserving the existing individual default.
- [ ] Add a visible marginal tax-rate control, disable the discount for companies, and explain that joint owners must calculate their respective shares at their own rates.
- [ ] Run the focused tests and confirm the individual and company cases pass.

### Task 3: Make borrowing, depreciation, and yield outputs internally consistent

**Files:**
- Modify: `lib/calculateBorrowingCapacity.js`
- Modify: `lib/calculateDepreciation.js`
- Modify: `components/CalculatorForms.jsx`
- Modify: `config/borrowing-capacity.json`
- Modify: `config/depreciation.json`
- Modify: `lib/calculators.js`
- Modify: `pages/methodology.js`
- Test: `__tests__/calculators.test.js`

- [ ] Add failing tests for assessment rate = entered loan rate + APRA's 3 percentage-point buffer, exact capital-works eligibility dates/rates, and negative annual net rent.
- [ ] Accept an entered loan rate and derive the serviceability assessment rate instead of presenting a fixed 8.5% assumption as universal.
- [ ] Calculate residential capital works from eligible construction expenditure and construction-start date at the applicable ATO rate; remove the misleading editable effective-life control.
- [ ] Show negative annual net rent rather than clamping it to zero, and remove unsupported market-benchmark commentary.
- [ ] Run focused tests and confirm all changed behaviors pass.

### Task 4: Release verification and publication

**Files:**
- Verify all changed files and routes.

- [ ] Run `npm test` and require a clean pass.
- [ ] Run `npm run build` and require a successful production build.
- [ ] Start the app and use browser automation at desktop and mobile widths to exercise all six calculator routes, state/date variants, validation, navigation, and console output.
- [ ] Run `npm audit`, document any upstream-only residual advisories, and inspect `gh pr view 3` checks.
- [ ] Review `git diff`, commit only the completion-audit files, push `feat/stitch-2026-ui-legislation`, and verify the pull request points to `angusi01/auspropertycalc`.
