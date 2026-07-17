import {
  HbDemoAlertActionComponent,
  HbDemoAlertBasicComponent,
  HbDemoAlertIconComponent,
  HbDemoAlertMinimalComponent,
  HbDemoAlertTypesComponent,
} from '../demos/alert';
import * as actionSource from '../demos/alert/alert-action' with { loader: 'text' };
import * as basicSource from '../demos/alert/alert-basic' with { loader: 'text' };
import * as iconSource from '../demos/alert/alert-icon' with { loader: 'text' };
import * as minimalSource from '../demos/alert/alert-minimal' with { loader: 'text' };
import * as typesSource from '../demos/alert/alert-types' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const alertDoc: ComponentDoc = {
  slug: 'alert',
  title: 'Alert',
  description: {
    en: 'A bordered callout that draws the eye to a short, standing message — a status, a note, or an outcome — with an optional leading icon and a trailing action.',
    pt: 'Um aviso emoldurado que chama a atenção para uma mensagem curta e permanente — um status, uma nota ou um resultado — com ícone inicial opcional e uma ação à direita.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Basic', pt: 'Básico' },
      component: HbDemoAlertBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'types',
      title: { en: 'Types', pt: 'Tipos' },
      component: HbDemoAlertTypesComponent,
      source: sourceText(typesSource),
      align: 'start',
    },
    {
      id: 'icon',
      title: { en: 'Custom & hidden icon', pt: 'Ícone personalizado e oculto' },
      component: HbDemoAlertIconComponent,
      source: sourceText(iconSource),
      align: 'start',
    },
    {
      id: 'action',
      title: { en: 'With action', pt: 'Com ação' },
      component: HbDemoAlertActionComponent,
      source: sourceText(actionSource),
      align: 'start',
    },
    {
      id: 'minimal',
      title: { en: 'Title or description only', pt: 'Só título ou só descrição' },
      component: HbDemoAlertMinimalComponent,
      source: sourceText(minimalSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-alert',
      rows: [
        {
          property: '[hbType]',
          description: {
            en: 'Status colour applied to the left border, icon, and title.',
            pt: 'Cor de status aplicada à borda esquerda, ao ícone e ao título.',
          },
          type: `'default' | 'success' | 'warning' | 'destructive'`,
          default: `'default'`,
        },
        {
          property: '[hbTitle]',
          description: {
            en: 'Bold heading line shown above the description.',
            pt: 'Linha de título em negrito exibida acima da descrição.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbDescription]',
          description: {
            en: 'Muted body text shown below the title.',
            pt: 'Texto de corpo em tom suave exibido abaixo do título.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbIcon]',
          description: {
            en: `Leading icon name. Empty uses the type's default icon; 'none' hides it.`,
            pt: `Nome do ícone inicial. Vazio usa o ícone padrão do tipo; 'none' o oculta.`,
          },
          type: 'string',
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
        {
          property: '[hbAlertAction]',
          description: {
            en: 'Projected content aligned to the trailing edge, such as an action button.',
            pt: 'Conteúdo projetado alinhado à direita, como um botão de ação.',
          },
          type: 'slot',
          default: '—',
        },
      ],
    },
  ],
};
