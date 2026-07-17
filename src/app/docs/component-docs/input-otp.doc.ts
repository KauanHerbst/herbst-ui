import {
  HbDemoInputOtpBasicComponent,
  HbDemoInputOtpPatternComponent,
  HbDemoInputOtpStatesComponent,
} from '../demos/input-otp';
import * as basicSource from '../demos/input-otp/input-otp-basic' with { loader: 'text' };
import * as patternSource from '../demos/input-otp/input-otp-pattern' with { loader: 'text' };
import * as statesSource from '../demos/input-otp/input-otp-states' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const inputOtpDoc: ComponentDoc = {
  slug: 'input-otp',
  title: 'Input OTP',
  description: {
    en: 'A one-time-code field split into individual slots. Set the length and accepted pattern, group slots with separators, size and colour them, and read the value through two-way binding, forms, or the complete event.',
    pt: 'Um campo de código único dividido em slots individuais. Defina o comprimento e o padrão aceito, agrupe os slots com separadores, dimensione e colora-os, e leia o valor via binding bidirecional, formulários ou o evento de conclusão.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Grouped 6-digit code', pt: 'Código de 6 dígitos agrupado' },
      component: HbDemoInputOtpBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'pattern',
      title: { en: 'Alphanumeric & large', pt: 'Alfanumérico e grande' },
      component: HbDemoInputOtpPatternComponent,
      source: sourceText(patternSource),
      align: 'start',
    },
    {
      id: 'states',
      title: { en: 'Status, readonly & disabled', pt: 'Status, somente-leitura e desabilitado' },
      component: HbDemoInputOtpStatesComponent,
      source: sourceText(statesSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-input-otp',
      rows: [
        {
          property: '[hbMaxLength]',
          description: {
            en: 'Total number of characters — match it to the number of slots.',
            pt: 'Número total de caracteres — combine com o número de slots.',
          },
          type: 'number',
          default: '6',
        },
        {
          property: '[(hbValue)]',
          description: {
            en: 'The entered code as a string. Also works as a form control via ngModel / formControl.',
            pt: 'O código digitado como string. Também funciona como controle de formulário via ngModel / formControl.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbPattern]',
          description: {
            en: 'Accepted characters, as a preset or a RegExp matching one character.',
            pt: 'Caracteres aceitos, como preset ou um RegExp que casa um caractere.',
          },
          type: `'digits' | 'chars' | 'alphanumeric' | RegExp`,
          default: `'digits'`,
        },
        {
          property: '[hbSize] / [hbStatus]',
          description: {
            en: 'Slot dimensions and validation colouring, forwarded to every slot.',
            pt: 'Dimensões do slot e coloração de validação, repassadas a todos os slots.',
          },
          type: `size xs–xl / default|success|warning|error`,
          default: `'md' / 'default'`,
        },
        {
          property: '[hbInvalid] / [hbRing]',
          description: {
            en: 'Force the error look, and toggle the active-slot ring.',
            pt: 'Força a aparência de erro, e alterna o anel do slot ativo.',
          },
          type: 'boolean',
          default: 'false / true',
        },
        {
          property: '[hbDisabled] / [hbReadonly]',
          description: {
            en: 'Block editing entirely, or show a fixed value that cannot be changed.',
            pt: 'Bloqueia a edição por completo, ou mostra um valor fixo que não pode ser alterado.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbAutoFocus] / [hbName] / [hbInputId] / [hbAriaLabel]',
          description: {
            en: 'Focus on render, and forward name, id, and aria-label to the underlying input.',
            pt: 'Foca ao renderizar, e repassa name, id e aria-label ao input subjacente.',
          },
          type: 'boolean / string',
          default: `false / ''`,
        },
        {
          property: '(hbChange) / (hbComplete)',
          description: {
            en: 'Emit on every change, and once when the code reaches hbMaxLength.',
            pt: 'Emitem a cada mudança, e uma vez quando o código atinge hbMaxLength.',
          },
          type: 'string',
          default: '—',
        },
      ],
    },
    {
      title: 'Parts',
      rows: [
        {
          property: 'hb-input-otp-group',
          description: {
            en: 'Groups a run of slots; use several with separators between them.',
            pt: 'Agrupa uma sequência de slots; use vários com separadores entre eles.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-input-otp-slot [hbIndex]',
          description: {
            en: 'A single character cell, bound to its position in the value.',
            pt: 'Uma célula de um caractere, vinculada à sua posição no valor.',
          },
          type: 'number',
          default: 'required',
        },
        {
          property: 'hb-input-otp-separator',
          description: {
            en: 'A visual divider between groups; projects a dash icon by default.',
            pt: 'Um divisor visual entre grupos; projeta um ícone de traço por padrão.',
          },
          type: 'component',
          default: '—',
        },
      ],
    },
  ],
};
