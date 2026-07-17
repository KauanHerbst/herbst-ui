import {
  HbDemoPanelBasicComponent,
  HbDemoPanelTemplatesComponent,
  HbDemoPanelTogglerComponent,
} from '../demos/panel';
import * as basicSource from '../demos/panel/panel-basic' with { loader: 'text' };
import * as templatesSource from '../demos/panel/panel-templates' with { loader: 'text' };
import * as togglerSource from '../demos/panel/panel-toggler' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const panelDoc: ComponentDoc = {
  slug: 'panel',
  title: 'Panel',
  description: {
    en: 'A titled, optionally collapsible container. Give it a header and content, choose whether the icon or the whole header toggles it, position the caret, drive the collapsed state, and template the header, actions, indicator, and footer.',
    pt: 'Um container titulado e opcionalmente colapsável. Dê a ele um cabeçalho e conteúdo, escolha se o ícone ou o cabeçalho inteiro o alterna, posicione o caret, controle o estado colapsado, e faça template do cabeçalho, ações, indicador e rodapé.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Collapsible panel', pt: 'Painel colapsável' },
      component: HbDemoPanelBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'toggler',
      title: {
        en: 'Toggler, icon position & disabled',
        pt: 'Toggler, posição do ícone e desabilitado',
      },
      component: HbDemoPanelTogglerComponent,
      source: sourceText(togglerSource),
      align: 'start',
    },
    {
      id: 'templates',
      title: {
        en: 'Header, actions, indicator & footer',
        pt: 'Cabeçalho, ações, indicador e rodapé',
      },
      component: HbDemoPanelTemplatesComponent,
      source: sourceText(templatesSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-panel',
      rows: [
        {
          property: '[hbHeader]',
          description: {
            en: 'The header text. Ignored when an hbPanelHeader template is provided.',
            pt: 'O texto do cabeçalho. Ignorado quando um template hbPanelHeader é fornecido.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbToggleable]',
          description: {
            en: 'Enable collapsing. Without it the panel is a static container.',
            pt: 'Habilita o colapso. Sem ele, o painel é um container estático.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[(hbCollapsed)]',
          description: {
            en: 'The collapsed state, two-way bound.',
            pt: 'O estado colapsado, bidirecional.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbToggler]',
          description: {
            en: 'What toggles the panel: just the caret button, or the entire header.',
            pt: 'O que alterna o painel: apenas o botão de caret, ou o cabeçalho inteiro.',
          },
          type: `'icon' | 'header'`,
          default: `'icon'`,
        },
        {
          property: '[hbIconPos]',
          description: {
            en: 'Place the toggle caret at the start or the end of the header.',
            pt: 'Coloca o caret de alternância no início ou no fim do cabeçalho.',
          },
          type: `'start' | 'end'`,
          default: `'end'`,
        },
        {
          property: '[hbToggleIcon] / [hbDisabled]',
          description: {
            en: 'Override the caret icon, and lock the panel so it cannot toggle.',
            pt: 'Sobrescreve o ícone do caret, e trava o painel para que não alterne.',
          },
          type: 'string / boolean',
          default: `'phosphorCaretDown' / false`,
        },
        {
          property: '(hbToggle)',
          description: {
            en: 'Emits the new collapsed state each time it toggles.',
            pt: 'Emite o novo estado colapsado cada vez que alterna.',
          },
          type: 'boolean',
          default: '—',
        },
      ],
    },
    {
      title: 'Template slots',
      rows: [
        {
          property: 'ng-template[hbPanelHeader]',
          description: {
            en: 'Custom header content, replacing the hbHeader text.',
            pt: 'Conteúdo customizado do cabeçalho, substituindo o texto hbHeader.',
          },
          type: 'template',
          default: '—',
        },
        {
          property: 'ng-template[hbPanelIcons]',
          description: {
            en: 'Action controls on the right of the header (their clicks do not toggle the panel).',
            pt: 'Controles de ação à direita do cabeçalho (seus cliques não alternam o painel).',
          },
          type: 'template',
          default: '—',
        },
        {
          property: 'ng-template[hbPanelIndicator]',
          description: {
            en: 'Custom toggle indicator. Context: $implicit = collapsed, collapsed.',
            pt: 'Indicador de alternância customizado. Contexto: $implicit = collapsed, collapsed.',
          },
          type: 'template',
          default: '—',
        },
        {
          property: 'ng-template[hbPanelFooter]',
          description: {
            en: 'Footer content shown below the projected body, inside the collapsible region.',
            pt: 'Conteúdo de rodapé mostrado abaixo do corpo projetado, dentro da região colapsável.',
          },
          type: 'template',
          default: '—',
        },
      ],
    },
  ],
};
