import {
  HbDemoBlockUiFullscreenComponent,
  HbDemoBlockUiMessageComponent,
  HbDemoBlockUiSpinnerComponent,
} from '../demos/block-ui';
import * as fullscreenSource from '../demos/block-ui/block-ui-fullscreen' with { loader: 'text' };
import * as messageSource from '../demos/block-ui/block-ui-message' with { loader: 'text' };
import * as spinnerSource from '../demos/block-ui/block-ui-spinner' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const blockUiDoc: ComponentDoc = {
  slug: 'block-ui',
  title: 'Block UI',
  description: {
    en: 'An overlay that blocks a region — or the whole screen — while it works. It disables the wrapped content, shows a spinner, icon, or custom message, and clears when unblocked.',
    pt: 'Um overlay que bloqueia uma região — ou a tela inteira — enquanto trabalha. Desabilita o conteúdo envolvido, mostra spinner, ícone ou mensagem personalizada, e limpa ao desbloquear.',
  },
  demos: [
    {
      id: 'spinner',
      title: { en: 'Blocked with spinner', pt: 'Bloqueado com spinner' },
      component: HbDemoBlockUiSpinnerComponent,
      source: sourceText(spinnerSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'message',
      title: { en: 'Icon & custom message', pt: 'Ícone e mensagem personalizada' },
      component: HbDemoBlockUiMessageComponent,
      source: sourceText(messageSource),
      align: 'start',
    },
    {
      id: 'fullscreen',
      title: { en: 'Full screen', pt: 'Tela cheia' },
      component: HbDemoBlockUiFullscreenComponent,
      source: sourceText(fullscreenSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-block-ui',
      rows: [
        {
          property: '[hbBlocked]',
          description: {
            en: 'Show the overlay and make the wrapped content inert.',
            pt: 'Mostra o overlay e torna o conteúdo envolvido inerte.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbFullScreen]',
          description: {
            en: 'Cover the whole viewport instead of just the wrapped region.',
            pt: 'Cobre toda a viewport em vez de apenas a região envolvida.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbSpinner]',
          description: {
            en: 'Show the built-in spinner in the overlay.',
            pt: 'Mostra o spinner embutido no overlay.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbIcon]',
          description: {
            en: 'Icon shown in the overlay when no spinner is used.',
            pt: 'Ícone exibido no overlay quando não há spinner.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbBlockUiContent]',
          description: {
            en: 'Projected overlay content, such as a status message.',
            pt: 'Conteúdo do overlay projetado, como uma mensagem de status.',
          },
          type: 'slot',
          default: '—',
        },
        {
          property: '[class]',
          description: {
            en: 'Extra CSS classes merged onto the host. Default content is the region being blocked.',
            pt: 'Classes CSS extras mescladas no host. O conteúdo padrão é a região sendo bloqueada.',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
  ],
};
