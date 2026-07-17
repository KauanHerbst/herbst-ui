import {
  HbDemoAspectRatioMediaComponent,
  HbDemoAspectRatioRatiosComponent,
} from '../demos/aspect-ratio';
import * as mediaSource from '../demos/aspect-ratio/aspect-ratio-media' with { loader: 'text' };
import * as ratiosSource from '../demos/aspect-ratio/aspect-ratio-ratios' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const aspectRatioDoc: ComponentDoc = {
  slug: 'aspect-ratio',
  title: 'Aspect ratio',
  description: {
    en: 'A container that holds its children to a fixed width-to-height ratio, so images, video, and embeds keep their shape as the layout reflows.',
    pt: 'Um contêiner que mantém os filhos numa proporção fixa de largura por altura, para que imagens, vídeos e embeds preservem o formato quando o layout se reorganiza.',
  },
  demos: [
    {
      id: 'ratios',
      title: { en: 'Ratios', pt: 'Proporções' },
      component: HbDemoAspectRatioRatiosComponent,
      source: sourceText(ratiosSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'media',
      title: { en: 'Media (object-cover)', pt: 'Mídia (object-cover)' },
      component: HbDemoAspectRatioMediaComponent,
      source: sourceText(mediaSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-aspect-ratio',
      rows: [
        {
          property: '[hbRatio]',
          description: {
            en: 'Width divided by height, e.g. 16 / 9 or 1 for a square.',
            pt: 'Largura dividida pela altura, ex. 16 / 9 ou 1 para um quadrado.',
          },
          type: 'number',
          default: '1',
        },
        {
          property: '[class]',
          description: {
            en: 'Extra CSS classes merged onto the host. Images and video inside are set to object-cover.',
            pt: 'Classes CSS extras mescladas no host. Imagens e vídeos dentro usam object-cover.',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
  ],
};
