import {
  HbDemoItemBasicComponent,
  HbDemoItemGroupComponent,
  HbDemoItemVariantsComponent,
} from '../demos/item';
import * as basicSource from '../demos/item/item-basic' with { loader: 'text' };
import * as groupSource from '../demos/item/item-group' with { loader: 'text' };
import * as variantsSource from '../demos/item/item-variants' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const itemDoc: ComponentDoc = {
  slug: 'item',
  title: 'Item',
  description: {
    en: 'A composable row for lists, cards, and menus. Assemble media, title, description, and actions inside one item, style it as a variant and size, render it as a link or button, and stack items into separated groups.',
    pt: 'Uma linha componível para listas, cards e menus. Monte mídia, título, descrição e ações dentro de um item, estilize-o com uma variante e tamanho, renderize-o como link ou botão, e empilhe itens em grupos separados.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Media, content & actions', pt: 'Mídia, conteúdo e ações' },
      component: HbDemoItemBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'variants',
      title: { en: 'Variants, sizes & media', pt: 'Variantes, tamanhos e mídia' },
      component: HbDemoItemVariantsComponent,
      source: sourceText(variantsSource),
      align: 'start',
    },
    {
      id: 'group',
      title: { en: 'Interactive group', pt: 'Grupo interativo' },
      component: HbDemoItemGroupComponent,
      source: sourceText(groupSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-item',
      rows: [
        {
          property: 'selector',
          description: {
            en: 'Use as hb-item, or on an a / button element to make the whole row a link or control (adds hover and focus states).',
            pt: 'Use como hb-item, ou em um elemento a / button para tornar a linha inteira um link ou controle (adiciona estados de hover e foco).',
          },
          type: `hb-item | a[hb-item] | button[hb-item]`,
          default: '—',
        },
        {
          property: '[hbVariant]',
          description: {
            en: 'Background and border treatment.',
            pt: 'Tratamento de fundo e borda.',
          },
          type: `'default' | 'outline' | 'muted'`,
          default: `'default'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Padding and internal gap.',
            pt: 'Padding e espaçamento interno.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
      ],
    },
    {
      title: 'Parts',
      rows: [
        {
          property: 'hb-item-media [hbVariant]',
          description: {
            en: 'Leading media slot. default | icon (bordered tile) | image (rounded cover).',
            pt: 'Slot de mídia à frente. default | icon (bloco com borda) | image (cover arredondado).',
          },
          type: `'default' | 'icon' | 'image'`,
          default: `'default'`,
        },
        {
          property: 'hb-item-content',
          description: {
            en: 'Vertical stack that fills the remaining space; holds title and description.',
            pt: 'Pilha vertical que preenche o espaço restante; contém título e descrição.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-item-title / hb-item-description',
          description: {
            en: 'Primary label and muted, clamped supporting text.',
            pt: 'Rótulo primário e texto de apoio esmaecido e truncado.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-item-actions',
          description: {
            en: 'Trailing slot for buttons, icons, or badges.',
            pt: 'Slot ao final para botões, ícones ou badges.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-item-header / hb-item-footer',
          description: {
            en: 'Full-width rows above and below the main line, spaced apart.',
            pt: 'Linhas de largura total acima e abaixo da linha principal, com espaçamento entre extremos.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-item-group / hb-item-separator',
          description: {
            en: 'Stack items in a column and draw a thin divider between them.',
            pt: 'Empilha itens numa coluna e desenha um divisor fino entre eles.',
          },
          type: 'component',
          default: '—',
        },
      ],
    },
  ],
};
