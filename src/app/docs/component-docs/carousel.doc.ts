import {
  HbDemoCarouselAutoplayComponent,
  HbDemoCarouselBasicComponent,
  HbDemoCarouselMultipleComponent,
  HbDemoCarouselVerticalComponent,
} from '../demos/carousel';
import * as autoplaySource from '../demos/carousel/carousel-autoplay' with { loader: 'text' };
import * as basicSource from '../demos/carousel/carousel-basic' with { loader: 'text' };
import * as multipleSource from '../demos/carousel/carousel-multiple' with { loader: 'text' };
import * as verticalSource from '../demos/carousel/carousel-vertical' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const carouselDoc: ComponentDoc = {
  slug: 'carousel',
  title: 'Carousel',
  description: {
    en: 'A draggable slider built on Embla. Show one or several items per view, run horizontal or vertical, loop, autoplay, and drive it with previous, next, and dot controls.',
    pt: 'Um slider arrastável baseado no Embla. Mostre um ou vários itens por vez, corra na horizontal ou vertical, faça loop, autoplay, e controle com botões anterior, próximo e pontos.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Basic', pt: 'Básico' },
      component: HbDemoCarouselBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'multiple',
      title: { en: 'Multiple per view & loop', pt: 'Vários por vez e loop' },
      component: HbDemoCarouselMultipleComponent,
      source: sourceText(multipleSource),
      align: 'start',
    },
    {
      id: 'autoplay',
      title: { en: 'Autoplay', pt: 'Autoplay' },
      component: HbDemoCarouselAutoplayComponent,
      source: sourceText(autoplaySource),
      align: 'start',
    },
    {
      id: 'vertical',
      title: { en: 'Vertical & free drag', pt: 'Vertical e arraste livre' },
      component: HbDemoCarouselVerticalComponent,
      source: sourceText(verticalSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-carousel',
      rows: [
        {
          property: '[hbOrientation]',
          description: {
            en: 'Scroll axis of the carousel.',
            pt: 'Eixo de rolagem do carrossel.',
          },
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
        },
        {
          property: '[hbAlign]',
          description: {
            en: 'Where the active slide snaps within the viewport.',
            pt: 'Onde o slide ativo se encaixa na viewport.',
          },
          type: `'start' | 'center' | 'end'`,
          default: `'start'`,
        },
        {
          property: '[hbLoop]',
          description: {
            en: 'Wrap around from the last slide to the first.',
            pt: 'Volta do último slide para o primeiro.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbDragFree]',
          description: {
            en: 'Free-scrolling drag without snapping to slides.',
            pt: 'Arraste de rolagem livre sem encaixar nos slides.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbSpacing]',
          description: {
            en: 'Gap between slides in pixels.',
            pt: 'Espaço entre os slides em pixels.',
          },
          type: 'number',
          default: '16',
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Size of the previous/next buttons and dots.',
            pt: 'Tamanho dos botões anterior/próximo e dos pontos.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbAutoplay]',
          description: {
            en: 'Advance slides automatically.',
            pt: 'Avança os slides automaticamente.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbDelay]',
          description: {
            en: 'Autoplay interval in milliseconds.',
            pt: 'Intervalo do autoplay em milissegundos.',
          },
          type: 'number',
          default: '4000',
        },
        {
          property: '(hbSelect)',
          description: {
            en: 'Emits the index of the newly active slide.',
            pt: 'Emite o índice do slide que ficou ativo.',
          },
          type: 'number',
          default: '—',
        },
      ],
    },
    {
      title: 'Parts',
      rows: [
        {
          property: 'hb-carousel-content / hb-carousel-item',
          description: {
            en: 'Track and its slides; item basis (e.g. basis-1/3) sets how many show.',
            pt: 'Trilho e seus slides; a basis do item (ex. basis-1/3) define quantos aparecem.',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: 'hb-carousel-previous / hb-carousel-next',
          description: {
            en: 'Buttons that step one slide back or forward.',
            pt: 'Botões que avançam ou voltam um slide.',
          },
          type: 'element',
          default: '—',
        },
        {
          property: 'hb-carousel-dots',
          description: {
            en: 'Pagination dots reflecting the active slide.',
            pt: 'Pontos de paginação refletindo o slide ativo.',
          },
          type: 'element',
          default: '—',
        },
      ],
    },
  ],
};
