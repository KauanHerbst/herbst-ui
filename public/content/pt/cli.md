# CLI

A CLI `herbst-ui` copia o código-fonte do componente para o seu projeto e reescreve os imports para o seu alias — o modelo copy-paste, automatizado. Rode com `npx`, sem instalar globalmente.

## Init

Configure um projeto uma vez. O `init` cria um arquivo de configuração, conecta um alias de path, instala as dependências base e coloca o tema e o utilitário `cn`.

```bash
npx herbst-ui@latest init
```

Ele detecta a sua aplicação Angular e então pergunta (ou aceita flags):

- **componentsDir** — onde os componentes são escritos, ex.: `src/app/shared/ui`.
- **alias** — o alias de import, ex.: `@shared/ui`.
- **theme** — o `theme.css` editável.

## Add

Adicione um ou mais componentes. As dependências entre componentes são resolvidas automaticamente, então adicionar `select` já traz o que ele precisa.

```bash
npx herbst-ui@latest add button
npx herbst-ui@latest add dialog input select
```

O código de cada componente é escrito dentro do seu `componentsDir`, com os imports reescritos para o seu alias e quaisquer dependências npm faltantes instaladas.

## Flags

- `--overwrite` — substitui arquivos existentes sem perguntar.
- `--yes` — aceita todos os prompts.
- `--path <dir>` — sobrepõe o diretório de destino.
- `--dry-run` — mostra o que seria escrito sem tocar no disco.

## Como funciona

O código-fonte dos componentes é servido por um registro gerado (um JSON por componente). O `add` lê o registro, resolve o grafo de dependências, substitui o seu alias no conteúdo dos arquivos e os escreve no seu projeto — nada fica escondido atrás de um pacote.
