# Contribuição

O Herbst UI é open source e toda ajuda é bem-vinda, de um erro de digitação na documentação a um componente novo. Para manter tudo organizado, o trabalho começa sempre por uma issue.

## O fluxo

1. **Abra uma issue antes de qualquer código.** Bugs, ideias e melhorias começam como uma issue no [GitHub](https://github.com/KauanHerbst/herbst-ui/issues). Descreva o problema ou a proposta e espere a conversa. Assim ninguém faz trabalho repetido ou fora da direção do projeto.
2. **Espere a aprovação.** Quando a issue for aceita, ela recebe o label `approved` e você pode começar. Issues sem discussão prévia podem ser fechadas.
3. **Fork e branch.** Faça um fork do repositório e crie uma branch descritiva (`fix/tooltip-focus`, `feat/toast-progress`).
4. **Abra o Pull Request vinculado à issue.** Use `Closes #123` na descrição. PRs sem issue vinculada serão fechados com um pedido para abrir uma.
5. **Revisão e merge.** Todo PR passa pela revisão do mantenedor. A branch `main` é protegida, então nenhum código entra sem PR aprovado.

## Rodando o projeto

```bash
git clone https://github.com/SEU_USUARIO/herbst-ui
cd herbst-ui
npm install
npm start
```

A aplicação de documentação sobe em `http://localhost:4200` e consome a biblioteca direto de `projects/herbst`.

## Padrões do código

- **Angular moderno.** Componentes standalone, `input()`/`model()`/`output()` e `OnPush` em todos. Sem módulos.
- **Um componente por arquivo**, com seletor de prefixo `hb` e atributo `data-slot` nos elementos internos.
- **Sem comentários no código.** O código deve se explicar sozinho.
- **Sempre tokens semânticos** (`bg-primary`, `text-muted-foreground`, `border-border`), nunca cores fixas no código.
- Rode `npm run build` antes de abrir o PR. O build precisa passar.

## O que contribuir

- **Bugs**, de preferência com um exemplo mínimo que reproduza o problema.
- **Documentação**: exemplos, correções e traduções.
- **Componentes novos**: abra a issue primeiro. O visual do Herbst UI segue uma direção definida e nem todo componente cabe no catálogo.

Obrigado por ajudar o projeto a crescer. 🍂
