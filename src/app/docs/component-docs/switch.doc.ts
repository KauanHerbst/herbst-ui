import {
  HbDemoSwitchBasicComponent,
  HbDemoSwitchCardsComponent,
  HbDemoSwitchStatesComponent,
} from '../demos/switch';
import * as basicSource from '../demos/switch/switch-basic' with { loader: 'text' };
import * as cardsSource from '../demos/switch/switch-cards' with { loader: 'text' };
import * as statesSource from '../demos/switch/switch-states' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const switchDoc: ComponentDoc = {
  slug: 'switch',
  title: 'Switch',
  description: {
    en: 'A toggle for a single on/off setting. Bind the checked state, add a label on either side, put icons in the thumb, size and colour it, and swap the plain switch for a selectable card. Works with forms.',
    pt: 'Um toggle para uma configuração liga/desliga. Vincule o estado marcado, adicione um rótulo em qualquer lado, ponha ícones no thumb, dimensione e colora, e troque o switch simples por um card selecionável. Funciona com formulários.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Label, position & icons', pt: 'Rótulo, posição e ícones' },
      component: HbDemoSwitchBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'states',
      title: { en: 'Sizes, status & disabled', pt: 'Tamanhos, status e desabilitado' },
      component: HbDemoSwitchStatesComponent,
      source: sourceText(statesSource),
      align: 'start',
    },
    {
      id: 'cards',
      title: { en: 'Switch cards', pt: 'Cards de switch' },
      component: HbDemoSwitchCardsComponent,
      source: sourceText(cardsSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-switch',
      rows: [
        {
          property: '[(hbChecked)]',
          description: {
            en: 'The on/off state, two-way bound. Also works as a form control via ngModel / formControl.',
            pt: 'O estado liga/desliga, bidirecional. Também funciona como controle de formulário via ngModel / formControl.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbLabelPosition]',
          description: {
            en: 'Which side the projected label sits on.',
            pt: 'Em qual lado o rótulo projetado fica.',
          },
          type: `'start' | 'end'`,
          default: `'end'`,
        },
        {
          property: '[hbCheckedIcon] / [hbUncheckedIcon]',
          description: {
            en: 'Icon names shown inside the thumb for each state.',
            pt: 'Nomes de ícone mostrados dentro do thumb para cada estado.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbSize] / [hbStatus]',
          description: {
            en: 'Switch dimensions, and the checked colour.',
            pt: 'Dimensões do switch, e a cor quando marcado.',
          },
          type: `'xs'–'xl' / 'default' | 'success' | 'warning' | 'error'`,
          default: `'md' / 'default'`,
        },
        {
          property: '[hbDisabled] / [hbInvalid] / [hbRequired]',
          description: {
            en: 'Standard control states forwarded to the input and ARIA.',
            pt: 'Estados de controle padrão repassados ao input e ao ARIA.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbName] / [hbInputId] / [hbAriaLabel] / (hbChange)',
          description: {
            en: 'Form name, input id, accessible label, and an event with the new state.',
            pt: 'Nome de formulário, id do input, rótulo acessível, e um evento com o novo estado.',
          },
          type: 'string / boolean',
          default: `''`,
        },
      ],
    },
    {
      title: 'hb-switch-card',
      rows: [
        {
          property: 'hb-switch-card',
          description: {
            en: 'A card variant that projects rich content and toggles when clicked. Shares all hb-switch inputs.',
            pt: 'Uma variante de card que projeta conteúdo rico e alterna ao ser clicado. Compartilha todos os inputs do hb-switch.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: '[hbIndicator]',
          description: {
            en: 'Show the switch track on the right of the card.',
            pt: 'Mostra a trilha do switch à direita do card.',
          },
          type: 'boolean',
          default: 'true',
        },
      ],
    },
  ],
};
