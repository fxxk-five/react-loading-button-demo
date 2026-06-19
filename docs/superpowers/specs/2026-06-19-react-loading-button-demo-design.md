# React Loading Button Demo Design

## Goal

Build a small public React demo for an interview form question. The demo must show a reusable button component that enters loading after click, restores after async work, and supports batch actions where all buttons load until every task completes.

## Scope

- Use Vite, React, and TypeScript.
- Create one reusable `LoadingButton` component.
- Create one demo page with single-action buttons and a batch-action button.
- Include clear README instructions and links for GitHub and GitHub Pages.
- Deploy as a public GitHub Pages site.

## Component Design

`LoadingButton` receives `children`, `loading`, `disabled`, and `onClick`. It renders one button, disables repeated clicks while loading, and shows a spinner plus loading label when work is active.

The demo owns task state. Each task has an id, label, status, and duration. Clicking a single task marks only that task as loading. Clicking batch starts all idle tasks, waits with `Promise.all`, then restores every task. This keeps the component reusable and keeps business flow in the page.

## Error Handling

The demo uses deterministic fake async tasks. If a task fails in the future, the task state can move to `failed` without changing the button API. The current interview requirement only needs loading and restore behavior.

## Testing

Vitest and React Testing Library cover:

- A single clicked button becomes loading and restores after async work.
- Batch action makes all buttons loading and restores them only after all work completes.
- Buttons are disabled while loading to prevent duplicate submissions.

## Deployment

The repo uses `gh-pages` to publish `dist` to the `gh-pages` branch. The expected public URL is:

`https://fxxk-five.github.io/react-loading-button-demo/`
