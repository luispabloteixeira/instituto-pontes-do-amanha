import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

if (!existsSync('dist/html/index.html')) {
  throw new Error('Build inválida: dist/html/index.html não foi gerado.');
}

const html = readFileSync('dist/html/index.html', 'utf8');
if (!html.includes('<main id="app"') || !html.includes('type="module"')) {
  throw new Error('Build inválida: estrutura essencial da SPA não foi preservada.');
}

const jsFiles = walk('dist').filter((file) => file.endsWith('.js'));
if (jsFiles.length === 0) {
  throw new Error('Build inválida: nenhum bundle JavaScript foi gerado.');
}

for (const file of jsFiles) {
  execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
}

console.log(`Smoke test concluído: ${jsFiles.length} bundle(s) JavaScript válidos e HTML principal preservado.`);
