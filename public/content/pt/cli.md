# CLI

A CLI `herbst-ui` copia o código dos componentes para o seu projeto e ajusta os imports para o seu alias. Rode com `npx`, sem instalar nada globalmente.

## Init

Rode uma vez por projeto.

```bash
npx herbst-ui@latest init
```

O `init` encontra a aplicação no `angular.json` e cria o `herbst.json` com estas opções:

- **componentsDir**: pasta dos componentes. Padrão `src/app/shared/ui`.
- **alias**: alias de import. Padrão `@shared/ui`.

Ele também adiciona o alias no `tsconfig`, copia o `theme.css` e o utilitário `cn`, importa o tema no seu CSS global e instala as dependências base. Para mudar a pasta ou o alias, edite o `herbst.json`.

## Add

Adicione um ou mais componentes de uma vez. Se um componente depende de outro, a CLI traz os dois.

```bash
npx herbst-ui@latest add button
npx herbst-ui@latest add dialog input select
```

Os arquivos vão para o `componentsDir`, com os imports já no seu alias. Dependências npm que faltarem são instaladas.

## Flags

- `--overwrite`: no `add`, substitui arquivos que já existem.
- `--project <nome>`: no `init`, escolhe a aplicação quando o `angular.json` tem mais de uma.
- `--cwd <pasta>`: roda o comando em outra pasta.

## Como funciona

Cada componente está publicado em um registro, com um JSON por componente. O `add` lê o registro, resolve as dependências, troca os imports pelo seu alias e grava os arquivos no seu projeto. Nada fica escondido dentro de um pacote.
