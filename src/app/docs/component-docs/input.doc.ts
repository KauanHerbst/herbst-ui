import {
  HbDemoInputDirectivesComponent,
  HbDemoInputSizesComponent,
  HbDemoInputStatusComponent,
} from '../demos/input';
import * as directivesSource from '../demos/input/input-directives' with { loader: 'text' };
import * as sizesSource from '../demos/input/input-sizes' with { loader: 'text' };
import * as statusSource from '../demos/input/input-status' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const inputDoc: ComponentDoc = {
  slug: 'input',
  title: 'Input',
  description: {
    en: 'A directive that styles native <input> and <textarea> elements. Pick a size, signal validation status, toggle the border and focus ring, and layer on numeric, currency, or mask directives for constrained entry.',
    pt: 'Uma diretiva que estiliza elementos nativos <input> e <textarea>. Escolha um tamanho, sinalize o status de validação, alterne a borda e o anel de foco, e adicione diretivas numérica, de moeda ou de máscara para entrada restrita.',
  },
  demos: [
    {
      id: 'sizes',
      title: { en: 'Sizes, fluid & textarea', pt: 'Tamanhos, fluido e textarea' },
      component: HbDemoInputSizesComponent,
      source: sourceText(sizesSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'status',
      title: { en: 'Status, ring & borderless', pt: 'Status, anel e sem borda' },
      component: HbDemoInputStatusComponent,
      source: sourceText(statusSource),
      align: 'start',
    },
    {
      id: 'directives',
      title: { en: 'Numeric, currency & mask', pt: 'Numérico, moeda e máscara' },
      component: HbDemoInputDirectivesComponent,
      source: sourceText(directivesSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'input[hb-input] / textarea[hb-input]',
      rows: [
        {
          property: '[hbSize]',
          description: {
            en: 'Control height and text scale.',
            pt: 'Controla a altura e a escala do texto.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbStatus]',
          description: {
            en: 'Validation colouring for the border and focus ring.',
            pt: 'Coloração de validação para a borda e o anel de foco.',
          },
          type: `'default' | 'success' | 'warning' | 'error'`,
          default: `'default'`,
        },
        {
          property: '[hbInvalid]',
          description: {
            en: 'Set aria-invalid and apply the destructive styling, independent of hbStatus.',
            pt: 'Define aria-invalid e aplica o estilo destrutivo, independente de hbStatus.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbBorderless]',
          description: {
            en: 'Drop the border, background, and shadow — for embedding in groups.',
            pt: 'Remove a borda, o fundo e a sombra — para embutir em grupos.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbRing]',
          description: {
            en: 'Toggle the focus-visible ring.',
            pt: 'Alterna o anel de foco-visível.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbFluid]',
          description: {
            en: 'Stretch to the full width of the container instead of sizing to content.',
            pt: 'Estica até a largura total do container em vez de dimensionar ao conteúdo.',
          },
          type: 'boolean',
          default: 'false',
        },
      ],
    },
    {
      title: 'Companion directives',
      rows: [
        {
          property: 'input[hbNumeric]',
          description: {
            en: 'Restrict typing to digits. [hbSign] = both | positive | negative, [hbDecimal] allows one dot.',
            pt: 'Restringe a digitação a dígitos. [hbSign] = both | positive | negative, [hbDecimal] permite um ponto.',
          },
          type: 'directive',
          default: `hbSign 'both', hbDecimal false`,
        },
        {
          property: 'input[hbCurrency]',
          description: {
            en: 'Format as currency while typing. [hbCurrency] code, [hbLocale], and two-way [(hbCurrencyValue)] as a number.',
            pt: 'Formata como moeda ao digitar. Código [hbCurrency], [hbLocale] e [(hbCurrencyValue)] bidirecional como número.',
          },
          type: 'directive',
          default: `hbCurrency 'USD'`,
        },
        {
          property: 'input[hbMask]',
          description: {
            en: 'Reject input that does not match the pattern. [hbMask] takes a string or RegExp.',
            pt: 'Rejeita entrada que não corresponde ao padrão. [hbMask] aceita uma string ou RegExp.',
          },
          type: 'directive',
          default: `''`,
        },
      ],
    },
  ],
};
