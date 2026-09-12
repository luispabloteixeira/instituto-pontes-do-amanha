import { access, cp, mkdir } from 'node:fs/promises';

const source = new URL('../imagens/', import.meta.url);
const target = new URL('../dist/imagens/', import.meta.url);

await access(source);
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });

console.log('Recursos estáticos copiados para dist/imagens.');
