import {
  HbDemoSheetBasicComponent,
  HbDemoSheetOptionsComponent,
  HbDemoSheetSidesComponent,
} from '../demos/sheet';
import * as basicSource from '../demos/sheet/sheet-basic' with { loader: 'text' };
import * as optionsSource from '../demos/sheet/sheet-options' with { loader: 'text' };
import * as sidesSource from '../demos/sheet/sheet-sides' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const sheetDoc: ComponentDoc = {
  slug: 'sheet',
  title: 'Sheet',
  description: {
    en: 'A panel that slides in from any edge of the screen. Give it a title, description, and icon, project a trigger and body, size it, choose the built-in footer buttons, and drive it as a controlled overlay.',
    pt: 'Um painel que desliza a partir de qualquer borda da tela. Dê a ele um título, descrição e ícone, projete um gatilho e corpo, dimensione-o, escolha os botões de rodapé embutidos, e controle-o como um overlay controlado.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Trigger, form & footer', pt: 'Gatilho, formulário e rodapé' },
      component: HbDemoSheetBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'sides',
      title: { en: 'Sides & size', pt: 'Lados e tamanho' },
      component: HbDemoSheetSidesComponent,
      source: sourceText(sidesSource),
      align: 'start',
    },
    {
      id: 'options',
      title: { en: 'Icon, destructive & events', pt: 'Ícone, destrutivo e eventos' },
      component: HbDemoSheetOptionsComponent,
      source: sourceText(optionsSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-sheet — panel',
      rows: [
        {
          property: '[hbSide]',
          description: {
            en: 'The edge the sheet slides in from.',
            pt: 'A borda de onde o sheet desliza.',
          },
          type: `'right' | 'left' | 'top' | 'bottom'`,
          default: `'right'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Width (left/right) or height (top/bottom) as any CSS length.',
            pt: 'Largura (left/right) ou altura (top/bottom) como qualquer comprimento CSS.',
          },
          type: 'string',
          default: `'24rem'`,
        },
        {
          property: '[hbTitle] / [hbDescription] / [hbIcon]',
          description: {
            en: 'The header heading, supporting text, and a leading icon name.',
            pt: 'O título do cabeçalho, texto de apoio, e um nome de ícone à frente.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbClosable] / [hbShowClose]',
          description: {
            en: 'Allow dismissing via backdrop/Escape, and show the header close button.',
            pt: 'Permite fechar via backdrop/Escape, e mostra o botão de fechar no cabeçalho.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbOpen] / (hbOpenChange)',
          description: {
            en: 'Controlled open state (undefined to open via the trigger), and an event as it opens and closes.',
            pt: 'Estado aberto controlado (undefined para abrir via gatilho), e um evento ao abrir e fechar.',
          },
          type: 'boolean | undefined / boolean',
          default: 'undefined / —',
        },
      ],
    },
    {
      title: 'hb-sheet — footer',
      rows: [
        {
          property: '[hbShowFooter] / [hbFooterAlign]',
          description: {
            en: 'Show the built-in footer, and how its buttons are justified.',
            pt: 'Mostra o rodapé embutido, e como seus botões são alinhados.',
          },
          type: `boolean / 'start' | 'center' | 'end' | 'between'`,
          default: `true / 'end'`,
        },
        {
          property: '[hbOkText] / [hbOkType] / [hbOkIcon] / [hbOkDisabled]',
          description: {
            en: 'The confirm button label, colour, icon, and disabled state. Emits (hbOk) with hbData.',
            pt: 'O rótulo, cor, ícone e estado desabilitado do botão de confirmar. Emite (hbOk) com hbData.',
          },
          type: `string / 'default' | 'destructive' | 'warning' | 'success'`,
          default: `'OK' / 'default'`,
        },
        {
          property: '[hbCancelText] / [hbCancelIcon] / [hbCancelDisabled]',
          description: {
            en: 'The cancel button label, icon, and disabled state. Emits (hbCancel) with hbData.',
            pt: 'O rótulo, ícone e estado desabilitado do botão de cancelar. Emite (hbCancel) com hbData.',
          },
          type: 'string / boolean',
          default: `'Cancel'`,
        },
        {
          property: '[hbData]',
          description: {
            en: 'An arbitrary payload passed back through the (hbOk) and (hbCancel) events.',
            pt: 'Um payload arbitrário devolvido pelos eventos (hbOk) e (hbCancel).',
          },
          type: 'object',
          default: 'undefined',
        },
      ],
    },
    {
      title: 'Slots',
      rows: [
        {
          property: '[hbSheetTrigger]',
          description: {
            en: 'The projected element that opens the sheet on click.',
            pt: 'O elemento projetado que abre o sheet ao ser clicado.',
          },
          type: 'directive',
          default: '—',
        },
        {
          property: '[hbSheetContent] / [hbSheetFooter]',
          description: {
            en: 'The scrollable body, and extra content placed before the OK/Cancel buttons in the footer.',
            pt: 'O corpo rolável, e conteúdo extra colocado antes dos botões OK/Cancel no rodapé.',
          },
          type: 'directive',
          default: '—',
        },
      ],
    },
  ],
};
