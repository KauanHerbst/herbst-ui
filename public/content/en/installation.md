# Installation

Herbst is set up with a single command, on Angular 20+ with Tailwind CSS v4.

## Requirements

- Angular 20 or newer, standalone bootstrap.
- Tailwind CSS v4.
- `@angular/cdk` only for overlay, menu and dialog components — `add` installs it when a component needs it.

## Quick start

Run `init` once. It installs the base dependencies, wires the theme and a path alias, and adds the `cn` utility — everything the foundation needs.

```bash
npx herbst-ui@latest init
```

Then add any component:

```bash
npx herbst-ui@latest add button
```

The component's source is copied into your project, ready to use — and to customize.

## Fonts

The theme uses Inter, JetBrains Mono and Newsreader, but `init` does not install fonts. Load them in `index.html` (or change `--font-sans`, `--font-mono` and `--font-display` in `theme.css`):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap" />
```
