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
