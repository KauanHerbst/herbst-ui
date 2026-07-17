import {
  HbDemoRadioBasicComponent,
  HbDemoRadioCardsComponent,
  HbDemoRadioStatesComponent,
} from '../demos/radio';
import * as basicSource from '../demos/radio/radio-basic' with { loader: 'text' };
import * as cardsSource from '../demos/radio/radio-cards' with { loader: 'text' };
import * as statesSource from '../demos/radio/radio-states' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const radioDoc: ComponentDoc = {
  slug: 'radio',
  title: 'Radio',
  description: {
    en: 'A single-choice group. Bind the selected value, lay the options out vertically or horizontally, size and colour them, and swap plain radios for rich selectable cards. Works with template-driven and reactive forms.',
    pt: 'Um grupo de escolha única. Vincule o valor selecionado, disponha as opções vertical ou horizontalmente, dimensione e colora-as, e troque radios simples por cards selecionáveis. Funciona com formulários template-driven e reativos.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Group & value', pt: 'Grupo e valor' },
      component: HbDemoRadioBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'states',
      title: { en: 'Orientation, size & status', pt: 'Orientação, tamanho e status' },
      component: HbDemoRadioStatesComponent,
      source: sourceText(statesSource),
      align: 'start',
    },
    {
      id: 'cards',
      title: { en: 'Radio cards', pt: 'Cards de radio' },
      component: HbDemoRadioCardsComponent,
      source: sourceText(cardsSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-radio-group',
      rows: [
        {
          property: '[(hbValue)]',
          description: {
            en: 'The selected value, two-way bound. Also works as a form control via ngModel / formControl.',
            pt: 'O valor selecionado, bidirecional. Também funciona como controle de formulário via ngModel / formControl.',
          },
          type: 'unknown',
          default: 'null',
        },
        {
          property: '[hbOrientation]',
          description: {
            en: 'Stack the options in a column or a wrapping row.',
            pt: 'Empilha as opções numa coluna ou numa linha que quebra.',
          },
          type: `'vertical' | 'horizontal'`,
          default: `'vertical'`,
        },
        {
          property: '[hbName]',
          description: {
            en: 'The shared input name for the group (auto-generated if omitted).',
            pt: 'O nome de input compartilhado do grupo (gerado automaticamente se omitido).',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbSize] / [hbStatus]',
          description: {
            en: 'Default size and validation colour, inherited by every radio unless overridden.',
            pt: 'Tamanho e cor de validação padrão, herdados por cada radio salvo se sobrescritos.',
          },
          type: `size xs–xl / 'default' | 'success' | 'warning' | 'error'`,
          default: `'md' / 'default'`,
        },
        {
          property: '[hbDisabled] / [hbInvalid]',
          description: {
            en: 'Disable the whole group, and mark it aria-invalid.',
            pt: 'Desabilita o grupo inteiro, e marca-o como aria-invalid.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '(hbChange)',
          description: {
            en: 'Emits the newly selected value.',
            pt: 'Emite o novo valor selecionado.',
          },
          type: 'unknown',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-radio / hb-radio-card',
      rows: [
        {
          property: '[hbValue]',
          description: {
            en: 'The value this option contributes to the group.',
            pt: 'O valor que esta opção contribui ao grupo.',
          },
          type: 'unknown',
          default: 'null',
        },
        {
          property: '[hbSize] / [hbStatus]',
          description: {
            en: 'Per-option overrides of the group size and status.',
            pt: 'Overrides por opção do tamanho e status do grupo.',
          },
          type: 'size / status',
          default: 'inherit',
        },
        {
          property: '[hbDisabled] / [hbInvalid] / [hbInputId]',
          description: {
            en: 'Disable a single option, mark it invalid, or set its input id.',
            pt: 'Desabilita uma opção, marca-a como inválida, ou define o id do input.',
          },
          type: 'boolean / string',
          default: 'false',
        },
        {
          property: 'hb-radio-card [hbIndicator]',
          description: {
            en: 'A card variant that projects rich content; hbIndicator toggles the radio circle.',
            pt: 'Uma variante de card que projeta conteúdo rico; hbIndicator alterna o círculo do radio.',
          },
          type: 'boolean',
          default: 'true',
        },
      ],
    },
  ],
};
