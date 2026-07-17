import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

export type PM = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function detectPackageManager(cwd: string): PM {
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn';
  if (existsSync(join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
}

export function installArgs(pm: PM, deps: string[]): string[] {
  const verb = pm === 'npm' ? 'install' : 'add';
  return [verb, ...deps];
}

export function runInstall(pm: PM, deps: string[], cwd: string): void {
  if (deps.length === 0) return;
  execSync([pm, ...installArgs(pm, deps)].join(' '), { cwd, stdio: 'inherit' });
}
