# herbst-ui

The CLI for [Herbst UI](https://github.com/KauanHerbst/herbst-ui) — copy autumn-styled Angular components straight into your project. Source included, no black box.

## Usage

No install needed — run it with `npx`:

```bash
npx herbst-ui init
npx herbst-ui add button calendar command
```

## Commands

### `init`

Sets up Herbst UI in your project: writes the config, the theme and the shared utils.

```bash
npx herbst-ui init [--yes] [--project <name>]
```

| Flag | Description |
|---|---|
| `--yes` | Skip prompts and accept the defaults |
| `--project <name>` | Target a specific project in an Angular workspace |
| `--cwd <path>` | Run against another directory |

### `add <component...>`

Copies one or more components (and their dependencies) into your project.

```bash
npx herbst-ui add button
npx herbst-ui add tabs tooltip drawer
```

| Flag | Description |
|---|---|
| `--overwrite` | Replace files that already exist |
| `--cwd <path>` | Run against another directory |

Components land in the folder configured by `init` (default `src/lib/shared/components`) — typed, accessible and already wearing the theme. Read them, adapt them, delete what you don't need.

## How it works

The CLI reads a public registry from the repository's `main` branch and writes the component source into your codebase. Nothing runs at your app's runtime — the code becomes yours.

## License

MIT © 2026 Herbst UI
