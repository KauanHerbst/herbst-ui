import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export function stripJsonComments(text: string): string {
  return text.replace(
    /"(?:\\.|[^"\\])*"|(\/\/[^\n\r]*|\/\*[\s\S]*?\*\/)/g,
    (match, comment) => (comment ? ' ' : match),
  );
}

export async function patchTsconfigPaths(
  cwd: string,
  alias: string,
  componentsDir: string,
): Promise<void> {
  const file = join(cwd, 'tsconfig.json');
  const raw = await readFile(file, 'utf8');
  const json = JSON.parse(stripJsonComments(raw)) as {
    compilerOptions?: { paths?: Record<string, string[]> };
  };
  json.compilerOptions ??= {};
  json.compilerOptions.paths ??= {};
  json.compilerOptions.paths[`${alias}/*`] = [`${componentsDir}/*`];
  await writeFile(file, JSON.stringify(json, null, 2) + '\n');
}
