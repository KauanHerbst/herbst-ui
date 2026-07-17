import {
  HbDemoComboboxFilterComponent,
  HbDemoComboboxGroupsComponent,
  HbDemoComboboxMultipleComponent,
  HbDemoComboboxSingleComponent,
  HbDemoComboboxStatesComponent,
} from '../demos/combobox';
import * as filterSource from '../demos/combobox/combobox-filter' with { loader: 'text' };
import * as groupsSource from '../demos/combobox/combobox-groups' with { loader: 'text' };
import * as multipleSource from '../demos/combobox/combobox-multiple' with { loader: 'text' };
import * as singleSource from '../demos/combobox/combobox-single' with { loader: 'text' };
import * as statesSource from '../demos/combobox/combobox-states' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const comboboxDoc: ComponentDoc = {
  slug: 'combobox',
  title: 'Combobox',
  description: {
    en: 'A searchable select. Feed it options or project items, pick one or many with chips, filter as you type, allow custom entries, and dress it in sizes, statuses, and states.',
    pt: 'Um select pesquisável. Alimente-o com opções ou projete itens, escolha um ou vários com chips, filtre ao digitar, permita entradas customizadas e vista-o com tamanhos, status e estados.',
  },
  demos: [
    {
      id: 'single',
      title: { en: 'Single', pt: 'Único' },
      component: HbDemoComboboxSingleComponent,
      source: sourceText(singleSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'multiple',
      title: { en: 'Multiple & chips', pt: 'Múltiplo e chips' },
      component: HbDemoComboboxMultipleComponent,
      source: sourceText(multipleSource),
      align: 'start',
    },
    {
      id: 'groups',
      title: { en: 'Groups, labels & items', pt: 'Grupos, rótulos e itens' },
      component: HbDemoComboboxGroupsComponent,
      source: sourceText(groupsSource),
      align: 'start',
    },
    {
      id: 'filter',
      title: { en: 'Filtering & custom values', pt: 'Filtragem e valores customizados' },
      component: HbDemoComboboxFilterComponent,
      source: sourceText(filterSource),
      align: 'start',
    },
    {
      id: 'states',
      title: { en: 'Sizes, status & states', pt: 'Tamanhos, status e estados' },
      component: HbDemoComboboxStatesComponent,
      source: sourceText(statesSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-combobox — value & data',
      rows: [
        {
          property: '[(hbValue)]',
          description: {
            en: 'Selected value, or an array when hbMultiple is set.',
            pt: 'Valor selecionado, ou um array quando hbMultiple está ativo.',
          },
          type: 'unknown',
          default: 'null',
        },
        {
          property: '[hbOptions]',
          description: {
            en: 'Options as data: { value, label, disabled? }[]. Alternative to projected items.',
            pt: 'Opções como dados: { value, label, disabled? }[]. Alternativa aos itens projetados.',
          },
          type: 'HbComboboxOption[]',
          default: '[]',
        },
        {
          property: '[hbMultiple]',
          description: {
            en: 'Allow selecting several values as chips.',
            pt: 'Permite selecionar vários valores como chips.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbCompareWith]',
          description: {
            en: 'Equality function used to match values.',
            pt: 'Função de igualdade usada para comparar valores.',
          },
          type: '(a, b) => boolean',
          default: 'a === b',
        },
        {
          property: '[hbSelectionLimit] / [hbMaxChips]',
          description: {
            en: 'Max selectable values, and how many chips show before a “+N” pill.',
            pt: 'Máximo de valores e quantos chips aparecem antes de um “+N”.',
          },
          type: 'number',
          default: '0 / 2',
        },
        {
          property: '[hbUnique]',
          description: {
            en: 'Prevent duplicate values in multiple mode.',
            pt: 'Impede valores duplicados no modo múltiplo.',
          },
          type: 'boolean',
          default: 'true',
        },
      ],
    },
    {
      title: 'hb-combobox — search & behaviour',
      rows: [
        {
          property: '[hbPlaceholder]',
          description: {
            en: 'Placeholder of the search input.',
            pt: 'Placeholder do campo de busca.',
          },
          type: 'string',
          default: `'Search…'`,
        },
        {
          property: '[hbFilterMatchMode]',
          description: {
            en: 'How the typed query matches option labels.',
            pt: 'Como a busca digitada casa com os rótulos das opções.',
          },
          type: `'contains' | 'startsWith' | 'equals'`,
          default: `'contains'`,
        },
        {
          property: '[hbAllowCustom]',
          description: {
            en: 'Let the user commit a value that is not in the list.',
            pt: 'Permite ao usuário confirmar um valor fora da lista.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbForceSelection]',
          description: {
            en: 'Clear the input unless a real option is chosen.',
            pt: 'Limpa o campo a menos que uma opção real seja escolhida.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbMinLength] / [hbDebounce]',
          description: {
            en: 'Minimum characters before filtering, and debounce in ms.',
            pt: 'Mínimo de caracteres antes de filtrar, e debounce em ms.',
          },
          type: 'number',
          default: '0 / 0',
        },
        {
          property: '[hbDropdown] / [hbOpenOnFocus] / [hbAutoHighlight]',
          description: {
            en: 'Show a caret toggle, open on focus, and pre-highlight the first match.',
            pt: 'Mostra o caret, abre ao focar e pré-destaca o primeiro resultado.',
          },
          type: 'boolean',
          default: 'false / true / true',
        },
        {
          property: '[hbLoading] / [hbLoadingText] / [hbEmptyMessage]',
          description: {
            en: 'Loading state and its text, plus the no-results message.',
            pt: 'Estado de carregamento e seu texto, mais a mensagem de sem resultados.',
          },
          type: 'boolean / string',
          default: `false / 'Loading…' / 'No results.'`,
        },
        {
          property: '[hbVirtualScroll] + item/height',
          description: {
            en: 'Virtualise long lists (hbVirtualItemSize, hbVirtualHeight).',
            pt: 'Virtualiza listas longas (hbVirtualItemSize, hbVirtualHeight).',
          },
          type: 'boolean / number',
          default: 'false / 36 / 280',
        },
      ],
    },
    {
      title: 'hb-combobox — appearance, state & events',
      rows: [
        {
          property: '[hbSize]',
          description: {
            en: 'Control height and text scale.',
            pt: 'Controla altura e escala de texto.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbStatus]',
          description: {
            en: 'Validation colour of the control.',
            pt: 'Cor de validação do controle.',
          },
          type: `'default' | 'success' | 'warning' | 'error'`,
          default: `'default'`,
        },
        {
          property: '[hbFluid] / [hbBorderless] / [hbRing]',
          description: {
            en: 'Full width, remove the border, or toggle the focus ring.',
            pt: 'Largura total, remover a borda, ou alternar o anel de foco.',
          },
          type: 'boolean',
          default: 'false / false / true',
        },
        {
          property: '[hbClearable]',
          description: {
            en: 'Show a button to clear the selection.',
            pt: 'Mostra um botão para limpar a seleção.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbDisabled] / [hbReadonly] / [hbInvalid] / [hbRequired]',
          description: {
            en: 'Standard form control states.',
            pt: 'Estados padrão de controle de formulário.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '(hbChange) / (hbOpenChange) / (hbSearch)',
          description: {
            en: 'Emits on value change, panel open/close, and search text change.',
            pt: 'Emite na mudança de valor, abertura/fechamento do painel, e mudança do texto de busca.',
          },
          type: 'unknown / boolean / string',
          default: '—',
        },
      ],
    },
    {
      title: 'Content parts',
      rows: [
        {
          property: 'hb-combobox-item [hbValue] [hbLabel] [hbDisabled]',
          description: {
            en: 'A projected option; hbLabel feeds the filter.',
            pt: 'Uma opção projetada; hbLabel alimenta o filtro.',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: 'hb-combobox-group / hb-combobox-label / hb-combobox-separator',
          description: {
            en: 'Group items under a label, with dividers between groups.',
            pt: 'Agrupa itens sob um rótulo, com divisores entre grupos.',
          },
          type: 'slot',
          default: '—',
        },
      ],
    },
  ],
};
