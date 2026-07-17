import {
  HbDemoPaginationBasicComponent,
  HbDemoPaginationConfigComponent,
  HbDemoPaginationTemplatesComponent,
} from '../demos/pagination';
import * as basicSource from '../demos/pagination/pagination-basic' with { loader: 'text' };
import * as configSource from '../demos/pagination/pagination-config' with { loader: 'text' };
import * as templatesSource from '../demos/pagination/pagination-templates' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const paginationDoc: ComponentDoc = {
  slug: 'pagination',
  title: 'Pagination',
  description: {
    en: 'A page navigator that computes its own page numbers and ellipses. Derive the page count from a total, control how many sibling and boundary pages show, add first/last and labelled prev/next buttons, size it, and template every part.',
    pt: 'Um navegador de páginas que calcula seus próprios números e reticências. Derive a contagem de páginas de um total, controle quantas páginas vizinhas e de borda aparecem, adicione botões primeiro/último e anterior/próximo rotulados, dimensione-o e faça template de cada parte.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'From a total', pt: 'A partir de um total' },
      component: HbDemoPaginationBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'config',
      title: {
        en: 'First/last, labels, siblings & sizes',
        pt: 'Primeiro/último, rótulos, vizinhos e tamanhos',
      },
      component: HbDemoPaginationConfigComponent,
      source: sourceText(configSource),
      align: 'start',
    },
    {
      id: 'templates',
      title: { en: 'Custom page & ellipsis', pt: 'Página e reticências customizadas' },
      component: HbDemoPaginationTemplatesComponent,
      source: sourceText(templatesSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-pagination — pages',
      rows: [
        {
          property: '[(hbPage)]',
          description: {
            en: 'The current page (1-based), two-way bound.',
            pt: 'A página atual (base 1), bidirecional.',
          },
          type: 'number',
          default: '1',
        },
        {
          property: '[hbPageCount]',
          description: {
            en: 'The total number of pages, given directly. Takes precedence over hbTotal.',
            pt: 'O número total de páginas, dado diretamente. Tem precedência sobre hbTotal.',
          },
          type: 'number',
          default: '0',
        },
        {
          property: '[hbTotal] / [hbPageSize]',
          description: {
            en: 'Derive the page count as ceil(total / pageSize) when hbPageCount is not set.',
            pt: 'Deriva a contagem de páginas como ceil(total / pageSize) quando hbPageCount não é definido.',
          },
          type: 'number',
          default: '0 / 10',
        },
        {
          property: '[hbSiblings] / [hbBoundaries]',
          description: {
            en: 'How many pages to show around the current page, and at each end, before collapsing to an ellipsis.',
            pt: 'Quantas páginas mostrar ao redor da atual, e em cada extremidade, antes de colapsar numa reticência.',
          },
          type: 'number',
          default: '1 / 1',
        },
      ],
    },
    {
      title: 'hb-pagination — controls',
      rows: [
        {
          property: '[hbSize] / [hbDisabled]',
          description: {
            en: 'Button size, and a flag that blocks all navigation.',
            pt: 'Tamanho do botão, e uma flag que bloqueia toda a navegação.',
          },
          type: `'xs'–'xl' / boolean`,
          default: `'md' / false`,
        },
        {
          property: '[hbShowPrevNext] / [hbShowFirstLast]',
          description: {
            en: 'Toggle the previous/next arrows and the jump-to-first/last buttons.',
            pt: 'Alterna as setas anterior/próximo e os botões de ir ao primeiro/último.',
          },
          type: 'boolean',
          default: 'true / false',
        },
        {
          property: '[hbPreviousLabel] / [hbNextLabel]',
          description: {
            en: 'Optional text shown alongside the prev/next arrows.',
            pt: 'Texto opcional exibido ao lado das setas anterior/próximo.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: 'icon inputs',
          description: {
            en: 'hbPreviousIcon, hbNextIcon, hbFirstIcon, hbLastIcon, hbEllipsisIcon override the default phosphor icons.',
            pt: 'hbPreviousIcon, hbNextIcon, hbFirstIcon, hbLastIcon, hbEllipsisIcon sobrescrevem os ícones phosphor padrão.',
          },
          type: 'string',
          default: 'phosphorCaret…',
        },
        {
          property: '[hbAriaLabel]',
          description: {
            en: 'The accessible label for the navigation landmark.',
            pt: 'O rótulo acessível para o landmark de navegação.',
          },
          type: 'string',
          default: `'pagination'`,
        },
      ],
    },
    {
      title: 'Template slots',
      rows: [
        {
          property: 'ng-template[hbPageTemplate]',
          description: {
            en: 'Replace each page button. Context: $implicit = page, active, disabled.',
            pt: 'Substitui cada botão de página. Contexto: $implicit = page, active, disabled.',
          },
          type: 'template',
          default: '—',
        },
        {
          property: 'ng-template[hbEllipsisTemplate]',
          description: {
            en: 'Replace the ellipsis. Context: $implicit = side ("left" | "right").',
            pt: 'Substitui a reticência. Contexto: $implicit = side ("left" | "right").',
          },
          type: 'template',
          default: '—',
        },
        {
          property: 'ng-template[hbPreviousTemplate] / [hbNextTemplate]',
          description: {
            en: 'Replace the prev/next buttons. Context: $implicit = target page, disabled.',
            pt: 'Substitui os botões anterior/próximo. Contexto: $implicit = página alvo, disabled.',
          },
          type: 'template',
          default: '—',
        },
      ],
    },
  ],
};
