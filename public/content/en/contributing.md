# Contributing

Herbst UI is open source and all help is welcome, from a typo in the docs to a new component. To keep things organized, work always starts with an issue.

## The flow

1. **Open an issue before any code.** Bugs, ideas and improvements start as an issue on [GitHub](https://github.com/KauanHerbst/herbst-ui/issues). Describe the problem or proposal and wait for the discussion. This way nobody does repeated work or work outside the project's direction.
2. **Wait for approval.** Once accepted, the issue gets the `approved` label and you can start. Issues without prior discussion may be closed.
3. **Fork and branch.** Fork the repository and create a descriptive branch (`fix/tooltip-focus`, `feat/toast-progress`).
4. **Open a Pull Request linked to the issue.** Use `Closes #123` in the description. PRs without a linked issue will be closed with a request to open one.
5. **Review and merge.** Every PR goes through maintainer review. The `main` branch is protected, so no code lands without an approved PR.

## Running the project

```bash
git clone https://github.com/YOUR_USERNAME/herbst-ui
cd herbst-ui
npm install
npm start
```

The documentation app runs at `http://localhost:4200` and consumes the library straight from `projects/herbst`.

## Code standards

- **Modern Angular.** Standalone components, `input()`/`model()`/`output()` and `OnPush` everywhere. No modules.
- **One component per file**, with `hb`-prefixed selectors and `data-slot` attributes on internal elements.
- **No comments in code.** The code should explain itself.
- **Always semantic tokens** (`bg-primary`, `text-muted-foreground`, `border-border`), never hardcoded colors.
- Run `npm run build` before opening the PR. The build must pass.

## What to contribute

- **Bugs**, ideally with a minimal example that reproduces the problem.
- **Documentation**: examples, fixes and translations.
- **New components**: open the issue first. Herbst UI's look follows a set direction and not every component fits the catalogue.

Thanks for helping the project grow. 🍂
