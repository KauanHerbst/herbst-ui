import { ALIAS_TOKEN, type RegistryFile } from '../types';

const SHARED_RE = /from (['"])\.\.\/\.\.\/(utils|core|services)\1/g;
const SIBLING_RE = /from (['"])\.\.\/([a-z][a-z0-9-]*)(?:\/[^'"]*)?\1/g;
const IMPORT_RE = /from (['"])([^'"]+)\1/g;

function packageName(spec: string): string {
  if (spec.startsWith('@')) {
    const parts = spec.split('/');
    return parts.slice(0, 2).join('/');
  }
  return spec.split('/')[0];
}

export interface AnalyzeResult {
  files: RegistryFile[];
  dependencies: string[];
  registryDependencies: string[];
}

export function analyzeComponent(
  name: string,
  sources: { file: string; content: string }[],
): AnalyzeResult {
  const registryDeps = new Set<string>();
  const npmDeps = new Set<string>();
  const files: RegistryFile[] = [];

  for (const source of sources) {
    let content = source.content.replace(SHARED_RE, (_m, q, mod) => {
      registryDeps.add(mod);
      return `from ${q}${ALIAS_TOKEN}/${mod}${q}`;
    });

    content = content.replace(SIBLING_RE, (_m, q, dep) => {
      registryDeps.add(dep);
      return `from ${q}${ALIAS_TOKEN}/${dep}${q}`;
    });

    let match: RegExpExecArray | null;
    IMPORT_RE.lastIndex = 0;
    while ((match = IMPORT_RE.exec(content)) !== null) {
      const spec = match[2];
      if (spec.startsWith('.')) continue;
      if (spec.startsWith(ALIAS_TOKEN)) continue;
      if (spec.startsWith('@angular') && !spec.startsWith('@angular/cdk')) continue;
      npmDeps.add(packageName(spec));
    }

    files.push({ path: `${name}/${source.file}`, content });
  }

  return {
    files,
    dependencies: [...npmDeps],
    registryDependencies: [...registryDeps],
  };
}
