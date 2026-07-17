import {
  HbDemoToggleBasicComponent,
  HbDemoToggleGroupMultipleComponent,
  HbDemoToggleGroupSingleComponent,
} from '../demos/toggle';
import * as basicSource from '../demos/toggle/toggle-basic' with { loader: 'text' };
import * as multipleSource from '../demos/toggle/toggle-group-multiple' with { loader: 'text' };
import * as singleSource from '../demos/toggle/toggle-group-single' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const toggleDoc: ComponentDoc = {
  slug: 'toggle',
  title: 'Toggle',
  description: {
    en: 'A two-state button that stays pressed. Use it on its own with a two-way pressed state, an icon, a variant and size; or wrap several in a toggle group for single or multiple selection, connected or spaced, with roving keyboard focus and form-control support.',
    pt: 'Um botão de dois estados que permanece pressionado. Use-o sozinho com estado pressed bidirecional, um ícone, uma variante e tamanho; ou agrupe vários num toggle group para seleção única ou múltipla, conectado ou espaçado, com foco de teclado rotativo e suporte a form control.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Standalone toggle', pt: 'Toggle avulso' },
      component: HbDemoToggleBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'single',
      title: { en: 'Single group', pt: 'Grupo single' },
      component: HbDemoToggleGroupSingleComponent,
      source: sourceText(singleSource),
      align: 'start',
    },
    {
      id: 'multiple',
      title: { en: 'Multiple group', pt: 'Grupo multiple' },
      component: HbDemoToggleGroupMultipleComponent,
      source: sourceText(multipleSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-toggle',
      rows: [
        {
          property: '[(hbPressed)]',
          description: {
            en: 'The pressed state, two-way bound. Ignored when inside a toggle group (the group owns selection).',
            pt: 'O estado pressionado, bidirecional. Ignorado dentro de um toggle group (o grupo controla a seleção).',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbValue]',
          description: {
            en: 'Identifies the toggle within a group — matched against the group value.',
            pt: 'Identifica o toggle dentro de um grupo — comparado com o valor do grupo.',
          },
          type: 'unknown',
          default: 'null',
        },
        {
          property: '[hbVariant] / [hbSize]',
          description: {
            en: 'Override the look per toggle; otherwise inherited from the group (or the defaults).',
            pt: 'Sobrescreve a aparência por toggle; caso contrário herdado do grupo (ou dos padrões).',
          },
          type: `'default' | 'outline' / 'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'default' / 'md'`,
        },
        {
          property: '[hbIcon]',
          description: {
            en: 'Leading icon rendered before the projected label.',
            pt: 'Ícone à esquerda renderizado antes do rótulo projetado.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Disable this toggle (the group can also disable all of them).',
            pt: 'Desabilita este toggle (o grupo também pode desabilitar todos).',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '(hbChange)',
          description: {
            en: 'Emits the new pressed state when the toggle is activated.',
            pt: 'Emite o novo estado pressionado quando o toggle é ativado.',
          },
          type: 'boolean',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-toggle-group',
      rows: [
        {
          property: '[hbType]',
          description: {
            en: 'Single selection (a value, or null) or multiple selection (an array).',
            pt: 'Seleção única (um valor, ou null) ou múltipla (um array).',
          },
          type: `'single' | 'multiple'`,
          default: `'single'`,
        },
        {
          property: '[(hbValue)]',
          description: {
            en: 'The selected value(s), two-way bound. Also works as a form control (NG_VALUE_ACCESSOR).',
            pt: 'O(s) valor(es) selecionado(s), bidirecional. Também funciona como form control (NG_VALUE_ACCESSOR).',
          },
          type: 'unknown | unknown[]',
          default: 'null',
        },
        {
          property: '[hbVariant] / [hbSize]',
          description: {
            en: 'The look applied to every toggle in the group.',
            pt: 'A aparência aplicada a cada toggle do grupo.',
          },
          type: `'default' | 'outline' / 'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'default' / 'md'`,
        },
        {
          property: '[hbConnected]',
          description: {
            en: 'Join the toggles into a seamless segmented control; false spaces them with a gap.',
            pt: 'Une os toggles num controle segmentado contínuo; false os espaça com um gap.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbRollable]',
          description: {
            en: 'Single mode only — allow clicking the active toggle again to clear the selection.',
            pt: 'Apenas modo single — permite clicar no toggle ativo de novo para limpar a seleção.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbDisabled] / [hbAriaLabel]',
          description: {
            en: 'Disable the whole group, and label it for assistive technology.',
            pt: 'Desabilita o grupo inteiro, e o rotula para tecnologia assistiva.',
          },
          type: 'boolean / string',
          default: 'false / ""',
        },
        {
          property: '(hbChange)',
          description: {
            en: 'Emits the new selection whenever it changes.',
            pt: 'Emite a nova seleção sempre que ela muda.',
          },
          type: 'unknown',
          default: '—',
        },
      ],
    },
  ],
};
