import {
  HbDemoMessageBasicComponent,
  HbDemoMessageConversationComponent,
  HbDemoMessageRichComponent,
} from '../demos/message';
import * as basicSource from '../demos/message/message-basic' with { loader: 'text' };
import * as conversationSource from '../demos/message/message-conversation' with { loader: 'text' };
import * as richSource from '../demos/message/message-rich' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const messageDoc: ComponentDoc = {
  slug: 'message',
  title: 'Message',
  description: {
    en: 'A composable chat message row. Align it to either side, add an avatar with status, and stack a header, bubble, attachments, footer, and hover actions inside the content column.',
    pt: 'Uma linha de mensagem de chat componível. Alinhe-a para qualquer lado, adicione um avatar com status, e empilhe cabeçalho, balão, anexos, rodapé e ações de hover dentro da coluna de conteúdo.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Avatar, header & footer', pt: 'Avatar, cabeçalho e rodapé' },
      component: HbDemoMessageBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'conversation',
      title: { en: 'Aligned conversation', pt: 'Conversa alinhada' },
      component: HbDemoMessageConversationComponent,
      source: sourceText(conversationSource),
      align: 'start',
    },
    {
      id: 'rich',
      title: { en: 'Attachments & actions', pt: 'Anexos e ações' },
      component: HbDemoMessageRichComponent,
      source: sourceText(richSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-message',
      rows: [
        {
          property: '[hbAlign]',
          description: {
            en: 'Which side the row hangs on. start is incoming; end mirrors it for outgoing.',
            pt: 'Em que lado a linha fica. start é entrada; end espelha para saída.',
          },
          type: `'start' | 'end'`,
          default: `'start'`,
        },
        {
          property: 'hb-message-group [hbAlign]',
          description: {
            en: 'Optional wrapper to stack several messages, with a default alignment for the run.',
            pt: 'Wrapper opcional para empilhar várias mensagens, com um alinhamento padrão para o conjunto.',
          },
          type: `'start' | 'end'`,
          default: `'start'`,
        },
      ],
    },
    {
      title: 'hb-message-avatar',
      rows: [
        {
          property: '[hbSrc] / [hbName]',
          description: {
            en: 'Image URL, and a name used for the alt text and auto-generated initials fallback.',
            pt: 'URL da imagem, e um nome usado para o texto alt e o fallback de iniciais gerado automaticamente.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbSize] / [hbShape] / [hbStatus]',
          description: {
            en: 'Avatar size (a preset or a number in px), shape, and a presence badge.',
            pt: 'Tamanho do avatar (preset ou número em px), forma, e um badge de presença.',
          },
          type: `size | number / 'circle' | 'square' / 'online' | 'offline' | 'away' | 'busy'`,
          default: `'sm' / 'circle' / —`,
        },
      ],
    },
    {
      title: 'Content parts',
      rows: [
        {
          property: 'hb-message-content',
          description: {
            en: 'The column holding the bubble and its surrounding parts; aligns to the message side.',
            pt: 'A coluna que contém o balão e suas partes; alinha ao lado da mensagem.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-message-header / hb-message-footer',
          description: {
            en: 'A caption above the bubble (name, time) and a line below (status, timestamp).',
            pt: 'Uma legenda acima do balão (nome, hora) e uma linha abaixo (status, timestamp).',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-message-attachments',
          description: {
            en: 'A slot for files, images, or link previews under the bubble.',
            pt: 'Um slot para arquivos, imagens ou prévias de link abaixo do balão.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-message-actions',
          description: {
            en: 'Trailing controls (copy, forward, react), typically shown on hover.',
            pt: 'Controles ao final (copiar, encaminhar, reagir), normalmente exibidos no hover.',
          },
          type: 'component',
          default: '—',
        },
      ],
    },
  ],
};
