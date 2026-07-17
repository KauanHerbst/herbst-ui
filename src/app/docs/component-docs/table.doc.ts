import {
  HbDemoTableBasicComponent,
  HbDemoTableSelectionComponent,
  HbDemoTableSortableComponent,
} from '../demos/table';
import * as basicSource from '../demos/table/table-basic' with { loader: 'text' };
import * as selectionSource from '../demos/table/table-selection' with { loader: 'text' };
import * as sortableSource from '../demos/table/table-sortable' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const tableDoc: ComponentDoc = {
  slug: 'table',
  title: 'Table',
  description: {
    en: 'A data table built on native table markup with directives. Style it with size, stripes, gridlines, and hover; make headers sortable; select rows single or multiple; toggle columns; and filter and sort your data with the bundled pipes.',
    pt: 'Uma tabela de dados construída sobre markup nativo com diretivas. Estilize com tamanho, listras, linhas de grade e hover; torne cabeçalhos ordenáveis; selecione linhas única ou múltipla; alterne colunas; e filtre e ordene os dados com os pipes inclusos.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Structure & style', pt: 'Estrutura e estilo' },
      component: HbDemoTableBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'sortable',
      title: { en: 'Sortable & filtered', pt: 'Ordenável e filtrada' },
      component: HbDemoTableSortableComponent,
      source: sourceText(sortableSource),
      align: 'start',
    },
    {
      id: 'selection',
      title: { en: 'Row selection', pt: 'Seleção de linhas' },
      component: HbDemoTableSelectionComponent,
      source: sourceText(selectionSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-table — appearance',
      rows: [
        {
          property: '[hbSize]',
          description: {
            en: 'Row height and text scale.',
            pt: 'Altura das linhas e escala do texto.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbStriped] / [hbGridlines] / [hbHoverable] / [hbBordered]',
          description: {
            en: 'Zebra rows, cell borders, row hover highlight, and an outer border.',
            pt: 'Linhas zebradas, bordas de célula, destaque de hover, e uma borda externa.',
          },
          type: 'boolean',
          default: 'false / false / true / true',
        },
        {
          property: '[hbScrollable] / [hbScrollHeight]',
          description: {
            en: 'Constrain the height with a sticky header and scroll the body.',
            pt: 'Restringe a altura com cabeçalho fixo e rola o corpo.',
          },
          type: 'boolean / string',
          default: 'false / —',
        },
        {
          property: '[hbLoading]',
          description: {
            en: 'Overlay a spinner while data loads.',
            pt: 'Sobrepõe um spinner enquanto os dados carregam.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
    {
      title: 'hb-table — selection',
      rows: [
        {
          property: '[hbSelectionMode]',
          description: {
            en: 'Whether rows are selectable, and how many at once.',
            pt: 'Se as linhas são selecionáveis, e quantas de uma vez.',
          },
          type: `'none' | 'single' | 'multiple'`,
          default: `'none'`,
        },
        {
          property: '[(hbSelection)]',
          description: {
            en: 'The selected row(s) — a value for single, an array for multiple. Two-way bound.',
            pt: 'A(s) linha(s) selecionada(s) — um valor para single, um array para multiple. Bidirecional.',
          },
          type: 'unknown',
          default: 'null',
        },
        {
          property: '[hbDataKey] / [hbCompareWith]',
          description: {
            en: 'A property that uniquely identifies a row, or a custom equality function for matching selection.',
            pt: 'Uma propriedade que identifica unicamente uma linha, ou uma função de igualdade customizada.',
          },
          type: 'string / (a, b) => boolean',
          default: `'' / —`,
        },
        {
          property: '[hbMetaKeySelection] / (hbRowActivate)',
          description: {
            en: 'Require Ctrl/Cmd to add to a multiple selection, and emit a row when Enter is pressed.',
            pt: 'Exige Ctrl/Cmd para adicionar a uma seleção múltipla, e emite uma linha ao pressionar Enter.',
          },
          type: 'boolean / unknown',
          default: 'false',
        },
      ],
    },
    {
      title: 'hb-table — sorting & columns',
      rows: [
        {
          property: '[hbSortMode] / [(hbSort)]',
          description: {
            en: 'Single or multi-column sorting, and the two-way bound sort meta ({ field, order }).',
            pt: 'Ordenação de coluna única ou múltipla, e o meta de ordenação bidirecional ({ field, order }).',
          },
          type: `'single' | 'multiple' / HbSortMeta | HbSortMeta[]`,
          default: `'single' / null`,
        },
        {
          property: '[hbRemovableSort] / [hbCustomSort]',
          description: {
            en: 'Allow clearing the sort by cycling past descending, and skip the built-in reordering (you sort the data yourself).',
            pt: 'Permite limpar a ordenação ao passar do descendente, e pula a reordenação embutida (você ordena os dados).',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[(hbHiddenColumns)]',
          description: {
            en: 'The keys of columns hidden by hb-table-column-toggle.',
            pt: 'As keys das colunas ocultadas pelo hb-table-column-toggle.',
          },
          type: 'string[]',
          default: '[]',
        },
        {
          property: '[hbKeyboardNavigation] / [hbShowShortcuts]',
          description: {
            en: 'Enable arrow/Home/End/Space/Enter row navigation, and show a shortcut legend below the table.',
            pt: 'Habilita navegação de linhas por setas/Home/End/Espaço/Enter, e mostra uma legenda de atalhos abaixo da tabela.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
    {
      title: 'Structure & pipes',
      rows: [
        {
          property: 'thead / tbody / tfoot / tr / th / td / caption',
          description: {
            en: 'Native elements with directives: [hb-table-header], [hb-table-body], [hb-table-footer], [hb-table-row] (with [hbRowValue]), [hb-table-head] (with [hbSortField]), [hb-table-cell], [hb-table-caption].',
            pt: 'Elementos nativos com diretivas: [hb-table-header], [hb-table-body], [hb-table-footer], [hb-table-row] (com [hbRowValue]), [hb-table-head] (com [hbSortField]), [hb-table-cell], [hb-table-caption].',
          },
          type: 'directives',
          default: '—',
        },
        {
          property: 'hb-table-select-all / -checkbox / -radio',
          description: {
            en: 'Drop-in selection controls: a header select-all, and a per-row checkbox or radio.',
            pt: 'Controles de seleção prontos: um selecionar-tudo no cabeçalho, e um checkbox ou radio por linha.',
          },
          type: 'components',
          default: '—',
        },
        {
          property: 'hb-table-expand-toggle / -column-toggle',
          description: {
            en: 'A per-row expander (with (hbExpandedChange)), and a menu to show/hide columns.',
            pt: 'Um expansor por linha (com (hbExpandedChange)), e um menu para mostrar/ocultar colunas.',
          },
          type: 'components',
          default: '—',
        },
        {
          property: 'hbTableSort / hbTableFilter pipes',
          description: {
            en: 'Sort rows by the sort meta, and filter rows by a query over given fields — applied in the @for expression.',
            pt: 'Ordena linhas pelo meta de sort, e filtra linhas por uma query sobre campos dados — aplicados na expressão @for.',
          },
          type: 'pipe',
          default: '—',
        },
      ],
    },
  ],
};
