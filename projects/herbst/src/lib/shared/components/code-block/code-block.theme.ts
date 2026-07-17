import type { ThemeRegistrationRaw } from 'shiki';

export const herbstShikiTheme: ThemeRegistrationRaw = {
  name: 'herbst',
  type: 'light',
  fg: 'var(--foreground)',
  bg: 'transparent',
  settings: [
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: { foreground: 'var(--muted-foreground)', fontStyle: 'italic' },
    },
    {
      scope: [
        'keyword',
        'keyword.control',
        'keyword.other',
        'storage',
        'storage.type',
        'storage.modifier',
        'modifier',
        'variable.language.this',
        'variable.language.super',
      ],
      settings: { foreground: 'var(--primary)' },
    },
    {
      scope: ['keyword.operator', 'keyword.operator.assignment', 'keyword.operator.arithmetic'],
      settings: { foreground: 'var(--muted-foreground)' },
    },
    {
      scope: [
        'string',
        'string.quoted',
        'string.template',
        'punctuation.definition.string',
        'constant.other.symbol',
      ],
      settings: { foreground: 'var(--success)' },
    },
    {
      scope: [
        'constant.numeric',
        'constant.language',
        'constant.language.boolean',
        'constant.language.null',
        'constant.language.undefined',
        'constant.other',
        'variable.other.constant',
      ],
      settings: { foreground: 'var(--warning)' },
    },
    {
      scope: [
        'entity.name.type',
        'entity.name.class',
        'entity.other.inherited-class',
        'support.type',
        'support.class',
        'entity.name.type.class',
      ],
      settings: { foreground: 'var(--warning)' },
    },
    {
      scope: [
        'entity.name.function',
        'support.function',
        'meta.function-call.method',
        'variable.function',
      ],
      settings: { foreground: 'var(--foreground)' },
    },
    {
      scope: ['entity.name.tag', 'punctuation.definition.tag', 'meta.tag'],
      settings: { foreground: 'var(--primary)' },
    },
    {
      scope: ['entity.other.attribute-name', 'meta.attribute'],
      settings: { foreground: 'var(--warning)' },
    },
    {
      scope: [
        'variable',
        'variable.other',
        'variable.parameter',
        'meta.definition.variable',
        'meta.object-literal.key',
        'support.type.property-name',
        'variable.other.property',
      ],
      settings: { foreground: 'var(--foreground)' },
    },
    {
      scope: [
        'punctuation',
        'meta.brace.round',
        'meta.brace.square',
        'meta.brace.curly',
        'punctuation.separator',
        'punctuation.terminator',
        'punctuation.accessor',
      ],
      settings: { foreground: 'var(--muted-foreground)' },
    },
    {
      scope: ['keyword.control.import', 'keyword.control.export', 'keyword.control.from'],
      settings: { foreground: 'var(--primary)' },
    },
    {
      scope: ['invalid', 'invalid.illegal'],
      settings: { foreground: 'var(--destructive)' },
    },
  ],
};
