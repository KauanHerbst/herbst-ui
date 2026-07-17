import { RenderMode, ServerRoute } from '@angular/ssr';

import { COMPONENT_NAMES } from './docs/docs-nav';

const LANGS = ['en', 'pt'];
const PAGES = [
  'introduction',
  'installation',
  'cli',
  'dark-mode',
  'contributing',
  'theme',
  'colors',
  'components',
];

const langParams = async () => LANGS.map((lang) => ({ lang }));

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  ...PAGES.map((page) => ({
    path: `:lang/docs/${page}`,
    renderMode: RenderMode.Prerender as const,
    getPrerenderParams: langParams,
  })),
  {
    path: ':lang/docs/components/:name',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      LANGS.flatMap((lang) => COMPONENT_NAMES.map((name) => ({ lang, name }))),
  },
  { path: '**', renderMode: RenderMode.Client },
];
