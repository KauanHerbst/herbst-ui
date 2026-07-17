import {
  HbDemoFieldBasicComponent,
  HbDemoFieldHorizontalComponent,
  HbDemoFieldSetComponent,
} from '../demos/field';
import * as basicSource from '../demos/field/field-basic' with { loader: 'text' };
import * as horizontalSource from '../demos/field/field-horizontal' with { loader: 'text' };
import * as setSource from '../demos/field/field-set' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const fieldDoc: ComponentDoc = {
  slug: 'field',
  title: 'Field',
  description: {
    en: 'Layout primitives for form fields — a label, control, description, and error, laid out vertically or horizontally, and grouped into fieldsets and columns.',
    pt: 'Primitivos de layout para campos de formulário — rótulo, controle, descrição e erro, dispostos na vertical ou horizontal, e agrupados em fieldsets e colunas.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Label, description & error', pt: 'Rótulo, descrição e erro' },
      component: HbDemoFieldBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'horizontal',
      title: { en: 'Horizontal', pt: 'Horizontal' },
      component: HbDemoFieldHorizontalComponent,
      source: sourceText(horizontalSource),
      align: 'start',
    },
    {
      id: 'set',
      title: { en: 'Fieldset, legend & columns', pt: 'Fieldset, legenda e colunas' },
      component: HbDemoFieldSetComponent,
      source: sourceText(setSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-field',
      rows: [
        {
          property: '[hbOrientation]',
          description: {
            en: 'Stack the label and control, place them in a row, or switch by container width.',
            pt: 'Empilha rótulo e controle, coloca-os em linha, ou alterna pela largura do contêiner.',
          },
          type: `'vertical' | 'horizontal' | 'responsive'`,
          default: `'vertical'`,
        },
        {
          property: '[hbInvalid]',
          description: {
            en: 'Mark the field invalid, tinting the label and error.',
            pt: 'Marca o campo como inválido, tingindo o rótulo e o erro.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
    {
      title: 'Parts',
      rows: [
        {
          property: 'hb-field-label [hbRequired]',
          description: {
            en: 'The field label; hbRequired adds an asterisk.',
            pt: 'O rótulo do campo; hbRequired adiciona um asterisco.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: 'hb-field-description',
          description: {
            en: 'Helper text below the control.',
            pt: 'Texto de ajuda abaixo do controle.',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: 'hb-field-error [hbErrors]',
          description: {
            en: 'Error messages shown when invalid.',
            pt: 'Mensagens de erro exibidas quando inválido.',
          },
          type: 'string[]',
          default: '[]',
        },
        {
          property: 'hb-field-content',
          description: {
            en: 'Wraps the label and description as a block (for horizontal layouts).',
            pt: 'Envolve rótulo e descrição como bloco (para layouts horizontais).',
          },
          type: 'slot',
          default: '—',
        },
      ],
    },
    {
      title: 'Grouping',
      rows: [
        {
          property: 'hb-field-group [hbColumns]',
          description: {
            en: 'Grid of fields; collapses to one column on narrow containers.',
            pt: 'Grade de campos; colapsa para uma coluna em contêineres estreitos.',
          },
          type: '1 | 2 | 3',
          default: '1',
        },
        {
          property: 'hb-field-set / hb-field-legend',
          description: {
            en: 'A fieldset and its legend (variant: legend or label).',
            pt: 'Um fieldset e sua legenda (variant: legend ou label).',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: 'hb-field-title / hb-field-separator',
          description: {
            en: 'A section title and a divider between groups.',
            pt: 'Um título de seção e um divisor entre grupos.',
          },
          type: 'slot',
          default: '—',
        },
      ],
    },
  ],
};
