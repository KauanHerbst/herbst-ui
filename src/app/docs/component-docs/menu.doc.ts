import {
  HbDemoMenuBasicComponent,
  HbDemoMenuContextComponent,
  HbDemoMenuSelectionComponent,
} from '../demos/menu';
import * as basicSource from '../demos/menu/menu-basic' with { loader: 'text' };
import * as contextSource from '../demos/menu/menu-context' with { loader: 'text' };
import * as selectionSource from '../demos/menu/menu-selection' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const menuDoc: ComponentDoc = {
  slug: 'menu',
  title: 'Menu',
  description: {
    en: 'A dropdown and context menu built on the CDK menu. Trigger it by click, hover, or right-click; fill it with items, checkboxes, radio groups, labels, separators, shortcuts, and nested submenus.',
    pt: 'Um menu dropdown e de contexto construído sobre o CDK menu. Acione por clique, hover ou clique direito; preencha com itens, checkboxes, grupos de rádio, rótulos, separadores, atalhos e submenus aninhados.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Items, shortcuts & destructive', pt: 'Itens, atalhos e destrutivo' },
      component: HbDemoMenuBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'selection',
      title: { en: 'Checkbox, radio & submenu', pt: 'Checkbox, rádio e submenu' },
      component: HbDemoMenuSelectionComponent,
      source: sourceText(selectionSource),
      align: 'start',
    },
    {
      id: 'context',
      title: { en: 'Hover & context menu', pt: 'Hover e menu de contexto' },
      component: HbDemoMenuContextComponent,
      source: sourceText(contextSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'Triggers',
      rows: [
        {
          property: '[hbMenuTriggerFor]',
          description: {
            en: 'Attach to any element, pointing at an ng-template that wraps an hb-menu.',
            pt: 'Aplique a qualquer elemento, apontando para um ng-template que envolve um hb-menu.',
          },
          type: 'TemplateRef',
          default: '—',
        },
        {
          property: '[hbTrigger] / [hbDisabled]',
          description: {
            en: 'Open on click or hover, and optionally block opening.',
            pt: 'Abre no clique ou hover, e opcionalmente bloqueia a abertura.',
          },
          type: `'click' | 'hover' / boolean`,
          default: `'click' / false`,
        },
        {
          property: '[hbOpen] / (hbOpenChange) / [hbMenuPosition]',
          description: {
            en: 'Controlled open state, an open/close event, and custom CDK connected positions.',
            pt: 'Estado aberto controlado, um evento de abrir/fechar, e posições conectadas do CDK customizadas.',
          },
          type: 'boolean / boolean / ConnectedPosition[]',
          default: 'undefined / — / —',
        },
        {
          property: '[hbContextMenuTriggerFor]',
          description: {
            en: 'Open the menu at the pointer on right-click. [hbGlobal] captures right-clicks anywhere; [hbContextDisabled] disables it.',
            pt: 'Abre o menu no ponteiro ao clicar com o direito. [hbGlobal] captura cliques direitos em qualquer lugar; [hbContextDisabled] desabilita.',
          },
          type: 'TemplateRef',
          default: '—',
        },
      ],
    },
    {
      title: 'Items',
      rows: [
        {
          property: 'hb-menu-item [hbVariant] [hbInset]',
          description: {
            en: 'A command row. default | destructive; hbInset aligns text with items that have indicators. Emits (hbSelect); [hbDisabled] disables it; add [hbMenuTriggerFor] to make a submenu.',
            pt: 'Uma linha de comando. default | destructive; hbInset alinha o texto com itens que têm indicadores. Emite (hbSelect); [hbDisabled] desabilita; adicione [hbMenuTriggerFor] para um submenu.',
          },
          type: `'default' | 'destructive'`,
          default: `'default'`,
        },
        {
          property: 'hb-menu-checkbox-item [(hbChecked)]',
          description: {
            en: 'A toggleable item with a check indicator.',
            pt: 'Um item alternável com indicador de check.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: 'hb-menu-radio-group [(hbValue)] + hb-menu-radio-item [hbValue]',
          description: {
            en: 'A single-choice group; the item whose value matches the group is marked selected.',
            pt: 'Um grupo de escolha única; o item cujo valor casa com o grupo é marcado como selecionado.',
          },
          type: 'unknown',
          default: 'null',
        },
      ],
    },
    {
      title: 'Structure',
      rows: [
        {
          property: 'hb-menu-label [hbInset]',
          description: {
            en: 'A non-interactive caption for a section.',
            pt: 'Uma legenda não-interativa para uma seção.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-menu-separator / hb-menu-group',
          description: {
            en: 'A dividing line, and a wrapper to group related items.',
            pt: 'Uma linha divisória, e um wrapper para agrupar itens relacionados.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-menu-shortcut',
          description: {
            en: 'Right-aligned muted text for a keyboard hint.',
            pt: 'Texto esmaecido alinhado à direita para uma dica de teclado.',
          },
          type: 'component',
          default: '—',
        },
      ],
    },
  ],
};
