# Installation

Herbst is set up with a single command, on Angular 20+ with Tailwind CSS v4.

## Requirements

- Angular 20 or newer, standalone bootstrap.
- Tailwind CSS v4.
- `@angular/cdk` (used by overlays, menus and dialogs).

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
