import type { RegistryIndexEntry } from '../types';

export function resolveGraph(names: string[], index: RegistryIndexEntry[]): string[] {
  const byName = new Map(index.map((e) => [e.name, e]));
  const ordered: string[] = [];
  const seen = new Set<string>();
  const stack = new Set<string>();

  function visit(name: string): void {
    if (seen.has(name)) return;
    const entry = byName.get(name);
    if (!entry) throw new Error(`Component "${name}" not found in registry`);
    if (stack.has(name)) return;
    stack.add(name);
    for (const dep of entry.registryDependencies) visit(dep);
    stack.delete(name);
    seen.add(name);
    ordered.push(name);
  }

  for (const name of names) visit(name);
  return ordered;
}
