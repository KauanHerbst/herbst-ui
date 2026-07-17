import {
  HbDemoAccordionBasicComponent,
  HbDemoAccordionDisabledComponent,
  HbDemoAccordionMultipleComponent,
  HbDemoAccordionNonCollapsibleComponent,
} from '../demos/accordion';
import * as basicSource from '../demos/accordion/accordion-basic' with { loader: 'text' };
import * as disabledSource from '../demos/accordion/accordion-disabled' with { loader: 'text' };
import * as multipleSource from '../demos/accordion/accordion-multiple' with { loader: 'text' };
import * as nonCollapsibleSource from '../demos/accordion/accordion-non-collapsible' with {
  loader: 'text',
};

import { sourceText, type ComponentDoc } from './component-doc.types';

export const accordionDoc: ComponentDoc = {
  slug: 'accordion',
  title: 'Accordion',
  description: {
    en: 'A vertically stacked set of headers that each reveal a section of content. Use it to fold long, secondary material into a calm surface the reader opens on demand.',
    pt: 'Um conjunto de cabeçalhos empilhados na vertical, cada um revelando uma seção de conteúdo. Use para recolher material longo e secundário numa superfície calma que o leitor abre quando quiser.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Basic', pt: 'Básico' },
      component: HbDemoAccordionBasicComponent,
      source: sourceText(basicSource),
      expanded: true,
    },
    {
      id: 'multiple',
      title: { en: 'Multiple', pt: 'Múltiplo' },
      component: HbDemoAccordionMultipleComponent,
      source: sourceText(multipleSource),
    },
    {
      id: 'non-collapsible',
      title: { en: 'Non-collapsible', pt: 'Não recolhível' },
      component: HbDemoAccordionNonCollapsibleComponent,
      source: sourceText(nonCollapsibleSource),
    },
    {
      id: 'disabled',
      title: { en: 'Card & disabled', pt: 'Card e desabilitado' },
      component: HbDemoAccordionDisabledComponent,
      source: sourceText(disabledSource),
    },
  ],
  api: [
    {
      title: 'hb-accordion',
      rows: [
        {
          property: '[hbType]',
          description: {
            en: 'Whether one or several items can be open at once.',
            pt: 'Se um ou vários itens podem ficar abertos ao mesmo tempo.',
          },
          type: `'single' | 'multiple'`,
          default: `'single'`,
        },
        {
          property: '[hbCollapsible]',
          description: {
            en: 'Allow the open item to be closed again (single mode).',
            pt: 'Permite fechar novamente o item aberto (modo single).',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbBordered]',
          description: {
            en: 'Border treatment around and between items.',
            pt: 'Tratamento das bordas ao redor e entre os itens.',
          },
          type: `'none' | 'divider' | 'card'`,
          default: `'divider'`,
        },
        {
          property: '[hbDefaultValue]',
          description: {
            en: 'Value(s) of the item(s) open on first render.',
            pt: 'Valor(es) do(s) item(ns) aberto(s) na primeira renderização.',
          },
          type: 'string | string[]',
          default: `''`,
        },
        {
          property: '[class]',
          description: {
            en: 'Extra CSS classes merged onto the host.',
            pt: 'Classes CSS extras mescladas no host.',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
    {
      title: 'hb-accordion-item',
      rows: [
        {
          property: '[hbTitle]',
          description: {
            en: 'Text shown in the item header.',
            pt: 'Texto exibido no cabeçalho do item.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbValue]',
          description: {
            en: 'Unique value identifying the item.',
            pt: 'Valor único que identifica o item.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Prevent the item from opening or closing.',
            pt: 'Impede o item de abrir ou fechar.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[class]',
          description: {
            en: 'Extra CSS classes merged onto the item.',
            pt: 'Classes CSS extras mescladas no item.',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
  ],
};
