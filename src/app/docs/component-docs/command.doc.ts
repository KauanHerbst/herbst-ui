import {
  HbDemoCommandDialogComponent,
  HbDemoCommandInlineComponent,
  HbDemoCommandSizesComponent,
} from '../demos/command';
import * as dialogSource from '../demos/command/command-dialog' with { loader: 'text' };
import * as inlineSource from '../demos/command/command-inline' with { loader: 'text' };
import * as sizesSource from '../demos/command/command-sizes' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const commandDoc: ComponentDoc = {
  slug: 'command',
  title: 'Command',
  description: {
    en: 'A command palette. Type to filter grouped items by label or keywords, run one with Enter or a shortcut, and open it inline or as a ⌘K dialog.',
    pt: 'Uma paleta de comandos. Digite para filtrar itens agrupados por rótulo ou palavras-chave, execute um com Enter ou um atalho, e abra inline ou como um diálogo ⌘K.',
  },
  demos: [
    {
      id: 'inline',
      title: { en: 'Inline palette', pt: 'Paleta inline' },
      component: HbDemoCommandInlineComponent,
      source: sourceText(inlineSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'dialog',
      title: { en: 'Dialog (⌘K)', pt: 'Diálogo (⌘K)' },
      component: HbDemoCommandDialogComponent,
      source: sourceText(dialogSource),
      align: 'start',
    },
    {
      id: 'sizes',
      title: { en: 'Sizes', pt: 'Tamanhos' },
      component: HbDemoCommandSizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-command',
      rows: [
        {
          property: '[hbSize]',
          description: {
            en: 'Height and text scale of the palette.',
            pt: 'Altura e escala de texto da paleta.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '(hbSelect)',
          description: {
            en: 'Emits the value of the chosen item.',
            pt: 'Emite o valor do item escolhido.',
          },
          type: 'unknown',
          default: '—',
        },
        {
          property: '(hbCommandChange)',
          description: {
            en: 'Emits the search query as it changes.',
            pt: 'Emite a busca conforme ela muda.',
          },
          type: 'string',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-command-item',
      rows: [
        {
          property: '[hbValue]',
          description: {
            en: 'Value emitted when the item is chosen.',
            pt: 'Valor emitido quando o item é escolhido.',
          },
          type: 'unknown',
          default: 'null',
        },
        {
          property: '[hbLabel]',
          description: {
            en: 'Text the filter matches against.',
            pt: 'Texto contra o qual o filtro compara.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbKeywords]',
          description: {
            en: 'Extra search terms beyond the label.',
            pt: 'Termos de busca extras além do rótulo.',
          },
          type: 'string[]',
          default: '[]',
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Prevent the item from being selected.',
            pt: 'Impede o item de ser selecionado.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '(hbSelect)',
          description: {
            en: 'Emitted (with hbValue) when this item is chosen.',
            pt: 'Emitido (com hbValue) quando este item é escolhido.',
          },
          type: 'unknown',
          default: '—',
        },
      ],
    },
    {
      title: 'Parts',
      rows: [
        {
          property: 'hb-command-input [hbPlaceholder]',
          description: {
            en: 'The search field.',
            pt: 'O campo de busca.',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: 'hb-command-list / hb-command-empty',
          description: {
            en: 'Scrollable results, and the message shown with no matches.',
            pt: 'Resultados roláveis, e a mensagem exibida sem correspondências.',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: 'hb-command-group [hbHeading]',
          description: {
            en: 'A titled section of items.',
            pt: 'Uma seção de itens com título.',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: 'hb-command-shortcut / hb-command-separator / hb-command-footer',
          description: {
            en: 'A key hint, a divider, and a footer bar.',
            pt: 'Uma dica de tecla, um divisor e uma barra de rodapé.',
          },
          type: 'slot',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-command-dialog',
      rows: [
        {
          property: '[(hbOpen)]',
          description: {
            en: 'Two-way open state of the palette dialog.',
            pt: 'Estado de abertura bidirecional do diálogo da paleta.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbHotkey]',
          description: {
            en: 'Key combined with ⌘/Ctrl to toggle the dialog (e.g. "k").',
            pt: 'Tecla combinada com ⌘/Ctrl para alternar o diálogo (ex. "k").',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
  ],
};
