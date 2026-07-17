import {
  HbDemoLayoutBasicComponent,
  HbDemoLayoutCollapsibleComponent,
  HbDemoLayoutSidebarComponent,
} from '../demos/layout';
import * as basicSource from '../demos/layout/layout-basic' with { loader: 'text' };
import * as collapsibleSource from '../demos/layout/layout-collapsible' with { loader: 'text' };
import * as sidebarSource from '../demos/layout/layout-sidebar' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const layoutDoc: ComponentDoc = {
  slug: 'layout',
  title: 'Layout',
  description: {
    en: 'An application scaffold of header, content, footer, and sidebar. Nest layouts to combine directions, size each region, and add a collapsible sidebar with a built-in trigger.',
    pt: 'Um scaffold de aplicação com header, conteúdo, footer e sidebar. Aninhe layouts para combinar direções, dimensione cada região, e adicione uma sidebar colapsável com gatilho embutido.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Header, content & footer', pt: 'Header, conteúdo e footer' },
      component: HbDemoLayoutBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'sidebar',
      title: { en: 'Sidebar with groups', pt: 'Sidebar com grupos' },
      component: HbDemoLayoutSidebarComponent,
      source: sourceText(sidebarSource),
      align: 'start',
    },
    {
      id: 'collapsible',
      title: { en: 'Collapsible sidebar', pt: 'Sidebar colapsável' },
      component: HbDemoLayoutCollapsibleComponent,
      source: sourceText(collapsibleSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-layout',
      rows: [
        {
          property: '[hbDirection]',
          description: {
            en: 'Flow of the direct children. auto is horizontal when a sidebar is present, otherwise vertical. Nest layouts to mix both.',
            pt: 'Fluxo dos filhos diretos. auto é horizontal quando há uma sidebar, senão vertical. Aninhe layouts para misturar os dois.',
          },
          type: `'auto' | 'horizontal' | 'vertical'`,
          default: `'auto'`,
        },
      ],
    },
    {
      title: 'Regions',
      rows: [
        {
          property: 'hb-header [hbHeight]',
          description: {
            en: 'Top bar with a fixed height in pixels.',
            pt: 'Barra superior com altura fixa em pixels.',
          },
          type: 'number',
          default: '64',
        },
        {
          property: 'hb-content',
          description: {
            en: 'The scrollable main region; grows to fill the remaining space.',
            pt: 'A região principal rolável; cresce para preencher o espaço restante.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-footer [hbHeight]',
          description: {
            en: 'Bottom bar with a fixed height in pixels.',
            pt: 'Barra inferior com altura fixa em pixels.',
          },
          type: 'number',
          default: '64',
        },
      ],
    },
    {
      title: 'hb-layout-sidebar',
      rows: [
        {
          property: '[hbWidth]',
          description: {
            en: 'Expanded width — a number (px) or any CSS length string.',
            pt: 'Largura expandida — um número (px) ou qualquer string de comprimento CSS.',
          },
          type: 'string | number',
          default: '200',
        },
        {
          property: '[hbCollapsible] / [hbCollapsedWidth]',
          description: {
            en: 'Show the toggle trigger, and set the width when collapsed.',
            pt: 'Mostra o gatilho de alternância, e define a largura quando colapsada.',
          },
          type: 'boolean / number',
          default: 'false / 64',
        },
        {
          property: '[(hbCollapsed)]',
          description: {
            en: 'Two-way collapsed state. Also exposed via the toggle() method (exportAs "hbLayoutSidebar").',
            pt: 'Estado colapsado bidirecional. Também exposto via método toggle() (exportAs "hbLayoutSidebar").',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbReverseArrow]',
          description: {
            en: 'Flip the direction the trigger arrow points — for right-hand sidebars.',
            pt: 'Inverte a direção que a seta do gatilho aponta — para sidebars à direita.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbTrigger]',
          description: {
            en: 'A TemplateRef replacing the default arrow icon in the trigger.',
            pt: 'Um TemplateRef que substitui o ícone de seta padrão no gatilho.',
          },
          type: 'TemplateRef | null',
          default: 'null',
        },
        {
          property: '(hbOnCollapsedChange)',
          description: {
            en: 'Emits the new collapsed state when toggled.',
            pt: 'Emite o novo estado colapsado ao alternar.',
          },
          type: 'boolean',
          default: '—',
        },
      ],
    },
    {
      title: 'Sidebar content',
      rows: [
        {
          property: 'hb-layout-sidebar-group',
          description: {
            en: 'Groups navigation items with vertical spacing.',
            pt: 'Agrupa itens de navegação com espaçamento vertical.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-layout-sidebar-group-label',
          description: {
            en: 'A small uppercase caption above a group.',
            pt: 'Uma pequena legenda em maiúsculas acima de um grupo.',
          },
          type: 'component',
          default: '—',
        },
      ],
    },
  ],
};
