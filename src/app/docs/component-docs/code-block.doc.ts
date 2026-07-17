import {
  HbDemoCodeBlockBasicComponent,
  HbDemoCodeBlockLanguagesComponent,
  HbDemoCodeBlockLinesComponent,
  HbDemoCodeBlockOptionsComponent,
} from '../demos/code-block';
import * as basicSource from '../demos/code-block/code-block-basic' with { loader: 'text' };
import * as languagesSource from '../demos/code-block/code-block-languages' with { loader: 'text' };
import * as linesSource from '../demos/code-block/code-block-lines' with { loader: 'text' };
import * as optionsSource from '../demos/code-block/code-block-options' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const codeBlockDoc: ComponentDoc = {
  slug: 'code-block',
  title: 'Code block',
  description: {
    en: 'Displays source code with Shiki syntax highlighting themed to the palette. It shows a filename header, a one-tap copy button, optional line numbers and highlights, and can wrap or scroll long content.',
    pt: 'Exibe código-fonte com realce de sintaxe do Shiki no tema da paleta. Mostra um cabeçalho com nome de arquivo, botão de copiar com um toque, numeração e realce de linhas opcionais, e pode quebrar ou rolar conteúdo longo.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Basic', pt: 'Básico' },
      component: HbDemoCodeBlockBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'lines',
      title: { en: 'Line numbers & highlights', pt: 'Numeração e realce de linhas' },
      component: HbDemoCodeBlockLinesComponent,
      source: sourceText(linesSource),
      align: 'start',
    },
    {
      id: 'languages',
      title: { en: 'Languages', pt: 'Linguagens' },
      component: HbDemoCodeBlockLanguagesComponent,
      source: sourceText(languagesSource),
      align: 'start',
    },
    {
      id: 'options',
      title: { en: 'No header, wrap & max height', pt: 'Sem cabeçalho, wrap e altura máxima' },
      component: HbDemoCodeBlockOptionsComponent,
      source: sourceText(optionsSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-code-block',
      rows: [
        {
          property: '[hbCode]',
          description: {
            en: 'Source code to render and copy.',
            pt: 'Código-fonte a renderizar e copiar.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbLanguage]',
          description: {
            en: 'Language for highlighting (ts, angular-ts, html, css, json, bash, …).',
            pt: 'Linguagem para o realce (ts, angular-ts, html, css, json, bash, …).',
          },
          type: 'HbCodeLanguage',
          default: `'ts'`,
        },
        {
          property: '[hbFilename]',
          description: {
            en: 'Name shown in the header (falls back to the language).',
            pt: 'Nome exibido no cabeçalho (usa a linguagem se vazio).',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbShowHeader]',
          description: {
            en: 'Show the header bar; when off, copy floats on hover.',
            pt: 'Mostra a barra de cabeçalho; se desligada, o copiar flutua no hover.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbCopyButton]',
          description: {
            en: 'Show the copy button.',
            pt: 'Mostra o botão de copiar.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbLineNumbers]',
          description: {
            en: 'Show a gutter with line numbers.',
            pt: 'Mostra uma coluna com números de linha.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbHighlightLines]',
          description: {
            en: 'Line numbers (1-based) to emphasise.',
            pt: 'Números de linha (base 1) a destacar.',
          },
          type: 'number[]',
          default: '[]',
        },
        {
          property: '[hbWrap]',
          description: {
            en: 'Wrap long lines instead of scrolling horizontally.',
            pt: 'Quebra linhas longas em vez de rolar na horizontal.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbMaxHeight]',
          description: {
            en: 'Max height in pixels before the block scrolls (0 = unlimited).',
            pt: 'Altura máxima em pixels antes de rolar (0 = sem limite).',
          },
          type: 'number',
          default: '0',
        },
        {
          property: '(hbCopy)',
          description: {
            en: 'Emitted when the code is copied.',
            pt: 'Emitido quando o código é copiado.',
          },
          type: 'void',
          default: '—',
        },
      ],
    },
  ],
};
