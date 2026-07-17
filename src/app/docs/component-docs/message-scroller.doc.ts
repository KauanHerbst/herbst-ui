import {
  HbDemoMessageScrollerBasicComponent,
  HbDemoMessageScrollerControlsComponent,
} from '../demos/message-scroller';
import * as basicSource from '../demos/message-scroller/message-scroller-basic' with {
  loader: 'text',
};
import * as controlsSource from '../demos/message-scroller/message-scroller-controls' with {
  loader: 'text',
};

import { sourceText, type ComponentDoc } from './component-doc.types';

export const messageScrollerDoc: ComponentDoc = {
  slug: 'message-scroller',
  title: 'Message scroller',
  description: {
    en: 'A chat-style scroll container that sticks to the latest message. New content auto-scrolls while pinned to the bottom, a jump button appears when you scroll up, and the instance exposes methods to scroll to the start, end, or any message.',
    pt: 'Um container de rolagem estilo chat que gruda na última mensagem. Conteúdo novo rola automaticamente enquanto fixado no fim, um botão de salto aparece ao rolar para cima, e a instância expõe métodos para rolar ao início, fim ou qualquer mensagem.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Auto-scroll & jump button', pt: 'Auto-scroll e botão de salto' },
      component: HbDemoMessageScrollerBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'controls',
      title: { en: 'Programmatic controls & anchors', pt: 'Controles programáticos e âncoras' },
      component: HbDemoMessageScrollerControlsComponent,
      source: sourceText(controlsSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-message-scroller',
      rows: [
        {
          property: '[hbAutoScroll]',
          description: {
            en: 'Keep the view pinned to the bottom as new content arrives — until the user scrolls up.',
            pt: 'Mantém a visão fixada no fim conforme chega conteúdo novo — até o usuário rolar para cima.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbDefaultScrollPosition]',
          description: {
            en: 'Where to land on first render: the end, the start, or the last anchored item.',
            pt: 'Onde parar na primeira renderização: no fim, no início, ou no último item ancorado.',
          },
          type: `'end' | 'start' | 'last-anchor'`,
          default: `'end'`,
        },
        {
          property: '[hbScrollPreviousItemPeek]',
          description: {
            en: 'Pixels of the previous item to leave visible when scrolling to a message or anchor.',
            pt: 'Pixels do item anterior a deixar visíveis ao rolar para uma mensagem ou âncora.',
          },
          type: 'number',
          default: '0',
        },
        {
          property: 'exportAs "hbMessageScroller"',
          description: {
            en: 'Reference the instance to call scrollToEnd(), scrollToStart(), scrollToMessage(id), and read the atBottom(), scrollableStart(), scrollableEnd() signals.',
            pt: 'Referencie a instância para chamar scrollToEnd(), scrollToStart(), scrollToMessage(id), e ler os signals atBottom(), scrollableStart(), scrollableEnd().',
          },
          type: 'methods / signals',
          default: '—',
        },
      ],
    },
    {
      title: 'Parts',
      rows: [
        {
          property: 'hb-message-scroller-viewport',
          description: {
            en: 'The scrollable region. Must wrap the content and drives the scroll tracking.',
            pt: 'A região rolável. Deve envolver o conteúdo e conduz o rastreamento de rolagem.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-message-scroller-content',
          description: {
            en: 'The inner wrapper whose size is observed to trigger auto-scroll.',
            pt: 'O wrapper interno cujo tamanho é observado para disparar o auto-scroll.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-message-scroller-item [hbMessageId] [hbScrollAnchor]',
          description: {
            en: 'Wraps each message; the id is the scrollToMessage target, and hbScrollAnchor marks it for last-anchor positioning.',
            pt: 'Envolve cada mensagem; o id é o alvo de scrollToMessage, e hbScrollAnchor marca-o para o posicionamento last-anchor.',
          },
          type: 'string / boolean',
          default: `'' / false`,
        },
        {
          property: 'hb-message-scroller-button [hbIcon]',
          description: {
            en: 'A floating jump-to-latest button, shown only when there is content below. hbIcon sets the icon name.',
            pt: 'Um botão flutuante de ir-para-o-mais-recente, mostrado apenas quando há conteúdo abaixo. hbIcon define o nome do ícone.',
          },
          type: 'string',
          default: `'phosphorCaretDown'`,
        },
      ],
    },
  ],
};
