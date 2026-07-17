import {
  HbDemoDrawerBasicComponent,
  HbDemoDrawerConfirmComponent,
  HbDemoDrawerSidesComponent,
  HbDemoDrawerSnapComponent,
} from '../demos/drawer';
import * as basicSource from '../demos/drawer/drawer-basic' with { loader: 'text' };
import * as confirmSource from '../demos/drawer/drawer-confirm' with { loader: 'text' };
import * as sidesSource from '../demos/drawer/drawer-sides' with { loader: 'text' };
import * as snapSource from '../demos/drawer/drawer-snap' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const drawerDoc: ComponentDoc = {
  slug: 'drawer',
  title: 'Drawer',
  description: {
    en: 'A panel that slides in from any edge. It carries a title, description, icon, content, and OK/Cancel footer, and on the bottom edge it can be dragged between snap points.',
    pt: 'Um painel que desliza a partir de qualquer borda. Carrega título, descrição, ícone, conteúdo e rodapé de OK/Cancelar, e na borda inferior pode ser arrastado entre pontos de encaixe.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Basic', pt: 'Básico' },
      component: HbDemoDrawerBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'sides',
      title: { en: 'Sides & sizes', pt: 'Lados e tamanhos' },
      component: HbDemoDrawerSidesComponent,
      source: sourceText(sidesSource),
      align: 'start',
    },
    {
      id: 'snap',
      title: { en: 'Handle & snap points', pt: 'Alça e pontos de encaixe' },
      component: HbDemoDrawerSnapComponent,
      source: sourceText(snapSource),
      align: 'start',
    },
    {
      id: 'confirm',
      title: { en: 'Confirm & events', pt: 'Confirmação e eventos' },
      component: HbDemoDrawerConfirmComponent,
      source: sourceText(confirmSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-drawer — layout',
      rows: [
        {
          property: '[hbSide]',
          description: {
            en: 'Edge the drawer slides from.',
            pt: 'Borda a partir da qual o drawer desliza.',
          },
          type: `'top' | 'bottom' | 'left' | 'right'`,
          default: `'bottom'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Panel size; auto fits the content, full covers the axis.',
            pt: 'Tamanho do painel; auto ajusta ao conteúdo, full cobre o eixo.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto' | 'full'`,
          default: `'auto'`,
        },
        {
          property: '[hbFullScreen]',
          description: {
            en: 'Expand the panel to the whole screen.',
            pt: 'Expande o painel para a tela inteira.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbHandle] / [hbHandleOnly]',
          description: {
            en: 'Show a drag handle, and restrict dragging to it.',
            pt: 'Mostra uma alça de arraste, e restringe o arraste a ela.',
          },
          type: 'boolean',
          default: 'true / false',
        },
        {
          property: '[hbSnapPoints] / [(hbActiveSnapPoint)]',
          description: {
            en: 'Fractions of the screen the drawer snaps to, and the active one.',
            pt: 'Frações da tela em que o drawer encaixa, e a ativa.',
          },
          type: 'number[] / number',
          default: '[] / undefined',
        },
        {
          property: '[hbScaleBackground] / [hbBlockScroll] / [hbBreakpoint]',
          description: {
            en: 'Scale the page behind, block body scroll, and the desktop breakpoint.',
            pt: 'Escala a página atrás, bloqueia o scroll do body, e o breakpoint de desktop.',
          },
          type: 'boolean / number',
          default: 'false / true / 768',
        },
      ],
    },
    {
      title: 'hb-drawer — header & footer',
      rows: [
        {
          property: '[hbTitle] / [hbDescription] / [hbIcon]',
          description: {
            en: 'Header heading, supporting text, and leading icon.',
            pt: 'Título, texto de apoio e ícone inicial do cabeçalho.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbOkText] / [hbCancelText]',
          description: {
            en: 'Footer button labels; empty hides the button.',
            pt: 'Rótulos dos botões do rodapé; vazio oculta o botão.',
          },
          type: 'string',
          default: `'OK' / 'Cancel'`,
        },
        {
          property: '[hbOkType]',
          description: {
            en: 'Visual style of the confirm button.',
            pt: 'Estilo visual do botão de confirmação.',
          },
          type: `'default' | 'destructive' | 'warning' | 'success'`,
          default: `'default'`,
        },
        {
          property: '[hbOkIcon] / [hbCancelIcon] / [hbOkDisabled] / [hbCancelDisabled]',
          description: {
            en: 'Footer button icons and disabled states.',
            pt: 'Ícones e estados desabilitados dos botões do rodapé.',
          },
          type: 'string / boolean',
          default: `'' / false`,
        },
        {
          property: '[hbFooterAlign] / [hbShowFooter]',
          description: {
            en: 'Alignment of the footer buttons, and whether to show it.',
            pt: 'Alinhamento dos botões do rodapé, e se ele aparece.',
          },
          type: `'start' | 'center' | 'end' | 'between' / boolean`,
          default: `'end' / true`,
        },
        {
          property: '[hbClosable] / [hbShowClose]',
          description: {
            en: 'Allow closing by backdrop/escape, and show the close button.',
            pt: 'Permite fechar pelo fundo/escape, e mostra o botão de fechar.',
          },
          type: 'boolean',
          default: 'true',
        },
      ],
    },
    {
      title: 'hb-drawer — data, state & slots',
      rows: [
        {
          property: '[hbData] / [hbOpen]',
          description: {
            en: 'Payload echoed in events, and a controlled open state.',
            pt: 'Payload devolvido nos eventos, e um estado de abertura controlado.',
          },
          type: 'object | boolean',
          default: 'undefined',
        },
        {
          property: '(hbOk) / (hbCancel) / (hbOpenChange)',
          description: {
            en: 'Emit on confirm (with hbData), cancel, and open/close.',
            pt: 'Emitem ao confirmar (com hbData), cancelar e abrir/fechar.',
          },
          type: 'object | boolean',
          default: '—',
        },
        {
          property: '[hbDrawerTrigger] / [hbDrawerContent] / [hbDrawerFooter]',
          description: {
            en: 'Projected trigger, body content, and custom footer.',
            pt: 'Gatilho, conteúdo do corpo e rodapé personalizado, projetados.',
          },
          type: 'slot',
          default: '—',
        },
      ],
    },
  ],
};
