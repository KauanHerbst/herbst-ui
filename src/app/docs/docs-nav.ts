export interface DocsNavGroup {
  key: string;
  slugs: string[];
}

export const DOCS_GROUPS: DocsNavGroup[] = [
  {
    key: 'group.gettingStarted',
    slugs: ['introduction', 'installation', 'cli', 'dark-mode', 'contributing'],
  },
  { key: 'group.styling', slugs: ['theme', 'colors'] },
];

export const COMPONENT_NAMES: readonly string[] = [
  'accordion',
  'alert',
  'alert-dialog',
  'aspect-ratio',
  'attachment',
  'avatar',
  'badge',
  'block-ui',
  'breadcrumb',
  'bubble',
  'button',
  'button-group',
  'calendar',
  'card',
  'carousel',
  'chart',
  'checkbox',
  'chip',
  'code-block',
  'combobox',
  'command',
  'date-picker',
  'divider',
  'drawer',
  'empty',
  'field',
  'file-upload',
  'form',
  'gallery',
  'hover-card',
  'inplace',
  'input',
  'input-group',
  'input-otp',
  'item',
  'kbd',
  'layout',
  'marker',
  'menu',
  'message',
  'message-scroller',
  'meter-group',
  'navigation-menu',
  'org-chart',
  'pagination',
  'panel',
  'popover',
  'progress',
  'radio',
  'resizable',
  'scroll-area',
  'segmented',
  'select',
  'sheet',
  'sidebar',
  'skeleton',
  'slider',
  'speed-dial',
  'spinner',
  'stepper',
  'switch',
  'table',
  'tabs',
  'timeline',
  'toast',
  'toggle',
  'tooltip',
  'tree',
  'typography',
];

export const ALL_DOC_SLUGS: readonly string[] = [
  ...DOCS_GROUPS.flatMap((group) => group.slugs),
  ...COMPONENT_NAMES,
];

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
