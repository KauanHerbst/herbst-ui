import {
  HbDemoTypographyModifiersComponent,
  HbDemoTypographyTruncateComponent,
  HbDemoTypographyVariantsComponent,
} from '../demos/typography';
import * as modifiersSource from '../demos/typography/typography-modifiers' with { loader: 'text' };
import * as truncateSource from '../demos/typography/typography-truncate' with { loader: 'text' };
import * as variantsSource from '../demos/typography/typography-variants' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const typographyDoc: ComponentDoc = {
  slug: 'typography',
  title: 'Typography',
  description: {
    en: 'A directive that applies the design system’s text styles to any native element. Pick a variant — headings, paragraph, lead, blockquote, list, inline code, and helper sizes — then tune the colour, alignment, weight, and truncation without leaving your semantic markup.',
    pt: 'Uma diretiva que aplica os estilos de texto do design system a qualquer elemento nativo. Escolha uma variante — títulos, parágrafo, lead, citação, lista, código inline e tamanhos auxiliares — e então ajuste a cor, alinhamento, peso e truncamento sem abandonar seu markup semântico.',
  },
  demos: [
    {
      id: 'variants',
      title: { en: 'Variants', pt: 'Variantes' },
      component: HbDemoTypographyVariantsComponent,
      source: sourceText(variantsSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'modifiers',
      title: { en: 'Colour, weight & align', pt: 'Cor, peso e alinhamento' },
      component: HbDemoTypographyModifiersComponent,
      source: sourceText(modifiersSource),
      align: 'start',
    },
    {
      id: 'truncate',
      title: { en: 'Truncate & custom class', pt: 'Truncar e classe custom' },
      component: HbDemoTypographyTruncateComponent,
      source: sourceText(truncateSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: '[hbTypography]',
      rows: [
        {
          property: 'hbTypography',
          description: {
            en: 'The text style to apply. Put it on the matching semantic element (h1, p, blockquote, ul, code…).',
            pt: 'O estilo de texto a aplicar. Coloque-o no elemento semântico correspondente (h1, p, blockquote, ul, code…).',
          },
          type: `'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'blockquote' | 'list' | 'inline-code' | 'lead' | 'large' | 'small' | 'muted'`,
          default: `'p'`,
        },
        {
          property: '[hbColor]',
          description: {
            en: 'Apply a semantic text colour.',
            pt: 'Aplica uma cor de texto semântica.',
          },
          type: `'default' | 'muted' | 'primary' | 'destructive' | 'success' | 'warning'`,
          default: '—',
        },
        {
          property: '[hbAlign]',
          description: {
            en: 'Horizontal text alignment.',
            pt: 'Alinhamento horizontal do texto.',
          },
          type: `'left' | 'center' | 'right' | 'justify'`,
          default: '—',
        },
        {
          property: '[hbWeight]',
          description: {
            en: 'Override the font weight of the chosen variant.',
            pt: 'Sobrescreve o peso da fonte da variante escolhida.',
          },
          type: `'normal' | 'medium' | 'semibold' | 'bold'`,
          default: '—',
        },
        {
          property: '[hbTruncate]',
          description: {
            en: 'Truncate overflowing text to a single line with an ellipsis.',
            pt: 'Trunca o texto que transborda em uma única linha com reticências.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[class]',
          description: {
            en: 'Extra classes merged over the variant styling.',
            pt: 'Classes extras mescladas sobre o estilo da variante.',
          },
          type: 'ClassValue',
          default: `''`,
        },
      ],
    },
  ],
};
