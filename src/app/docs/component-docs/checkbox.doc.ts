import {
  HbDemoCheckboxBasicComponent,
  HbDemoCheckboxGroupComponent,
  HbDemoCheckboxSizesComponent,
  HbDemoCheckboxStatusesComponent,
} from '../demos/checkbox';
import * as basicSource from '../demos/checkbox/checkbox-basic' with { loader: 'text' };
import * as groupSource from '../demos/checkbox/checkbox-group' with { loader: 'text' };
import * as sizesSource from '../demos/checkbox/checkbox-sizes' with { loader: 'text' };
import * as statusesSource from '../demos/checkbox/checkbox-statuses' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const checkboxDoc: ComponentDoc = {
  slug: 'checkbox',
  title: 'Checkbox',
  description: {
    en: 'A toggle for a single option or a set. It supports checked, unchecked, and indeterminate states, status colours, sizes, and shapes, and gathers several into a value array with hb-checkbox-group.',
    pt: 'Um alternador para uma opção ou um conjunto. Suporta estados marcado, desmarcado e indeterminado, cores de status, tamanhos e formatos, e reúne vários num array de valores com hb-checkbox-group.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'States', pt: 'Estados' },
      component: HbDemoCheckboxBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'statuses',
      title: { en: 'Statuses & invalid', pt: 'Status e inválido' },
      component: HbDemoCheckboxStatusesComponent,
      source: sourceText(statusesSource),
      align: 'start',
    },
    {
      id: 'sizes',
      title: { en: 'Sizes & shapes', pt: 'Tamanhos e formatos' },
      component: HbDemoCheckboxSizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
    },
    {
      id: 'group',
      title: { en: 'Group', pt: 'Grupo' },
      component: HbDemoCheckboxGroupComponent,
      source: sourceText(groupSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-checkbox',
      rows: [
        {
          property: '[(hbChecked)]',
          description: {
            en: 'Two-way checked state.',
            pt: 'Estado marcado bidirecional.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[(hbIndeterminate)]',
          description: {
            en: 'Two-way indeterminate (partial) state.',
            pt: 'Estado indeterminado (parcial) bidirecional.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbValue]',
          description: {
            en: 'Value contributed to the parent hb-checkbox-group.',
            pt: 'Valor contribuído ao hb-checkbox-group pai.',
          },
          type: 'unknown',
          default: 'null',
        },
        {
          property: '[hbStatus]',
          description: {
            en: 'Colour intent of the box.',
            pt: 'Intenção de cor da caixa.',
          },
          type: `'default' | 'error' | 'success' | 'warning'`,
          default: `'default'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Size of the box.',
            pt: 'Tamanho da caixa.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbShape]',
          description: {
            en: 'Corner style of the box.',
            pt: 'Estilo dos cantos da caixa.',
          },
          type: `'square' | 'rounded' | 'circle'`,
          default: `'square'`,
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Disable the checkbox.',
            pt: 'Desabilita o checkbox.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbInvalid]',
          description: {
            en: 'Mark the checkbox as invalid (aria-invalid).',
            pt: 'Marca o checkbox como inválido (aria-invalid).',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbCheckboxIndicator]',
          description: {
            en: 'Template directive to replace the default check icon.',
            pt: 'Diretiva de template para substituir o ícone de check padrão.',
          },
          type: 'template',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-checkbox-group',
      rows: [
        {
          property: '[(hbValue)]',
          description: {
            en: 'Array of the values of the checked children.',
            pt: 'Array com os valores dos filhos marcados.',
          },
          type: 'unknown[]',
          default: '[]',
        },
        {
          property: '[hbOrientation]',
          description: {
            en: 'Lay the checkboxes in a column or a row.',
            pt: 'Dispõe os checkboxes em coluna ou em linha.',
          },
          type: `'vertical' | 'horizontal'`,
          default: `'vertical'`,
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Disable every checkbox in the group.',
            pt: 'Desabilita todos os checkboxes do grupo.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '(hbChange)',
          description: {
            en: 'Emits the value array when the selection changes.',
            pt: 'Emite o array de valores quando a seleção muda.',
          },
          type: 'unknown[]',
          default: '—',
        },
      ],
    },
  ],
};
