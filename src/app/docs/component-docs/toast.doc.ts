import {
  HbDemoToastPromiseComponent,
  HbDemoToastRichComponent,
  HbDemoToastTypesComponent,
} from '../demos/toast';
import * as promiseSource from '../demos/toast/toast-promise' with { loader: 'text' };
import * as richSource from '../demos/toast/toast-rich' with { loader: 'text' };
import * as typesSource from '../demos/toast/toast-types' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const toastDoc: ComponentDoc = {
  slug: 'toast',
  title: 'Toast',
  description: {
    en: 'Transient notifications fired imperatively from a service. Call typed helpers (success, warning, loading…), add a description, icon, and action buttons, choose a screen position, pause on hover, show a progress bar, drive an async flow with promise(), and keep a handle to update or dismiss it later.',
    pt: 'Notificações transitórias disparadas imperativamente por um serviço. Chame helpers tipados (success, warning, loading…), adicione descrição, ícone e botões de ação, escolha uma posição na tela, pause ao passar o mouse, mostre uma barra de progresso, conduza um fluxo assíncrono com promise(), e mantenha uma referência para atualizar ou dispensar depois.',
  },
  demos: [
    {
      id: 'types',
      title: { en: 'Types', pt: 'Tipos' },
      component: HbDemoToastTypesComponent,
      source: sourceText(typesSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'rich',
      title: { en: 'Description, actions & position', pt: 'Descrição, ações e posição' },
      component: HbDemoToastRichComponent,
      source: sourceText(richSource),
      align: 'start',
    },
    {
      id: 'promise',
      title: { en: 'Promise & manual update', pt: 'Promise e atualização manual' },
      component: HbDemoToastPromiseComponent,
      source: sourceText(promiseSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'HbToastService',
      rows: [
        {
          property: 'default / success / info / warning / destructive / loading',
          description: {
            en: 'Typed shortcuts — (title, opts?) => HbToastRef. loading never auto-dismisses.',
            pt: 'Atalhos tipados — (title, opts?) => HbToastRef. loading nunca dispensa sozinho.',
          },
          type: '(title, opts?) => HbToastRef',
          default: '—',
        },
        {
          property: 'show(config)',
          description: {
            en: 'The general entry point — pass a full HbToastConfig.',
            pt: 'O ponto de entrada geral — passe um HbToastConfig completo.',
          },
          type: '(config) => HbToastRef',
          default: '—',
        },
        {
          property: 'promise(promise, messages, opts?)',
          description: {
            en: 'Show a loading toast that becomes success or destructive when the promise settles; success/error accept a string or a function of the result.',
            pt: 'Mostra um toast de loading que vira success ou destructive quando a promise resolve; success/error aceitam string ou função do resultado.',
          },
          type: '(promise, { loading, success, error }, opts?) => HbToastRef',
          default: '—',
        },
        {
          property: 'dismiss(id?) / clear()',
          description: {
            en: 'Dismiss one toast by id, or dismiss all of them.',
            pt: 'Dispensa um toast pelo id, ou dispensa todos.',
          },
          type: '(id?) => void',
          default: '—',
        },
      ],
    },
    {
      title: 'HbToastConfig (per toast)',
      rows: [
        {
          property: 'type',
          description: {
            en: 'Sets the icon, colour, and progress tint.',
            pt: 'Define o ícone, a cor e a tonalidade do progresso.',
          },
          type: `'default' | 'success' | 'warning' | 'destructive' | 'info' | 'loading'`,
          default: `'default'`,
        },
        {
          property: 'title / description',
          description: {
            en: 'The bold headline and an optional muted second line.',
            pt: 'O título em negrito e uma segunda linha esmaecida opcional.',
          },
          type: 'string',
          default: '—',
        },
        {
          property: 'icon',
          description: {
            en: 'Override the type icon with a named icon (loading always shows a spinner).',
            pt: 'Sobrescreve o ícone do tipo por um ícone nomeado (loading sempre mostra um spinner).',
          },
          type: 'string',
          default: '—',
        },
        {
          property: 'duration',
          description: {
            en: 'Milliseconds before auto-dismiss; 0 keeps it open. loading is forced to 0.',
            pt: 'Milissegundos antes de dispensar sozinho; 0 mantém aberto. loading é forçado a 0.',
          },
          type: 'number',
          default: '4000',
        },
        {
          property: 'position',
          description: {
            en: 'Corner or edge the toast stacks in.',
            pt: 'Canto ou borda onde o toast se empilha.',
          },
          type: `'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center'`,
          default: `'bottom-right'`,
        },
        {
          property: 'closable / pauseOnHover / progressBar',
          description: {
            en: 'Show a close button, pause the timer on hover, and render a shrinking progress bar.',
            pt: 'Mostra um botão de fechar, pausa o timer no hover, e renderiza uma barra de progresso que encolhe.',
          },
          type: 'boolean',
          default: 'true / true / false',
        },
        {
          property: 'actions',
          description: {
            en: 'Buttons under the text: { label, onClick?(ref), type?, closeOnClick? }. Closes on click unless closeOnClick is false.',
            pt: 'Botões abaixo do texto: { label, onClick?(ref), type?, closeOnClick? }. Fecha ao clicar a menos que closeOnClick seja false.',
          },
          type: 'HbToastAction[]',
          default: '—',
        },
        {
          property: 'class / onDismiss',
          description: {
            en: 'Extra classes on the toast card, and a callback fired when it is dismissed.',
            pt: 'Classes extras no cartão do toast, e um callback disparado ao ser dispensado.',
          },
          type: 'ClassValue / () => void',
          default: '—',
        },
      ],
    },
    {
      title: 'HbToastRef & global config',
      rows: [
        {
          property: 'ref.update(patch)',
          description: {
            en: 'Patch a live toast (type, title, duration…) — the timer restarts.',
            pt: 'Atualiza um toast vivo (type, title, duration…) — o timer reinicia.',
          },
          type: '(Partial<HbToastConfig>) => void',
          default: '—',
        },
        {
          property: 'ref.dismiss() / pause() / resume()',
          description: {
            en: 'Close it, or hold and continue its auto-dismiss timer. ref also exposes config/paused/visible signals.',
            pt: 'Fecha-o, ou segura e retoma seu timer de auto-dispensa. ref também expõe os signals config/paused/visible.',
          },
          type: '() => void',
          default: '—',
        },
        {
          property: 'provideHbToast(config)',
          description: {
            en: 'App-level defaults: position, duration, closable, pauseOnHover, progressBar, maxVisible, gap, offset.',
            pt: 'Padrões da aplicação: position, duration, closable, pauseOnHover, progressBar, maxVisible, gap, offset.',
          },
          type: 'Provider',
          default: '—',
        },
      ],
    },
  ],
};
