import {
  HbDemoCardAnatomyComponent,
  HbDemoCardImageComponent,
  HbDemoCardSizesComponent,
} from '../demos/card';
import * as anatomySource from '../demos/card/card-anatomy' with { loader: 'text' };
import * as imageSource from '../demos/card/card-image' with { loader: 'text' };
import * as sizesSource from '../demos/card/card-sizes' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const cardDoc: ComponentDoc = {
  slug: 'card',
  title: 'Card',
  description: {
    en: 'A surface that groups related content. Compose it from a header (title, description, action), content, footer, and an optional image, at five sizes.',
    pt: 'Uma superfície que agrupa conteúdo relacionado. Componha-a com um cabeçalho (título, descrição, ação), conteúdo, rodapé e uma imagem opcional, em cinco tamanhos.',
  },
  demos: [
    {
      id: 'anatomy',
      title: { en: 'Anatomy & action', pt: 'Anatomia e ação' },
      component: HbDemoCardAnatomyComponent,
      source: sourceText(anatomySource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'image',
      title: { en: 'Image', pt: 'Imagem' },
      component: HbDemoCardImageComponent,
      source: sourceText(imageSource),
      align: 'start',
    },
    {
      id: 'sizes',
      title: { en: 'Sizes', pt: 'Tamanhos' },
      component: HbDemoCardSizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-card',
      rows: [
        {
          property: '[hbSize]',
          description: {
            en: 'Padding scale of the card and its sections.',
            pt: 'Escala de espaçamento do card e suas seções.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[class]',
          description: {
            en: 'Extra CSS classes merged onto the card.',
            pt: 'Classes CSS extras mescladas no card.',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
    {
      title: 'Sections',
      rows: [
        {
          property: 'hb-card-header [hbBorder]',
          description: {
            en: 'Header block; hbBorder adds a bottom divider.',
            pt: 'Bloco de cabeçalho; hbBorder adiciona um divisor inferior.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: 'hb-card-title / hb-card-description',
          description: {
            en: 'Heading and muted subtitle inside the header.',
            pt: 'Título e subtítulo suave dentro do cabeçalho.',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: '[hb-card-action] (hbActionClick)',
          description: {
            en: 'Action pinned to the top-right of the header; emits on click.',
            pt: 'Ação fixada no topo-direito do cabeçalho; emite ao clicar.',
          },
          type: 'void',
          default: '—',
        },
        {
          property: 'hb-card-content',
          description: {
            en: 'Main body of the card.',
            pt: 'Corpo principal do card.',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: 'hb-card-footer [hbBorder]',
          description: {
            en: 'Footer block; hbBorder adds a top divider.',
            pt: 'Bloco de rodapé; hbBorder adiciona um divisor superior.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
    {
      title: 'hb-card-image',
      rows: [
        {
          property: '[hbSrc] / [hbAlt]',
          description: {
            en: 'Image source and alt text.',
            pt: 'Fonte e texto alternativo da imagem.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbPosition]',
          description: {
            en: 'Place the image above or below the card body.',
            pt: 'Coloca a imagem acima ou abaixo do corpo do card.',
          },
          type: `'top' | 'bottom'`,
          default: `'top'`,
        },
        {
          property: '[hbFit]',
          description: {
            en: 'How the image fills its box.',
            pt: 'Como a imagem preenche sua caixa.',
          },
          type: `'cover' | 'contain'`,
          default: `'cover'`,
        },
        {
          property: '[hbRatio]',
          description: {
            en: 'Aspect ratio of the image box.',
            pt: 'Proporção da caixa da imagem.',
          },
          type: 'number | null',
          default: 'null',
        },
        {
          property: '[hbHeight]',
          description: {
            en: 'Fixed image height in pixels (overrides ratio).',
            pt: 'Altura fixa da imagem em pixels (sobrepõe a proporção).',
          },
          type: 'number',
          default: '0',
        },
      ],
    },
  ],
};
