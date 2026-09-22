import { readFileSync, writeFileSync } from 'node:fs';

const SITE = process.env.SITE_URL ?? 'https://ui.kauanherbst.dev';
const OUT = 'dist/herbst-ds/browser/sitemap.xml';

const { routes } = JSON.parse(readFileSync('dist/herbst-ds/prerendered-routes.json', 'utf8'));
const paths = Object.keys(routes).sort();
const today = new Date().toISOString().slice(0, 10);

const alternates = (path) => {
  const match = /^\/(en|pt)(\/.*)?$/.exec(path);
  if (!match) return '';
  const rest = match[2] ?? '';
  return ['en', 'pt']
    .map((lang) => `\n    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE}/${lang}${rest}"/>`)
    .join('');
};

const urls = paths
  .map(
    (path) => `  <url>
    <loc>${SITE}${path === '/' ? '' : path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${path === '/' ? '1.0' : path.split('/').length > 4 ? '0.6' : '0.8'}</priority>${alternates(path)}
  </url>`,
  )
  .join('\n');

writeFileSync(
  OUT,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
);

console.log(`sitemap: ${paths.length} urls -> ${OUT}`);

const title = (slug) =>
  slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const docPages = paths.filter((p) => /^\/en\/docs\/[^/]+$/.test(p) && !p.endsWith('/components'));
const components = paths
  .filter((p) => /^\/en\/docs\/components\/[^/]+$/.test(p))
  .map((p) => p.split('/').pop());

const llms = `# Herbst UI

> Copy-and-paste Angular component library with the colors of a German autumn. More than ${components.length} components installed with the \`herbst-ui\` CLI: the source is copied into your project, styled by semantic CSS tokens and built with Angular signals.

## Docs

${docPages.map((p) => `- [${title(p.split('/').pop())}](${SITE}${p})`).join('\n')}
- [Components](${SITE}/en/docs/components): the full catalogue
- [Portuguese docs](${SITE}/pt/docs/introduction): same content in Brazilian Portuguese

## Install

- Run \`npx herbst-ui@latest init\` once, then \`npx herbst-ui@latest add <component>\`.
- [npm package](https://www.npmjs.com/package/herbst-ui)
- [Source code](https://github.com/KauanHerbst/herbst-ui)

## Components

${components.map((name) => `- [${title(name)}](${SITE}/en/docs/components/${name})`).join('\n')}
`;

writeFileSync('dist/herbst-ds/browser/llms.txt', llms);
console.log(`llms.txt: ${docPages.length + components.length} links`);
