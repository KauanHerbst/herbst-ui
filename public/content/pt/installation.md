# Instalação

O Herbst é configurado com um único comando, em Angular 20+ com Tailwind CSS v4.

## Requisitos

- Angular 20 ou mais novo, bootstrap standalone.
- Tailwind CSS v4.
- `@angular/cdk` só para componentes de overlay, menu e diálogo — o `add` instala sozinho quando o componente precisa.

## Início rápido

Rode o `init` uma vez. Ele instala as dependências base, conecta o tema e um alias de path, e adiciona o utilitário `cn` — tudo que a fundação precisa.

```bash
npx herbst-ui@latest init
```

Depois adicione qualquer componente:

```bash
npx herbst-ui@latest add button
```

O código-fonte do componente é copiado para o seu projeto, pronto para usar — e para customizar.

## Fontes

O tema usa Inter, JetBrains Mono e Newsreader, mas o `init` não instala fontes. Carregue-as no `index.html` (ou troque `--font-sans`, `--font-mono` e `--font-display` no `theme.css`):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap" />
```
