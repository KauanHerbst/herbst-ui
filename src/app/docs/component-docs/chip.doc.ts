import {
  HbDemoChipRichComponent,
  HbDemoChipSizesComponent,
  HbDemoChipTypesComponent,
} from '../demos/chip';
import * as richSource from '../demos/chip/chip-rich' with { loader: 'text' };
import * as sizesSource from '../demos/chip/chip-sizes' with { loader: 'text' };
import * as typesSource from '../demos/chip/chip-types' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const chipDoc: ComponentDoc = {
  slug: 'chip',
  title: 'Chip',
  description: {
    en: 'A compact tag for a value, filter, or entity. It carries a leading icon or avatar, comes in six tones and five sizes, and can be removed with a trailing button.',
    pt: 'Uma etiqueta compacta para um valor, filtro ou entidade. Carrega um ícone ou avatar inicial, vem em seis tons e cinco tamanhos, e pode ser removida com um botão à direita.',
  },
  demos: [
    {
      id: 'types',
      title: { en: 'Types', pt: 'Tipos' },
      component: HbDemoChipTypesComponent,
      source: sourceText(typesSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'sizes',
      title: { en: 'Sizes', pt: 'Tamanhos' },
      component: HbDemoChipSizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
    },
    {
      id: 'rich',
      title: {
        en: 'Icon, avatar, removable & disabled',
        pt: 'Ícone, avatar, removível e desabilitado',
      },
      component: HbDemoChipRichComponent,
      source: sourceText(richSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-chip',
      rows: [
        {
          property: '[hbType]',
          description: {
            en: 'Colour intent of the chip.',
            pt: 'Intenção de cor do chip.',
          },
          type: `'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'outline'`,
          default: `'secondary'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Overall scale of the chip.',
            pt: 'Escala geral do chip.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbIcon]',
          description: {
            en: 'Leading icon name.',
            pt: 'Nome do ícone inicial.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbImage] / [hbImageAlt]',
          description: {
            en: 'Leading avatar image URL and its alt text.',
            pt: 'URL da imagem de avatar inicial e seu texto alternativo.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbRemovable]',
          description: {
            en: 'Show the trailing remove button.',
            pt: 'Mostra o botão de remover à direita.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbRemoveIcon]',
          description: {
            en: 'Icon name for the remove button.',
            pt: 'Nome do ícone do botão de remover.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Disable the chip and its remove button.',
            pt: 'Desabilita o chip e seu botão de remover.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '(hbRemove)',
          description: {
            en: 'Emitted when the remove button is pressed.',
            pt: 'Emitido quando o botão de remover é pressionado.',
          },
          type: 'void',
          default: '—',
        },
      ],
    },
  ],
};
