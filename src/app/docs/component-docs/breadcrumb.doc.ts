import {
  HbDemoBreadcrumbAppearanceComponent,
  HbDemoBreadcrumbBasicComponent,
  HbDemoBreadcrumbCollapsedComponent,
  HbDemoBreadcrumbSeparatorsComponent,
} from '../demos/breadcrumb';
import * as appearanceSource from '../demos/breadcrumb/breadcrumb-appearance' with {
  loader: 'text',
};
import * as basicSource from '../demos/breadcrumb/breadcrumb-basic' with { loader: 'text' };
import * as collapsedSource from '../demos/breadcrumb/breadcrumb-collapsed' with { loader: 'text' };
import * as separatorsSource from '../demos/breadcrumb/breadcrumb-separators' with {
  loader: 'text',
};

import { sourceText, type ComponentDoc } from './component-doc.types';

export const breadcrumbDoc: ComponentDoc = {
  slug: 'breadcrumb',
  title: 'Breadcrumb',
  description: {
    en: 'A trail of links showing where a page sits in the hierarchy. Items link, route, or emit a click; the trail can collapse long paths and use any separator.',
    pt: 'Uma trilha de links mostrando onde uma página está na hierarquia. Os itens linkam, roteiam ou emitem clique; a trilha pode recolher caminhos longos e usar qualquer separador.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Basic', pt: 'Básico' },
      component: HbDemoBreadcrumbBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'separators',
      title: { en: 'Separators', pt: 'Separadores' },
      component: HbDemoBreadcrumbSeparatorsComponent,
      source: sourceText(separatorsSource),
      align: 'start',
    },
    {
      id: 'collapsed',
      title: { en: 'Collapsed (max items)', pt: 'Recolhido (máx. de itens)' },
      component: HbDemoBreadcrumbCollapsedComponent,
      source: sourceText(collapsedSource),
      align: 'start',
    },
    {
      id: 'appearance',
      title: { en: 'Size & alignment', pt: 'Tamanho e alinhamento' },
      component: HbDemoBreadcrumbAppearanceComponent,
      source: sourceText(appearanceSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-breadcrumb',
      rows: [
        {
          property: '[hbSize]',
          description: {
            en: 'Text scale of the whole trail.',
            pt: 'Escala de texto de toda a trilha.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbAlign]',
          description: {
            en: 'Horizontal alignment of the trail.',
            pt: 'Alinhamento horizontal da trilha.',
          },
          type: `'start' | 'center' | 'end'`,
          default: `'start'`,
        },
        {
          property: '[hbWrap]',
          description: {
            en: 'Allow the trail to wrap onto multiple lines.',
            pt: 'Permite a trilha quebrar em várias linhas.',
          },
          type: `'wrap' | 'nowrap'`,
          default: `'wrap'`,
        },
        {
          property: '[hbSeparator]',
          description: {
            en: 'Separator string between items (e.g. "/"). Overridden by a template separator.',
            pt: 'String separadora entre itens (ex. "/"). Sobreposta por um separador de template.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbMaxItems]',
          description: {
            en: 'Collapse the middle items into an ellipsis when the count exceeds this.',
            pt: 'Recolhe os itens do meio numa elipse quando a contagem excede este valor.',
          },
          type: 'number | null',
          default: 'null',
        },
        {
          property: '[hbBreadcrumbSeparator]',
          description: {
            en: 'Template directive for a custom separator (e.g. an icon).',
            pt: 'Diretiva de template para um separador personalizado (ex. um ícone).',
          },
          type: 'template',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-breadcrumb-item',
      rows: [
        {
          property: '[hbLink]',
          description: {
            en: 'Router link path for internal navigation.',
            pt: 'Caminho de routerLink para navegação interna.',
          },
          type: 'string | string[] | null',
          default: 'null',
        },
        {
          property: '[hbHref]',
          description: {
            en: 'Plain href for an external link.',
            pt: 'href simples para um link externo.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbQueryParams]',
          description: {
            en: 'Query params passed with hbLink.',
            pt: 'Query params passados com hbLink.',
          },
          type: 'Params | null | undefined',
          default: 'undefined',
        },
        {
          property: '[hbFragment]',
          description: {
            en: 'URL fragment passed with hbLink.',
            pt: 'Fragmento de URL passado com hbLink.',
          },
          type: 'string | undefined',
          default: 'undefined',
        },
        {
          property: '[hbCurrent]',
          description: {
            en: 'Mark the item as the current page (not a link).',
            pt: 'Marca o item como a página atual (não é um link).',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbLabel]',
          description: {
            en: 'Label text, as an alternative to projected content.',
            pt: 'Texto do rótulo, como alternativa ao conteúdo projetado.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '(hbClick)',
          description: {
            en: 'Emitted when the item is activated.',
            pt: 'Emitido quando o item é ativado.',
          },
          type: 'void',
          default: '—',
        },
      ],
    },
  ],
};
