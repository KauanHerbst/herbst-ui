import { describe, expect, it } from 'vitest';

import { routes } from './app.routes';
import { serverRoutes } from './app.routes.server';

describe('prerender coverage', () => {
  it('has a server route for every docs child route', () => {
    const docs = routes.find((route) => route.path === ':lang/docs');
    const children = (docs?.children ?? [])
      .map((child) => child.path)
      .filter((path): path is string => !!path);
    const serverPaths = serverRoutes.map((route) => route.path);

    expect(children.length).toBeGreaterThan(0);
    for (const child of children) {
      expect(serverPaths).toContain(`:lang/docs/${child}`);
    }
  });

  it('prerenders the landing page and keeps a client fallback', () => {
    const serverPaths = serverRoutes.map((route) => route.path);
    expect(serverPaths).toContain('');
    expect(serverPaths).toContain('**');
  });
});
