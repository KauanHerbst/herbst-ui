import {
  HbDemoBubbleCollapsibleComponent,
  HbDemoBubbleConversationComponent,
  HbDemoBubbleReactionsComponent,
  HbDemoBubbleVariantsComponent,
} from '../demos/bubble';
import * as collapsibleSource from '../demos/bubble/bubble-collapsible' with { loader: 'text' };
import * as conversationSource from '../demos/bubble/bubble-conversation' with { loader: 'text' };
import * as reactionsSource from '../demos/bubble/bubble-reactions' with { loader: 'text' };
import * as variantsSource from '../demos/bubble/bubble-variants' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const bubbleDoc: ComponentDoc = {
  slug: 'bubble',
  title: 'Bubble',
  description: {
    en: 'A chat message bubble. It carries text in one of several tones, aligns to either side, and can hold reactions, actions, and a menu. Group bubbles under a sender with hb-bubble-group.',
    pt: 'Um balão de mensagem de chat. Carrega texto em um de vários tons, alinha-se a qualquer lado e pode conter reações, ações e um menu. Agrupe balões sob um remetente com hb-bubble-group.',
  },
  demos: [
    {
      id: 'variants',
      title: { en: 'Variants', pt: 'Variantes' },
      component: HbDemoBubbleVariantsComponent,
      source: sourceText(variantsSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'conversation',
      title: { en: 'Conversation & group', pt: 'Conversa e grupo' },
      component: HbDemoBubbleConversationComponent,
      source: sourceText(conversationSource),
      align: 'start',
    },
    {
      id: 'reactions',
      title: { en: 'Reactions, actions & menu', pt: 'Reações, ações e menu' },
      component: HbDemoBubbleReactionsComponent,
      source: sourceText(reactionsSource),
      align: 'start',
    },
    {
      id: 'collapsible',
      title: { en: 'Collapsible & tooltip', pt: 'Recolhível e tooltip' },
      component: HbDemoBubbleCollapsibleComponent,
      source: sourceText(collapsibleSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-bubble',
      rows: [
        {
          property: '[hbVariant]',
          description: {
            en: 'Tone and surface of the bubble.',
            pt: 'Tom e superfície do balão.',
          },
          type: `'default' | 'secondary' | 'muted' | 'tinted' | 'outline' | 'ghost' | 'destructive'`,
          default: `'secondary'`,
        },
        {
          property: '[hbAlign]',
          description: {
            en: 'Which side the bubble tail sits on.',
            pt: 'De que lado fica a ponta do balão.',
          },
          type: `'start' | 'end'`,
          default: `'start'`,
        },
        {
          property: '[hbCollapsible]',
          description: {
            en: 'Clamp long text with a show more / less toggle.',
            pt: 'Limita texto longo com um botão mostrar mais / menos.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbClampLines]',
          description: {
            en: 'Number of lines shown before clamping.',
            pt: 'Número de linhas mostradas antes de limitar.',
          },
          type: 'number',
          default: '4',
        },
        {
          property: '[(hbExpanded)]',
          description: {
            en: 'Two-way state of the collapsible bubble.',
            pt: 'Estado bidirecional do balão recolhível.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbTooltip]',
          description: {
            en: 'Tooltip shown on hover (e.g. a timestamp).',
            pt: 'Tooltip exibido ao passar o mouse (ex. um horário).',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
    {
      title: 'hb-bubble-group',
      rows: [
        {
          property: '[hbName]',
          description: {
            en: 'Sender name shown above the bubbles.',
            pt: 'Nome do remetente exibido acima dos balões.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbAvatar]',
          description: {
            en: 'Avatar image URL for the sender.',
            pt: 'URL da imagem de avatar do remetente.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbTime]',
          description: {
            en: 'Timestamp shown in the group header.',
            pt: 'Horário exibido no cabeçalho do grupo.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbAlign]',
          description: {
            en: 'Side the whole group aligns to.',
            pt: 'Lado ao qual o grupo inteiro se alinha.',
          },
          type: `'start' | 'end'`,
          default: `'start'`,
        },
      ],
    },
    {
      title: 'hb-bubble-reactions',
      rows: [
        {
          property: '[hbReactions]',
          description: {
            en: 'Reaction chips: emoji, optional count, and reacted state.',
            pt: 'Chips de reação: emoji, contagem opcional e estado reagido.',
          },
          type: 'HbBubbleReaction[]',
          default: '[]',
        },
        {
          property: '[hbAddable]',
          description: {
            en: 'Show a button to add a new reaction.',
            pt: 'Mostra um botão para adicionar uma nova reação.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '(hbReact)',
          description: {
            en: 'Emits the emoji of a toggled reaction.',
            pt: 'Emite o emoji de uma reação alternada.',
          },
          type: 'string',
          default: '—',
        },
        {
          property: '(hbAdd)',
          description: {
            en: 'Emitted when the add-reaction button is pressed.',
            pt: 'Emitido quando o botão de adicionar reação é pressionado.',
          },
          type: 'void',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-bubble-actions / hb-bubble-menu',
      rows: [
        {
          property: 'hb-bubble-actions',
          description: {
            en: 'Row of action controls projected below the bubble body.',
            pt: 'Linha de controles de ação projetada abaixo do corpo do balão.',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: 'hb-bubble-menu',
          description: {
            en: 'Overflow menu of extra actions; hbAriaLabel names its trigger.',
            pt: 'Menu de ações extras; hbAriaLabel nomeia o gatilho.',
          },
          type: 'slot',
          default: '—',
        },
      ],
    },
  ],
};
