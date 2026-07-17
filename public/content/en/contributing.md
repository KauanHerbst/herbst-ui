# Contributing

Herbst UI is built in the open, and every contribution is welcome — from a docs typo to a brand-new component. To keep the harvest tidy, everything flows through issues.

## The flow

1. **Open an issue before any code.** Bugs, ideas and improvements start as an issue on [GitHub](https://github.com/KauanHerbst/herbst-ui/issues). Describe the problem or proposal and wait for the discussion — it avoids duplicated or misdirected work.
2. **Wait for the green light.** Once accepted, the issue gets the `approved` label and you can start. Issues without prior discussion may be closed.
3. **Fork and branch.** Fork the repository and create a descriptive branch (`fix/tooltip-focus`, `feat/toast-progress`).
4. **Open a Pull Request linked to the issue.** Use `Closes #123` in the description. PRs without a linked issue will be closed with a request to open one.
5. **Review and merge.** Every PR goes through maintainer review. The `main` branch is protected — no code lands without an approved PR.

## Running the project

```bash
git clone https://github.com/YOUR_USERNAME/herbst-ui
cd herbst-ui
npm install
npm start
```

The documentation app runs at `http://localhost:4200` and consumes the library straight from `projects/herbst`.

## Code standards

- **Signals-first Angular.** Standalone components, `input()`/`model()`/`output()`, `OnPush` throughout. No modules.
- **One component per file**, `hb`-prefixed selectors, `data-slot` attributes on internal elements.
- **No comments in code** — the code should explain itself.
- **Semantic tokens always** (`bg-primary`, `text-muted-foreground`, `border-border`). Never hardcoded colors.
- Run `npm run build` before opening the PR — the build must be green.

## What to contribute

- **Bugs** — always welcome, with a minimal reproduction.
- **Documentation** — examples, fixes and translations.
- **New components** — open the issue first; Herbst UI's visual direction is intentional and not every component fits the catalogue.

Thanks for helping the season grow. 🍂
