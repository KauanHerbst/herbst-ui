import {
  HbDemoAlertDialogBasicComponent,
  HbDemoAlertDialogConfirmComponent,
  HbDemoAlertDialogContentComponent,
  HbDemoAlertDialogGatedComponent,
  HbDemoAlertDialogPlacementComponent,
} from '../demos/alert-dialog';
import * as basicSource from '../demos/alert-dialog/alert-dialog-basic' with { loader: 'text' };
import * as confirmSource from '../demos/alert-dialog/alert-dialog-confirm' with { loader: 'text' };
import * as contentSource from '../demos/alert-dialog/alert-dialog-content' with { loader: 'text' };
import * as gatedSource from '../demos/alert-dialog/alert-dialog-gated' with { loader: 'text' };
import * as placementSource from '../demos/alert-dialog/alert-dialog-placement' with {
  loader: 'text',
};

import { sourceText, type ComponentDoc } from './component-doc.types';

export const alertDialogDoc: ComponentDoc = {
  slug: 'alert-dialog',
  title: 'Alert dialog',
  description: {
    en: 'A modal that interrupts the flow to confirm a consequential choice. It opens from a projected trigger, frames a title and message, and returns an OK or Cancel outcome.',
    pt: 'Um modal que interrompe o fluxo para confirmar uma escolha importante. Abre a partir de um gatilho projetado, enquadra título e mensagem e devolve um resultado de OK ou Cancelar.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Basic', pt: 'Básico' },
      component: HbDemoAlertDialogBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'confirm',
      title: { en: 'Destructive confirm', pt: 'Confirmação destrutiva' },
      component: HbDemoAlertDialogConfirmComponent,
      source: sourceText(confirmSource),
      align: 'start',
    },
    {
      id: 'content',
      title: { en: 'Content & forced choice', pt: 'Conteúdo e escolha obrigatória' },
      component: HbDemoAlertDialogContentComponent,
      source: sourceText(contentSource),
      align: 'start',
    },
    {
      id: 'placement',
      title: { en: 'Position, width & footer', pt: 'Posição, largura e rodapé' },
      component: HbDemoAlertDialogPlacementComponent,
      source: sourceText(placementSource),
      align: 'start',
    },
    {
      id: 'gated',
      title: { en: 'Gated action & events', pt: 'Ação condicionada e eventos' },
      component: HbDemoAlertDialogGatedComponent,
      source: sourceText(gatedSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-alert-dialog — inputs',
      rows: [
        {
          property: '[hbTitle]',
          description: {
            en: 'Heading shown at the top of the dialog.',
            pt: 'Título exibido no topo do diálogo.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbDescription]',
          description: {
            en: 'Supporting text below the title.',
            pt: 'Texto de apoio abaixo do título.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbIcon]',
          description: {
            en: 'Optional leading icon name in the header.',
            pt: 'Nome do ícone inicial opcional no cabeçalho.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbOkText]',
          description: {
            en: 'Label of the confirm button.',
            pt: 'Rótulo do botão de confirmação.',
          },
          type: 'string',
          default: `'OK'`,
        },
        {
          property: '[hbCancelText]',
          description: {
            en: 'Label of the cancel button; empty hides it.',
            pt: 'Rótulo do botão cancelar; vazio o oculta.',
          },
          type: 'string',
          default: `'Cancel'`,
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
          property: '[hbOkDisabled]',
          description: {
            en: 'Disable the confirm button.',
            pt: 'Desabilita o botão de confirmação.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbClosable]',
          description: {
            en: 'Show the close icon and allow backdrop close.',
            pt: 'Mostra o ícone de fechar e permite fechar pelo fundo.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbWidth]',
          description: {
            en: 'CSS width of the panel.',
            pt: 'Largura CSS do painel.',
          },
          type: 'string',
          default: `'32rem'`,
        },
        {
          property: '[hbPosition]',
          description: {
            en: 'Anchor of the panel within the viewport.',
            pt: 'Ancoragem do painel na viewport.',
          },
          type: `'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`,
          default: `'center'`,
        },
        {
          property: '[hbFooterAlign]',
          description: {
            en: 'Horizontal alignment of the footer buttons.',
            pt: 'Alinhamento horizontal dos botões do rodapé.',
          },
          type: `'start' | 'center' | 'end' | 'between'`,
          default: `'end'`,
        },
        {
          property: '[hbData]',
          description: {
            en: 'Arbitrary payload echoed back in the ok/cancel events.',
            pt: 'Payload arbitrário devolvido nos eventos ok/cancel.',
          },
          type: 'object | undefined',
          default: 'undefined',
        },
      ],
    },
    {
      title: 'hb-alert-dialog — outputs & slots',
      rows: [
        {
          property: '(hbOk)',
          description: {
            en: 'Emitted with hbData when the confirm button is pressed.',
            pt: 'Emitido com hbData quando o botão de confirmação é pressionado.',
          },
          type: 'object | undefined',
          default: '—',
        },
        {
          property: '(hbCancel)',
          description: {
            en: 'Emitted with hbData when the cancel button is pressed.',
            pt: 'Emitido com hbData quando o botão cancelar é pressionado.',
          },
          type: 'object | undefined',
          default: '—',
        },
        {
          property: '(hbOpenChange)',
          description: {
            en: 'Emitted true on open and false on close.',
            pt: 'Emite true ao abrir e false ao fechar.',
          },
          type: 'boolean',
          default: '—',
        },
        {
          property: '[hbAlertDialogTrigger]',
          description: {
            en: 'Projected element that opens the dialog when clicked.',
            pt: 'Elemento projetado que abre o diálogo ao ser clicado.',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: '[hbAlertDialogContent]',
          description: {
            en: 'Projected body content between the header and footer.',
            pt: 'Conteúdo projetado do corpo, entre o cabeçalho e o rodapé.',
          },
          type: 'slot',
          default: '—',
        },
      ],
    },
  ],
};
