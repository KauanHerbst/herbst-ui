import {
  HbDemoKbdCombosComponent,
  HbDemoKbdInlineComponent,
  HbDemoKbdSizesComponent,
} from '../demos/kbd';
import * as combosSource from '../demos/kbd/kbd-combos' with { loader: 'text' };
import * as inlineSource from '../demos/kbd/kbd-inline' with { loader: 'text' };
import * as sizesSource from '../demos/kbd/kbd-sizes' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const kbdDoc: ComponentDoc = {
  slug: 'kbd',
  title: 'Kbd',
  description: {
    en: 'A small key cap for keyboard shortcuts. Size it to match nearby text, group several caps into a combo, drop in icons, and use it inline in prose or inside buttons.',
    pt: 'Uma pequena tecla para atalhos de teclado. Dimensione-a para combinar com o texto próximo, agrupe várias teclas num combo, insira ícones, e use-a inline em texto ou dentro de botões.',
  },
  demos: [
    {
      id: 'sizes',
      title: { en: 'Sizes', pt: 'Tamanhos' },
      component: HbDemoKbdSizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'combos',
      title: { en: 'Groups & icons', pt: 'Grupos e ícones' },
      component: HbDemoKbdCombosComponent,
      source: sourceText(combosSource),
      align: 'start',
    },
    {
      id: 'inline',
      title: { en: 'Inline & in buttons', pt: 'Inline e em botões' },
      component: HbDemoKbdInlineComponent,
      source: sourceText(inlineSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-kbd / [hb-kbd]',
      rows: [
        {
          property: 'selector',
          description: {
            en: 'Use as hb-kbd, or as an attribute on a native <kbd> element for inline prose.',
            pt: 'Use como hb-kbd, ou como atributo num elemento <kbd> nativo para texto inline.',
          },
          type: `hb-kbd | [hb-kbd]`,
          default: '—',
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Cap height and text scale.',
            pt: 'Altura da tecla e escala do texto.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[class]',
          description: {
            en: 'Extra classes merged over the cap styling.',
            pt: 'Classes extras mescladas sobre o estilo da tecla.',
          },
          type: 'ClassValue',
          default: `''`,
        },
      ],
    },
    {
      title: 'hb-kbd-group / [hb-kbd-group]',
      rows: [
        {
          property: 'hb-kbd-group',
          description: {
            en: 'Lays out several caps in a row with a small gap — for combos like ⌘ K.',
            pt: 'Dispõe várias teclas em linha com um pequeno espaço — para combos como ⌘ K.',
          },
          type: 'component',
          default: '—',
        },
      ],
    },
  ],
};
