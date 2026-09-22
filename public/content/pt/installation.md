# Instalação

Um comando prepara o projeto. Você precisa de Angular 20 ou mais novo e Tailwind CSS v4.

## Requisitos

- Angular 20 ou mais novo, com bootstrap standalone.
- Tailwind CSS v4.
- `@angular/cdk`, só para overlays, menus e diálogos. O `add` instala quando o componente precisa.

## Início rápido

Rode o `init` uma vez. Ele instala as dependências base, adiciona o tema, cria o alias de import e copia o utilitário `cn`.

```bash
npx herbst-ui@latest init
```

Depois adicione os componentes que quiser:

```bash
npx herbst-ui@latest add button
```

O código do componente vai para o seu projeto. Você usa como está ou muda o que precisar.

## Fontes

O tema usa Inter, JetBrains Mono e Newsreader, mas o `init` não instala fontes. Carregue as três no `index.html` ou troque `--font-sans`, `--font-mono` e `--font-display` no `theme.css`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap" />
```
