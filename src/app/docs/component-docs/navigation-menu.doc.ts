import {
  HbDemoNavigationMenuBasicComponent,
  HbDemoNavigationMenuControlledComponent,
  HbDemoNavigationMenuVerticalComponent,
} from '../demos/navigation-menu';
import * as basicSource from '../demos/navigation-menu/navigation-menu-basic' with {
  loader: 'text',
};
import * as controlledSource from '../demos/navigation-menu/navigation-menu-controlled' with {
  loader: 'text',
};
import * as verticalSource from '../demos/navigation-menu/navigation-menu-vertical' with {
  loader: 'text',
};

import { sourceText, type ComponentDoc } from './component-doc.types';

export const navigationMenuDoc: ComponentDoc = {
  slug: 'navigation-menu',
  title: 'Navigation menu',
  description: {
    en: 'A site navigation bar with dropdown panels. Triggers open on hover or keyboard, panels render in a shared viewport or inline, and the active item is a two-way bound value. Lay it out horizontally or vertically.',
    pt: 'Uma barra de navegação com painéis dropdown. Os gatilhos abrem no hover ou pelo teclado, os painéis renderizam num viewport compartilhado ou inline, e o item ativo é um valor bidirecional. Disponha-a horizontal ou verticalmente.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Triggers, panels & links', pt: 'Gatilhos, painéis e links' },
      component: HbDemoNavigationMenuBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'controlled',
      title: { en: 'Controlled value & delays', pt: 'Valor controlado e atrasos' },
      component: HbDemoNavigationMenuControlledComponent,
      source: sourceText(controlledSource),
      align: 'start',
    },
    {
      id: 'vertical',
      title: { en: 'Vertical & inline panels', pt: 'Vertical e painéis inline' },
      component: HbDemoNavigationMenuVerticalComponent,
      source: sourceText(verticalSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-navigation-menu',
      rows: [
        {
          property: '[(hbValue)]',
          description: {
            en: 'The value of the open item, or null when closed. Two-way bindable to drive it externally.',
            pt: 'O valor do item aberto, ou null quando fechado. Bindável nos dois sentidos para controlá-lo externamente.',
          },
          type: 'string | null',
          default: 'null',
        },
        {
          property: '[hbOrientation]',
          description: {
            en: 'Lay the list out as a row or a column.',
            pt: 'Dispõe a lista como uma linha ou uma coluna.',
          },
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
        },
        {
          property: '[hbSide]',
          description: {
            en: 'Which side of the trigger the content panel opens on.',
            pt: 'De que lado do gatilho o painel de conteúdo abre.',
          },
          type: `'top' | 'bottom' | 'left' | 'right'`,
          default: `'bottom'`,
        },
        {
          property: '[hbViewport]',
          description: {
            en: 'Render panels in a single shared viewport (with a morphing transition), or false to render each inline under its item.',
            pt: 'Renderiza os painéis num único viewport compartilhado (com transição), ou false para renderizar cada um inline sob seu item.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbDelayDuration]',
          description: {
            en: 'Milliseconds to wait before opening a panel on hover.',
            pt: 'Milissegundos a esperar antes de abrir um painel no hover.',
          },
          type: 'number',
          default: '200',
        },
        {
          property: '[hbSkipDelayDuration]',
          description: {
            en: 'Window in which moving between triggers opens instantly, skipping the hover delay.',
            pt: 'Janela em que mover entre gatilhos abre instantaneamente, pulando o atraso de hover.',
          },
          type: 'number',
          default: '300',
        },
      ],
    },
    {
      title: 'Structure',
      rows: [
        {
          property: 'hb-navigation-menu-list',
          description: {
            en: 'The row/column of items.',
            pt: 'A linha/coluna de itens.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-navigation-menu-item [hbValue]',
          description: {
            en: 'A single entry. Its value keys the open state (auto-generated if omitted).',
            pt: 'Uma entrada. Seu valor identifica o estado aberto (gerado automaticamente se omitido).',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: 'hb-navigation-menu-trigger',
          description: {
            en: 'The button that toggles an item’s content panel; renders a caret.',
            pt: 'O botão que alterna o painel de conteúdo de um item; renderiza um caret.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-navigation-menu-content',
          description: {
            en: 'The dropdown panel body for an item.',
            pt: 'O corpo do painel dropdown de um item.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'a[hbNavigationMenuLink] [hbActive]',
          description: {
            en: 'A styled navigation link, inside a panel or standing alone as an item; hbActive marks the current page.',
            pt: 'Um link de navegação estilizado, dentro de um painel ou sozinho como item; hbActive marca a página atual.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: 'hb-navigation-menu-indicator',
          description: {
            en: 'An arrow that points at the active trigger, sliding between them.',
            pt: 'Uma seta que aponta para o gatilho ativo, deslizando entre eles.',
          },
          type: 'component',
          default: '—',
        },
      ],
    },
  ],
};
