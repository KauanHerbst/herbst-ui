import {
  HbDemoSpinnerSizesComponent,
  HbDemoSpinnerUsageComponent,
  HbDemoSpinnerVariantsComponent,
} from '../demos/spinner';
import * as sizesSource from '../demos/spinner/spinner-sizes' with { loader: 'text' };
import * as usageSource from '../demos/spinner/spinner-usage' with { loader: 'text' };
import * as variantsSource from '../demos/spinner/spinner-variants' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const spinnerDoc: ComponentDoc = {
  slug: 'spinner',
  title: 'Spinner',
  description: {
    en: 'A loading indicator. Choose the spinning-icon or twelve-bar variant, size it, swap the icon, freeze the spin, and colour it with a text class. It inherits the current text colour, so it works inside buttons and prose.',
    pt: 'Um indicador de carregamento. Escolha a variante de ícone giratório ou de doze barras, dimensione-o, troque o ícone, congele o giro, e colora-o com uma classe de texto. Herda a cor de texto atual, funcionando dentro de botões e texto.',
  },
  demos: [
    {
      id: 'sizes',
      title: { en: 'Sizes', pt: 'Tamanhos' },
      component: HbDemoSpinnerSizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'variants',
      title: { en: 'Bars, colour, icon & static', pt: 'Barras, cor, ícone e estático' },
      component: HbDemoSpinnerVariantsComponent,
      source: sourceText(variantsSource),
      align: 'start',
    },
    {
      id: 'usage',
      title: { en: 'In buttons & inline', pt: 'Em botões e inline' },
      component: HbDemoSpinnerUsageComponent,
      source: sourceText(usageSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-spinner',
      rows: [
        {
          property: '[hbVariant]',
          description: {
            en: 'A spinning icon, or twelve fading bars.',
            pt: 'Um ícone giratório, ou doze barras que esmaecem.',
          },
          type: `'icon' | 'bars'`,
          default: `'icon'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'The spinner dimensions.',
            pt: 'As dimensões do spinner.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbIcon]',
          description: {
            en: 'The icon name for the icon variant.',
            pt: 'O nome do ícone para a variante de ícone.',
          },
          type: 'string',
          default: `'phosphorSpinnerGap'`,
        },
        {
          property: '[hbSpin]',
          description: {
            en: 'Toggle the rotation of the icon variant.',
            pt: 'Alterna a rotação da variante de ícone.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbLabel]',
          description: {
            en: 'The accessible label announced while loading.',
            pt: 'O rótulo acessível anunciado durante o carregamento.',
          },
          type: 'string',
          default: `'Loading'`,
        },
        {
          property: '[class]',
          description: {
            en: 'Extra classes — use a text-* colour to tint the spinner.',
            pt: 'Classes extras — use uma cor text-* para tingir o spinner.',
          },
          type: 'ClassValue',
          default: `''`,
        },
      ],
    },
  ],
};
