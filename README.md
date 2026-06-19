# React Loading Button Demo

This repository is a small React + TypeScript demo for an interview task:

> Use React to implement a button component. A single record should show loading after click and restore after completion. A batch button should trigger all related button events, keep every button loading, and restore after all events complete.

## Online Demo

- GitHub repository: https://github.com/fxxk-five/react-loading-button-demo
- GitHub Pages: https://fxxk-five.github.io/react-loading-button-demo/

## What It Implements

- `LoadingButton`: a reusable stateless button component.
- Single action: clicking one task button only changes that task to loading.
- Batch action: clicking `批量操作` starts all task buttons at once.
- Restore rule: batch mode waits for all async jobs with `Promise.all`, then restores all buttons together.
- Duplicate protection: loading buttons are disabled and expose `aria-busy`.

## Project Structure

```text
src/
  App.tsx                         Demo state and async flow
  App.test.tsx                    Behavior tests
  components/
    LoadingButton.tsx             Reusable button component
    LoadingButton.css             Component styles
```

## Run Locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run test
npm run lint
npm run build
```

## Deploy

```bash
npm run deploy
```

The deploy command builds the app and publishes `dist` to the `gh-pages` branch.
