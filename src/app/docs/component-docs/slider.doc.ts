import {
  HbDemoSliderBasicComponent,
  HbDemoSliderMarksComponent,
  HbDemoSliderRangeComponent,
} from '../demos/slider';
import * as basicSource from '../demos/slider/slider-basic' with { loader: 'text' };
import * as marksSource from '../demos/slider/slider-marks' with { loader: 'text' };
import * as rangeSource from '../demos/slider/slider-range' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const sliderDoc: ComponentDoc = {
  slug: 'slider',
  title: 'Slider',
  description: {
    en: 'A draggable value slider. Bind a single value or a range, set the bounds and step, show a tooltip and marks, format the display, orient it horizontally or vertically, and drive it as a form control.',
    pt: 'Um slider de valor arrastável. Vincule um valor único ou um intervalo, defina os limites e o passo, mostre um tooltip e marcações, formate a exibição, oriente-o horizontal ou verticalmente, e controle-o como um controle de formulário.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Single value & tooltip', pt: 'Valor único e tooltip' },
      component: HbDemoSliderBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'range',
      title: { en: 'Range, gap & format', pt: 'Intervalo, gap e formato' },
      component: HbDemoSliderRangeComponent,
      source: sourceText(rangeSource),
      align: 'start',
    },
    {
      id: 'marks',
      title: {
        en: 'Marks, sizes, vertical & disabled',
        pt: 'Marcações, tamanhos, vertical e desabilitado',
      },
      component: HbDemoSliderMarksComponent,
      source: sourceText(marksSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-slider — value',
      rows: [
        {
          property: '[(hbValue)]',
          description: {
            en: 'A number for a single thumb, or an array for a range. Two-way bound; also a form control.',
            pt: 'Um número para um thumb único, ou um array para um intervalo. Bidirecional; também um controle de formulário.',
          },
          type: 'number | number[]',
          default: 'null',
        },
        {
          property: '[hbDefaultValue]',
          description: {
            en: 'The initial value when hbValue is not bound (its arity also decides single vs range).',
            pt: 'O valor inicial quando hbValue não é vinculado (sua aridade também decide único vs intervalo).',
          },
          type: 'number | number[]',
          default: '—',
        },
        {
          property: '[hbMin] / [hbMax] / [hbStep]',
          description: {
            en: 'The value bounds and the increment values snap to.',
            pt: 'Os limites de valor e o incremento ao qual os valores se ajustam.',
          },
          type: 'number',
          default: '0 / 100 / 1',
        },
        {
          property: '[hbMinStepsBetweenThumbs]',
          description: {
            en: 'Minimum gap, in steps, kept between range thumbs.',
            pt: 'Espaço mínimo, em passos, mantido entre os thumbs de um intervalo.',
          },
          type: 'number',
          default: '0',
        },
        {
          property: '(hbChange) / (hbChangeEnd)',
          description: {
            en: 'Emit the value continuously while dragging, and once when the interaction ends.',
            pt: 'Emitem o valor continuamente ao arrastar, e uma vez ao fim da interação.',
          },
          type: 'number | number[]',
          default: '—',
        },
      ],
    },
    {
      title: 'hb-slider — appearance',
      rows: [
        {
          property: '[hbOrientation] / [hbInverted]',
          description: {
            en: 'Lay it out horizontally or vertically, and reverse the direction of travel.',
            pt: 'Dispõe-o horizontal ou verticalmente, e inverte o sentido do percurso.',
          },
          type: `'horizontal' | 'vertical' / boolean`,
          default: `'horizontal' / false`,
        },
        {
          property: '[hbSize] / [hbDisabled]',
          description: {
            en: 'Track and thumb size, and a disabled state.',
            pt: 'Tamanho da trilha e do thumb, e um estado desabilitado.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' / boolean`,
          default: `'md' / false`,
        },
        {
          property: '[hbTooltip] / [hbFormat]',
          description: {
            en: 'Show a value tooltip on the active thumb, and format the displayed value.',
            pt: 'Mostra um tooltip de valor no thumb ativo, e formata o valor exibido.',
          },
          type: 'boolean / (value: number) => string',
          default: 'false / —',
        },
        {
          property: '[hbMarks]',
          description: {
            en: 'Show tick marks: true steps them from min to max, or pass an array of values or { value, label } objects.',
            pt: 'Mostra marcações: true as distribui do mín ao máx, ou passe um array de valores ou objetos { value, label }.',
          },
          type: 'boolean | number[] | HbSliderMark[]',
          default: 'false',
        },
        {
          property: '[class] / [hbTrackClass] / [hbRangeClass] / [hbThumbClass]',
          description: {
            en: 'Class overrides for the root, track, filled range, and thumbs.',
            pt: 'Overrides de classe para a raiz, trilha, intervalo preenchido e thumbs.',
          },
          type: 'ClassValue',
          default: `''`,
        },
      ],
    },
  ],
};
