import {
  HbDemoStepperBasicComponent,
  HbDemoStepperLinearComponent,
  HbDemoStepperVerticalComponent,
} from '../demos/stepper';
import * as basicSource from '../demos/stepper/stepper-basic' with { loader: 'text' };
import * as linearSource from '../demos/stepper/stepper-linear' with { loader: 'text' };
import * as verticalSource from '../demos/stepper/stepper-vertical' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const stepperDoc: ComponentDoc = {
  slug: 'stepper',
  title: 'Stepper',
  description: {
    en: 'A step-by-step progress indicator. Declare steps with titles, descriptions, and icons, render per-step content, bind the active step, move between steps, enforce a linear flow, and lay it out horizontally or vertically.',
    pt: 'Um indicador de progresso passo a passo. Declare passos com títulos, descrições e ícones, renderize conteúdo por passo, vincule o passo ativo, navegue entre passos, imponha um fluxo linear, e disponha-o horizontal ou verticalmente.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Steps & content', pt: 'Passos e conteúdo' },
      component: HbDemoStepperBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'linear',
      title: { en: 'Linear, icons & external nav', pt: 'Linear, ícones e navegação externa' },
      component: HbDemoStepperLinearComponent,
      source: sourceText(linearSource),
      align: 'start',
    },
    {
      id: 'vertical',
      title: { en: 'Vertical & disabled', pt: 'Vertical e desabilitado' },
      component: HbDemoStepperVerticalComponent,
      source: sourceText(verticalSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-stepper',
      rows: [
        {
          property: '[(hbValue)]',
          description: {
            en: 'The active step value (defaults to each step’s index+1), two-way bound.',
            pt: 'O valor do passo ativo (padrão é o índice+1 de cada passo), bidirecional.',
          },
          type: 'number | string',
          default: '1',
        },
        {
          property: '[hbOrientation]',
          description: {
            en: 'Lay the steps out in a row (content below) or a column (content inline).',
            pt: 'Dispõe os passos em linha (conteúdo abaixo) ou coluna (conteúdo inline).',
          },
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
        },
        {
          property: '[hbLinear]',
          description: {
            en: 'Only allow moving to the current or earlier steps; future steps are not clickable.',
            pt: 'Permite ir apenas para o passo atual ou anteriores; passos futuros não são clicáveis.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: 'exportAs "hbStepper"',
          description: {
            en: 'Reference the instance to call next(), prev(), activate(value), and read isFirst(), isLast(), activeIndex().',
            pt: 'Referencie a instância para chamar next(), prev(), activate(value), e ler isFirst(), isLast(), activeIndex().',
          },
          type: 'methods / signals',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-step',
      rows: [
        {
          property: '[hbTitle] / [hbDescription]',
          description: {
            en: 'The step label and its supporting text.',
            pt: 'O rótulo do passo e seu texto de apoio.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbValue]',
          description: {
            en: 'The value this step activates (defaults to its index+1).',
            pt: 'O valor que este passo ativa (padrão é seu índice+1).',
          },
          type: 'number | string',
          default: 'index + 1',
        },
        {
          property: '[hbIcon] / [hbDisabled]',
          description: {
            en: 'A marker icon (a check shows automatically once completed), and a disabled state.',
            pt: 'Um ícone de marcador (um check aparece automaticamente ao concluir), e um estado desabilitado.',
          },
          type: 'string / boolean',
          default: '— / false',
        },
        {
          property: 'ng-template[hbStepContent]',
          description: {
            en: 'The panel for this step. Context: $implicit = { active, index, isFirst, isLast, next(), prev(), activate() }.',
            pt: 'O painel deste passo. Contexto: $implicit = { active, index, isFirst, isLast, next(), prev(), activate() }.',
          },
          type: 'template',
          default: '—',
        },
      ],
    },
  ],
};
