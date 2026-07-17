import {
  HbDemoInplaceBasicComponent,
  HbDemoInplaceControlledComponent,
  HbDemoInplaceStatesComponent,
} from '../demos/inplace';
import * as basicSource from '../demos/inplace/inplace-basic' with { loader: 'text' };
import * as controlledSource from '../demos/inplace/inplace-controlled' with { loader: 'text' };
import * as statesSource from '../demos/inplace/inplace-states' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const inplaceDoc: ComponentDoc = {
  slug: 'inplace',
  title: 'Inplace',
  description: {
    en: 'Swap a read-only display for its editor in place. Click the display to reveal the content template, close it with a closer element, or drive the active state yourself.',
    pt: 'Troca uma exibição somente-leitura pelo seu editor no mesmo lugar. Clique na exibição para revelar o template de conteúdo, feche-o com um elemento fechador, ou controle o estado ativo você mesmo.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Click to edit', pt: 'Clique para editar' },
      component: HbDemoInplaceBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'controlled',
      title: { en: 'Controlled & events', pt: 'Controlado e eventos' },
      component: HbDemoInplaceControlledComponent,
      source: sourceText(controlledSource),
      align: 'start',
    },
    {
      id: 'states',
      title: { en: 'Disabled & prevent-click', pt: 'Desabilitado e prevent-click' },
      component: HbDemoInplaceStatesComponent,
      source: sourceText(statesSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-inplace',
      rows: [
        {
          property: '[(hbActive)]',
          description: {
            en: 'Two-way active state: false shows the display, true shows the content.',
            pt: 'Estado ativo bidirecional: false mostra a exibição, true mostra o conteúdo.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Disable activation entirely; the display stays read-only.',
            pt: 'Desabilita a ativação por completo; a exibição permanece somente-leitura.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbPreventClick]',
          description: {
            en: 'Keep the display static (not clickable) — activate it programmatically via the exported instance instead.',
            pt: 'Mantém a exibição estática (não clicável) — ative-a programaticamente via a instância exportada.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '(hbActivate) / (hbDeactivate)',
          description: {
            en: 'Emit when the editor opens and closes.',
            pt: 'Emitem quando o editor abre e fecha.',
          },
          type: 'void',
          default: '—',
        },
        {
          property: 'exportAs / methods',
          description: {
            en: 'Reference as #ref="hbInplace" to call activate(), deactivate(), or toggle().',
            pt: 'Referencie como #ref="hbInplace" para chamar activate(), deactivate() ou toggle().',
          },
          type: `'hbInplace'`,
          default: '—',
        },
      ],
    },
    {
      title: 'Slots',
      rows: [
        {
          property: 'ng-template[hbInplaceDisplay]',
          description: {
            en: 'The read-only view shown while inactive.',
            pt: 'A visão somente-leitura mostrada enquanto inativo.',
          },
          type: 'template',
          default: '—',
        },
        {
          property: 'ng-template[hbInplaceContent]',
          description: {
            en: 'The editor shown while active.',
            pt: 'O editor mostrado enquanto ativo.',
          },
          type: 'template',
          default: '—',
        },
        {
          property: '[hbInplaceCloser]',
          description: {
            en: 'Any element inside the content that deactivates on click.',
            pt: 'Qualquer elemento dentro do conteúdo que desativa ao ser clicado.',
          },
          type: 'directive',
          default: '—',
        },
      ],
    },
  ],
};
