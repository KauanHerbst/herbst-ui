import {
  HbDemoTimelineAlternateComponent,
  HbDemoTimelineBasicComponent,
  HbDemoTimelineHorizontalComponent,
} from '../demos/timeline';
import * as alternateSource from '../demos/timeline/timeline-alternate' with { loader: 'text' };
import * as basicSource from '../demos/timeline/timeline-basic' with { loader: 'text' };
import * as horizontalSource from '../demos/timeline/timeline-horizontal' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const timelineDoc: ComponentDoc = {
  slug: 'timeline',
  title: 'Timeline',
  description: {
    en: 'An ordered list of events joined by a connecting line. Compose each item from a marker, content, and an optional opposite slot; colour and shape the markers; run it vertically or horizontally; align items to one side or alternate them; and make items interactive.',
    pt: 'Uma lista ordenada de eventos unidos por uma linha conectora. Componha cada item a partir de um marcador, conteúdo e um slot oposto opcional; colora e molde os marcadores; disponha-a verticalmente ou horizontalmente; alinhe os itens a um lado ou alterne-os; e torne os itens interativos.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Markers, colours & variants', pt: 'Marcadores, cores e variantes' },
      component: HbDemoTimelineBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'alternate',
      title: { en: 'Alternate, opposite & connector', pt: 'Alternado, oposto e conector' },
      component: HbDemoTimelineAlternateComponent,
      source: sourceText(alternateSource),
      align: 'start',
    },
    {
      id: 'horizontal',
      title: { en: 'Horizontal & interactive', pt: 'Horizontal e interativo' },
      component: HbDemoTimelineHorizontalComponent,
      source: sourceText(horizontalSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-timeline',
      rows: [
        {
          property: '[hbLayout]',
          description: {
            en: 'Flow items top-to-bottom or left-to-right (the horizontal track scrolls when it overflows).',
            pt: 'Dispõe os itens de cima para baixo ou da esquerda para a direita (a trilha horizontal rola ao transbordar).',
          },
          type: `'vertical' | 'horizontal'`,
          default: `'vertical'`,
        },
        {
          property: '[hbAlign]',
          description: {
            en: 'Side the content sits on. Vertical: left / right / alternate. Horizontal: top / bottom / alternate.',
            pt: 'Lado onde o conteúdo fica. Vertical: left / right / alternate. Horizontal: top / bottom / alternate.',
          },
          type: `'left' | 'right' | 'top' | 'bottom' | 'alternate'`,
          default: `'left'`,
        },
      ],
    },
    {
      title: 'hb-timeline-item',
      rows: [
        {
          property: '[hbInteractive]',
          description: {
            en: 'Make the item a focusable button — adds hover/focus styling and keyboard activation.',
            pt: 'Torna o item um botão focável — adiciona estilo de hover/foco e ativação por teclado.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '(hbSelect)',
          description: {
            en: 'Emits when an interactive item is clicked or activated with Enter/Space.',
            pt: 'Emite quando um item interativo é clicado ou ativado com Enter/Espaço.',
          },
          type: 'void',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-timeline-marker',
      rows: [
        {
          property: '[hbColor]',
          description: {
            en: 'The marker colour.',
            pt: 'A cor do marcador.',
          },
          type: `'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'muted'`,
          default: `'primary'`,
        },
        {
          property: '[hbVariant]',
          description: {
            en: 'Fill style: filled, tinted, or outlined.',
            pt: 'Estilo de preenchimento: sólido, tingido ou contornado.',
          },
          type: `'solid' | 'soft' | 'outline'`,
          default: `'solid'`,
        },
        {
          property: '[hbIcon]',
          description: {
            en: 'Icon name to render inside the marker; otherwise projected content (or a plain dot) is used.',
            pt: 'Nome do ícone a renderizar dentro do marcador; caso contrário usa o conteúdo projetado (ou um ponto simples).',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
    {
      title: 'Slots',
      rows: [
        {
          property: 'hb-timeline-content',
          description: {
            en: 'The main body of the item — title, description, or any markup.',
            pt: 'O corpo principal do item — título, descrição ou qualquer markup.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-timeline-opposite',
          description: {
            en: 'Secondary content on the far side of the line — typically a timestamp or label.',
            pt: 'Conteúdo secundário do outro lado da linha — tipicamente um horário ou rótulo.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-timeline-connector [class]',
          description: {
            en: 'Replace the default connecting line for one item — e.g. to colour a segment. The last item hides its connector automatically.',
            pt: 'Substitui a linha conectora padrão de um item — ex.: para colorir um trecho. O último item oculta seu conector automaticamente.',
          },
          type: 'component',
          default: '—',
        },
      ],
    },
  ],
};
