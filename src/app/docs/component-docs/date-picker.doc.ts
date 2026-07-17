import {
  HbDemoDatePickerButtonComponent,
  HbDemoDatePickerFormatComponent,
  HbDemoDatePickerInputComponent,
  HbDemoDatePickerRangeComponent,
} from '../demos/date-picker';
import * as buttonSource from '../demos/date-picker/date-picker-button' with { loader: 'text' };
import * as formatSource from '../demos/date-picker/date-picker-format' with { loader: 'text' };
import * as inputSource from '../demos/date-picker/date-picker-input' with { loader: 'text' };
import * as rangeSource from '../demos/date-picker/date-picker-range' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const datePickerDoc: ComponentDoc = {
  slug: 'date-picker',
  title: 'Date picker',
  description: {
    en: 'A trigger — an input or a button — that opens a calendar in a popover. It syncs the calendar with a formatted, parseable input, and inherits every calendar feature: single, range, min/max, and more.',
    pt: 'Um gatilho — um input ou um botão — que abre um calendário em um popover. Sincroniza o calendário com um input formatado e parseável, e herda todos os recursos do calendário: único, intervalo, min/max e mais.',
  },
  demos: [
    {
      id: 'input',
      title: { en: 'Input trigger', pt: 'Gatilho de input' },
      component: HbDemoDatePickerInputComponent,
      source: sourceText(inputSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'button',
      title: { en: 'Button trigger', pt: 'Gatilho de botão' },
      component: HbDemoDatePickerButtonComponent,
      source: sourceText(buttonSource),
      align: 'start',
    },
    {
      id: 'format',
      title: { en: 'Format & typed parsing', pt: 'Formato e parsing digitado' },
      component: HbDemoDatePickerFormatComponent,
      source: sourceText(formatSource),
      align: 'start',
    },
    {
      id: 'range',
      title: { en: 'Range & constraints', pt: 'Intervalo e restrições' },
      component: HbDemoDatePickerRangeComponent,
      source: sourceText(rangeSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-date-picker',
      rows: [
        {
          property: '[hbCloseOnSelect]',
          description: {
            en: 'Close the popover once a complete value is chosen.',
            pt: 'Fecha o popover quando um valor completo é escolhido.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '(hbOpenChange)',
          description: {
            en: 'Emits true when the popover opens and false when it closes.',
            pt: 'Emite true ao abrir o popover e false ao fechar.',
          },
          type: 'boolean',
          default: '—',
        },
        {
          property: '[hbDatePickerTrigger]',
          description: {
            en: 'Projected element that opens the picker (an input or a button).',
            pt: 'Elemento projetado que abre o picker (um input ou um botão).',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: 'hb-calendar (projected)',
          description: {
            en: 'The calendar shown in the popover; all its inputs apply.',
            pt: 'O calendário exibido no popover; todos os seus inputs se aplicam.',
          },
          type: 'slot',
          default: '—',
        },
      ],
    },
    {
      title: 'input[hbDatePickerInput]',
      rows: [
        {
          property: '[hbFormat]',
          description: {
            en: 'date-fns format used to display the selected date.',
            pt: 'Formato do date-fns usado para exibir a data selecionada.',
          },
          type: 'string',
          default: `'PP'`,
        },
        {
          property: '[hbParseFormats]',
          description: {
            en: 'date-fns formats accepted when the user types a date.',
            pt: 'Formatos do date-fns aceitos quando o usuário digita uma data.',
          },
          type: 'string[]',
          default: '[]',
        },
      ],
    },
  ],
};
