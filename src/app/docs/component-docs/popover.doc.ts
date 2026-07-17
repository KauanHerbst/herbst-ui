import {
  HbDemoPopoverBasicComponent,
  HbDemoPopoverBehaviourComponent,
  HbDemoPopoverPlacementComponent,
} from '../demos/popover';
import * as basicSource from '../demos/popover/popover-basic' with { loader: 'text' };
import * as behaviourSource from '../demos/popover/popover-behaviour' with { loader: 'text' };
import * as placementSource from '../demos/popover/popover-placement' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const popoverDoc: ComponentDoc = {
  slug: 'popover',
  title: 'Popover',
  description: {
    en: 'A floating panel anchored to a trigger. Open it by click or hover, place it on any side and alignment, set its width, manage focus, control dismissal, and drive it as a controlled overlay.',
    pt: 'Um painel flutuante ancorado a um gatilho. Abra por clique ou hover, posicione-o em qualquer lado e alinhamento, defina sua largura, gerencie o foco, controle o fechamento, e conduza-o como um overlay controlado.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Trigger, header & form', pt: 'Gatilho, cabeçalho e formulário' },
      component: HbDemoPopoverBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'placement',
      title: { en: 'Side, align, offset & width', pt: 'Lado, alinhamento, offset e largura' },
      component: HbDemoPopoverPlacementComponent,
      source: sourceText(placementSource),
      align: 'start',
    },
    {
      id: 'behaviour',
      title: { en: 'Hover, controlled & dismissal', pt: 'Hover, controlado e fechamento' },
      component: HbDemoPopoverBehaviourComponent,
      source: sourceText(behaviourSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-popover — opening',
      rows: [
        {
          property: '[hbTrigger]',
          description: {
            en: 'Open on click or on hover.',
            pt: 'Abre no clique ou no hover.',
          },
          type: `'click' | 'hover'`,
          default: `'click'`,
        },
        {
          property: '[hbSide] / [hbAlign] / [hbSideOffset]',
          description: {
            en: 'Preferred side, alignment along that side, and the gap in pixels. Flips to the opposite side if space is tight.',
            pt: 'Lado preferido, alinhamento ao longo dele, e o espaço em pixels. Inverte para o lado oposto se faltar espaço.',
          },
          type: `side / align / number`,
          default: `'bottom' / 'center' / 4`,
        },
        {
          property: '[hbOpenDelay] / [hbCloseDelay]',
          description: {
            en: 'Hover delays in milliseconds before opening and before closing.',
            pt: 'Atrasos de hover em milissegundos antes de abrir e antes de fechar.',
          },
          type: 'number',
          default: '100 / 150',
        },
        {
          property: '[hbOpen] / (hbOpenChange)',
          description: {
            en: 'Controlled open state (undefined for uncontrolled), and an event as it opens and closes.',
            pt: 'Estado aberto controlado (undefined para não controlado), e um evento ao abrir e fechar.',
          },
          type: 'boolean | undefined / boolean',
          default: 'undefined / —',
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Prevent the popover from ever opening.',
            pt: 'Impede o popover de abrir.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
    {
      title: 'hb-popover — focus & dismissal',
      rows: [
        {
          property: '[hbAutoFocus] / [hbRestoreFocus]',
          description: {
            en: 'Focus the first focusable element on open, and return focus to the trigger on close.',
            pt: 'Foca o primeiro elemento focável ao abrir, e devolve o foco ao gatilho ao fechar.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbCloseOnEscape] / [hbCloseOnOutsideClick]',
          description: {
            en: 'Dismiss on the Escape key, and on clicking outside the panel.',
            pt: 'Fecha na tecla Escape, e ao clicar fora do painel.',
          },
          type: 'boolean',
          default: 'true',
        },
      ],
    },
    {
      title: 'Trigger & content',
      rows: [
        {
          property: '[hbPopoverTrigger]',
          description: {
            en: 'Marks the projected element that opens the popover.',
            pt: 'Marca o elemento projetado que abre o popover.',
          },
          type: 'directive',
          default: '—',
        },
        {
          property: 'hb-popover-content [hbWidth]',
          description: {
            en: 'The panel body. hbWidth is a number (px) or any CSS length; null for auto.',
            pt: 'O corpo do painel. hbWidth é um número (px) ou qualquer comprimento CSS; null para automático.',
          },
          type: 'number | string | null',
          default: 'null',
        },
        {
          property: 'hb-popover-header / -title / -description',
          description: {
            en: 'Structured header parts for a heading and supporting text.',
            pt: 'Partes estruturadas de cabeçalho para um título e texto de apoio.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: '[hbPopoverClose]',
          description: {
            en: 'Any element inside the panel that closes the popover on click.',
            pt: 'Qualquer elemento dentro do painel que fecha o popover ao ser clicado.',
          },
          type: 'directive',
          default: '—',
        },
      ],
    },
  ],
};
