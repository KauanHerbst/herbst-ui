import {
  HbDemoFormBasicComponent,
  HbDemoFormElementComponent,
  HbDemoFormGroupedComponent,
} from '../demos/form';
import * as basicSource from '../demos/form/form-basic' with { loader: 'text' };
import * as elementSource from '../demos/form/form-element' with { loader: 'text' };
import * as groupedSource from '../demos/form/form-grouped' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const formDoc: ComponentDoc = {
  slug: 'form',
  title: 'Form',
  description: {
    en: 'A thin layout wrapper for fields. Applies vertical rhythm to any native <form> (or a standalone <hb-form>), so fields, groups, and actions stack with consistent spacing.',
    pt: 'Um wrapper de layout leve para campos. Aplica ritmo vertical a qualquer <form> nativo (ou a um <hb-form> autônomo), fazendo campos, grupos e ações empilharem com espaçamento consistente.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Basic form', pt: 'Formulário básico' },
      component: HbDemoFormBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'grouped',
      title: { en: 'Fieldset & groups', pt: 'Fieldset e grupos' },
      component: HbDemoFormGroupedComponent,
      source: sourceText(groupedSource),
      align: 'start',
    },
    {
      id: 'element',
      title: { en: 'Element selector & spacing', pt: 'Seletor de elemento e espaçamento' },
      component: HbDemoFormElementComponent,
      source: sourceText(elementSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-form',
      rows: [
        {
          property: 'selector',
          description: {
            en: 'Attach to a native <form hb-form> to keep submit behaviour, or use <hb-form> as a standalone container.',
            pt: 'Aplique num <form hb-form> nativo para manter o comportamento de submit, ou use <hb-form> como container autônomo.',
          },
          type: `form[hb-form] | hb-form`,
          default: '—',
        },
        {
          property: '[class]',
          description: {
            en: 'Extra classes merged over the base flex flex-col gap-6 layout — override the gap or add width, padding, etc.',
            pt: 'Classes extras mescladas sobre o layout base flex flex-col gap-6 — sobrescreva o gap ou adicione largura, padding, etc.',
          },
          type: 'ClassValue',
          default: `''`,
        },
        {
          property: 'exportAs',
          description: {
            en: 'Reference the component in the template as #ref="hbForm".',
            pt: 'Referencie o componente no template como #ref="hbForm".',
          },
          type: `'hbForm'`,
          default: '—',
        },
      ],
    },
  ],
};
