# Design - PixelSprint

A locked design system for PixelSprint. Every view reads this file before emitting code.

## Genre

editorial (Utilitarian Win95 & Terminal Retro Workbench)

## Dials (antislop Part 3)

- **ENERGY**: 2 (Balanced - authentic 3D Win95 bevels, crisp navy titlebars, terminal search contrast)
- **RHYTHM**: 2 (Structured desktop workspace with 3-column retro board and compact launcher panels)
- **MOTION**: 1 (Calm - instant tactile button press states and subtle card entrance, zero endless loops)

## Macrostructure family

- App pages: Workbench (Win95 desktop shell, launcher window, 3-column board window, native top-layer `<dialog>` modals, bottom taskbar)

## Theme (OKLCH Token System)

Light mode (`:root`):

- `--color-paper`: `oklch(0.54 0.09 195)` (Win95 desktop teal)
- `--color-paper-2`: `oklch(0.81 0 0)` (Win95 surface gray `#c0c0c0`)
- `--color-paper-3`: `oklch(0.90 0 0)` (Win95 raised light gray `#dfdfdf`)
- `--color-surface`: `oklch(1 0 0)` (Card and input inset white)
- `--color-well`: `oklch(0.58 0 0)` (Column scroll container gray)
- `--color-ink`: `oklch(0.12 0 0)` (Primary text black)
- `--color-ink-2`: `oklch(0.38 0 0)` (Secondary muted text)
- `--color-rule`: `oklch(0.55 0 0)` (Bevel shadow gray `#808080`)
- `--color-bevel-light`: `oklch(1 0 0)` (Bevel highlight white)
- `--color-bevel-dark`: `oklch(0.12 0 0)` (Outer frame drop edge)
- `--color-accent`: `oklch(0.28 0.14 264)` (Win95 titlebar navy `#000080`)
- `--color-accent-2`: `oklch(0.58 0.15 248)` (Win95 titlebar gradient end `#1084d0`)
- `--color-accent-ink`: `oklch(1 0 0)` (Titlebar white text)
- `--color-focus`: `oklch(0.52 0.20 260)` (High-contrast keyboard focus outline)
- `--color-terminal-bg`: `oklch(0.12 0 0)` (DOS command bar background)
- `--color-terminal-ink`: `oklch(0.86 0.27 142)` (Phosphor green terminal prompt)
- `--color-terminal-muted`: `oklch(0.56 0.17 142)` (Terminal placeholder green)
- `--color-cat-well-header`: `oklch(0.44 0.13 145)` (Went Well header green)
- `--color-cat-improve-header`: `oklch(0.42 0.17 27)` (Needs Improvement header crimson)
- `--color-cat-action-header`: `oklch(0.56 0.13 82)` (Action Items header ochre)
- `--color-danger`: `oklch(0.48 0.19 27)` (Offline / negative score crimson)
- `--color-success`: `oklch(0.50 0.15 145)` (Positive score green)
- `--color-warning`: `oklch(0.54 0.13 85)` (Paused timer amber)

Dark mode (`[data-theme='dark']`):

- `--color-paper`: `oklch(0.20 0.02 220)`
- `--color-paper-2`: `oklch(0.29 0.02 265)`
- `--color-paper-3`: `oklch(0.36 0.02 265)`
- `--color-surface`: `oklch(0.23 0.02 265)`
- `--color-well`: `oklch(0.18 0.02 265)`
- `--color-ink`: `oklch(0.95 0.01 240)`
- `--color-ink-2`: `oklch(0.76 0.02 250)`
- `--color-rule`: `oklch(0.19 0.02 265)`
- `--color-bevel-light`: `oklch(0.42 0.02 265)`
- `--color-bevel-dark`: `oklch(0.10 0.01 265)`
- `--color-accent`: `oklch(0.24 0.08 264)`
- `--color-accent-2`: `oklch(0.39 0.13 260)`
- `--color-focus`: `oklch(0.75 0.16 250)`

## Typography

- Display & UI (`--font-display`, `--font-body`): `'MS Sans Serif', Tahoma, Geneva, system-ui, sans-serif`, roman (`font-style: normal`)
- Monospace (`--font-mono`): `'Courier New', Courier, monospace`

## Spacing

4-point scale (`--space-3xs: 0.25rem` through `--space-2xl: 3rem`).

## Motion & Accessibility

- Tactile 1px button press translation, 150ms dialog/card entry.
- Non-essential motion disabled under `prefers-reduced-motion: reduce`.
- Every interactive control uses `<button>` or `<a href>`, has `:focus-visible` outline (`2px solid var(--color-focus)`), and expands to 44px minimum target on `@media (pointer: coarse)`.
- All modals use native `<dialog closedby="any">` opened with `.showModal()`.
