import {
  HbDemoTooltipAdvancedComponent,
  HbDemoTooltipBasicComponent,
  HbDemoTooltipPlacementComponent,
} from '../demos/tooltip';
import * as advancedSource from '../demos/tooltip/tooltip-advanced' with { loader: 'text' };
import * as basicSource from '../demos/tooltip/tooltip-basic' with { loader: 'text' };
import * as placementSource from '../demos/tooltip/tooltip-placement' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const tooltipDoc: ComponentDoc = {
  slug: 'tooltip',
  title: 'Tooltip',
  description: {
    en: 'A directive that floats a label beside any element. Show plain text or keyboard shortcuts, place it on any side and alignment, add an arrow and offset, open on hover, click, or under your own control, tune the open/close delays, and project a rich template with context.',
    pt: 'Uma diretiva que flutua um rótulo ao lado de qualquer elemento. Mostre texto simples ou atalhos de teclado, posicione-o em qualquer lado e alinhamento, adicione uma seta e offset, abra ao passar o mouse, clicar ou sob seu controle, ajuste os atrasos de abrir/fechar, e projete um template rico com contexto.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Text & shortcut', pt: 'Texto e atalho' },
      component: HbDemoTooltipBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'placement',
      title: { en: 'Side, align, arrow & offset', pt: 'Lado, alinhamento, seta e offset' },
      component: HbDemoTooltipPlacementComponent,
      source: sourceText(placementSource),
      align: 'start',
    },
    {
      id: 'advanced',
      title: {
        en: 'Trigger, template, delay & controlled',
        pt: 'Gatilho, template, atraso e controlado',
      },
      component: HbDemoTooltipAdvancedComponent,
      source: sourceText(advancedSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: '[hbTooltip] — content',
      rows: [
        {
          property: 'hbTooltip',
          description: {
            en: 'The tooltip text. The directive attaches to the host element it sits on.',
            pt: 'O texto do tooltip. A diretiva se anexa ao elemento host em que fica.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbTooltipShortcut]',
          description: {
            en: 'One or more keys rendered as kbd chips after the text.',
            pt: 'Uma ou mais teclas renderizadas como chips kbd após o texto.',
          },
          type: 'string | string[]',
          default: '[]',
        },
        {
          property: '[hbTooltipContent] / [hbTooltipContentContext]',
          description: {
            en: 'A TemplateRef for rich content, and the context object passed to it (as $implicit / let-ctx).',
            pt: 'Um TemplateRef para conteúdo rico, e o objeto de contexto passado a ele (como $implicit / let-ctx).',
          },
          type: 'TemplateRef | unknown',
          default: 'null',
        },
        {
          property: '[hbTooltipClass]',
          description: {
            en: 'Extra classes merged onto the tooltip panel.',
            pt: 'Classes extras mescladas no painel do tooltip.',
          },
          type: 'ClassValue',
          default: `''`,
        },
      ],
    },
    {
      title: '[hbTooltip] — placement & behaviour',
      rows: [
        {
          property: '[hbTooltipPosition]',
          description: {
            en: 'Preferred side; flips to the opposite side when space is tight.',
            pt: 'Lado preferido; inverte para o oposto quando falta espaço.',
          },
          type: `'top' | 'right' | 'bottom' | 'left'`,
          default: `'top'`,
        },
        {
          property: '[hbTooltipAlign]',
          description: {
            en: 'Alignment of the panel along the chosen side.',
            pt: 'Alinhamento do painel ao longo do lado escolhido.',
          },
          type: `'start' | 'center' | 'end'`,
          default: `'center'`,
        },
        {
          property: '[hbTooltipArrow] / [hbTooltipOffset]',
          description: {
            en: 'Show a pointer arrow, and set the gap in pixels between trigger and panel.',
            pt: 'Mostra uma seta apontadora, e define o espaço em pixels entre o gatilho e o painel.',
          },
          type: 'boolean / number',
          default: 'false / 6',
        },
        {
          property: '[hbTooltipTrigger]',
          description: {
            en: 'How it opens: on hover/focus, on click (dismiss on outside click), or manual (you drive it).',
            pt: 'Como abre: ao passar o mouse/focar, ao clicar (fecha com clique fora), ou manual (você controla).',
          },
          type: `'hover' | 'click' | 'manual'`,
          default: `'hover'`,
        },
        {
          property: '[hbTooltipDelay]',
          description: {
            en: 'Open/close delay in ms — a single number for both, or { open, close }.',
            pt: 'Atraso de abrir/fechar em ms — um número para ambos, ou { open, close }.',
          },
          type: 'number | { open?, close? }',
          default: '300 / 100',
        },
        {
          property: '[hbTooltipDisabled]',
          description: {
            en: 'Prevent the tooltip from ever opening.',
            pt: 'Impede o tooltip de abrir.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbTooltipOpen] / (hbTooltipOpenChange)',
          description: {
            en: 'Controlled open state (pair with trigger "manual"), and an event emitted as it opens and closes.',
            pt: 'Estado aberto controlado (use com trigger "manual"), e um evento emitido ao abrir e fechar.',
          },
          type: 'boolean | undefined / boolean',
          default: 'undefined',
        },
        {
          property: 'provideHbTooltip(config)',
          description: {
            en: 'App-level defaults: position, align, trigger, openDelay, closeDelay, offset, arrow.',
            pt: 'Padrões da aplicação: position, align, trigger, openDelay, closeDelay, offset, arrow.',
          },
          type: 'Provider',
          default: '—',
        },
      ],
    },
  ],
};
