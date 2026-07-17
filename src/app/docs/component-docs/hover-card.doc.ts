import {
  HbDemoHoverCardBasicComponent,
  HbDemoHoverCardControlledComponent,
  HbDemoHoverCardPlacementComponent,
} from '../demos/hover-card';
import * as basicSource from '../demos/hover-card/hover-card-basic' with { loader: 'text' };
import * as controlledSource from '../demos/hover-card/hover-card-controlled' with {
  loader: 'text',
};
import * as placementSource from '../demos/hover-card/hover-card-placement' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const hoverCardDoc: ComponentDoc = {
  slug: 'hover-card',
  title: 'Hover card',
  description: {
    en: 'A floating card revealed on hover or focus. Project a trigger, place the panel on any side and alignment, tune open/close delays, set its width, and drive it as a controlled overlay.',
    pt: 'Um cartão flutuante revelado ao passar o mouse ou focar. Projete um gatilho, posicione o painel em qualquer lado e alinhamento, ajuste os atrasos de abrir/fechar, defina sua largura e controle-o como um overlay controlado.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Profile card', pt: 'Cartão de perfil' },
      component: HbDemoHoverCardBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'placement',
      title: { en: 'Side, align, offset & width', pt: 'Lado, alinhamento, offset e largura' },
      component: HbDemoHoverCardPlacementComponent,
      source: sourceText(placementSource),
      align: 'start',
    },
    {
      id: 'controlled',
      title: { en: 'Controlled, delays & disabled', pt: 'Controlado, atrasos e desabilitado' },
      component: HbDemoHoverCardControlledComponent,
      source: sourceText(controlledSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-hover-card',
      rows: [
        {
          property: '[hbSide]',
          description: {
            en: 'Preferred side of the trigger to open on; flips to the opposite side if space is tight.',
            pt: 'Lado preferido do gatilho para abrir; inverte para o lado oposto se faltar espaço.',
          },
          type: `'top' | 'right' | 'bottom' | 'left'`,
          default: `'bottom'`,
        },
        {
          property: '[hbAlign]',
          description: {
            en: 'Alignment of the panel along the chosen side.',
            pt: 'Alinhamento do painel ao longo do lado escolhido.',
          },
          type: `'start' | 'center' | 'end'`,
          default: `'center'`,
        },
        {
          property: '[hbSideOffset]',
          description: {
            en: 'Gap in pixels between the trigger and the panel.',
            pt: 'Espaço em pixels entre o gatilho e o painel.',
          },
          type: 'number',
          default: '4',
        },
        {
          property: '[hbOpenDelay] / [hbCloseDelay]',
          description: {
            en: 'Delay in milliseconds before opening on hover and before closing on leave.',
            pt: 'Atraso em milissegundos antes de abrir ao passar o mouse e antes de fechar ao sair.',
          },
          type: 'number',
          default: '700 / 300',
        },
        {
          property: '[hbOpen]',
          description: {
            en: 'Controlled open state. Leave undefined for the built-in hover/focus behaviour.',
            pt: 'Estado aberto controlado. Deixe indefinido para o comportamento embutido de hover/foco.',
          },
          type: 'boolean | undefined',
          default: 'undefined',
        },
        {
          property: '(hbOpenChange)',
          description: {
            en: 'Emits true/false as the card opens and closes.',
            pt: 'Emite true/false conforme o cartão abre e fecha.',
          },
          type: 'boolean',
          default: '—',
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Prevent the card from ever opening.',
            pt: 'Impede o cartão de abrir.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
    {
      title: 'Trigger & content',
      rows: [
        {
          property: '[hbHoverCardTrigger]',
          description: {
            en: 'Marks the projected element that opens the card on hover/focus.',
            pt: 'Marca o elemento projetado que abre o cartão ao passar o mouse/focar.',
          },
          type: 'directive',
          default: '—',
        },
        {
          property: 'hb-hover-card-content [hbWidth]',
          description: {
            en: 'Panel width — a number (px) or any CSS length string; null for auto.',
            pt: 'Largura do painel — um número (px) ou qualquer string de comprimento CSS; null para automático.',
          },
          type: 'number | string | null',
          default: 'null',
        },
        {
          property: 'hb-hover-card-content [class]',
          description: {
            en: 'Extra classes merged over the panel styling.',
            pt: 'Classes extras mescladas sobre o estilo do painel.',
          },
          type: 'ClassValue',
          default: `''`,
        },
      ],
    },
  ],
};
