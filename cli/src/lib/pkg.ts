import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

export type PM = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function detectPackageManager(cwd: string): PM {
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn';
  if (existsSync(join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
}

export function angularMajor(cwd: string): string | null {
  const file = join(cwd, 'package.json');
  if (!existsSync(file)) return null;
  try {
    const pkg = JSON.parse(readFileSync(file, 'utf8'));
    const range = pkg.dependencies?.['@angular/core'] ?? pkg.devDependencies?.['@angular/core'];
    const major = String(range ?? '').match(/(\d+)/);
    return major ? major[1] : null;
  } catch {
    return null;
  }
}

export function pinAngularDeps(deps: string[], cwd: string): string[] {
  const major = angularMajor(cwd);
  if (!major) return deps;
  return deps.map((dep) =>
    dep.startsWith('@angular/') && dep.indexOf('@', 1) === -1 ? `${dep}@^${major}` : dep,
  );
}

export function installArgs(pm: PM, deps: string[]): string[] {
  const verb = pm === 'npm' ? 'install' : 'add';
  return [verb, ...deps];
}

export function runInstall(pm: PM, deps: string[], cwd: string): void {
  if (deps.length === 0) return;
  execSync([pm, ...installArgs(pm, pinAngularDeps(deps, cwd))].join(' '), {
    cwd,
    stdio: 'inherit',
  });
}
