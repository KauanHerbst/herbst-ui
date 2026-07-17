import {
  HbDemoGalleryAutoplayComponent,
  HbDemoGalleryBasicComponent,
  HbDemoGalleryThumbnailsComponent,
} from '../demos/gallery';
import * as autoplaySource from '../demos/gallery/gallery-autoplay' with { loader: 'text' };
import * as basicSource from '../demos/gallery/gallery-basic' with { loader: 'text' };
import * as thumbnailsSource from '../demos/gallery/gallery-thumbnails' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const galleryDoc: ComponentDoc = {
  slug: 'gallery',
  title: 'Gallery',
  description: {
    en: 'A media gallery with a synced thumbnail strip. Bind an array of items, render each slide and thumbnail through templates, and choose navigators, indicators, thumbnail placement, loop, and autoplay.',
    pt: 'Uma galeria de mídia com uma faixa de miniaturas sincronizada. Vincule um array de itens, renderize cada slide e miniatura via templates, e escolha navegadores, indicadores, posição das miniaturas, loop e autoplay.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Basic gallery', pt: 'Galeria básica' },
      component: HbDemoGalleryBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'thumbnails',
      title: { en: 'Thumbnail placement & indicators', pt: 'Posição das miniaturas e indicadores' },
      component: HbDemoGalleryThumbnailsComponent,
      source: sourceText(thumbnailsSource),
      align: 'start',
    },
    {
      id: 'autoplay',
      title: { en: 'Autoplay, loop & indicators only', pt: 'Autoplay, loop e apenas indicadores' },
      component: HbDemoGalleryAutoplayComponent,
      source: sourceText(autoplaySource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-gallery — content',
      rows: [
        {
          property: '[hbItems]',
          description: {
            en: 'The array of items rendered as slides and thumbnails.',
            pt: 'O array de itens renderizados como slides e miniaturas.',
          },
          type: 'unknown[]',
          default: '[]',
        },
        {
          property: 'ng-template[hbGalleryItem]',
          description: {
            en: 'Template for each slide. Context: $implicit = item, index.',
            pt: 'Template de cada slide. Contexto: $implicit = item, index.',
          },
          type: 'template',
          default: '—',
        },
        {
          property: 'ng-template[hbGalleryThumb]',
          description: {
            en: 'Template for each thumbnail. Context: $implicit = item, index.',
            pt: 'Template de cada miniatura. Contexto: $implicit = item, index.',
          },
          type: 'template',
          default: '—',
        },
        {
          property: '(hbSelect)',
          description: {
            en: 'Emits the active slide index whenever the selection changes.',
            pt: 'Emite o índice do slide ativo sempre que a seleção muda.',
          },
          type: 'number',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-gallery — chrome',
      rows: [
        {
          property: '[hbShowThumbnails]',
          description: {
            en: 'Show the synced thumbnail strip.',
            pt: 'Mostra a faixa de miniaturas sincronizada.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbThumbnailsPosition]',
          description: {
            en: 'Where the thumbnail strip sits relative to the main viewport.',
            pt: 'Onde a faixa de miniaturas fica em relação ao viewport principal.',
          },
          type: `'top' | 'bottom' | 'left' | 'right'`,
          default: `'bottom'`,
        },
        {
          property: '[hbShowItemNavigators]',
          description: {
            en: 'Show the prev/next arrow buttons over the main viewport.',
            pt: 'Mostra os botões de seta anterior/próximo sobre o viewport principal.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbShowIndicators]',
          description: {
            en: 'Show the dot indicators over the main viewport.',
            pt: 'Mostra os indicadores de ponto sobre o viewport principal.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
    {
      title: 'hb-gallery — behaviour & sizing',
      rows: [
        {
          property: '[hbLoop]',
          description: {
            en: 'Wrap around from the last slide back to the first.',
            pt: 'Retorna do último slide de volta ao primeiro.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbAutoplay] / [hbDelay]',
          description: {
            en: 'Advance slides automatically, with the delay in milliseconds. Autoplay pauses on hover.',
            pt: 'Avança os slides automaticamente, com o atraso em milissegundos. O autoplay pausa ao passar o mouse.',
          },
          type: 'boolean / number',
          default: 'false / 4000',
        },
        {
          property: '[hbThumbSize]',
          description: {
            en: 'Thumbnail width in pixels for horizontal strips (top/bottom).',
            pt: 'Largura da miniatura em pixels para faixas horizontais (top/bottom).',
          },
          type: 'number',
          default: '72',
        },
        {
          property: '[hbThumbWidth] / [hbThumbViewport]',
          description: {
            en: 'Strip width and viewport height in pixels for vertical strips (left/right).',
            pt: 'Largura da faixa e altura do viewport em pixels para faixas verticais (left/right).',
          },
          type: 'number',
          default: '88 / 320',
        },
      ],
    },
  ],
};
