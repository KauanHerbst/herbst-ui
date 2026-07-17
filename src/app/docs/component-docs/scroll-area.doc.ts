import {
  HbDemoScrollAreaBasicComponent,
  HbDemoScrollAreaControlsComponent,
  HbDemoScrollAreaHorizontalComponent,
} from '../demos/scroll-area';
import * as basicSource from '../demos/scroll-area/scroll-area-basic' with { loader: 'text' };
import * as controlsSource from '../demos/scroll-area/scroll-area-controls' with { loader: 'text' };
import * as horizontalSource from '../demos/scroll-area/scroll-area-horizontal' with {
  loader: 'text',
};

import { sourceText, type ComponentDoc } from './component-doc.types';

export const scrollAreaDoc: ComponentDoc = {
  slug: 'scroll-area',
  title: 'Scroll area',
  description: {
    en: 'A scroll container with a custom overlay scrollbar. Scroll vertically, horizontally, or both; choose when the bar appears; size and colour the thumb; fade the edges; and scroll or read position through the exposed instance.',
    pt: 'Um container de rolagem com barra de rolagem sobreposta customizada. Role vertical, horizontal ou ambos; escolha quando a barra aparece; dimensione e colora o thumb; esmaeça as bordas; e role ou leia a posição via a instância exposta.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Vertical & edge fade', pt: 'Vertical e fade nas bordas' },
      component: HbDemoScrollAreaBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'horizontal',
      title: {
        en: 'Horizontal, always-on & styled',
        pt: 'Horizontal, sempre visível e estilizada',
      },
      component: HbDemoScrollAreaHorizontalComponent,
      source: sourceText(horizontalSource),
      align: 'start',
    },
    {
      id: 'controls',
      title: { en: 'Programmatic scroll & events', pt: 'Rolagem programática e eventos' },
      component: HbDemoScrollAreaControlsComponent,
      source: sourceText(controlsSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-scroll-area',
      rows: [
        {
          property: '[hbOrientation]',
          description: {
            en: 'Which axes scroll. The area needs a constrained height and/or width.',
            pt: 'Quais eixos rolam. A área precisa de altura e/ou largura restrita.',
          },
          type: `'vertical' | 'horizontal' | 'both'`,
          default: `'vertical'`,
        },
        {
          property: '[hbType]',
          description: {
            en: 'When the scrollbar shows: on hover, while scrolling, always, or auto (whenever content overflows).',
            pt: 'Quando a barra aparece: no hover, durante a rolagem, sempre, ou auto (sempre que o conteúdo transborda).',
          },
          type: `'hover' | 'scroll' | 'always' | 'auto'`,
          default: `'hover'`,
        },
        {
          property: '[hbHideDelay]',
          description: {
            en: 'For type "scroll", the delay in milliseconds before the bar fades after scrolling stops.',
            pt: 'Para o tipo "scroll", o atraso em milissegundos antes da barra sumir após parar de rolar.',
          },
          type: 'number',
          default: '600',
        },
        {
          property: '[hbFade]',
          description: {
            en: 'Fade the content out at the edges you can scroll toward.',
            pt: 'Esmaece o conteúdo nas bordas em direção às quais é possível rolar.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbSize] / [hbVariant]',
          description: {
            en: 'Scrollbar thickness, and the thumb colour treatment.',
            pt: 'Espessura da barra, e o tratamento de cor do thumb.',
          },
          type: `'sm' | 'md' | 'lg' / 'default' | 'subtle' | 'solid'`,
          default: `'md' / 'default'`,
        },
        {
          property: '(hbReachEnd)',
          description: {
            en: 'Emits "bottom" or "right" when the content is scrolled to that edge — handy for infinite loading.',
            pt: 'Emite "bottom" ou "right" quando o conteúdo é rolado até aquela borda — útil para carregamento infinito.',
          },
          type: `'bottom' | 'right'`,
          default: '—',
        },
        {
          property: 'exportAs "hbScrollArea"',
          description: {
            en: 'Reference it to call scrollToTop(), scrollToBottom(), scrollTo({ top, left }), and read the atTop(), atBottom(), atStart(), atEnd() signals.',
            pt: 'Referencie-a para chamar scrollToTop(), scrollToBottom(), scrollTo({ top, left }), e ler os signals atTop(), atBottom(), atStart(), atEnd().',
          },
          type: 'methods / signals',
          default: '—',
        },
      ],
    },
  ],
};
