import {
  HbDemoSegmentedBasicComponent,
  HbDemoSegmentedIconsComponent,
  HbDemoSegmentedSizesComponent,
} from '../demos/segmented';
import * as basicSource from '../demos/segmented/segmented-basic' with { loader: 'text' };
import * as iconsSource from '../demos/segmented/segmented-icons' with { loader: 'text' };
import * as sizesSource from '../demos/segmented/segmented-sizes' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const segmentedDoc: ComponentDoc = {
  slug: 'segmented',
  title: 'Segmented',
  description: {
    en: 'A compact single-choice switch. Feed options as data or declare them as items, bind the value, add icons, size it, stretch it full width, and disable the whole control or single options. Arrow keys move the selection.',
    pt: 'Um seletor de escolha única compacto. Passe opções como dados ou declare-as como itens, vincule o valor, adicione ícones, dimensione, estique à largura total, e desabilite o controle inteiro ou opções individuais. As setas movem a seleção.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Options & value', pt: 'Opções e valor' },
      component: HbDemoSegmentedBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'icons',
      title: { en: 'Declarative items & icons', pt: 'Itens declarativos e ícones' },
      component: HbDemoSegmentedIconsComponent,
      source: sourceText(iconsSource),
      align: 'start',
    },
    {
      id: 'sizes',
      title: { en: 'Sizes, fluid & disabled', pt: 'Tamanhos, fluido e desabilitado' },
      component: HbDemoSegmentedSizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-segmented',
      rows: [
        {
          property: '[hbOptions]',
          description: {
            en: 'The choices as data. Each is { value, label, disabled?, icon? }. Omit to declare hb-segmented-item children instead.',
            pt: 'As escolhas como dados. Cada uma é { value, label, disabled?, icon? }. Omita para declarar filhos hb-segmented-item.',
          },
          type: 'HbSegmentedOption[]',
          default: '[]',
        },
        {
          property: '[(hbValue)]',
          description: {
            en: 'The selected value, two-way bound. Also works as a form control via ngModel / formControl.',
            pt: 'O valor selecionado, bidirecional. Também funciona como controle de formulário via ngModel / formControl.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'The control height and text scale.',
            pt: 'A altura do controle e a escala do texto.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbFluid]',
          description: {
            en: 'Stretch to the full container width, dividing it equally between options.',
            pt: 'Estica até a largura total do container, dividindo-a igualmente entre as opções.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Disable the whole control.',
            pt: 'Desabilita o controle inteiro.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbAriaLabel]',
          description: {
            en: 'The accessible label for the radiogroup.',
            pt: 'O rótulo acessível para o radiogroup.',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
    {
      title: 'hb-segmented-item',
      rows: [
        {
          property: '[value]',
          description: {
            en: 'The value contributed by this option (required).',
            pt: 'O valor contribuído por esta opção (obrigatório).',
          },
          type: 'string',
          default: 'required',
        },
        {
          property: '[label] / [hbIcon]',
          description: {
            en: 'The visible text and an optional leading icon name.',
            pt: 'O texto visível e um nome de ícone opcional à frente.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Disable this single option.',
            pt: 'Desabilita esta opção.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
  ],
};
