# Installation

One command sets up the project. You need Angular 20 or newer and Tailwind CSS v4.

## Requirements

- Angular 20 or newer, with standalone bootstrap.
- Tailwind CSS v4.
- `@angular/cdk`, only for overlays, menus and dialogs. `add` installs it when a component needs it.

## Quick start

Run `init` once. It installs the base dependencies, adds the theme, creates the import alias and copies the `cn` utility.

```bash
npx herbst-ui@latest init
```

Then add the components you want:

```bash
npx herbst-ui@latest add button
```

The component's code goes into your project. Use it as it is or change what you need.

## Fonts

The theme uses Inter, JetBrains Mono and Newsreader, but `init` does not install fonts. Load them in `index.html` or change `--font-sans`, `--font-mono` and `--font-display` in `theme.css`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap" />
```
