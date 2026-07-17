# 🍂 Herbst UI

[English](#-herbst-ui--english) · [Português](#-herbst-ui--português)

## 🍂 Herbst UI · English

**Autumn UI for Angular.** Herbst is the German word for *autumn* — a copy-paste component library styled after the season at its best in Germany: warm sepia light, amber and rust, a single ember glowing quietly.

More than 65 open-source Angular components — signals-first, `OnPush` throughout, fully themable through one file of CSS variables. Install with the CLI, copy the source, make it your own.

## Repository layout

| Path | What lives there |
|---|---|
| `projects/herbst/` | The component library, published as [`@herbst/ui`](projects/herbst) |
| `src/app/` | Documentation site + landing page (Angular app) |
| `cli/` | `herbst-ui` — the CLI that copies components into your project |
| `registry/` | Component registry consumed by the CLI (`index.json` + per-component payloads) |
| `public/content/` | Documentation content in Markdown (PT · EN) |

## Using the library

```bash
npm i @herbst/ui
npx herbst-ui add button calendar command
```

Each component arrives typed, accessible and already wearing the theme — source included, no secrets. See the [documentation](https://github.com/KauanHerbst/herbst-ui) for the full catalogue, theming and dark mode.

## Running the docs locally

```bash
npm install
npm start
```

The docs app runs at `http://localhost:4200`, consuming the library straight from `projects/herbst`.

```bash
npm run build   # builds library + docs app — must stay green
```

## Design principles

- **The code is your project's.** Components live in your repository, not behind a package boundary.
- **One source of truth for style.** Semantic tokens (`bg-primary`, `text-muted-foreground`, `border-border`) on Tailwind v4 + oklch. Edit `theme.css` and every component follows, light and dark.
- **Signals-first Angular.** Standalone components, `input()`/`model()`/`output()`, no modules.
- **A real identity.** Paper by day, Dusk by night — quiet, warm and unmistakably its own.

## Contributing

Herbst UI follows an **issue-first workflow** — open an issue before any code. See [CONTRIBUTING.md](CONTRIBUTING.md) and the full guide in the docs (`/en/docs/contributing` · `/pt/docs/contributing`).

## License

MIT © 2026 Herbst UI

---

## 🍂 Herbst UI · Português

**UI de outono para Angular.** Herbst é a palavra alemã para *outono* — uma biblioteca de componentes copy-paste estilizada como a estação no seu melhor na Alemanha: luz quente e sépia, âmbar e ferrugem, uma única brasa brilhando em silêncio.

Mais de 65 componentes Angular open-source — signals em primeiro lugar, `OnPush` em tudo, totalmente tematizáveis por um único arquivo de variáveis CSS. Instale com o CLI, copie o código, faça do seu jeito.

### Estrutura do repositório

| Caminho | O que vive ali |
|---|---|
| `projects/herbst/` | A biblioteca de componentes, publicada como [`@herbst/ui`](projects/herbst) |
| `src/app/` | Site de documentação + landing page (app Angular) |
| `cli/` | `herbst-ui` — o CLI que copia componentes para o seu projeto |
| `registry/` | Registro de componentes consumido pelo CLI (`index.json` + payloads por componente) |
| `public/content/` | Conteúdo da documentação em Markdown (PT · EN) |

### Usando a biblioteca

```bash
npm i @herbst/ui
npx herbst-ui add button calendar command
```

Cada componente chega tipado, acessível e já vestindo o tema — código incluso, sem segredo. Veja a [documentação](https://github.com/KauanHerbst/herbst-ui) para o catálogo completo, tema e modo escuro.

### Rodando os docs localmente

```bash
npm install
npm start
```

O app de docs sobe em `http://localhost:4200`, consumindo a biblioteca direto de `projects/herbst`.

```bash
npm run build   # builda a biblioteca + app de docs — precisa ficar verde
```

### Princípios de design

- **O código é do seu projeto.** Os componentes vivem no seu repositório, não atrás de um pacote.
- **Uma fonte de verdade para o estilo.** Tokens semânticos (`bg-primary`, `text-muted-foreground`, `border-border`) no Tailwind v4 + oklch. Edite o `theme.css` e todos os componentes acompanham, no claro e no escuro.
- **Angular com signals primeiro.** Componentes standalone, `input()`/`model()`/`output()`, sem módulos.
- **Uma identidade real.** Paper de dia, Dusk à noite — quieto, quente e inconfundível.

### Contribuição

O Herbst UI segue um fluxo **issue-first** — abra uma issue antes de qualquer código. Veja o [CONTRIBUTING.md](CONTRIBUTING.md) e o guia completo nos docs (`/pt/docs/contributing` · `/en/docs/contributing`).

### Licença

MIT © 2026 Herbst UI
