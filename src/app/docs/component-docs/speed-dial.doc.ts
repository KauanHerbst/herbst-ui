import {
  HbDemoSpeedDialBasicComponent,
  HbDemoSpeedDialShapesComponent,
  HbDemoSpeedDialTemplateComponent,
} from '../demos/speed-dial';
import * as basicSource from '../demos/speed-dial/speed-dial-basic' with { loader: 'text' };
import * as shapesSource from '../demos/speed-dial/speed-dial-shapes' with { loader: 'text' };
import * as templateSource from '../demos/speed-dial/speed-dial-template' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const speedDialDoc: ComponentDoc = {
  slug: 'speed-dial',
  title: 'Speed dial',
  description: {
    en: 'A floating action button that fans out a set of actions. Drive it from a model, choose the fan shape and direction, tune radius, gap, and stagger, add a backdrop, rotate the trigger icon, and template each action.',
    pt: 'Um botão de ação flutuante que abre um leque de ações. Controle-o por um model, escolha a forma e direção do leque, ajuste raio, espaço e escalonamento, adicione um backdrop, rotacione o ícone do gatilho, e faça template de cada ação.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Linear actions', pt: 'Ações lineares' },
      component: HbDemoSpeedDialBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'shapes',
      title: { en: 'Circle & mask', pt: 'Círculo e máscara' },
      component: HbDemoSpeedDialShapesComponent,
      source: sourceText(shapesSource),
      align: 'start',
    },
    {
      id: 'template',
      title: { en: 'Quarter-circle & custom item', pt: 'Quarto de círculo e item custom' },
      component: HbDemoSpeedDialTemplateComponent,
      source: sourceText(templateSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-speed-dial — model',
      rows: [
        {
          property: '[hbModel]',
          description: {
            en: 'The actions. Each item: { icon?, label?, tooltip?, disabled?, command?, ariaLabel?, styleClass?, data? }.',
            pt: 'As ações. Cada item: { icon?, label?, tooltip?, disabled?, command?, ariaLabel?, styleClass?, data? }.',
          },
          type: 'HbSpeedDialItem[]',
          default: '[]',
        },
        {
          property: '[(hbVisible)]',
          description: {
            en: 'The open state, two-way bound.',
            pt: 'O estado aberto, bidirecional.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '(hbItemClick) / (hbShow) / (hbHide)',
          description: {
            en: 'Emit the clicked item, and when the dial opens and closes. Each item can also carry its own command().',
            pt: 'Emitem o item clicado, e quando o dial abre e fecha. Cada item também pode carregar seu próprio command().',
          },
          type: 'HbSpeedDialItem / void',
          default: '—',
        },
        {
          property: 'ng-template[hbSpeedDialItem]',
          description: {
            en: 'Custom content for each action button. Context: $implicit = item, index.',
            pt: 'Conteúdo customizado para cada botão de ação. Contexto: $implicit = item, index.',
          },
          type: 'template',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-speed-dial — layout',
      rows: [
        {
          property: '[hbType]',
          description: {
            en: 'The fan shape.',
            pt: 'A forma do leque.',
          },
          type: `'linear' | 'circle' | 'semi-circle' | 'quarter-circle'`,
          default: `'linear'`,
        },
        {
          property: '[hbDirection]',
          description: {
            en: 'Which way the actions fan out.',
            pt: 'Para qual lado as ações se abrem.',
          },
          type: `'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right'`,
          default: `'up'`,
        },
        {
          property: '[hbRadius] / [hbGap] / [hbItemSize]',
          description: {
            en: 'Circle radius, spacing between linear items, and item size — all in pixels.',
            pt: 'Raio do círculo, espaço entre itens lineares, e tamanho do item — tudo em pixels.',
          },
          type: 'number',
          default: '120 / 12 / 36',
        },
        {
          property: '[hbTransitionDelay]',
          description: {
            en: 'Per-item stagger in milliseconds as the actions appear.',
            pt: 'Escalonamento por item em milissegundos conforme as ações aparecem.',
          },
          type: 'number',
          default: '30',
        },
      ],
    },
    {
      title: 'hb-speed-dial — behaviour',
      rows: [
        {
          property: '[hbMask] / [hbHideOnClickOutside]',
          description: {
            en: 'Dim the page behind the dial while open, and close it on an outside click.',
            pt: 'Escurece a página atrás do dial quando aberto, e fecha ao clicar fora.',
          },
          type: 'boolean',
          default: 'false / true',
        },
        {
          property: '[hbRotateIcon]',
          description: {
            en: 'Rotate the trigger icon 45° when open (turning a + into an ×).',
            pt: 'Rotaciona o ícone do gatilho 45° quando aberto (transformando um + em ×).',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbIcon] / [hbCloseIcon] / [hbButtonType]',
          description: {
            en: 'The trigger icon names for closed/open, and the button colour for the trigger and items.',
            pt: 'Os nomes de ícone do gatilho para fechado/aberto, e a cor dos botões do gatilho e itens.',
          },
          type: 'string / HbButtonType',
          default: `'phosphorPlus' / 'phosphorX' / 'default'`,
        },
        {
          property: '[hbTooltip] / [hbAriaLabel]',
          description: {
            en: 'Show a tooltip (from item.tooltip or item.label) on each action, and the trigger’s accessible label.',
            pt: 'Mostra um tooltip (de item.tooltip ou item.label) em cada ação, e o rótulo acessível do gatilho.',
          },
          type: 'boolean / string',
          default: `true / 'Actions'`,
        },
      ],
    },
  ],
};
