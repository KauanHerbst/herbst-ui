import {
  HbDemoDividerLabeledComponent,
  HbDemoDividerVariantsComponent,
  HbDemoDividerVerticalComponent,
} from '../demos/divider';
import * as labeledSource from '../demos/divider/divider-labeled' with { loader: 'text' };
import * as variantsSource from '../demos/divider/divider-variants' with { loader: 'text' };
import * as verticalSource from '../demos/divider/divider-vertical' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const dividerDoc: ComponentDoc = {
  slug: 'divider',
  title: 'Divider',
  description: {
    en: 'A hairline that separates content. It runs horizontal or vertical, in solid, dashed, or dotted styles, and can carry a centered label or projected content.',
    pt: 'Uma linha fina que separa conteúdo. Corre na horizontal ou vertical, nos estilos sólido, tracejado ou pontilhado, e pode carregar um rótulo centralizado ou conteúdo projetado.',
  },
  demos: [
    {
      id: 'variants',
      title: { en: 'Variants', pt: 'Variantes' },
      component: HbDemoDividerVariantsComponent,
      source: sourceText(variantsSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'labeled',
      title: { en: 'Label & content', pt: 'Rótulo e conteúdo' },
      component: HbDemoDividerLabeledComponent,
      source: sourceText(labeledSource),
      align: 'start',
    },
    {
      id: 'vertical',
      title: { en: 'Vertical', pt: 'Vertical' },
      component: HbDemoDividerVerticalComponent,
      source: sourceText(verticalSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-divider',
      rows: [
        {
          property: '[hbOrientation]',
          description: {
            en: 'Direction of the line.',
            pt: 'Direção da linha.',
          },
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
        },
        {
          property: '[hbVariant]',
          description: {
            en: 'Line style.',
            pt: 'Estilo da linha.',
          },
          type: `'solid' | 'dashed' | 'dotted'`,
          default: `'solid'`,
        },
        {
          property: '[hbLabel]',
          description: {
            en: 'Centered label; projected content overrides it.',
            pt: 'Rótulo centralizado; o conteúdo projetado o sobrepõe.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[class]',
          description: {
            en: 'Extra CSS classes merged onto the host.',
            pt: 'Classes CSS extras mescladas no host.',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
  ],
};
