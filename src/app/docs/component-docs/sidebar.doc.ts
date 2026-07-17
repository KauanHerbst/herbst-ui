import {
  HbDemoSidebarBasicComponent,
  HbDemoSidebarSubmenusComponent,
  HbDemoSidebarVariantsComponent,
} from '../demos/sidebar';
import * as basicSource from '../demos/sidebar/sidebar-basic' with { loader: 'text' };
import * as submenusSource from '../demos/sidebar/sidebar-submenus' with { loader: 'text' };
import * as variantsSource from '../demos/sidebar/sidebar-variants' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const sidebarDoc: ComponentDoc = {
  slug: 'sidebar',
  title: 'Sidebar',
  description: {
    en: 'A full application sidebar shell. Wrap a sidebar and main area in a layout, build the nav from header, groups, menus, and collapsible sub-menus, collapse it to icons or off-canvas, pick a side and variant, and toggle it from anywhere with a trigger.',
    pt: 'Uma casca completa de sidebar de aplicação. Envolva uma sidebar e a área principal num layout, monte a navegação com header, grupos, menus e submenus colapsáveis, colapse para ícones ou off-canvas, escolha um lado e variante, e alterne de qualquer lugar com um gatilho.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'App shell', pt: 'Casca de aplicação' },
      component: HbDemoSidebarBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'submenus',
      title: { en: 'Collapsible sub-menus', pt: 'Submenus colapsáveis' },
      component: HbDemoSidebarSubmenusComponent,
      source: sourceText(submenusSource),
      align: 'start',
    },
    {
      id: 'variants',
      title: { en: 'Floating, right & off-canvas', pt: 'Flutuante, direita e off-canvas' },
      component: HbDemoSidebarVariantsComponent,
      source: sourceText(variantsSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-sidebar',
      rows: [
        {
          property: '[(hbOpen)] / [hbId]',
          description: {
            en: 'The open state (two-way), and an id that hbSidebarTrigger targets to toggle this sidebar.',
            pt: 'O estado aberto (bidirecional), e um id que o hbSidebarTrigger mira para alternar esta sidebar.',
          },
          type: 'boolean / string',
          default: 'true / auto',
        },
        {
          property: '[hbSide] / [hbVariant]',
          description: {
            en: 'Which edge it docks to, and its look.',
            pt: 'A qual borda ancora, e sua aparência.',
          },
          type: `'left' | 'right' / 'sidebar' | 'floating' | 'inset'`,
          default: `'left' / 'sidebar'`,
        },
        {
          property: '[hbCollapsible]',
          description: {
            en: 'How it collapses: to an icon rail, fully off-canvas, or not at all.',
            pt: 'Como colapsa: para um rail de ícones, totalmente off-canvas, ou não colapsa.',
          },
          type: `'icon' | 'offcanvas' | 'none'`,
          default: `'icon'`,
        },
        {
          property: '[hbWidth] / [hbIconWidth]',
          description: {
            en: 'Expanded width, and the width of the icon rail when collapsed.',
            pt: 'Largura expandida, e a largura do rail de ícones quando colapsada.',
          },
          type: 'string',
          default: `'16rem' / '3rem'`,
        },
        {
          property: '[hbOverlay] / [hbDismissable] / [hbHideOnOutsideClick]',
          description: {
            en: 'Float over the content with a backdrop (also automatic on mobile), dismiss on backdrop, and close on outside click.',
            pt: 'Flutua sobre o conteúdo com backdrop (também automático no mobile), fecha no backdrop, e fecha ao clicar fora.',
          },
          type: 'boolean',
          default: 'false / true / true',
        },
        {
          property: '[hbOpenOnHover] / [hbHoverOpenDelay] / [hbHoverCloseDelay]',
          description: {
            en: 'Expand a collapsed sidebar on hover, with open/close delays in milliseconds.',
            pt: 'Expande uma sidebar colapsada no hover, com atrasos de abrir/fechar em milissegundos.',
          },
          type: 'boolean / number',
          default: 'false / 50 / 100',
        },
        {
          property: '(hbOnOpenChange)',
          description: {
            en: 'Emits { value, originalEvent } whenever the open state changes.',
            pt: 'Emite { value, originalEvent } sempre que o estado aberto muda.',
          },
          type: 'HbSidebarOpenChangeEvent',
          default: '—',
        },
      ],
    },
    {
      title: 'Structure',
      rows: [
        {
          property: 'hb-sidebar-layout / hb-sidebar-main',
          description: {
            en: 'The flex shell wrapping the sidebar(s), and the main content area beside them.',
            pt: 'A casca flex que envolve a(s) sidebar(s), e a área de conteúdo principal ao lado.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-sidebar-header / -content / -footer',
          description: {
            en: 'The top, scrollable middle, and bottom regions of the sidebar.',
            pt: 'As regiões superior, meio rolável e inferior da sidebar.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-sidebar-group / -group-label / -group-content',
          description: {
            en: 'A titled section of the nav.',
            pt: 'Uma seção titulada da navegação.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-sidebar-menu / -menu-item',
          description: {
            en: 'A menu list and its items. An item takes [hbCollapsible], [(hbOpen)], [hbDefaultOpen], [hbDisabled] to host a sub-menu.',
            pt: 'Uma lista de menu e seus itens. Um item aceita [hbCollapsible], [(hbOpen)], [hbDefaultOpen], [hbDisabled] para hospedar um submenu.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: '[hbSidebarMenuButton] / [hbSidebarMenuSubButton]',
          description: {
            en: 'The clickable nav link inside an item (hbActive marks the current page) and inside a sub-item.',
            pt: 'O link clicável dentro de um item (hbActive marca a página atual) e dentro de um subitem.',
          },
          type: 'directive',
          default: '—',
        },
        {
          property: '[hbSidebarTrigger] / [hbSidebarRail]',
          description: {
            en: 'A button that toggles a sidebar by its target id, and a draggable edge rail that toggles on click.',
            pt: 'Um botão que alterna uma sidebar pelo id target, e um rail de borda que alterna no clique.',
          },
          type: 'directive',
          default: '—',
        },
      ],
    },
  ],
};
