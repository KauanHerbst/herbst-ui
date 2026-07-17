# Contribuição

O Herbst UI é construído abertamente, e toda contribuição é bem-vinda — de um typo na documentação a um componente novo. Para manter a colheita organizada, todo o fluxo passa por issues.

## O fluxo

1. **Abra uma issue antes de qualquer código.** Bugs, ideias e melhorias começam como uma issue no [GitHub](https://github.com/KauanHerbst/herbst-ui/issues). Descreva o problema ou a proposta e aguarde a discussão — isso evita trabalho duplicado ou fora da direção do projeto.
2. **Aguarde o aval.** Quando a issue for aceita, ela recebe o label `approved` e você pode começar. Issues sem discussão prévia podem ser fechadas.
3. **Fork e branch.** Faça um fork do repositório e crie uma branch descritiva (`fix/tooltip-focus`, `feat/toast-progress`).
4. **Abra o Pull Request vinculado à issue.** Use `Closes #123` na descrição. PRs sem issue vinculada serão fechados com um pedido para abrir uma.
5. **Revisão e merge.** Todo PR passa pela revisão do mantenedor. A branch `main` é protegida — nenhum código entra sem PR aprovado.

## Rodando o projeto

```bash
git clone https://github.com/SEU_USUARIO/herbst-ui
cd herbst-ui
npm install
npm start
```

A aplicação de documentação sobe em `http://localhost:4200` e consome a biblioteca direto de `projects/herbst`.

## Padrões do código

- **Angular com signals primeiro.** Componentes standalone, `input()`/`model()`/`output()`, `OnPush` em tudo. Sem módulos.
- **Um componente por arquivo**, seletor com prefixo `hb`, atributo `data-slot` nos elementos internos.
- **Sem comentários no código** — o código deve se explicar.
- **Tokens semânticos sempre** (`bg-primary`, `text-muted-foreground`, `border-border`). Nunca cores hardcoded.
- Rode `npm run build` antes de abrir o PR — o build precisa estar verde.

## O que contribuir

- **Bugs** — sempre bem-vindos, com reprodução mínima.
- **Documentação** — exemplos, correções e traduções.
- **Componentes novos** — abra a issue primeiro; a direção visual do Herbst UI é intencional e nem todo componente cabe no catálogo.

Obrigado por ajudar a estação a crescer. 🍂
