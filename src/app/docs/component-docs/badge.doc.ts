import {
  HbDemoBadgeOverlayComponent,
  HbDemoBadgeShapesComponent,
  HbDemoBadgeSizesComponent,
  HbDemoBadgeTypesComponent,
} from '../demos/badge';
import * as overlaySource from '../demos/badge/badge-overlay' with { loader: 'text' };
import * as shapesSource from '../demos/badge/badge-shapes' with { loader: 'text' };
import * as sizesSource from '../demos/badge/badge-sizes' with { loader: 'text' };
import * as typesSource from '../demos/badge/badge-types' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const badgeDoc: ComponentDoc = {
  slug: 'badge',
  title: 'Badge',
  description: {
    en: 'A small label for a status, count, or category. Use hb-badge inline, or hb-overlay-badge to pin a count or dot to the corner of another element.',
    pt: 'Um rótulo pequeno para status, contagem ou categoria. Use hb-badge inline, ou hb-overlay-badge para fixar uma contagem ou ponto no canto de outro elemento.',
  },
  demos: [
    {
      id: 'types',
      title: { en: 'Types', pt: 'Tipos' },
      component: HbDemoBadgeTypesComponent,
      source: sourceText(typesSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'shapes',
      title: { en: 'Shapes', pt: 'Formatos' },
      component: HbDemoBadgeShapesComponent,
      source: sourceText(shapesSource),
      align: 'start',
    },
    {
      id: 'sizes',
      title: { en: 'Sizes', pt: 'Tamanhos' },
      component: HbDemoBadgeSizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
    },
    {
      id: 'overlay',
      title: { en: 'Overlay badge', pt: 'Badge sobreposto' },
      component: HbDemoBadgeOverlayComponent,
      source: sourceText(overlaySource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-badge',
      rows: [
        {
          property: '[hbType]',
          description: {
            en: 'Colour intent of the badge.',
            pt: 'Intenção de cor do badge.',
          },
          type: `'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'outline'`,
          default: `'default'`,
        },
        {
          property: '[hbShape]',
          description: {
            en: 'Corner style; circle and square suit single characters.',
            pt: 'Estilo dos cantos; circle e square combinam com um único caractere.',
          },
          type: `'rounded' | 'pill' | 'circle' | 'square'`,
          default: `'pill'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Overall scale of the badge.',
            pt: 'Escala geral do badge.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[class]',
          description: {
            en: 'Extra CSS classes merged onto the host. Projected content (text or icon) fills the badge.',
            pt: 'Classes CSS extras mescladas no host. O conteúdo projetado (texto ou ícone) preenche o badge.',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
    {
      title: 'hb-overlay-badge',
      rows: [
        {
          property: '[hbValue]',
          description: {
            en: 'Count or text shown in the corner badge.',
            pt: 'Contagem ou texto exibido no badge de canto.',
          },
          type: 'string | number | null',
          default: 'null',
        },
        {
          property: '[hbDot]',
          description: {
            en: 'Show a plain dot instead of the value.',
            pt: 'Mostra um ponto simples em vez do valor.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbType]',
          description: {
            en: 'Colour intent of the corner badge.',
            pt: 'Intenção de cor do badge de canto.',
          },
          type: `'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'outline'`,
          default: `'destructive'`,
        },
        {
          property: '[hbPosition]',
          description: {
            en: 'Corner the badge is pinned to.',
            pt: 'Canto onde o badge é fixado.',
          },
          type: `'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'`,
          default: `'top-right'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Scale of the corner badge.',
            pt: 'Escala do badge de canto.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'sm'`,
        },
      ],
    },
  ],
};
