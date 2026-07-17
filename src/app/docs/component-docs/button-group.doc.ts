import {
  HbDemoButtonGroupAddonComponent,
  HbDemoButtonGroupBasicComponent,
  HbDemoButtonGroupSizesComponent,
  HbDemoButtonGroupVerticalComponent,
} from '../demos/button-group';
import * as addonSource from '../demos/button-group/button-group-addon' with { loader: 'text' };
import * as basicSource from '../demos/button-group/button-group-basic' with { loader: 'text' };
import * as sizesSource from '../demos/button-group/button-group-sizes' with { loader: 'text' };
import * as verticalSource from '../demos/button-group/button-group-vertical' with {
  loader: 'text',
};

import { sourceText, type ComponentDoc } from './component-doc.types';

export const buttonGroupDoc: ComponentDoc = {
  slug: 'button-group',
  title: 'Button group',
  description: {
    en: 'Joins buttons into a single segmented control, sharing borders and radii. It runs horizontal or vertical, cascades a size to its buttons, and can hold text labels and separators.',
    pt: 'Une botões num único controle segmentado, compartilhando bordas e cantos. Corre na horizontal ou vertical, propaga um tamanho aos botões e pode conter rótulos de texto e separadores.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Basic', pt: 'Básico' },
      component: HbDemoButtonGroupBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'vertical',
      title: { en: 'Vertical', pt: 'Vertical' },
      component: HbDemoButtonGroupVerticalComponent,
      source: sourceText(verticalSource),
      align: 'start',
    },
    {
      id: 'addon',
      title: { en: 'Text & separator', pt: 'Texto e separador' },
      component: HbDemoButtonGroupAddonComponent,
      source: sourceText(addonSource),
      align: 'start',
    },
    {
      id: 'sizes',
      title: { en: 'Sizes', pt: 'Tamanhos' },
      component: HbDemoButtonGroupSizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-button-group',
      rows: [
        {
          property: '[hbOrientation]',
          description: {
            en: 'Join the buttons in a row or a column.',
            pt: 'Une os botões em linha ou em coluna.',
          },
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Size cascaded to every button in the group.',
            pt: 'Tamanho propagado a todos os botões do grupo.',
          },
          type: `'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'icon' | null`,
          default: 'null',
        },
        {
          property: '[class]',
          description: {
            en: 'Extra CSS classes merged onto the group.',
            pt: 'Classes CSS extras mescladas no grupo.',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
    {
      title: 'hb-button-group-text / hb-button-group-separator',
      rows: [
        {
          property: 'hb-button-group-text',
          description: {
            en: 'A non-interactive label segment (like an input addon).',
            pt: 'Um segmento de rótulo não interativo (como um addon de input).',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: 'hb-button-group-separator',
          description: {
            en: 'A divider line between segments; orientation follows the group.',
            pt: 'Uma linha divisória entre segmentos; a orientação segue o grupo.',
          },
          type: 'element',
          default: '—',
        },
      ],
    },
  ],
};
