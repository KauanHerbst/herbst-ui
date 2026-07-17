import {
  HbDemoResizableBasicComponent,
  HbDemoResizableConstraintsComponent,
  HbDemoResizableVerticalComponent,
} from '../demos/resizable';
import * as basicSource from '../demos/resizable/resizable-basic' with { loader: 'text' };
import * as constraintsSource from '../demos/resizable/resizable-constraints' with {
  loader: 'text',
};
import * as verticalSource from '../demos/resizable/resizable-vertical' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const resizableDoc: ComponentDoc = {
  slug: 'resizable',
  title: 'Resizable',
  description: {
    en: 'Draggable split panes. Lay panels out horizontally or vertically, drag or keyboard the handles between them, set default sizes and min/max limits, allow panels to collapse, and read the sizes as they change.',
    pt: 'Painéis divididos arrastáveis. Disponha os painéis horizontal ou verticalmente, arraste ou use o teclado nos handles entre eles, defina tamanhos padrão e limites min/max, permita que painéis colapsem, e leia os tamanhos conforme mudam.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Two panels', pt: 'Dois painéis' },
      component: HbDemoResizableBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'vertical',
      title: { en: 'Vertical & grip handle', pt: 'Vertical e handle com grip' },
      component: HbDemoResizableVerticalComponent,
      source: sourceText(verticalSource),
      align: 'start',
    },
    {
      id: 'constraints',
      title: { en: 'Limits, collapse & events', pt: 'Limites, colapso e eventos' },
      component: HbDemoResizableConstraintsComponent,
      source: sourceText(constraintsSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-resizable-group',
      rows: [
        {
          property: '[hbOrientation]',
          description: {
            en: 'Split the panels side by side or stacked. The group needs a fixed width or height.',
            pt: 'Divide os painéis lado a lado ou empilhados. O grupo precisa de largura ou altura fixa.',
          },
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
        },
        {
          property: '[hbKeyboardStep]',
          description: {
            en: 'Percentage moved per arrow-key press on a focused handle (Home/End jump to min/max).',
            pt: 'Percentual movido por tecla de seta num handle focado (Home/End vão ao mín/máx).',
          },
          type: 'number',
          default: '5',
        },
        {
          property: '(hbResizeStart) / (hbResize) / (hbResizeEnd)',
          description: {
            en: 'Emit an { sizes, orientation } event at the start, during, and end of a resize.',
            pt: 'Emitem um evento { sizes, orientation } no início, durante e no fim de um redimensionamento.',
          },
          type: 'HbResizeEvent',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-resizable-panel',
      rows: [
        {
          property: '[hbDefaultSize]',
          description: {
            en: 'Initial size in percent. Panels without one share the remaining space equally.',
            pt: 'Tamanho inicial em percentual. Painéis sem ele dividem o espaço restante igualmente.',
          },
          type: 'number | string',
          default: 'auto',
        },
        {
          property: '[hbMin] / [hbMax]',
          description: {
            en: 'Lower and upper size bounds in percent while dragging.',
            pt: 'Limites inferior e superior de tamanho em percentual ao arrastar.',
          },
          type: 'number',
          default: '0 / 100',
        },
        {
          property: '[hbCollapsible]',
          description: {
            en: 'Allow the panel to shrink all the way to 0, ignoring hbMin.',
            pt: 'Permite o painel encolher até 0, ignorando hbMin.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
    {
      title: 'hb-resizable-handle',
      rows: [
        {
          property: '[hbWithHandle]',
          description: {
            en: 'Show a visible grip in the middle of the divider.',
            pt: 'Mostra um grip visível no meio do divisor.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Lock this divider so its two panels cannot be resized.',
            pt: 'Trava este divisor para que seus dois painéis não sejam redimensionados.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
  ],
};
