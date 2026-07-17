import {
  HbDemoEmptyBasicComponent,
  HbDemoEmptySizesComponent,
  HbDemoEmptyVariantsComponent,
} from '../demos/empty';
import * as basicSource from '../demos/empty/empty-basic' with { loader: 'text' };
import * as sizesSource from '../demos/empty/empty-sizes' with { loader: 'text' };
import * as variantsSource from '../demos/empty/empty-variants' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const emptyDoc: ComponentDoc = {
  slug: 'empty',
  title: 'Empty',
  description: {
    en: 'A placeholder for empty states — no results, an unfilled list, a first run. Compose it from a media icon, title, description, and an actions area, at several sizes and styles.',
    pt: 'Um espaço reservado para estados vazios — sem resultados, lista vazia, primeiro acesso. Componha-o com ícone, título, descrição e uma área de ações, em vários tamanhos e estilos.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Anatomy', pt: 'Anatomia' },
      component: HbDemoEmptyBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'variants',
      title: { en: 'Variant & background', pt: 'Variante e fundo' },
      component: HbDemoEmptyVariantsComponent,
      source: sourceText(variantsSource),
      align: 'start',
    },
    {
      id: 'sizes',
      title: { en: 'Sizes', pt: 'Tamanhos' },
      component: HbDemoEmptySizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-empty',
      rows: [
        {
          property: '[hbSize]',
          description: {
            en: 'Padding and gap scale.',
            pt: 'Escala de espaçamento e gap.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbVariant]',
          description: {
            en: 'Plain, or framed with a dashed border.',
            pt: 'Simples, ou emoldurado com borda tracejada.',
          },
          type: `'default' | 'outline'`,
          default: `'default'`,
        },
        {
          property: '[hbBackground]',
          description: {
            en: 'Optional soft background fill.',
            pt: 'Preenchimento de fundo suave opcional.',
          },
          type: `'none' | 'muted'`,
          default: `'none'`,
        },
      ],
    },
    {
      title: 'Parts',
      rows: [
        {
          property: 'hb-empty-header',
          description: {
            en: 'Centered column holding the media, title, and description.',
            pt: 'Coluna centralizada com a mídia, título e descrição.',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: 'hb-empty-media [hbVariant]',
          description: {
            en: 'The icon or illustration; icon variant wraps it in a muted tile.',
            pt: 'O ícone ou ilustração; a variante icon o envolve num bloco suave.',
          },
          type: `'default' | 'icon'`,
          default: `'default'`,
        },
        {
          property: 'hb-empty-title / hb-empty-description',
          description: {
            en: 'Heading and supporting text.',
            pt: 'Título e texto de apoio.',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: 'hb-empty-content',
          description: {
            en: 'Actions area below the header (buttons, links).',
            pt: 'Área de ações abaixo do cabeçalho (botões, links).',
          },
          type: 'slot',
          default: '—',
        },
      ],
    },
  ],
};
