import {
  HbDemoProgressBasicComponent,
  HbDemoProgressStatusComponent,
  HbDemoProgressValueComponent,
} from '../demos/progress';
import * as basicSource from '../demos/progress/progress-basic' with { loader: 'text' };
import * as statusSource from '../demos/progress/progress-status' with { loader: 'text' };
import * as valueSource from '../demos/progress/progress-value' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const progressDoc: ComponentDoc = {
  slug: 'progress',
  title: 'Progress',
  description: {
    en: 'A determinate or indeterminate progress bar. Set a value against a max, colour and size it, choose the shape, show a label and a formatted value inside or outside the track, or template the value entirely.',
    pt: 'Uma barra de progresso determinada ou indeterminada. Defina um valor contra um máximo, colora e dimensione, escolha a forma, mostre um rótulo e um valor formatado dentro ou fora da trilha, ou faça template do valor por completo.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Label & value', pt: 'Rótulo e valor' },
      component: HbDemoProgressBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'status',
      title: { en: 'Status, size & shape', pt: 'Status, tamanho e forma' },
      component: HbDemoProgressStatusComponent,
      source: sourceText(statusSource),
      align: 'start',
    },
    {
      id: 'value',
      title: {
        en: 'Inside value, template & indeterminate',
        pt: 'Valor interno, template e indeterminado',
      },
      component: HbDemoProgressValueComponent,
      source: sourceText(valueSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-progress — value',
      rows: [
        {
          property: '[hbValue] / [hbMax]',
          description: {
            en: 'The current amount and the total it is measured against. The value is clamped to 0…max.',
            pt: 'A quantidade atual e o total contra o qual é medida. O valor é limitado a 0…max.',
          },
          type: 'number',
          default: '0 / 100',
        },
        {
          property: '[hbIndeterminate]',
          description: {
            en: 'Show an animated indeterminate bar instead of a fixed value.',
            pt: 'Mostra uma barra indeterminada animada em vez de um valor fixo.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbShowValue] / [hbFormat]',
          description: {
            en: 'Display the value, formatted as a percentage, the raw value, or a value/max fraction.',
            pt: 'Exibe o valor, formatado como percentual, o valor bruto, ou uma fração valor/max.',
          },
          type: `boolean / 'percent' | 'value' | 'fraction'`,
          default: `false / 'percent'`,
        },
        {
          property: '[hbValuePosition]',
          description: {
            en: 'Render the value in the top row above the track, or inside the filled bar.',
            pt: 'Renderiza o valor na linha superior acima da trilha, ou dentro da barra preenchida.',
          },
          type: `'outside' | 'inside'`,
          default: `'outside'`,
        },
        {
          property: '[hbLabel] / [hbAriaLabel]',
          description: {
            en: 'A visible label above the track, and the accessible label for the progressbar.',
            pt: 'Um rótulo visível acima da trilha, e o rótulo acessível para a progressbar.',
          },
          type: 'string',
          default: `'' / 'Progress'`,
        },
        {
          property: 'ng-template[hbValueTemplate]',
          description: {
            en: 'Fully custom value rendering. Context: $implicit = value, value, max, percent.',
            pt: 'Renderização do valor totalmente customizada. Contexto: $implicit = value, value, max, percent.',
          },
          type: 'template',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-progress — appearance',
      rows: [
        {
          property: '[hbType]',
          description: {
            en: 'The colour of the bar.',
            pt: 'A cor da barra.',
          },
          type: `'default' | 'success' | 'warning' | 'destructive'`,
          default: `'default'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Track height.',
            pt: 'Altura da trilha.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbShape]',
          description: {
            en: 'Corner rounding of the track and bar.',
            pt: 'Arredondamento dos cantos da trilha e da barra.',
          },
          type: `'rounded' | 'soft' | 'square'`,
          default: `'rounded'`,
        },
        {
          property: '[hbBarClass]',
          description: {
            en: 'Extra classes applied to the filled bar (e.g. a gradient).',
            pt: 'Classes extras aplicadas à barra preenchida (ex. um gradiente).',
          },
          type: 'ClassValue',
          default: `''`,
        },
      ],
    },
  ],
};
