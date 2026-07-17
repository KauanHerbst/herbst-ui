import {
  HbDemoMarkerBasicComponent,
  HbDemoMarkerLoadingComponent,
  HbDemoMarkerVariantsComponent,
} from '../demos/marker';
import * as basicSource from '../demos/marker/marker-basic' with { loader: 'text' };
import * as loadingSource from '../demos/marker/marker-loading' with { loader: 'text' };
import * as variantsSource from '../demos/marker/marker-variants' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const markerDoc: ComponentDoc = {
  slug: 'marker',
  title: 'Marker',
  description: {
    en: 'A small labelled marker for list rows, captions, and section dividers. Pair an icon with content, render it as a link or button, draw it as a border or centred separator, and show loading or shimmer states.',
    pt: 'Um pequeno marcador rotulado para linhas de lista, legendas e divisores de seção. Combine um ícone com conteúdo, renderize-o como link ou botão, desenhe-o como borda ou separador centralizado, e mostre estados de carregamento ou shimmer.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Icon, content & interactive', pt: 'Ícone, conteúdo e interativo' },
      component: HbDemoMarkerBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'variants',
      title: { en: 'Border & separator', pt: 'Borda e separador' },
      component: HbDemoMarkerVariantsComponent,
      source: sourceText(variantsSource),
      align: 'start',
    },
    {
      id: 'loading',
      title: { en: 'Loading & shimmer', pt: 'Carregando e shimmer' },
      component: HbDemoMarkerLoadingComponent,
      source: sourceText(loadingSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-marker',
      rows: [
        {
          property: 'selector',
          description: {
            en: 'Use as hb-marker, or on an a / button element to make it an interactive link or control.',
            pt: 'Use como hb-marker, ou em um elemento a / button para torná-lo um link ou controle interativo.',
          },
          type: `hb-marker | a[hb-marker] | button[hb-marker]`,
          default: '—',
        },
        {
          property: '[hbVariant]',
          description: {
            en: 'default is inline; border adds a bottom rule; separator centres the content between two lines.',
            pt: 'default é inline; border adiciona uma régua inferior; separator centraliza o conteúdo entre duas linhas.',
          },
          type: `'default' | 'border' | 'separator'`,
          default: `'default'`,
        },
        {
          property: '[hbLoading] / [hbLoadingLabel]',
          description: {
            en: 'Swap the icon for a spinner and set role=status; the label is announced to assistive tech.',
            pt: 'Troca o ícone por um spinner e define role=status; o rótulo é anunciado à tecnologia assistiva.',
          },
          type: 'boolean / string',
          default: `false / 'Loading'`,
        },
        {
          property: '[hbShimmer]',
          description: {
            en: 'Apply an animated shimmer to the content text.',
            pt: 'Aplica um shimmer animado ao texto do conteúdo.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbRole]',
          description: {
            en: 'Set an explicit ARIA role (ignored while loading, which forces role=status).',
            pt: 'Define um role ARIA explícito (ignorado durante o carregamento, que força role=status).',
          },
          type: 'string | null',
          default: 'null',
        },
      ],
    },
    {
      title: 'Slots',
      rows: [
        {
          property: 'hb-marker-icon / [hb-marker-icon]',
          description: {
            en: 'The leading icon slot; hidden while loading.',
            pt: 'O slot de ícone à frente; oculto durante o carregamento.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-marker-content / [hb-marker-content]',
          description: {
            en: 'The label slot. Plain projected text also works without it.',
            pt: 'O slot de rótulo. Texto projetado simples também funciona sem ele.',
          },
          type: 'component',
          default: '—',
        },
      ],
    },
  ],
};
