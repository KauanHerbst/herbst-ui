# Instalação

O Herbst é configurado com um único comando, em Angular 20+ com Tailwind CSS v4.

## Requisitos

- Angular 20 ou mais novo, bootstrap standalone.
- Tailwind CSS v4.
- `@angular/cdk` (usado por overlays, menus e diálogos).

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
