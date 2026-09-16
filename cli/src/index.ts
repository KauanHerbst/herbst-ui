import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import pc from 'picocolors';
import { runInit } from './commands/init';
import { runAdd } from './commands/add';

const FONTS_HINT = `The theme uses Inter, JetBrains Mono and Newsreader. Load them in your index.html:
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap" />
`;

export interface ParsedArgs {
  command: string;
  names: string[];
  flags: Record<string, boolean | string>;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const [command = 'help', ...rest] = argv;
  const names: string[] = [];
  const flags: Record<string, boolean | string> = {};
  for (let i = 0; i < rest.length; i++) {
    const token = rest[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = rest[i + 1];
      if (next && !next.startsWith('--')) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      names.push(token);
    }
  }
  return { command, names, flags };
}

async function main(argv: string[]): Promise<void> {
  const { command, names, flags } = parseArgs(argv);
  const cwd = typeof flags.cwd === 'string' ? flags.cwd : process.cwd();

  if (command === 'init') {
    const config = await runInit(cwd, {
      yes: flags.yes === true,
      project: typeof flags.project === 'string' ? flags.project : undefined,
    });
    process.stdout.write(pc.green(`herbst-ui ready. Components go to ${config.componentsDir}\n`));
    process.stdout.write(pc.dim(FONTS_HINT));
    return;
  }

  if (command === 'add') {
    if (names.length === 0) {
      process.stderr.write(pc.red('Usage: herbst-ui add <component...>\n'));
      process.exitCode = 1;
      return;
    }
    const result = await runAdd(cwd, names, { overwrite: flags.overwrite === true });
    for (const w of result.written) process.stdout.write(pc.green(`+ ${w}\n`));
    for (const s of result.skipped) process.stdout.write(pc.yellow(`skip ${s} (exists)\n`));
    return;
  }

  process.stdout.write('herbst-ui - commands: init, add <component...>\n');
}

function isEntryPoint(): boolean {
  if (!process.argv[1]) return false;
  try {
    return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isEntryPoint()) {
  main(process.argv.slice(2)).catch((err) => {
    process.stderr.write(pc.red(`${err instanceof Error ? err.message : String(err)}\n`));
    process.exitCode = 1;
  });
}
