import {
  HbDemoTreeAdvancedComponent,
  HbDemoTreeBasicComponent,
  HbDemoTreeCheckableComponent,
} from '../demos/tree';
import * as advancedSource from '../demos/tree/tree-advanced' with { loader: 'text' };
import * as basicSource from '../demos/tree/tree-basic' with { loader: 'text' };
import * as checkableSource from '../demos/tree/tree-checkable' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const treeDoc: ComponentDoc = {
  slug: 'tree',
  title: 'Tree',
  description: {
    en: 'A hierarchical list of expandable nodes. Feed it a nested data model, control expansion and selection (single or multiple), add cascading checkboxes with a select-all, filter with a built-in search box, virtualise long lists, show a loading skeleton, and template the node label or toggle icon.',
    pt: 'Uma lista hierárquica de nós expansíveis. Passe um modelo de dados aninhado, controle expansão e seleção (única ou múltipla), adicione checkboxes em cascata com selecionar-tudo, filtre com uma caixa de busca embutida, virtualize listas longas, mostre um esqueleto de carregamento, e faça template do rótulo do nó ou do ícone de toggle.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Nodes, expansion & selection', pt: 'Nós, expansão e seleção' },
      component: HbDemoTreeBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'checkable',
      title: { en: 'Cascading checkboxes', pt: 'Checkboxes em cascata' },
      component: HbDemoTreeCheckableComponent,
      source: sourceText(checkableSource),
      align: 'start',
    },
    {
      id: 'advanced',
      title: { en: 'Filter & custom templates', pt: 'Filtro e templates customizados' },
      component: HbDemoTreeAdvancedComponent,
      source: sourceText(advancedSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-tree — data & selection',
      rows: [
        {
          property: '[hbNodes]',
          description: {
            en: 'The tree data. Each node is { key, label, icon?, children?, leaf?, disabled?, selectable?, loading?, data? }.',
            pt: 'Os dados da árvore. Cada nó é { key, label, icon?, children?, leaf?, disabled?, selectable?, loading?, data? }.',
          },
          type: 'HbTreeNode[]',
          default: '[]',
        },
        {
          property: '[(hbExpanded)]',
          description: {
            en: 'The keys of expanded nodes, two-way bound.',
            pt: 'As keys dos nós expandidos, bidirecional.',
          },
          type: 'HbTreeKey[]',
          default: '[]',
        },
        {
          property: '[hbSelectionMode] / [(hbSelection)]',
          description: {
            en: 'Row selection mode and the selected keys (two-way).',
            pt: 'Modo de seleção de linha e as keys selecionadas (bidirecional).',
          },
          type: `'none' | 'single' | 'multiple' / HbTreeKey[]`,
          default: `'single' / []`,
        },
        {
          property: '[hbMetaKeySelection]',
          description: {
            en: 'Multiple mode — require Ctrl/Cmd to add to the selection instead of toggling freely.',
            pt: 'Modo multiple — exige Ctrl/Cmd para adicionar à seleção em vez de alternar livremente.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
    {
      title: 'hb-tree — checkboxes & filtering',
      rows: [
        {
          property: '[hbCheckable] / [(hbChecked)]',
          description: {
            en: 'Show a checkbox per node and two-way bind the checked keys.',
            pt: 'Mostra um checkbox por nó e faz bind bidirecional das keys marcadas.',
          },
          type: 'boolean / HbTreeKey[]',
          default: 'false / []',
        },
        {
          property: '[hbCheckStrictly] / [hbShowSelectAll]',
          description: {
            en: 'Independent checkboxes (no parent/child cascade), and a select-all header with an indeterminate state.',
            pt: 'Checkboxes independentes (sem cascata pai/filho), e um cabeçalho selecionar-tudo com estado indeterminado.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbShowFilter] / [hbFilter]',
          description: {
            en: 'Show the built-in search box, or drive filtering yourself with a controlled query string.',
            pt: 'Mostra a caixa de busca embutida, ou controle a filtragem você mesmo com uma query.',
          },
          type: 'boolean / string',
          default: 'false / ""',
        },
        {
          property: '[hbFilterMode] / [hbFilterPlaceholder]',
          description: {
            en: 'Lenient keeps the matched node’s descendants visible; strict shows only matches and ancestors. Plus the search placeholder.',
            pt: 'Lenient mantém os descendentes do nó correspondente visíveis; strict mostra só correspondências e ancestrais. Mais o placeholder da busca.',
          },
          type: `'lenient' | 'strict' / string`,
          default: `'lenient' / 'Filter…'`,
        },
      ],
    },
    {
      title: 'hb-tree — rendering & events',
      rows: [
        {
          property: '[hbVirtualScroll] / [hbItemSize] / [hbScrollHeight]',
          description: {
            en: 'Virtualise the flattened list with a fixed row height and viewport height.',
            pt: 'Virtualiza a lista achatada com altura de linha fixa e altura de viewport.',
          },
          type: 'boolean / number / string',
          default: `false / 32 / '16rem'`,
        },
        {
          property: '[hbLoading] / [hbSkeletonRows]',
          description: {
            en: 'Replace the tree with skeleton rows while data loads.',
            pt: 'Substitui a árvore por linhas de esqueleto enquanto os dados carregam.',
          },
          type: 'boolean / number',
          default: 'false / 6',
        },
        {
          property: '[hbToggleIcon] / [hbIndent] / [hbAriaLabel]',
          description: {
            en: 'The expand icon name, per-level indentation in pixels, and the tree’s accessible label.',
            pt: 'O nome do ícone de expansão, a indentação por nível em pixels, e o rótulo acessível da árvore.',
          },
          type: 'string / number / string',
          default: `'phosphorCaretRight' / 16 / ''`,
        },
        {
          property: '(hbNodeExpand) / (hbNodeCollapse) / (hbNodeClick)',
          description: {
            en: 'Emit the node when it is expanded, collapsed, or clicked.',
            pt: 'Emitem o nó quando ele é expandido, colapsado ou clicado.',
          },
          type: 'HbTreeNode',
          default: '—',
        },
        {
          property: 'ng-template[hbTreeNodeContent] / [hbTreeToggle]',
          description: {
            en: 'Template the node label (ctx: $implicit = node, level) and the toggle icon (ctx: $implicit = expanded, node).',
            pt: 'Faz template do rótulo do nó (ctx: $implicit = node, level) e do ícone de toggle (ctx: $implicit = expanded, node).',
          },
          type: 'template',
          default: '—',
        },
      ],
    },
  ],
};
