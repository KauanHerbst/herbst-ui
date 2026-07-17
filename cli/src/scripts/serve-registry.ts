import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const registryDir = join(here, '..', '..', '..', 'registry');
const port = Number(process.env.PORT ?? 4000);

const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent((req.url ?? '/').split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  const abs = join(registryDir, path === '/' ? 'index.json' : path);
  try {
    const body = await readFile(abs, 'utf8');
    res.writeHead(200, {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'not found', path }));
  }
});

server.listen(port, () => {
  process.stdout.write(`registry served at http://localhost:${port} (base for --registry)\n`);
});
