# CLI

The `herbst-ui` CLI copies component source into your project and rewrites its imports to your alias — the copy-paste model, automated. Run it with `npx`, no global install.

## Init

Set up a project once. `init` writes a config file, wires a path alias, installs the base dependencies, and drops in the theme and the `cn` utility.

```bash
npx herbst-ui@latest init
```

It detects your Angular application, then asks (or accepts flags) for:

- **componentsDir** — where components are written, e.g. `src/app/shared/ui`.
- **alias** — the import alias, e.g. `@shared/ui`.
- **theme** — the editable `theme.css`.

## Add

Add one or more components. Dependencies between components are resolved automatically, so adding `select` also brings whatever it relies on.

```bash
npx herbst-ui@latest add button
npx herbst-ui@latest add dialog input select
```

Each component's source is written under your `componentsDir`, with imports rewritten to your alias and any missing npm dependencies installed.

## Flags

- `--overwrite` — replace existing files without asking.
- `--yes` — accept all prompts.
- `--path <dir>` — override the destination directory.
- `--dry-run` — preview what would be written without touching disk.

## How it works

Component source is served from a generated registry (one JSON per component). `add` reads the registry, resolves the dependency graph, substitutes your alias into the file contents, and writes them into your project — nothing stays hidden behind a package.
