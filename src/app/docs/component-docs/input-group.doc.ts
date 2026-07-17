import {
  HbDemoInputGroupBlocksComponent,
  HbDemoInputGroupInlineComponent,
} from '../demos/input-group';
import * as blocksSource from '../demos/input-group/input-group-blocks' with { loader: 'text' };
import * as inlineSource from '../demos/input-group/input-group-inline' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const inputGroupDoc: ComponentDoc = {
  slug: 'input-group',
  title: 'Input group',
  description: {
    en: 'Wrap an input with addons — icons, text, or buttons — sharing one bordered, focus-aware shell. Addons align inline on either edge, or as full-width blocks above and below.',
    pt: 'Envolva um input com addons — ícones, texto ou botões — compartilhando uma única casca com borda e ciente de foco. Os addons alinham inline em qualquer borda, ou como blocos de largura total acima e abaixo.',
  },
  demos: [
    {
      id: 'inline',
      title: { en: 'Inline addons', pt: 'Addons inline' },
      component: HbDemoInputGroupInlineComponent,
      source: sourceText(inlineSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'blocks',
      title: { en: 'Block addons', pt: 'Addons em bloco' },
      component: HbDemoInputGroupBlocksComponent,
      source: sourceText(blocksSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-input-group',
      rows: [
        {
          property: 'hb-input-group',
          description: {
            en: 'The bordered shell. Any hb-input inside becomes borderless and flex-fills; focus and invalid states propagate to the shell.',
            pt: 'A casca com borda. Qualquer hb-input dentro fica sem borda e preenche via flex; estados de foco e inválido propagam para a casca.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-input-group-addon [hbAlign]',
          description: {
            en: 'A slot for icons, text, or buttons around the input.',
            pt: 'Um slot para ícones, texto ou botões ao redor do input.',
          },
          type: `'inline-start' | 'inline-end' | 'block-start' | 'block-end'`,
          default: `'inline-start'`,
        },
        {
          property: 'hb-input-group-text',
          description: {
            en: 'Muted helper text for use inside an addon (prefixes, suffixes, hints).',
            pt: 'Texto auxiliar esmaecido para uso dentro de um addon (prefixos, sufixos, dicas).',
          },
          type: 'component',
          default: '—',
        },
        {
          property: '[class]',
          description: {
            en: 'Each part accepts a class input merged over its base styling.',
            pt: 'Cada parte aceita um input class mesclado sobre seu estilo base.',
          },
          type: 'ClassValue',
          default: `''`,
        },
      ],
    },
  ],
};
