import {
  HbDemoSkeletonLayoutsComponent,
  HbDemoSkeletonPresetsComponent,
  HbDemoSkeletonShapesComponent,
} from '../demos/skeleton';
import * as layoutsSource from '../demos/skeleton/skeleton-layouts' with { loader: 'text' };
import * as presetsSource from '../demos/skeleton/skeleton-presets' with { loader: 'text' };
import * as shapesSource from '../demos/skeleton/skeleton-shapes' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const skeletonDoc: ComponentDoc = {
  slug: 'skeleton',
  title: 'Skeleton',
  description: {
    en: 'Loading placeholders. Use the base skeleton with any shape, size, and animation, or reach for ready-made presets — text, avatar, button, input, card, list, form, and table — to mirror your real layout while it loads.',
    pt: 'Placeholders de carregamento. Use o skeleton base com qualquer forma, tamanho e animação, ou recorra aos presets prontos — text, avatar, button, input, card, list, form e table — para espelhar o layout real enquanto carrega.',
  },
  demos: [
    {
      id: 'shapes',
      title: { en: 'Shapes, size & animation', pt: 'Formas, tamanho e animação' },
      component: HbDemoSkeletonShapesComponent,
      source: sourceText(shapesSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'presets',
      title: { en: 'Text, avatar, button & card', pt: 'Text, avatar, button e card' },
      component: HbDemoSkeletonPresetsComponent,
      source: sourceText(presetsSource),
      align: 'start',
    },
    {
      id: 'layouts',
      title: { en: 'List, form & table', pt: 'List, form e table' },
      component: HbDemoSkeletonLayoutsComponent,
      source: sourceText(layoutsSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-skeleton',
      rows: [
        {
          property: '[hbShape]',
          description: {
            en: 'The placeholder form.',
            pt: 'A forma do placeholder.',
          },
          type: `'rectangle' | 'circle' | 'square' | 'text'`,
          default: `'rectangle'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'A preset size for circle, square, and text shapes.',
            pt: 'Um tamanho predefinido para as formas circle, square e text.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbWidth] / [hbHeight]',
          description: {
            en: 'Explicit CSS width and height, overriding the preset dimensions.',
            pt: 'Largura e altura CSS explícitas, sobrescrevendo as dimensões predefinidas.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbRounded]',
          description: {
            en: 'Corner rounding override.',
            pt: 'Sobrescrita do arredondamento dos cantos.',
          },
          type: `'none' | 'sm' | 'md' | 'lg' | 'full'`,
          default: '—',
        },
        {
          property: '[hbAnimation]',
          description: {
            en: 'The shimmer effect: a pulse, a moving wave, or none.',
            pt: 'O efeito de brilho: pulse, uma onda em movimento, ou nenhum.',
          },
          type: `'pulse' | 'wave' | 'none'`,
          default: `'pulse'`,
        },
      ],
    },
    {
      title: 'Presets — content',
      rows: [
        {
          property: 'hb-skeleton-text',
          description: {
            en: 'Lines of text. [hbLines], [hbLastWidth] (the last line), [hbSize], [hbGap].',
            pt: 'Linhas de texto. [hbLines], [hbLastWidth] (última linha), [hbSize], [hbGap].',
          },
          type: 'component',
          default: 'hbLines 3, hbLastWidth 60%',
        },
        {
          property: 'hb-skeleton-avatar',
          description: {
            en: 'A circle/square/rounded avatar; [hbText] adds two lines beside it. [hbSize].',
            pt: 'Um avatar circle/square/rounded; [hbText] adiciona duas linhas ao lado. [hbSize].',
          },
          type: 'component',
          default: 'hbShape circle',
        },
        {
          property: 'hb-skeleton-button / hb-skeleton-input',
          description: {
            en: 'A button- or input-shaped placeholder. [hbSize], [hbWidth].',
            pt: 'Um placeholder em forma de botão ou input. [hbSize], [hbWidth].',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-skeleton-card',
          description: {
            en: 'A media area, text lines, and optional footer. [hbMedia], [hbMediaHeight], [hbLines], [hbFooter].',
            pt: 'Uma área de mídia, linhas de texto e rodapé opcional. [hbMedia], [hbMediaHeight], [hbLines], [hbFooter].',
          },
          type: 'component',
          default: 'hbMedia true, hbLines 3',
        },
      ],
    },
    {
      title: 'Presets — layouts',
      rows: [
        {
          property: 'hb-skeleton-list',
          description: {
            en: 'Repeated rows with optional avatar. [hbItems], [hbAvatar], [hbLines].',
            pt: 'Linhas repetidas com avatar opcional. [hbItems], [hbAvatar], [hbLines].',
          },
          type: 'component',
          default: 'hbItems 5, hbAvatar true, hbLines 2',
        },
        {
          property: 'hb-skeleton-form',
          description: {
            en: 'Field rows and an optional submit button. [hbFields], [hbButton].',
            pt: 'Linhas de campo e um botão de envio opcional. [hbFields], [hbButton].',
          },
          type: 'component',
          default: 'hbFields 3, hbButton true',
        },
        {
          property: 'hb-skeleton-table',
          description: {
            en: 'A grid with optional header. [hbRows], [hbColumns], [hbHeader].',
            pt: 'Uma grade com cabeçalho opcional. [hbRows], [hbColumns], [hbHeader].',
          },
          type: 'component',
          default: 'hbRows 5, hbColumns 4, hbHeader true',
        },
        {
          property: '[hbAnimation]',
          description: {
            en: 'Every preset also accepts hbAnimation, applied to all its parts.',
            pt: 'Todo preset também aceita hbAnimation, aplicado a todas as suas partes.',
          },
          type: `'pulse' | 'wave' | 'none'`,
          default: `'pulse'`,
        },
      ],
    },
  ],
};
