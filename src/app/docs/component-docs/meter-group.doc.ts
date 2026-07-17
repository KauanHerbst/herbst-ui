import {
  HbDemoMeterGroupBasicComponent,
  HbDemoMeterGroupOrientationComponent,
  HbDemoMeterGroupTemplatesComponent,
} from '../demos/meter-group';
import * as basicSource from '../demos/meter-group/meter-group-basic' with { loader: 'text' };
import * as orientationSource from '../demos/meter-group/meter-group-orientation' with {
  loader: 'text',
};
import * as templatesSource from '../demos/meter-group/meter-group-templates' with {
  loader: 'text',
};

import { sourceText, type ComponentDoc } from './component-doc.types';

export const meterGroupDoc: ComponentDoc = {
  slug: 'meter-group',
  title: 'Meter group',
  description: {
    en: 'A segmented meter that splits a total into labelled, coloured parts. Feed it an array of items, scale them against a min/max range, lay them out horizontally or vertically, and override the labels, meters, icons, or surrounding content with templates.',
    pt: 'Um medidor segmentado que divide um total em partes rotuladas e coloridas. Passe um array de itens, escale-os contra um intervalo min/max, disponha-os horizontal ou verticalmente, e sobrescreva os rótulos, medidores, ícones ou conteúdo ao redor com templates.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Segmented breakdown', pt: 'Divisão segmentada' },
      component: HbDemoMeterGroupBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'orientation',
      title: { en: 'Vertical, icons & label position', pt: 'Vertical, ícones e posição do rótulo' },
      component: HbDemoMeterGroupOrientationComponent,
      source: sourceText(orientationSource),
      align: 'start',
    },
    {
      id: 'templates',
      title: { en: 'Custom meter & footer', pt: 'Medidor e rodapé customizados' },
      component: HbDemoMeterGroupTemplatesComponent,
      source: sourceText(templatesSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-meter-group',
      rows: [
        {
          property: '[hbValue]',
          description: {
            en: 'The segments. Each item is { label, value, color?, icon? }.',
            pt: 'Os segmentos. Cada item é { label, value, color?, icon? }.',
          },
          type: 'HbMeterItem[]',
          default: '[]',
        },
        {
          property: '[hbMin] / [hbMax]',
          description: {
            en: 'The value range each segment is measured against; a segment fills (value / (max − min)) of the track.',
            pt: 'O intervalo de valores contra o qual cada segmento é medido; um segmento preenche (value / (max − min)) da trilha.',
          },
          type: 'number',
          default: '0 / 100',
        },
        {
          property: '[hbOrientation]',
          description: {
            en: 'Lay the track out as a horizontal bar or a vertical column.',
            pt: 'Dispõe a trilha como uma barra horizontal ou uma coluna vertical.',
          },
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
        },
        {
          property: '[hbLabelPosition]',
          description: {
            en: 'Whether the labels list sits before or after the track.',
            pt: 'Se a lista de rótulos fica antes ou depois da trilha.',
          },
          type: `'start' | 'end'`,
          default: `'end'`,
        },
        {
          property: '[hbLabelOrientation]',
          description: {
            en: 'Flow the labels in a wrapping row or a stacked column.',
            pt: 'Dispõe os rótulos numa linha que quebra ou numa coluna empilhada.',
          },
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
        },
      ],
    },
    {
      title: 'Template slots',
      rows: [
        {
          property: 'ng-template[hbMeterGroupMeter]',
          description: {
            en: 'Replace each meter segment. Context: $implicit = item, index, orientation, size (percent), totalPercent.',
            pt: 'Substitui cada segmento do medidor. Contexto: $implicit = item, index, orientation, size (percentual), totalPercent.',
          },
          type: 'template',
          default: '—',
        },
        {
          property: 'ng-template[hbMeterGroupLabel]',
          description: {
            en: 'Replace the entire labels list. Context: $implicit = items, totalPercent, percentages.',
            pt: 'Substitui a lista de rótulos inteira. Contexto: $implicit = items, totalPercent, percentages.',
          },
          type: 'template',
          default: '—',
        },
        {
          property: 'ng-template[hbMeterGroupIcon]',
          description: {
            en: 'Replace the per-label icon. Context: $implicit = item, icon.',
            pt: 'Substitui o ícone por rótulo. Contexto: $implicit = item, icon.',
          },
          type: 'template',
          default: '—',
        },
        {
          property: 'ng-template[hbMeterGroupStart] / [hbMeterGroupEnd]',
          description: {
            en: 'Insert custom content before or after the whole group (totals, legends). Context = the label context.',
            pt: 'Insere conteúdo customizado antes ou depois do grupo inteiro (totais, legendas). Contexto = o contexto do rótulo.',
          },
          type: 'template',
          default: '—',
        },
      ],
    },
  ],
};
