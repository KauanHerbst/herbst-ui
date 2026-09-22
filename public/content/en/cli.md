# CLI

The `herbst-ui` CLI copies component code into your project and points the imports to your alias. Run it with `npx`, no global install needed.

## Init

Run it once per project.

```bash
npx herbst-ui@latest init
```

`init` finds the application in `angular.json` and creates `herbst.json` with these options:

- **componentsDir**: the components folder. Default `src/app/shared/ui`.
- **alias**: the import alias. Default `@shared/ui`.

It also adds the alias to `tsconfig`, copies `theme.css` and the `cn` utility, imports the theme in your global CSS and installs the base dependencies. To change the folder or the alias, edit `herbst.json`.

## Add

Add one or more components at once. If a component depends on another, the CLI brings both.

```bash
npx herbst-ui@latest add button
npx herbst-ui@latest add dialog input select
```

The files go into `componentsDir`, with imports already using your alias. Missing npm dependencies are installed.

## Flags

- `--overwrite`: with `add`, replaces files that already exist.
- `--project <name>`: with `init`, picks the application when `angular.json` has more than one.
- `--cwd <dir>`: runs the command in another folder.

## How it works

Each component is published in a registry, with one JSON per component. `add` reads the registry, resolves the dependencies, rewrites the imports to your alias and writes the files into your project. Nothing stays hidden inside a package.
