# React Loading Button Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a public React loading-button demo for the interview form.

**Architecture:** Keep `LoadingButton` reusable and stateless. Keep async task state in `App`, with single-task and batch-task flows sharing the same helper.

**Tech Stack:** Vite, React, TypeScript, Vitest, React Testing Library, GitHub Pages.

---

### Task 1: Test Setup

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `src/test/setup.ts`

- [x] Add Vitest scripts and jsdom setup.
- [x] Install testing dependencies.
- [x] Verify a test file can run.

### Task 2: Loading Button Behavior

**Files:**
- Create: `src/components/LoadingButton.tsx`
- Create: `src/components/LoadingButton.css`
- Create: `src/App.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.css`

- [x] Write failing tests for single loading and batch loading.
- [x] Run tests and confirm they fail before implementation.
- [x] Implement minimal component and page behavior.
- [x] Run tests and confirm they pass.

### Task 3: Interview-Ready Docs And Deployment

**Files:**
- Modify: `README.md`
- Modify: `package.json`
- Modify: `vite.config.ts`

- [x] Add GitHub Pages base path and deploy scripts.
- [x] Write README with requirement mapping.
- [x] Build locally.
- [x] Create public GitHub repo.
- [x] Push main branch.
- [x] Deploy to GitHub Pages.

### Verification

- [ ] `npm run test`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Open deployed URL and confirm page renders.
