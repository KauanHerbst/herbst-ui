# 🍂 @herbst/ui

**Autumn UI for Angular.** *Herbst* is the German word for autumn — more than 65 copy-paste components styled after a German October: warm sepia light, amber and rust, quiet and unmistakably its own.

- **Signals-first** — standalone components, `input()`/`model()`/`output()`, `OnPush` throughout. No modules.
- **Fully themable** — every component reads semantic tokens (`bg-primary`, `text-muted-foreground`, `border-border`) from one `theme.css` on Tailwind v4 + oklch. Light and dark included.
- **Yours to keep** — use the CLI to copy the source into your project, or import from the package. No secrets either way.

## Install

```bash
npm i @herbst/ui
```

Requires Angular ≥ 22, Tailwind CSS v4 and the Herbst UI theme file. See the installation guide in the docs for the full setup.

### Recommended: copy the source with the CLI

```bash
npx herbst-ui add button calendar command
```

Components land in `src/lib/shared/components` — typed, accessible and already wearing the theme. Read them, adapt them, delete what you don't need.

## Usage

```ts
import { HbButtonComponent } from '@herbst/ui';

@Component({
  imports: [HbButtonComponent],
  template: `<button hb-button>Get started</button>`,
})
export class Example {}
```

## Theming

The whole library reads from one file of CSS variables. Change a value and every component follows:

```css
:root {
  --primary: oklch(0.545 0.155 42);
  --background: oklch(0.973 0.005 95);
  --radius: 0.375rem;
}
.dark {
  --primary: oklch(0.62 0.155 45);
}
```

## What's inside

Overlays, forms, data display, navigation, feedback and layout — buttons and inputs, dialogs and drawers, tables and trees, a command palette, charts, a calendar, and more. Browse the full catalogue in the docs.

## Contributing

Issue-first workflow — open an issue before any code: [github.com/KauanHerbst/herbst-ui](https://github.com/KauanHerbst/herbst-ui)

## License

MIT © 2026 Herbst UI
