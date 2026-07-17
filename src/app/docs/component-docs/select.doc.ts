import {
  HbDemoSelectAdvancedComponent,
  HbDemoSelectBasicComponent,
  HbDemoSelectGroupedComponent,
  HbDemoSelectMultipleComponent,
} from '../demos/select';
import * as advancedSource from '../demos/select/select-advanced' with { loader: 'text' };
import * as basicSource from '../demos/select/select-basic' with { loader: 'text' };
import * as groupedSource from '../demos/select/select-grouped' with { loader: 'text' };
import * as multipleSource from '../demos/select/select-multiple' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const selectDoc: ComponentDoc = {
  slug: 'select',
  title: 'Select',
  description: {
    en: 'A dropdown select with single or multiple choice. Feed options as data or declare grouped items, filter and virtualise long lists, show chips or a summary, size and colour the trigger, and drive it as a form control.',
    pt: 'Um select dropdown com escolha única ou múltipla. Passe opções como dados ou declare itens agrupados, filtre e virtualize listas longas, mostre chips ou um resumo, dimensione e colora o gatilho, e controle-o como um controle de formulário.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Options & value', pt: 'Opções e valor' },
      component: HbDemoSelectBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'grouped',
      title: { en: 'Declarative groups', pt: 'Grupos declarativos' },
      component: HbDemoSelectGroupedComponent,
      source: sourceText(groupedSource),
      align: 'start',
    },
    {
      id: 'multiple',
      title: { en: 'Multiple, chips & select-all', pt: 'Múltiplo, chips e selecionar-tudo' },
      component: HbDemoSelectMultipleComponent,
      source: sourceText(multipleSource),
      align: 'start',
    },
    {
      id: 'advanced',
      title: { en: 'Filter, status, size & loading', pt: 'Filtro, status, tamanho e carregando' },
      component: HbDemoSelectAdvancedComponent,
      source: sourceText(advancedSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-select — value',
      rows: [
        {
          property: '[(hbValue)]',
          description: {
            en: 'The selected value (or array when multiple), two-way bound. Also a form control via ngModel / formControl.',
            pt: 'O valor selecionado (ou array quando múltiplo), bidirecional. Também um controle de formulário via ngModel / formControl.',
          },
          type: 'unknown',
          default: 'null',
        },
        {
          property: '[hbOptions]',
          description: {
            en: 'The choices as data ({ value, label, disabled? }). Omit to declare hb-select-item children.',
            pt: 'As escolhas como dados ({ value, label, disabled? }). Omita para declarar filhos hb-select-item.',
          },
          type: 'HbSelectOption[]',
          default: '[]',
        },
        {
          property: '[hbPlaceholder] / [hbClearable]',
          description: {
            en: 'Empty-state text, and a clear button to reset the value.',
            pt: 'Texto de estado vazio, e um botão de limpar para resetar o valor.',
          },
          type: 'string / boolean',
          default: `'Select...' / false`,
        },
        {
          property: '[hbCompareWith]',
          description: {
            en: 'Custom equality function used to match values against options (for object values).',
            pt: 'Função de igualdade customizada para casar valores com opções (para valores de objeto).',
          },
          type: '(a, b) => boolean',
          default: 'a === b',
        },
        {
          property: '(hbChange) / (hbOpenChange)',
          description: {
            en: 'Emit the new value on selection, and true/false as the panel opens and closes.',
            pt: 'Emitem o novo valor na seleção, e true/false conforme o painel abre e fecha.',
          },
          type: 'unknown / boolean',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-select — multiple',
      rows: [
        {
          property: '[hbMultiple]',
          description: {
            en: 'Allow selecting several values; hbValue becomes an array.',
            pt: 'Permite selecionar vários valores; hbValue vira um array.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbDisplay] / [hbMaxChips]',
          description: {
            en: 'Show selections as chips or a comma list, and cap the number of chips before a "+N" badge.',
            pt: 'Mostra as seleções como chips ou lista separada por vírgula, e limita o número de chips antes de um badge "+N".',
          },
          type: `'chip' | 'comma' / number`,
          default: `'chip' / 2`,
        },
        {
          property: '[hbSelectAll] / [hbSelectionLimit]',
          description: {
            en: 'Add a "Select all" row, and cap how many values can be chosen (0 = no limit).',
            pt: 'Adiciona uma linha "Selecionar tudo", e limita quantos valores podem ser escolhidos (0 = sem limite).',
          },
          type: 'boolean / number',
          default: 'false / 0',
        },
      ],
    },
    {
      title: 'hb-select — panel',
      rows: [
        {
          property: '[hbFilter] / [hbFilterMatchMode] / [hbFilterPlaceholder]',
          description: {
            en: 'Add a search box; match by contains, startsWith, or equals, with a custom placeholder.',
            pt: 'Adiciona uma busca; casa por contains, startsWith ou equals, com placeholder customizado.',
          },
          type: `boolean / 'contains' | 'startsWith' | 'equals' / string`,
          default: `false / 'contains' / 'Search...'`,
        },
        {
          property: '[hbVirtualScroll] / [hbVirtualItemSize] / [hbVirtualHeight]',
          description: {
            en: 'Virtualise long data lists, setting the row height and viewport height in pixels.',
            pt: 'Virtualiza listas longas de dados, definindo a altura da linha e do viewport em pixels.',
          },
          type: 'boolean / number',
          default: 'false / 36 / 280',
        },
        {
          property: '[hbLoading] / [hbLoadingText]',
          description: {
            en: 'Show a spinner and message in place of the options.',
            pt: 'Mostra um spinner e mensagem no lugar das opções.',
          },
          type: 'boolean / string',
          default: `false / 'Loading…'`,
        },
        {
          property: '[hbEmptyMessage] / [hbEmptyOptionsMessage]',
          description: {
            en: 'Text shown when a filter has no matches, and when there are no options at all.',
            pt: 'Texto mostrado quando um filtro não tem correspondências, e quando não há opções.',
          },
          type: 'string',
          default: `'No results.' / 'No options.'`,
        },
      ],
    },
    {
      title: 'hb-select — appearance & parts',
      rows: [
        {
          property: '[hbSize] / [hbStatus]',
          description: {
            en: 'Trigger height, and validation colour (default | success | warning | error).',
            pt: 'Altura do gatilho, e cor de validação (default | success | warning | error).',
          },
          type: 'size xs–xl / status',
          default: `'md' / 'default'`,
        },
        {
          property: '[hbDisabled] / [hbReadonly] / [hbInvalid] / [hbRequired]',
          description: {
            en: 'Standard control states forwarded to the trigger and ARIA.',
            pt: 'Estados de controle padrão repassados ao gatilho e ao ARIA.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbBorderless] / [hbRing] / [hbFluid]',
          description: {
            en: 'Drop the border, toggle the focus ring, and stretch to full width.',
            pt: 'Remove a borda, alterna o anel de foco, e estica à largura total.',
          },
          type: 'boolean',
          default: 'false / true / false',
        },
        {
          property: 'parts & templates',
          description: {
            en: 'hb-select-item, hb-select-group, hb-select-label, hb-select-separator build the panel; ng-template[hbSelectValue] customises the trigger display.',
            pt: 'hb-select-item, hb-select-group, hb-select-label, hb-select-separator montam o painel; ng-template[hbSelectValue] customiza a exibição do gatilho.',
          },
          type: 'components / template',
          default: '—',
        },
      ],
    },
  ],
};
