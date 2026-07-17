import { readFile, writeFile } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import type { HerbstConfig } from '../types';

export async function ensureImports(cwd: string, config: HerbstConfig): Promise<void> {
  const stylesAbs = join(cwd, config.stylesPath);
  const themeAbs = join(cwd, config.componentsDir, 'theme.css');
  let themeRel = relative(dirname(stylesAbs), themeAbs).split('\\').join('/');
  if (!themeRel.startsWith('.')) themeRel = `./${themeRel}`;

  let css = await readFile(stylesAbs, 'utf8');
  const lines: string[] = [];
  if (!css.includes("@import 'tailwindcss';")) lines.push("@import 'tailwindcss';");
  if (!css.includes(`@import '${themeRel}';`)) lines.push(`@import '${themeRel}';`);
  if (lines.length === 0) return;

  css = lines.join('\n') + '\n' + css;
  await writeFile(stylesAbs, css);
}
