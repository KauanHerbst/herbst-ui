import {
  HbDemoAvatarBasicComponent,
  HbDemoAvatarGroupComponent,
  HbDemoAvatarInteractiveComponent,
  HbDemoAvatarSizesComponent,
  HbDemoAvatarStatusComponent,
} from '../demos/avatar';
import * as basicSource from '../demos/avatar/avatar-basic' with { loader: 'text' };
import * as groupSource from '../demos/avatar/avatar-group' with { loader: 'text' };
import * as interactiveSource from '../demos/avatar/avatar-interactive' with { loader: 'text' };
import * as sizesSource from '../demos/avatar/avatar-sizes' with { loader: 'text' };
import * as statusSource from '../demos/avatar/avatar-status' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const avatarDoc: ComponentDoc = {
  slug: 'avatar',
  title: 'Avatar',
  description: {
    en: 'A compact portrait for a person or entity — an image with initials as a fallback, an optional status dot or badge, and hb-avatar-group to stack several with an overflow count.',
    pt: 'Um retrato compacto de uma pessoa ou entidade — uma imagem com iniciais como fallback, um ponto de status ou badge opcional, e hb-avatar-group para empilhar vários com contagem de excedente.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Image, fallback & shape', pt: 'Imagem, fallback e formato' },
      component: HbDemoAvatarBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'sizes',
      title: { en: 'Sizes', pt: 'Tamanhos' },
      component: HbDemoAvatarSizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
    },
    {
      id: 'status',
      title: { en: 'Status & badge', pt: 'Status e badge' },
      component: HbDemoAvatarStatusComponent,
      source: sourceText(statusSource),
      align: 'start',
    },
    {
      id: 'group',
      title: { en: 'Group & overflow', pt: 'Grupo e excedente' },
      component: HbDemoAvatarGroupComponent,
      source: sourceText(groupSource),
      align: 'start',
    },
    {
      id: 'interactive',
      title: { en: 'Clickable & disabled', pt: 'Clicável e desabilitado' },
      component: HbDemoAvatarInteractiveComponent,
      source: sourceText(interactiveSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-avatar — inputs',
      rows: [
        {
          property: '[hbSrc]',
          description: {
            en: 'Image URL; the fallback shows while loading or on error.',
            pt: 'URL da imagem; o fallback aparece durante o carregamento ou em erro.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbAlt]',
          description: {
            en: 'Alt text for the image.',
            pt: 'Texto alternativo da imagem.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbFallback]',
          description: {
            en: 'Initials or text shown when there is no image.',
            pt: 'Iniciais ou texto exibidos quando não há imagem.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbPriority]',
          description: {
            en: 'Mark the image as high priority to load eagerly.',
            pt: 'Marca a imagem como alta prioridade para carregar antecipadamente.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Named size, or a number in pixels.',
            pt: 'Tamanho nomeado, ou um número em pixels.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | number`,
          default: `'md'`,
        },
        {
          property: '[hbShape]',
          description: {
            en: 'Circle or rounded square.',
            pt: 'Círculo ou quadrado arredondado.',
          },
          type: `'circle' | 'square'`,
          default: `'circle'`,
        },
        {
          property: '[hbStatus]',
          description: {
            en: 'Presence dot colour.',
            pt: 'Cor do ponto de presença.',
          },
          type: `'online' | 'offline' | 'away' | 'busy'`,
          default: 'undefined',
        },
        {
          property: '[hbBadgePosition]',
          description: {
            en: 'Corner of the status dot or badge.',
            pt: 'Canto do ponto de status ou badge.',
          },
          type: `'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'`,
          default: `'bottom-right'`,
        },
        {
          property: '[hbBadgeIcon]',
          description: {
            en: 'Icon name shown inside the badge.',
            pt: 'Nome do ícone exibido dentro do badge.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Dim the avatar and block clicks.',
            pt: 'Esmaece o avatar e bloqueia os cliques.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
    {
      title: 'hb-avatar — outputs & slots',
      rows: [
        {
          property: '(hbClick)',
          description: {
            en: 'Emitted when the avatar is clicked.',
            pt: 'Emitido quando o avatar é clicado.',
          },
          type: 'void',
          default: '—',
        },
        {
          property: '[hbAvatarBadge]',
          description: {
            en: 'Projected custom badge (a count, dot, or icon).',
            pt: 'Badge personalizado projetado (contagem, ponto ou ícone).',
          },
          type: 'slot',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-avatar-group',
      rows: [
        {
          property: '[hbMax]',
          description: {
            en: 'Show at most this many avatars; the rest collapse into an overflow tile.',
            pt: 'Mostra no máximo esta quantidade; o restante vira um bloco de excedente.',
          },
          type: 'number | null',
          default: 'null',
        },
        {
          property: '[hbSpacing]',
          description: {
            en: 'How much the avatars overlap.',
            pt: 'O quanto os avatares se sobrepõem.',
          },
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Size applied to every avatar in the group.',
            pt: 'Tamanho aplicado a todos os avatares do grupo.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | number`,
          default: `'md'`,
        },
        {
          property: '[hbShape]',
          description: {
            en: 'Shape applied to every avatar in the group.',
            pt: 'Formato aplicado a todos os avatares do grupo.',
          },
          type: `'circle' | 'square'`,
          default: `'circle'`,
        },
        {
          property: '[hbOrientation]',
          description: {
            en: 'Stack the avatars in a row or a column.',
            pt: 'Empilha os avatares em linha ou em coluna.',
          },
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
        },
        {
          property: '[hbOverflowIcon]',
          description: {
            en: 'Icon shown in the overflow tile instead of the count.',
            pt: 'Ícone exibido no bloco de excedente em vez da contagem.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '(hbOverflowClick)',
          description: {
            en: 'Emitted when the overflow tile is clicked.',
            pt: 'Emitido quando o bloco de excedente é clicado.',
          },
          type: 'void',
          default: '—',
        },
      ],
    },
  ],
};
