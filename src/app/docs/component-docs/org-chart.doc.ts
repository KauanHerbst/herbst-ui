import {
  HbDemoOrgChartBasicComponent,
  HbDemoOrgChartCheckboxComponent,
  HbDemoOrgChartSelectionComponent,
} from '../demos/org-chart';
import * as basicSource from '../demos/org-chart/org-chart-basic' with { loader: 'text' };
import * as checkboxSource from '../demos/org-chart/org-chart-checkbox' with { loader: 'text' };
import * as selectionSource from '../demos/org-chart/org-chart-selection' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const orgChartDoc: ComponentDoc = {
  slug: 'org-chart',
  title: 'Org chart',
  description: {
    en: 'A hierarchical tree of connected nodes. Feed it nested data, lay it out vertically or horizontally, collapse branches, select nodes as single, multiple, or cascading checkboxes, and template each node.',
    pt: 'Uma árvore hierárquica de nós conectados. Passe dados aninhados, disponha-a vertical ou horizontalmente, colapse ramos, selecione nós como único, múltiplo ou checkboxes em cascata, e faça template de cada nó.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Collapsible tree', pt: 'Árvore colapsável' },
      component: HbDemoOrgChartBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'selection',
      title: { en: 'Node template & selection', pt: 'Template de nó e seleção' },
      component: HbDemoOrgChartSelectionComponent,
      source: sourceText(selectionSource),
      align: 'start',
    },
    {
      id: 'checkbox',
      title: { en: 'Checkbox cascade & horizontal', pt: 'Checkbox em cascata e horizontal' },
      component: HbDemoOrgChartCheckboxComponent,
      source: sourceText(checkboxSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-org-chart',
      rows: [
        {
          property: '[hbNodes]',
          description: {
            en: 'The tree data. Each node is { key, label?, data?, children?, selectable?, collapsible?, styleClass? }.',
            pt: 'Os dados da árvore. Cada nó é { key, label?, data?, children?, selectable?, collapsible?, styleClass? }.',
          },
          type: 'HbOrgChartNode[]',
          default: '[]',
        },
        {
          property: '[hbLayout]',
          description: {
            en: 'Grow the tree top-to-bottom or left-to-right.',
            pt: 'Cresce a árvore de cima para baixo ou da esquerda para a direita.',
          },
          type: `'vertical' | 'horizontal'`,
          default: `'vertical'`,
        },
        {
          property: '[hbSelectionMode]',
          description: {
            en: 'How nodes are selected. checkbox cascades to descendants and reflects an indeterminate parent state.',
            pt: 'Como os nós são selecionados. checkbox cascateia para descendentes e reflete o estado indeterminado do pai.',
          },
          type: `'none' | 'single' | 'multiple' | 'checkbox'`,
          default: `'none'`,
        },
        {
          property: '[(hbSelection)]',
          description: {
            en: 'The selected node keys, two-way bound.',
            pt: 'As keys dos nós selecionados, bidirecional.',
          },
          type: 'HbOrgChartKey[]',
          default: '[]',
        },
        {
          property: '[hbMetaKeySelection]',
          description: {
            en: 'In multiple mode, require Ctrl/Cmd to add to the selection instead of toggling additively.',
            pt: 'No modo multiple, exige Ctrl/Cmd para adicionar à seleção em vez de alternar aditivamente.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbCollapsible] / [(hbCollapsedKeys)]',
          description: {
            en: 'Show branch togglers, and the two-way set of collapsed node keys.',
            pt: 'Mostra os controles de ramo, e o conjunto bidirecional de keys de nós colapsados.',
          },
          type: 'boolean / HbOrgChartKey[]',
          default: 'true / []',
        },
      ],
    },
    {
      title: 'Events & template',
      rows: [
        {
          property: '(hbNodeSelect) / (hbNodeUnselect)',
          description: {
            en: 'Emit the node as it is selected or unselected.',
            pt: 'Emitem o nó ao ser selecionado ou desselecionado.',
          },
          type: 'HbOrgChartNode',
          default: '—',
        },
        {
          property: '(hbNodeExpand) / (hbNodeCollapse)',
          description: {
            en: 'Emit the node when its branch is expanded or collapsed.',
            pt: 'Emitem o nó quando seu ramo é expandido ou colapsado.',
          },
          type: 'HbOrgChartNode',
          default: '—',
        },
        {
          property: 'ng-template[hbOrgChartNode]',
          description: {
            en: 'Render each node body. Context: $implicit = the node. Without it, the node label is shown.',
            pt: 'Renderiza o corpo de cada nó. Contexto: $implicit = o nó. Sem ele, o label do nó é mostrado.',
          },
          type: 'template',
          default: '—',
        },
        {
          property: 'node.selectable / node.collapsible / node.styleClass',
          description: {
            en: 'Per-node overrides: block selection, block collapsing, or add classes to that node’s box.',
            pt: 'Overrides por nó: bloquear seleção, bloquear colapso, ou adicionar classes à caixa daquele nó.',
          },
          type: 'boolean / string',
          default: '—',
        },
      ],
    },
  ],
};
