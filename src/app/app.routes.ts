import { inject } from '@angular/core';
import {
  type ActivatedRouteSnapshot,
  type CanMatchFn,
  type ResolveFn,
  type Routes,
} from '@angular/router';
import { catchError, of } from 'rxjs';

import { DocContentService } from './docs/doc-content.service';
import { isLocale, preferredLocale } from './docs/locale.service';

const langMatch: CanMatchFn = (_route, segments) => isLocale(segments[0]?.path);

const MARKDOWN_SLUGS = ['introduction', 'installation', 'cli', 'dark-mode', 'contributing'];

const markdownResolver: ResolveFn<string | null> = (route: ActivatedRouteSnapshot) => {
  const lang = route.pathFromRoot.map((r) => r.params['lang']).find(isLocale);
  return inject(DocContentService)
    .loadRaw(route.data['slug'] as string, lang ?? 'en')
    .pipe(catchError(() => of(null)));
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing/landing.component').then((m) => m.Landing),
  },
  {
    path: ':lang/docs',
    canMatch: [langMatch],
    loadComponent: () => import('./docs/docs-layout.component').then((m) => m.DocsLayoutComponent),
    children: [
      { path: '', redirectTo: 'introduction', pathMatch: 'full' },
      ...MARKDOWN_SLUGS.map((slug) => ({
        path: slug,
        loadComponent: () =>
          import('./docs/pages/markdown-page.component').then((m) => m.MarkdownPageComponent),
        data: { slug },
        resolve: { markdown: markdownResolver },
      })),
      {
        path: 'theme',
        loadComponent: () =>
          import('./docs/pages/theme-page.component').then((m) => m.ThemePageComponent),
      },
      {
        path: 'colors',
        loadComponent: () =>
          import('./docs/pages/colors-page.component').then((m) => m.ColorsPageComponent),
      },
      {
        path: 'components',
        loadComponent: () =>
          import('./docs/pages/components-index.component').then((m) => m.ComponentsIndexComponent),
      },
      {
        path: 'components/:name',
        loadComponent: () =>
          import('./docs/pages/component-doc-page.component').then(
            (m) => m.ComponentDocPageComponent,
          ),
      },
    ],
  },
  { path: 'docs', redirectTo: () => `/${preferredLocale()}/docs` },
  {
    path: '**',
    loadComponent: () =>
      import('./docs/pages/not-found.component').then((m) => m.NotFoundComponent),
  },
];
