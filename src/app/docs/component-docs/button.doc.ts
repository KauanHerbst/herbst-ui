import {
  HbDemoButtonIconsComponent,
  HbDemoButtonSizesComponent,
  HbDemoButtonStatesComponent,
  HbDemoButtonTypesComponent,
} from '../demos/button';
import * as iconsSource from '../demos/button/button-icons' with { loader: 'text' };
import * as sizesSource from '../demos/button/button-sizes' with { loader: 'text' };
import * as statesSource from '../demos/button/button-states' with { loader: 'text' };
import * as typesSource from '../demos/button/button-types' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const buttonDoc: ComponentDoc = {
  slug: 'button',
  title: 'Button',
  description: {
    en: 'A button for actions and links. It applies to <button> or <a> hosts, carries text and icons, and comes in eight tones, six sizes, three shapes, plus loading and full-width states.',
    pt: 'Um botão para ações e links. Aplica-se a hosts <button> ou <a>, carrega texto e ícones, e vem em oito tons, seis tamanhos, três formatos, além dos estados de carregamento e largura total.',
  },
  demos: [
    {
      id: 'types',
      title: { en: 'Types', pt: 'Tipos' },
      component: HbDemoButtonTypesComponent,
      source: sourceText(typesSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'sizes',
      title: { en: 'Sizes', pt: 'Tamanhos' },
      component: HbDemoButtonSizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
    },
    {
      id: 'icons',
      title: { en: 'Icons & shapes', pt: 'Ícones e formatos' },
      component: HbDemoButtonIconsComponent,
      source: sourceText(iconsSource),
      align: 'start',
    },
    {
      id: 'states',
      title: { en: 'States, anchor & full width', pt: 'Estados, âncora e largura total' },
      component: HbDemoButtonStatesComponent,
      source: sourceText(statesSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-button, button[hb-button], a[hb-button]',
      rows: [
        {
          property: '[hbType]',
          description: {
            en: 'Tone and emphasis of the button.',
            pt: 'Tom e ênfase do botão.',
          },
          type: `'default' | 'destructive' | 'warning' | 'success' | 'outline' | 'secondary' | 'ghost' | 'link'`,
          default: `'default'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Height and padding; icon is a square icon-only button.',
            pt: 'Altura e espaçamento; icon é um botão quadrado só de ícone.',
          },
          type: `'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'icon'`,
          default: `'default'`,
        },
        {
          property: '[hbShape]',
          description: {
            en: 'Corner style of the button.',
            pt: 'Estilo dos cantos do botão.',
          },
          type: `'default' | 'circle' | 'square'`,
          default: `'default'`,
        },
        {
          property: '[hbFull]',
          description: {
            en: 'Stretch to the full width of the container.',
            pt: 'Estica para a largura total do contêiner.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbLoading]',
          description: {
            en: 'Show a spinner and block interaction.',
            pt: 'Mostra um spinner e bloqueia a interação.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Disable the button.',
            pt: 'Desabilita o botão.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[class]',
          description: {
            en: 'Extra CSS classes. Projected content (text and icons) fills the button.',
            pt: 'Classes CSS extras. O conteúdo projetado (texto e ícones) preenche o botão.',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
  ],
};
