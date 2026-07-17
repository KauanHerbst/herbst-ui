import {
  HbDemoAttachmentBasicComponent,
  HbDemoAttachmentGalleryComponent,
  HbDemoAttachmentInteractiveComponent,
  HbDemoAttachmentSizesComponent,
  HbDemoAttachmentStatesComponent,
} from '../demos/attachment';
import * as basicSource from '../demos/attachment/attachment-basic' with { loader: 'text' };
import * as gallerySource from '../demos/attachment/attachment-gallery' with { loader: 'text' };
import * as interactiveSource from '../demos/attachment/attachment-interactive' with {
  loader: 'text',
};
import * as sizesSource from '../demos/attachment/attachment-sizes' with { loader: 'text' };
import * as statesSource from '../demos/attachment/attachment-states' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const attachmentDoc: ComponentDoc = {
  slug: 'attachment',
  title: 'Attachment',
  description: {
    en: 'A chip for an uploaded or attached file — a thumbnail or icon, a name and detail line, an optional progress bar, and remove or custom actions. Group several with hb-attachment-group.',
    pt: 'Um chip para um arquivo enviado ou anexado — miniatura ou ícone, nome e linha de detalhe, barra de progresso opcional e ações de remover ou personalizadas. Agrupe vários com hb-attachment-group.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Basic', pt: 'Básico' },
      component: HbDemoAttachmentBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'states',
      title: { en: 'States & progress', pt: 'Estados e progresso' },
      component: HbDemoAttachmentStatesComponent,
      source: sourceText(statesSource),
      align: 'start',
    },
    {
      id: 'sizes',
      title: { en: 'Sizes', pt: 'Tamanhos' },
      component: HbDemoAttachmentSizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
    },
    {
      id: 'gallery',
      title: { en: 'Thumbnails (vertical)', pt: 'Miniaturas (vertical)' },
      component: HbDemoAttachmentGalleryComponent,
      source: sourceText(gallerySource),
      align: 'start',
    },
    {
      id: 'interactive',
      title: { en: 'Clickable, action & disabled', pt: 'Clicável, ação e desabilitado' },
      component: HbDemoAttachmentInteractiveComponent,
      source: sourceText(interactiveSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-attachment — inputs',
      rows: [
        {
          property: '[hbName]',
          description: {
            en: 'File name shown as the title.',
            pt: 'Nome do arquivo exibido como título.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbDescription]',
          description: {
            en: 'Secondary detail line (size, type, status).',
            pt: 'Linha de detalhe secundária (tamanho, tipo, status).',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbSrc]',
          description: {
            en: 'Thumbnail image URL; falls back to the icon on error.',
            pt: 'URL da imagem de miniatura; cai no ícone em caso de erro.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbIcon]',
          description: {
            en: 'Icon name used when there is no thumbnail.',
            pt: 'Nome do ícone usado quando não há miniatura.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbState]',
          description: {
            en: 'Upload lifecycle; error tints the chip and swaps the icon.',
            pt: 'Ciclo do upload; error tinge o chip e troca o ícone.',
          },
          type: `'idle' | 'uploading' | 'processing' | 'error' | 'done'`,
          default: `'done'`,
        },
        {
          property: '[hbProgress]',
          description: {
            en: 'Percent 0–100; the bar shows only while uploading or processing.',
            pt: 'Percentual 0–100; a barra aparece só em uploading ou processing.',
          },
          type: 'number | null',
          default: 'null',
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Overall scale of the chip.',
            pt: 'Escala geral do chip.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbOrientation]',
          description: {
            en: 'Row layout, or a vertical card with the media on top.',
            pt: 'Layout em linha, ou card vertical com a mídia no topo.',
          },
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
        },
        {
          property: '[hbRemovable]',
          description: {
            en: 'Show the remove button.',
            pt: 'Mostra o botão de remover.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbClickable]',
          description: {
            en: 'Make the body clickable and emit hbClick.',
            pt: 'Torna o corpo clicável e emite hbClick.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Dim the chip and block interaction.',
            pt: 'Esmaece o chip e bloqueia a interação.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
    {
      title: 'hb-attachment — outputs & slots',
      rows: [
        {
          property: '(hbRemove)',
          description: {
            en: 'Emitted when the remove button is pressed.',
            pt: 'Emitido quando o botão de remover é pressionado.',
          },
          type: 'void',
          default: '—',
        },
        {
          property: '(hbClick)',
          description: {
            en: 'Emitted when a clickable body is activated.',
            pt: 'Emitido quando um corpo clicável é ativado.',
          },
          type: 'void',
          default: '—',
        },
        {
          property: '[hbAttachmentAction]',
          description: {
            en: 'Projected action element placed before the remove button.',
            pt: 'Elemento de ação projetado, colocado antes do botão de remover.',
          },
          type: 'slot',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-attachment-group',
      rows: [
        {
          property: '[hbOrientation]',
          description: {
            en: 'Lay the attachments in a row or a column.',
            pt: 'Dispõe os anexos em linha ou em coluna.',
          },
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
        },
        {
          property: '[class]',
          description: {
            en: 'Extra CSS classes merged onto the group.',
            pt: 'Classes CSS extras mescladas no grupo.',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
  ],
};
